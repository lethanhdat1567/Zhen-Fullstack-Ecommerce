import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface CheckoutDTO {
    full_name: string;
    email?: string;
    phone_number: string;
    shipping_address: string;
    note?: string;
    payment_method: "cod" | "banking" | "vnpay";
    items: {
        product_id: string;
        quantity: number;
        cart_item_id?: string;
    }[];
}

class OrderService {
    // Helper để biến đổi dữ liệu trả về cho đẹp
    private transformOrderItem(item: any, lang?: string) {
        const { product, ...itemData } = item;
        const { translations, ...productMetadata } = product;

        const productInfo = lang
            ? {
                  ...productMetadata,
                  title: translations[0]?.title || null,
              }
            : {
                  ...productMetadata,
                  translations,
              };

        return {
            ...itemData,
            product: productInfo,
        };
    }

    async createOrder(user_id: string, data: CheckoutDTO) {
        const { items, payment_method, ...orderInfo } = data;

        return await prisma.$transaction(async (tx) => {
            let totalAmount = 0;
            const orderItemsData = [];

            // --- BƯỚC 1: CHECK KHO & TÍNH TIỀN (Giữ nguyên logic cũ) ---
            for (const item of items) {
                const product = await tx.products.findUnique({
                    where: { id: item.product_id },
                });
                if (!product)
                    throw new AppError(
                        `Product ${item.product_id} not found`,
                        404,
                    );
                if (product.stock < item.quantity)
                    throw new AppError(
                        `Product ${product.id} out of stock`,
                        400,
                    );

                const finalPrice = Number(
                    product.sale_price || product.price || 0,
                );
                totalAmount += finalPrice * item.quantity;

                orderItemsData.push({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: finalPrice,
                });

                await tx.products.update({
                    where: { id: product.id },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            // --- BƯỚC 2: XỬ LÝ TRẠNG THÁI THEO PHƯƠNG THỨC THANH TOÁN ---
            let paymentStatus = "unpaid";
            if (payment_method === "vnpay" || payment_method === "banking") {
                paymentStatus = "pending";
            }

            // --- BƯỚC 3: TẠO ORDER ---
            const order = await tx.orders.create({
                data: {
                    ...orderInfo,
                    user_id,
                    payment_method,
                    total_amount: totalAmount,
                    status: "pending",
                    payment_status: paymentStatus,
                    order_items: { create: orderItemsData },
                },
                include: { order_items: true },
            });

            // --- BƯỚC 4: DỌN GIỎ HÀNG ---
            const cartItemIds = items
                .filter((i) => i.cart_item_id)
                .map((i) => i.cart_item_id!);
            if (cartItemIds.length > 0) {
                await tx.cart_items.deleteMany({
                    where: { id: { in: cartItemIds }, user_id },
                });
            }

            // --- BƯỚC 5: TRẢ VỀ DỮ LIỆU KÈM PAYMENT URL (NẾU CÓ) ---
            let paymentUrl = null;
            if (payment_method === "vnpay") {
                // Đây là nơi bạn gọi hàm tạo link VNPAY (Ví dụ vnpayService.createPaymentUrl)
                paymentUrl = `https://vnpay.vn/pay?order_id=${order.id}&amount=${totalAmount}`;
            }

            return {
                order,
                paymentUrl,
            };
        });
    }

    async getOrdersByUser(user_id: string, lang?: string) {
        const orders = await prisma.orders.findMany({
            where: { user_id },
            include: {
                order_items: {
                    include: {
                        product: {
                            select: {
                                thumbnail: true,
                                translations: {
                                    where: lang
                                        ? { language: { code: lang } }
                                        : {},
                                    select: { title: true },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return orders.map((order) => ({
            ...order,
            order_items: order.order_items.map((item) =>
                this.transformOrderItem(item, lang),
            ),
        }));
    }

    async getOrderDetail(
        id: string,
        user_id: string,
        role: string,
        lang?: string,
    ) {
        const order = await prisma.orders.findUnique({
            where: { id },
            include: {
                order_items: {
                    include: {
                        product: {
                            select: {
                                thumbnail: true,
                                translations: {
                                    where: lang
                                        ? { language: { code: lang } }
                                        : {},
                                    select: { title: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!order) throw new AppError("Order not found", 404);
        if (role !== "admin" && order.user_id !== user_id)
            throw new AppError("Unauthorized access to this order", 403);

        return {
            ...order,
            order_items: order.order_items.map((item) =>
                this.transformOrderItem(item, lang),
            ),
        };
    }

    async getAllOrders() {
        return prisma.orders.findMany({
            include: {
                user: { select: { full_name: true, email: true } },
                _count: { select: { order_items: true } },
            },
            orderBy: { created_at: "desc" },
        });
    }

    async updateStatus(id: string, status: string) {
        const order = await prisma.orders.findUnique({
            where: { id },
            include: { order_items: true },
        });

        if (!order) throw new AppError("Order not found", 404);

        return await prisma.$transaction(async (tx) => {
            // Nếu hủy đơn -> Hoàn lại kho
            if (status === "cancelled" && order.status !== "cancelled") {
                for (const item of order.order_items) {
                    await tx.products.update({
                        where: { id: item.product_id },
                        data: { stock: { increment: item.quantity } },
                    });
                }
            }

            return tx.orders.update({
                where: { id },
                data: { status },
            });
        });
    }
}

export default new OrderService();
