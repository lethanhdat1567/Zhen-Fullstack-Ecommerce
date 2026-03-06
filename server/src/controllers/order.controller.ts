import { AuthRequest } from "@/middlewares/auth.middleware";
import orderService from "@/services/order.service";
import { Response } from "express";

class OrderController {
    async checkout(req: AuthRequest, res: Response) {
        const result = await orderService.createOrder(
            req.body,
            req?.user?.userId,
        );
        return res.success(result);
    }

    async getMyOrders(req: AuthRequest, res: Response) {
        const { lang, status, search } = req.query; // Thêm status và search vào đây
        const result = await orderService.getOrdersByUser(
            req.user!.userId,
            lang as string | undefined,
            status as string | undefined,
            search as string | undefined,
        );
        return res.success(result);
    }

    async getOrderDetail(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;
        const result = await orderService.getOrderDetail(
            id as string,
            req.user!.userId,
            req.user!.role,
            lang as string | undefined,
        );
        return res.success(result);
    }

    async getAllOrders(req: AuthRequest, res: Response) {
        const result = await orderService.getAdminOrders(req.query);
        return res.success(result);
    }

    async updateStatus(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        const result = await orderService.updateStatus(id as string, status);
        return res.success(result);
    }

    async destroy(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const result = await orderService.destroy(id as string);
        return res.success(result);
    }

    async bulkDestroy(req: AuthRequest, res: Response) {
        const { ids } = req.body;
        const result = await orderService.bulkDestroy(ids);
        return res.success(result);
    }
}

export default new OrderController();
