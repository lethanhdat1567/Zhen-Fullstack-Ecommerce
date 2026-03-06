import availabilityService from "@/services/availability.service";
import { Request, Response } from "express";

class AvailabilityController {
    async blockDates(req: Request, res: Response) {
        const result = await availabilityService.blockDates(req.body);
        return res.success(result);
    }

    async getServiceCalendar(req: Request, res: Response) {
        const { serviceId } = req.params;
        const result = await availabilityService.getServiceCalendar(
            serviceId as string,
        );
        return res.success(result);
    }

    async listSummary(req: Request, res: Response) {
        const { lang } = req.query;
        const result = await availabilityService.listSummary(lang as string);
        return res.success(result);
    }

    async unblockDate(req: Request, res: Response) {
        const { id } = req.params;
        await availabilityService.unblockDate(id as string);
        return res.success({ message: "Date unblocked successfully" });
    }

    async bulkUnblock(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await availabilityService.bulkUnblock(ids);
        return res.success(result);
    }
}

export default new AvailabilityController();
