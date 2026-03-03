import { mediaItemService } from "@/services/media-item.service";
import { Request, Response } from "express";

export const mediaItemController = {
    async create(req: Request, res: Response) {
        try {
            const result = await mediaItemService.create(req.body);
            return res.success(result, 201);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async createMany(req: Request, res: Response) {
        try {
            const result = await mediaItemService.createMany(req.body);
            return res.success(result, 201);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async findByAlbum(req: Request, res: Response) {
        try {
            const { albumId } = req.params;

            const result = await mediaItemService.findByAlbum(
                albumId as string,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async update(req: Request, res: Response) {
        try {
            const result = await mediaItemService.update(
                req.params.id as string,
                req.body,
            );

            return res.success(result);
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await mediaItemService.delete(req.params.id as string);
            return res.success({ message: "Deleted successfully" });
        } catch (error: any) {
            return res.error(error.message, 400);
        }
    },
};
