import { siteSettingService } from "@/services/site-setting.service";
import { Request, Response } from "express";

export const siteSettingController = {
    async get(req: Request, res: Response) {
        const result = await siteSettingService.get();

        return res.success(result);
    },

    async update(req: Request, res: Response) {
        const result = await siteSettingService.update(req.body);

        return res.success(result, 200);
    },
};
