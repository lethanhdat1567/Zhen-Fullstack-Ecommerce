import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type DashboardQueryParams = {
    start_date?: string;
    end_date?: string;
};

export type DashboardBlock = {
    totalServices: number;
    totalProducts: number;
    totalPosts: number;
    totalContacts: number;
};

export type DashboardChartItem = {
    date: string;
    total: number;
};

export type DashboardData = {
    filters: {
        start_date: string;
        end_date: string;
    };
    blocks: DashboardBlock;
    charts: {
        contacts: DashboardChartItem[];
    };
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const dashboardService = {
    async getOverview(params?: DashboardQueryParams) {
        const query = new URLSearchParams();

        if (params?.start_date) query.append("start_date", params.start_date);

        if (params?.end_date) query.append("end_date", params.end_date);

        const res = await http.get<ApiResponse<DashboardData>>(
            `/dashboard/overview${
                query.toString() ? `?${query.toString()}` : ""
            }`,
        );

        return res.data;
    },
};
