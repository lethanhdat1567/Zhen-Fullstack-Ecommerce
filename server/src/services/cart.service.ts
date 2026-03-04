import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface AddToCartDTO {
    product_id: string;
    quantity: number;
}

class CartService {
    // Helper để build include cho Product + Translation
    private buildInclude(lang?: string) {
        return {
            id: true,
            quantity: true,
            product_id: true,
            product: {
                select: {
                    id: true,
                    price: true,
                    sale_price: true,
                    stock: true,
                    thumbnail: true,
                    translations: {
                        where: lang ? { language: { code: lang } } : {},
                        select: {
                            title: true,
                            slug: true,
                        },
                    },
                },
            },
        };
    }

    private transformCartItem(item: any, lang?: string) {
        const { translations, ...productData } = item.product;

        return {
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            product: {
                ...productData,
                ...(lang
                    ? {
                          title: translations[0]?.title || null,
                          slug: translations[0]?.slug || null,
                      }
                    : { translations }),
            },
        };
    }
    async getCart(user_id: string, lang?: string) {
        const items = await prisma.cart_items.findMany({
            where: { user_id },
            select: this.buildInclude(lang),
            orderBy: { created_at: "desc" },
        });

        // Làm phẳng từng item
        const formattedItems = items.map((item) =>
            this.transformCartItem(item, lang),
        );

        // Tính toán tổng tiền dựa trên dữ liệu đã làm phẳng
        const totalAmount = formattedItems.reduce((sum, item) => {
            const finalPrice = Number(
                item.product.sale_price || item.product.price || 0,
            );
            return sum + finalPrice * item.quantity;
        }, 0);

        return {
            items: formattedItems,
            totalAmount,
        };
    }

    async mergeCart(
        user_id: string,
        items: { product_id: string; quantity: number }[],
        lang?: string,
    ) {
        return await prisma.$transaction(async (tx) => {
            for (const item of items) {
                // 1. Lấy thông tin sản phẩm và stock mới nhất
                const product = await tx.products.findUnique({
                    where: { id: item.product_id },
                    select: { stock: true, id: true },
                });

                if (!product) continue;

                // 2. Kiểm tra xem item đã có trong giỏ của User chưa
                const existingItem = await tx.cart_items.findFirst({
                    where: { user_id, product_id: item.product_id },
                });

                const newTotalQuantity = existingItem
                    ? existingItem.quantity + item.quantity
                    : item.quantity;

                const finalQuantity = Math.min(newTotalQuantity, product.stock);

                if (existingItem) {
                    await tx.cart_items.update({
                        where: { id: existingItem.id },
                        data: { quantity: finalQuantity },
                    });
                } else if (finalQuantity > 0) {
                    await tx.cart_items.create({
                        data: {
                            user_id,
                            product_id: item.product_id,
                            quantity: finalQuantity,
                        },
                    });
                }
            }

            return await this.getCart(user_id, lang);
        });
    }
    async addToCart(user_id: string, data: AddToCartDTO) {
        const { product_id, quantity } = data;

        // 1. Kiểm tra sản phẩm tồn tại và còn hàng không
        const product = await prisma.products.findUnique({
            where: { id: product_id },
        });

        if (!product) throw new AppError("Product not found", 404);

        if (product.stock < quantity)
            throw new AppError("Not enough stock", 400);

        // 2. Sử dụng Transaction để đảm bảo tính nhất quán
        return await prisma.$transaction(async (tx) => {
            // Kiểm tra item đã có trong giỏ chưa
            const existingItem = await tx.cart_items.findFirst({
                where: { user_id, product_id },
            });

            if (existingItem) {
                // Nếu có rồi thì update quantity
                return tx.cart_items.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + quantity },
                });
            } else {
                // Chưa có thì tạo mới
                return tx.cart_items.create({
                    data: { user_id, product_id, quantity },
                });
            }
        });
    }

    async updateQuantity(
        user_id: string,
        cart_item_id: string,
        quantity: number,
    ) {
        if (quantity < 1)
            throw new AppError("Quantity must be at least 1", 400);

        const cartItem = await prisma.cart_items.findFirst({
            where: { id: cart_item_id, user_id },
            include: { product: true },
        });

        if (!cartItem) throw new AppError("Cart item not found", 404);
        if (cartItem.product.stock < quantity)
            throw new AppError("Not enough stock", 400);

        return prisma.cart_items.update({
            where: { id: cart_item_id },
            data: { quantity },
        });
    }

    async hydrateCartItems(
        items: { id?: string; product_id: string; quantity: number }[],
        lang?: string,
    ) {
        if (!items.length) return { items: [], totalAmount: 0 };

        const productIds = items.map((i) => i.product_id);

        // 1. Lấy thông tin các sản phẩm từ DB
        const products = await prisma.products.findMany({
            where: { id: { in: productIds } },
            select: {
                id: true,
                price: true,
                sale_price: true,
                stock: true,
                thumbnail: true,
                translations: {
                    where: lang ? { language: { code: lang } } : {},
                    select: {
                        title: true,
                        slug: true,
                    },
                },
            },
        });

        // 2. Map lại dữ liệu
        const formattedItems = items
            .map((item) => {
                const product = products.find((p) => p.id === item.product_id);

                // Nếu sản phẩm không tồn tại trong DB, loại bỏ item này
                if (!product) return null;

                const { translations, ...productData } = product;

                return {
                    id: item.id || null, // Trả lại cart_item_id nếu có
                    product_id: item.product_id,
                    quantity: item.quantity,
                    product: {
                        ...productData,
                        ...(lang
                            ? {
                                  title: translations[0]?.title || null,
                                  slug: translations[0]?.slug || null,
                              }
                            : { translations }),
                    },
                };
            })
            .filter(Boolean); // Loại bỏ null

        // 3. Tính toán tổng tiền
        const totalAmount = formattedItems.reduce((sum, item: any) => {
            const finalPrice = Number(
                item.product.sale_price || item.product.price || 0,
            );
            return sum + finalPrice * item.quantity;
        }, 0);

        return {
            items: formattedItems,
            totalAmount,
        };
    }

    async removeItem(user_id: string, id: string) {
        // Phải check user_id để tránh người khác xóa nhầm item qua API
        const item = await prisma.cart_items.findFirst({
            where: { id, user_id },
        });

        if (!item) throw new AppError("Item not found in your cart", 404);

        return prisma.cart_items.delete({
            where: { id },
        });
    }

    async clearCart(user_id: string) {
        return prisma.cart_items.deleteMany({
            where: { user_id },
        });
    }
}

export default new CartService();
