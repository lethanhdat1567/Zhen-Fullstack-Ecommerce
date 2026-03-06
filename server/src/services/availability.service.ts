import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

export interface BlockDatesDTO {
    service_id: string;
    start_date: string; // ISO string "2026-03-10"
    end_date: string; // ISO string "2026-03-15"
}

class AvailabilityService {
    async blockDates(data: BlockDatesDTO) {
        const { service_id, start_date, end_date } = data;
        const start = new Date(start_date);
        const end = new Date(end_date);

        if (start >= end)
            throw new AppError("End date must be after start date", 400);

        // Tạo mảng các ngày cần chặn
        const datesToBlock: any[] = [];
        let current = new Date(start);

        while (current < end) {
            datesToBlock.push({
                service_id,
                date: new Date(current),
                is_available: false,
            });
            current.setDate(current.getDate() + 1);
        }

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

    // Hiển thị danh sách các service kèm số lượng ngày đang bị chặn
    async listSummary(lang?: string) {
        return await prisma.services.findMany({
            where: { deleted_at: null },
            select: {
                id: true,
                capacity: true,
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
