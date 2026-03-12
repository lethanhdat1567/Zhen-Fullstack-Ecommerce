import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface OrderHistoryQuery {
    userId: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed" | "all";
    locale?: string;
    search?: string;
}

interface LookupOrderQuery {
    id: string;
    locale?: string;
}

function flattenTranslation(entity: any) {
    if (!entity) return null;
    const t = entity.translations?.[0];
    const { translations, ...rest } = entity;

    // Lấy slug từ category nếu có
    const category_slug = entity.category?.translations?.[0]?.slug || null;
    const { category, ...finalRest } = rest;

    return {
        ...finalRest,
        ...(t || {}),
        category_slug,
    };
}

/**
 * Định nghĩa Select chung - Đã bổ sung lấy Category Slug
 */
const getBookingSelect = (locale?: string) => ({
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
                where: locale ? { language: { code: locale } } : undefined,
                take: 1,
                select: { title: true, slug: true },
            },
            // Lấy thêm category của service
            category: {
                select: {
                    translations: {
                        where: locale
                            ? { language: { code: locale } }
                            : undefined,
                        take: 1,
                        select: { slug: true },
                    },
                },
            },
        },
    },
});

const getOrderSelect = (locale?: string) => ({
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
                        select: { title: true, slug: true },
                    },
                    // Lấy thêm category của product
                    category: {
                        select: {
                            translations: {
                                where: locale
                                    ? { language: { code: locale } }
                                    : undefined,
                                take: 1,
                                select: { slug: true },
                            },
                        },
                    },
                },
            },
        },
    },
});

export const orderHistoryService = {
    async getOrderHistory(query: OrderHistoryQuery) {
        const { userId, status, locale, search } = query;

        // 1. Build điều kiện where cơ bản
        const commonWhere: any = {
            user_id: userId,
            ...(status && status !== "all" && { status }),
        };

        // 2. Logic search: tìm kiếm trong các bản dịch (translations)
        const searchFilter = search
            ? {
                  contains: search,
              }
            : undefined;

        const [bookings, orders] = await Promise.all([
            prisma.bookings.findMany({
                where: {
                    ...commonWhere,
                    ...(searchFilter && {
                        service: {
                            translations: {
                                some: {
                                    title: searchFilter,
                                },
                            },
                        },
                    }),
                } as Prisma.bookingsWhereInput,
                orderBy: { created_at: "desc" },
                select: getBookingSelect(locale),
            }),
            prisma.orders.findMany({
                where: {
                    ...commonWhere,
                    ...(searchFilter && {
                        order_items: {
                            some: {
                                product: {
                                    translations: {
                                        some: {
                                            title: searchFilter,
                                        },
                                    },
                                },
                            },
                        },
                    }),
                } as Prisma.ordersWhereInput,
                orderBy: { created_at: "desc" },
                select: getOrderSelect(locale),
            }),
        ]);

        return {
            bookings: bookings.map((b) => ({
                ...b,
                service: flattenTranslation(b.service),
            })),
            orders: orders.map((o) => ({
                ...o,
                order_items: o.order_items.map((item) => ({
                    ...item,
                    product: flattenTranslation(item.product),
                })),
            })),
        };
    },

    async lookupOrder(query: LookupOrderQuery) {
        const { id, locale } = query;

        const order = await prisma.orders.findUnique({
            where: { id },
            select: getOrderSelect(locale),
        });

        if (order) {
            return {
                type: "product",
                data: {
                    ...order,
                    order_items: order.order_items.map((item) => ({
                        ...item,
                        product: flattenTranslation(item.product),
                    })),
                },
            };
        }

        const booking = await prisma.bookings.findUnique({
            where: { id },
            select: getBookingSelect(locale),
        });

        if (booking) {
            return {
                type: "service",
                data: {
                    ...booking,
                    service: flattenTranslation(booking.service),
                },
            };
        }

        return null;
    },
};
