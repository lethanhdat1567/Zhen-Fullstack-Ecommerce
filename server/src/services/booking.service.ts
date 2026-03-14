import paymentController from "@/controllers/payment.controller";
import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";
import { dateFormat, ProductCode, VnpLocale } from "vnpay";
import { differenceInDays, startOfDay } from "date-fns";

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
    user_id?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    guests: number;
    check_in: Date;
    check_out: Date;
    note?: string;
    payment_method: "cod" | "vnpay";
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
        const {
            service_id,
            check_in,
            check_out,
            guests,
            payment_method,
            user_id,
        } = data;

        if (check_in >= check_out)
            throw new AppError("Ngày trả phòng phải sau ngày nhận phòng", 400);

        return await prisma.$transaction(async (tx) => {
            // 1. Lấy thông tin Service để check Capacity và Price
            const service = await tx.services.findUnique({
                where: { id: service_id },
            });

            if (!service) throw new AppError("Dịch vụ không tồn tại", 404);

            const isBlocked = await tx.service_availability.findFirst({
                where: {
                    service_id,
                    date: { gte: check_in, lt: check_out },
                    is_available: false,
                },
            });

            if (isBlocked)
                throw new AppError(
                    "Phòng đã bị khóa hoặc có người đặt trong thời gian này",
                    400,
                );

            const dateIn = startOfDay(new Date(check_in));
            const dateOut = startOfDay(new Date(check_out));

            // 2. Tính số đêm (Chênh lệch ngày)
            let nights = differenceInDays(dateOut, dateIn);

            // 3. Ràng buộc logic: Ít nhất phải ở 1 đêm nếu ngày giống nhau hoặc lỗi UI
            if (nights <= 0) nights = 1;

            // 4. Tính tổng tiền (Sử dụng đơn giá từ Database, không dùng từ Client gửi lên)
            const totalPrice = Number(service.price) * nights;

            let paymentStatus = "unpaid";
            if (payment_method === "vnpay") {
                paymentStatus = "pending";
            }

            // 5. Tạo đơn hàng
            const booking = await tx.bookings.create({
                data: {
                    user_id: user_id ?? null,
                    service_id,
                    customer_name: data.customer_name,
                    customer_email: data.customer_email,
                    customer_phone: data.customer_phone,
                    guest_count: guests,
                    check_in: check_in,
                    check_out: check_out,
                    total_price: totalPrice,
                    status: "pending",
                    payment_status: paymentStatus,
                    payment_method: payment_method,
                    note: data.note,
                },
                include: { service: true },
            });

            let paymentUrl = null;
            if (payment_method === "vnpay") {
                paymentUrl = await paymentController.vnpay.buildPaymentUrl({
                    vnp_Amount: totalPrice,
                    vnp_IpAddr: "127.0.0.1",
                    vnp_TxnRef: booking.id,
                    vnp_OrderInfo: `Thanh toán đơn hàng ${booking.id}`,
                    vnp_OrderType: ProductCode.Other,
                    vnp_ReturnUrl:
                        "http://localhost:8000/api/payment/check-payment-vnpay?type=booking",
                    vnp_Locale: VnpLocale.VN,
                    vnp_CreateDate: dateFormat(new Date()),
                });
            }

            return {
                ...booking,
                payment_url: paymentUrl,
            };
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
        try {
            const existing = await this.getById(id);
            if (!existing) throw new AppError("Booking not found", 404);

            return await prisma.bookings.delete({
                where: { id },
            });
        } catch (error: any) {
            if (error.code === "P2003") {
                throw new AppError(
                    "Không thể xóa đơn đặt chỗ này vì đã có dữ liệu liên quan (như thanh toán hoặc chi tiết dịch vụ).",
                    400,
                );
            }

            if (error.code === "P2025") {
                throw new AppError("Đơn đặt chỗ không tồn tại", 404);
            }

            throw error;
        }
    }

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không được để trống", 400);
        }

        try {
            return await prisma.$transaction(async (tx) => {
                const result = await tx.bookings.deleteMany({
                    where: {
                        id: { in: ids },
                    },
                });

                if (result.count === 0) {
                    throw new AppError(
                        "Không tìm thấy đơn đặt chỗ nào để xóa",
                        404,
                    );
                }

                return {
                    message: "Xóa các đơn đặt chỗ thành công",
                    deletedCount: result.count,
                };
            });
        } catch (error: any) {
            if (error.code === "P2003") {
                throw new AppError(
                    "Một số đơn đặt chỗ không thể xóa vì đã có dữ liệu liên quan (thanh toán, lịch sử dịch vụ).",
                    400,
                );
            }

            if (error instanceof AppError) {
                throw error;
            }

            // Các lỗi database khác
            throw error;
        }
    }
}

export default new BookingService();
