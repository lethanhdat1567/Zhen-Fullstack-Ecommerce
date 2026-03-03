import { dashboardService } from "@/services/dashboard.service";
import { Request, Response } from "express";

export const dashboardController = {
    async overview(req: Request, res: Response) {
        const { start_date, end_date } = req.query;

        const result = await dashboardService.getOverview({
            start_date: start_date as string,
            end_date: end_date as string,
        });

        return res.success(result);
    },
};
