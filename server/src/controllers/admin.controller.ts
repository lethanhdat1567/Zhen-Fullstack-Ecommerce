import { adminService } from "@/services/admin.service";
import { Request, Response } from "express";

export const adminController = {
    async create(req: Request, res: Response) {
        const result = await adminService.create(req.body);
        return res.success(result, 201);
    },

    async findAll(req: Request, res: Response) {
        try {
            const { search } = req.query;

            const result = await adminService.findAll({
                search: search as string | undefined,
            });

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findOne(req: Request, res: Response) {
        try {
            const result = await adminService.findById(req.params.id as string);

            if (!result) {
                return res.error("Admin không tồn tại", 404);
            }

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async update(req: Request, res: Response) {
        try {
            const result = await adminService.update(
                req.params.id as string,
                req.body,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async delete(req: Request, res: Response) {
        await adminService.delete(req.params.id as string);
        return res.success({ message: "Xóa admin thành công" });
    },

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await adminService.bulkDelete(ids);
        return res.success(result);
    },

    async changePassword(req: Request, res: Response) {
        const result = await adminService.changePassword(
            req.params.id as string,
            req.body,
        );
        return res.success(result);
    },
};
