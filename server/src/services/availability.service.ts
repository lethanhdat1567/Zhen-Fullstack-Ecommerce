import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface BlockDatesDTO {
    service_id: string;
    start_date: Date;
    end_date: Date;
}

class AvailabilityService {
    private normalizeDate(date: string | Date) {
        const d = new Date(date);

        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    }

    async blockDates(data: BlockDatesDTO) {
        const { service_id, start_date, end_date } = data;

        const start = this.normalizeDate(start_date);
        const end = this.normalizeDate(end_date);

        start.setUTCHours(0, 0, 0, 0);
        end.setUTCHours(0, 0, 0, 0);
        console.log(start, end);

        if (start > end) {
            throw new AppError(
                "Ngày kết thúc không được trước ngày bắt đầu",
                400,
            );
        }

        const datesToBlock: any[] = [];
        const current = new Date(start);

        while (current <= end) {
            datesToBlock.push({
                service_id,
                date: new Date(current),
                is_available: false,
            });

            current.setUTCDate(current.getUTCDate() + 1);
        }

        // 5. Lưu vào DB
        return await prisma.service_availability.createMany({
            data: datesToBlock,
            skipDuplicates: true,
        });
    }

    async getServiceCalendar(serviceId: string) {
        return await prisma.service_availability.findMany({
            where: { service_id: serviceId },
            orderBy: { date: "asc" },
        });
    }

    async listSummary(lang?: string) {
        const services = await prisma.services.findMany({
            where: {
                availability: {
                    some: {},
                },
            },
            select: {
                id: true,
                capacity: true,
                thumbnail: true,
                translations: lang
                    ? {
                          where: { language: { code: lang } },
                          select: { title: true },
                      }
                    : {
                          select: { title: true },
                          take: 1,
                      },
                _count: {
                    select: { availability: true },
                },
            },
        });

        if (lang) {
            return services.map((s) => ({
                id: s.id,
                capacity: s.capacity,
                thumbnail: s.thumbnail,
                title: s.translations[0]?.title || null,
                blocked_count: s._count.availability,
            }));
        }

        return services;
    }
    async unblockDate(id: string) {
        return await prisma.service_availability.delete({
            where: { id },
        });
    }

    async bulkUnblock(ids: string[]) {
        if (!ids?.length) throw new AppError("No IDs provided", 400);
        const result = await prisma.service_availability.deleteMany({
            where: { id: { in: ids } },
        });
        return { unblockedCount: result.count };
    }
}

export default new AvailabilityService();
