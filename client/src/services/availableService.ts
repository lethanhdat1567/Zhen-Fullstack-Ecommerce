import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type BlockDatesPayload = {
    service_id: string;
    start_date: Date;
    end_date: Date;
};

export type Availability = {
    id: string;
    service_id: string;
    date: string;
    is_available: boolean;
};

export type ServiceAvailabilitySummary = {
    id: string;
    capacity: number;
    title?: string;
    thumbnail?: string;
    blocked_count: number;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const availableService = {
    async getSummary(lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<ServiceAvailabilitySummary[]>>(
            `/service-available/summary${query}`,
            { cache: "no-cache" },
        );

        return res.data;
    },

    async getCalendar(serviceId: string) {
        const res = await http.get<ApiResponse<Availability[]>>(
            `/service-available/calendar/${serviceId}`,
            { cache: "no-cache" },
        );

        return res.data;
    },

    async blockDates(payload: BlockDatesPayload) {
        const res = await http.post<ApiResponse<any>>(
            `/service-available/block`,
            payload,
        );

        return res.data;
    },

    async unblockDate(id: string) {
        const res = await http.delete<ApiResponse<{ message: string }>>(
            `/service-available/${id}`,
        );

        return res.data;
    },

    async bulkUnblock(ids: string[]) {
        const res = await http.delete<ApiResponse<{ unblockedCount: number }>>(
            `/service-available/bulk-unblock`,
            { ids },
        );

        return res.data;
    },
};
