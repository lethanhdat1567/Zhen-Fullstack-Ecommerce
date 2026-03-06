import paymentController from "@/controllers/payment.controller";
import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";
import { dateFormat, ProductCode, VnpLocale } from "vnpay";

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

    async createOrder(data: CheckoutDTO, userId?: string) {
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
                    user_id: userId,
                    payment_method,
                    total_amount: totalAmount,
                    status: "pending",
                    payment_status: paymentStatus,
                    order_items: { create: orderItemsData },
                },
                include: { order_items: true },
            });

            if (userId) {
                const cartItemIds = items
                    .filter((i) => i.cart_item_id)
                    .map((i) => i.cart_item_id!);
                if (cartItemIds.length > 0) {
                    await tx.cart_items.deleteMany({
                        where: { id: { in: cartItemIds }, user_id: userId },
                    });
                }
            }
            // --- BƯỚC 5: TRẢ VỀ DỮ LIỆU KÈM PAYMENT URL (NẾU CÓ) ---
            let paymentUrl = null;
            if (payment_method === "vnpay") {
                paymentUrl = await paymentController.vnpay.buildPaymentUrl({
                    vnp_Amount: totalAmount,
                    vnp_IpAddr: "127.0.0.1",
                    vnp_TxnRef: order.id,
                    vnp_OrderInfo: `Thanh toán đơn hàng ${order.id}`,
                    vnp_OrderType: ProductCode.Other,
                    vnp_ReturnUrl:
                        "http://localhost:8000/api/payment/check-payment-vnpay",
                    vnp_Locale: VnpLocale.VN,
                    vnp_CreateDate: dateFormat(new Date()),
                });
            }

            return {
                order,
                paymentUrl,
            };
        });
    }

    async getOrdersByUser(
        user_id: string,
        lang?: string,
        status?: string,
        search?: string,
    ) {
        const orders = await prisma.orders.findMany({
            where: {
                user_id,
                // Filter theo status nếu có truyền vào
                ...(status && status !== "all" ? { status: status } : {}),

                // Filter theo search (Mã đơn hàng HOẶC Tên sản phẩm)
                ...(search
                    ? {
                          OR: [
                              { id: { contains: search } },
                              {
                                  order_items: {
                                      some: {
                                          product: {
                                              translations: {
                                                  some: {
                                                      title: {
                                                          contains: search,
                                                      },
                                                      ...(lang
                                                          ? {
                                                                language: {
                                                                    code: lang,
                                                                },
                                                            }
                                                          : {}),
                                                  },
                                              },
                                          },
                                      },
                                  },
                              },
                          ],
                      }
                    : {}),
            },
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

    async getAdminOrders(query: any) {
        const { status, search } = query;

        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (search) {
            where.OR = [
                {
                    full_name: {
                        contains: search,
                    },
                },
                {
                    email: {
                        contains: search,
                    },
                },
                {
                    phone_number: {
                        contains: search,
                    },
                },
                {
                    id: {
                        contains: search,
                    },
                },
            ];
        }

        const include = {
            user: {
                select: {
                    full_name: true,
                    email: true,
                },
            },
            _count: {
                select: {
                    order_items: true,
                },
            },
        };

        const result = await paginate(prisma.orders, query, {
            where,
            include,
            orderBy: [{ created_at: "desc" }],
        });

        return result;
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
    async destroy(id: string) {
        const order = await prisma.orders.findUnique({
            where: { id },
        });

        if (!order) throw new AppError("Order not found", 404);

        await prisma.orders.delete({
            where: { id },
        });

        return { id };
    }

    async bulkDestroy(ids: string[]) {
        if (!ids || ids.length === 0) {
            throw new AppError("Order ids are required", 400);
        }

        const result = await prisma.orders.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return result;
    }
}

export default new OrderService();
