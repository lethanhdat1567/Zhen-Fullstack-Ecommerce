import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";

export interface UpdateBookingDTO {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed";
    payment_status?: string;
    note?: string;
}

export interface CreateBookingDTO {
    service_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    guests: number;
    check_in: string; // "2026-03-10"
    check_out: string; // "2026-03-12"
    note?: string;
}

class BookingService {
    private transformServiceWithLang(booking: any, lang?: string) {
        if (!lang || !booking.service) return booking;

        const { service, ...rest } = booking;
        const t = service.translations?.[0];

        return {
            ...rest,
            service: {
                id: service.id,
                capacity: service.capacity,
                price: service.price,
                thumbnail: service.thumbnail,
                // Flatten các trường dịch thuật
                title: t?.title ?? null,
                description: t?.description ?? null,
                content: t?.content ?? null,
            },
        };
    }

    async listBookings(query: any) {
        const { search, status, lang } = query;

        const where: any = {
            ...(status && { status }),
            ...(search && {
                OR: [
                    { customer_name: { contains: search } },
                    { customer_email: { contains: search } },
                    { customer_phone: { contains: search } },
                    { service_id: { contains: search } },
                ],
            }),
        };

        const result = await paginate(prisma.bookings, query, {
            where,
            include: {
                service: {
                    include: {
                        translations: lang
                            ? { where: { language: { code: lang } } }
                            : true,
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        // Nếu có truyền lang, thực hiện map lại từng item
        if (lang) {
            result.items = result.items.map((b: any) =>
                this.transformServiceWithLang(b, lang),
            );
        }

        return result;
    }

    async getById(id: string, lang?: string) {
        const booking = await prisma.bookings.findUnique({
            where: { id },
            include: {
                service: {
                    include: {
                        translations: lang
                            ? { where: { language: { code: lang } } }
                            : true,
                    },
                },
            },
        });

        if (!booking) return null;

        return lang ? this.transformServiceWithLang(booking, lang) : booking;
    }

    async createBooking(data: CreateBookingDTO) {
        const { service_id, check_in, check_out, guests } = data;
        const start = new Date(check_in);
        const end = new Date(check_out);

        if (start >= end)
            throw new AppError("Ngày trả phòng phải sau ngày nhận phòng", 400);

        return await prisma.$transaction(async (tx) => {
            // 1. Lấy thông tin Service để check Capacity và Price
            const service = await tx.services.findUnique({
                where: { id: service_id },
            });

            if (!service) throw new AppError("Dịch vụ không tồn tại", 404);

            // 2. Check sức chứa (Capacity)
            if (guests > service.capacity) {
                throw new AppError(
                    `Phòng này chỉ chứa tối đa ${service.capacity} người`,
                    400,
                );
            }

            // 3. Check xem ngày này có bị Admin khóa thủ công (Availability) không
            const isBlocked = await tx.service_availability.findFirst({
                where: {
                    service_id,
                    date: { gte: start, lt: end },
                    is_available: false,
                },
            });

            if (isBlocked)
                throw new AppError(
                    "Phòng đã bị khóa hoặc có người đặt trong thời gian này",
                    400,
                );

            // 4. Tính tổng tiền (Price * số đêm)
            const diffDays = Math.ceil(
                Math.abs(end.getTime() - start.getTime()) /
                    (1000 * 60 * 60 * 24),
            );
            const totalPrice = Number(service.price) * diffDays;

            // 5. Tạo đơn hàng
            const booking = await tx.bookings.create({
                data: {
                    service_id,
                    customer_name: data.customer_name,
                    customer_email: data.customer_email,
                    customer_phone: data.customer_phone,
                    guest_count: guests,
                    check_in: start,
                    check_out: end,
                    total_price: totalPrice,
                    status: "pending",
                    note: data.note,
                },
                include: { service: true },
            });

            return booking;
        });
    }

    async updateBooking(id: string, data: UpdateBookingDTO) {
        const existing = await this.getById(id);
        if (!existing) throw new AppError("Booking not found", 404);

        // Prisma tự động giữ nguyên các field không được truyền (undefined)
        return await prisma.bookings.update({
            where: { id },
            data: {
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                customer_phone: data.customer_phone,
                status: data.status,
                payment_status: data.payment_status,
                note: data.note,
            },
        });
    }

    async deleteBooking(id: string) {
        const existing = await this.getById(id);
        if (!existing) throw new AppError("Booking not found", 404);

        return await prisma.bookings.delete({
            where: { id },
        });
    }

    async bulkDelete(ids: string[]) {
        if (!ids?.length) throw new AppError("No IDs provided", 400);

        return await prisma.$transaction(async (tx) => {
            const result = await tx.bookings.deleteMany({
                where: { id: { in: ids } },
            });

            return { deletedCount: result.count };
        });
    }
}

export default new BookingService();
