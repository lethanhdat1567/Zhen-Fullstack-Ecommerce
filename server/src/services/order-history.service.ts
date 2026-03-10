import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface OrderHistoryQuery {
    userId: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed" | "all";
    locale?: string;
}

function flattenTranslation(entity: any) {
    const t = entity?.translations?.[0];
    if (!t) return entity;

    const { translations, ...rest } = entity;

    return {
        ...rest,
        ...t,
    };
}

export const orderHistoryService = {
    async getOrderHistory(query: OrderHistoryQuery) {
        const { userId, status, locale } = query;

        const bookingWhere: Prisma.bookingsWhereInput = {
            user_id: userId,
            ...(status && status !== "all" && { status }),
        };

        const orderWhere: Prisma.ordersWhereInput = {
            user_id: userId,
            ...(status && status !== "all" && { status }),
        };

        const [bookings, orders] = await Promise.all([
            prisma.bookings.findMany({
                where: bookingWhere,
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    status: true,
                    payment_status: true,
                    check_in: true,
                    check_out: true,
                    total_price: true,
                    created_at: true,

                    service: {
                        select: {
                            id: true,
                            thumbnail: true,
                            translations: {
                                where: locale
                                    ? { language: { code: locale } }
                                    : undefined,
                                take: 1,
                                select: {
                                    title: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            }),

            prisma.orders.findMany({
                where: orderWhere,
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    status: true,
                    payment_status: true,
                    total_amount: true,
                    created_at: true,

                    order_items: {
                        select: {
                            quantity: true,
                            price: true,
                            product: {
                                select: {
                                    id: true,
                                    thumbnail: true,
                                    translations: {
                                        where: locale
                                            ? { language: { code: locale } }
                                            : undefined,
                                        take: 1,
                                        select: {
                                            title: true,
                                            slug: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
        ]);

        const mappedBookings = bookings.map((b) => ({
            ...b,
            service: flattenTranslation(b.service),
        }));

        const mappedOrders = orders.map((o) => ({
            ...o,
            order_items: o.order_items.map((item) => ({
                ...item,
                product: flattenTranslation(item.product),
            })),
        }));

        return {
            bookings: mappedBookings,
            orders: mappedOrders,
        };
    },
};
