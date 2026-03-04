import { AuthRequest } from "@/middlewares/auth.middleware";
import favoriteService from "@/services/favorite.service";
import { AppError } from "@/utils/appError";
import { Response } from "express";

class FavoriteController {
    async getFavorites(req: AuthRequest, res: Response) {
        const { lang, type } = req.query;
        const result = await favoriteService.getFavorites(
            req.user!.userId,
            type as string | undefined,
            lang as string | undefined,
        );
        return res.success(result);
    }

    async checkLikedStatus(req: AuthRequest, res: Response) {
        const { product_id, service_id } = req.query;

        const isLiked = await favoriteService.checkLikedStatus(
            req.user!.userId,
            {
                product_id: product_id as string | undefined,
                service_id: service_id as string | undefined,
            },
        );

        return res.success({ is_liked: isLiked });
    }

    async toggleFavorite(req: AuthRequest, res: Response) {
        const { product_id, service_id } = req.body;

        const result = await favoriteService.toggleFavorite(req.user!.userId, {
            product_id,
            service_id,
        });

        return res.success(result);
    }
    async syncFavorites(req: AuthRequest, res: Response) {
        const { favorites } = req.body;
        // favorites expect: [{product_id: "abc"}, {service_id: "xyz"}]

        if (!Array.isArray(favorites)) {
            throw new AppError("Favorites must be an array", 400);
        }

        const result = await favoriteService.syncFavorites(
            req.user!.userId,
            favorites,
        );

        return res.success(result);
    }
}

export default new FavoriteController();
