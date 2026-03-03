import { AuthRequest } from "@/middlewares/auth.middleware";
import cartService from "@/services/cart.service";
import { Response } from "express";

class CartController {
    async getCart(req: AuthRequest, res: Response) {
        const { lang } = req.query;
        const result = await cartService.getCart(
            req.user!.userId,
            lang as string | undefined,
        );
        return res.success(result);
    }

    async addToCart(req: AuthRequest, res: Response) {
        const { product_id, quantity } = req.body;
        const result = await cartService.addToCart(req.user!.userId, {
            product_id,
            quantity: quantity || 1,
        });
        return res.success(result);
    }

    async updateQuantity(req: AuthRequest, res: Response) {
        const { cart_item_id, quantity } = req.body;
        const result = await cartService.updateQuantity(
            req.user!.userId,
            cart_item_id,
            quantity,
        );
        return res.success(result);
    }

    async removeItem(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const result = await cartService.removeItem(
            req.user!.userId,
            id as string,
        );
        return res.success(result);
    }

    async clearCart(req: AuthRequest, res: Response) {
        const result = await cartService.clearCart(req.user!.userId);
        return res.success(result);
    }
}

export default new CartController();
