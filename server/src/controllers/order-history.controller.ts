import { orderHistoryService } from "@/services/order-history.service";
import { Response } from "express";

class OrderHistoryController {
    async getOrderHistory(req: any, res: Response) {
        const { status, lang } = req.query;

        const userId = req.user!.userId;

        const result = await orderHistoryService.getOrderHistory({
            userId,
            status: typeof status === "string" ? (status as any) : undefined,
            locale: lang,
        });

        return res.success(result);
    }

    async lookupOrder(req: any, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const result = await orderHistoryService.lookupOrder({
            id,
            locale: lang,
        });

        return res.success(result);
    }
}

export default new OrderHistoryController();
