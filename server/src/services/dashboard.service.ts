import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/appError";

interface DashboardQuery {
    start_date?: string;
    end_date?: string;
}

export const dashboardService = {
    async getOverview(params: DashboardQuery) {
        let { start_date, end_date } = params;

        const now = new Date();

        // =========================
        // DEFAULT 7 DAYS IF EMPTY
        // =========================

        let startDate: Date;
        let endDate: Date;

        if (!start_date || !end_date) {
            endDate = new Date();
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 6);
        } else {
            startDate = new Date(start_date);
            endDate = new Date(end_date);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                throw new AppError("Ngày không hợp lệ.", 400);
            }

            if (startDate > endDate) {
                throw new AppError(
                    "Ngày bắt đầu không được lớn hơn ngày kết thúc.",
                    400,
                );
            }
        }

        // Chuẩn hóa giờ
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        // =========================
        // PARALLEL QUERY
        // =========================

        const [
            totalServices,
            totalProducts,
            totalPosts,
            totalContacts,
            contactsRaw,
        ] = await Promise.all([
            prisma.services.count({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            }),
            prisma.products.count({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            }),
            prisma.posts.count({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            }),
            prisma.contacts.count({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            }),
            prisma.contacts.findMany({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                select: {
                    created_at: true,
                },
            }),
        ]);

        // =========================
        // BUILD CHART DATA
        // =========================

        const chartMap: Record<string, number> = {};

        const current = new Date(startDate);

        while (current <= endDate) {
            const key = current.toISOString().split("T")[0];
            chartMap[key] = 0;
            current.setDate(current.getDate() + 1);
        }

        contactsRaw.forEach((item) => {
            const key = item.created_at.toISOString().split("T")[0];
            if (chartMap[key] !== undefined) {
                chartMap[key]++;
            }
        });

        const contactsChart = Object.keys(chartMap).map((date) => ({
            date,
            total: chartMap[date],
        }));

        return {
            filters: {
                start_date: startDate,
                end_date: endDate,
            },
            blocks: {
                totalServices,
                totalProducts,
                totalPosts,
                totalContacts,
            },
            charts: {
                contacts: contactsChart,
            },
        };
    },
};
