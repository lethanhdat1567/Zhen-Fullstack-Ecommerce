// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "@/services/auth.service";

export class AuthController {
    static register = async (req: Request, res: Response) => {
        const result = await AuthService.register(req.body);

        return res.success({
            message: "Register successfully",
            data: result,
        });
    };

    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const result = await AuthService.login(username, password);

        return res.success({
            message: "Login successfully",
            data: result,
        });
    };

    static refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        const result = await AuthService.refresh(refreshToken);

        return res.success({
            message: "Token refreshed",
            data: result,
        });
    };

    static logout = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        const result = await AuthService.logout(refreshToken);

        return res.success({
            message: result.message,
        });
    };

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body;

        await AuthService.requestResetPassword(email);

        return res.success({
            message: "If email exists, reset link has been sent",
        });
    };

    static verifyResetToken = async (req: Request, res: Response) => {
        const { token } = req.query as { token: string };

        const result = await AuthService.verifyResetToken(token);

        return res.success({
            data: result,
        });
    };

    static resetPassword = async (req: Request, res: Response) => {
        const { token, password } = req.body;

        const result = await AuthService.resetPassword(token, password);

        return res.success({
            message: result.message,
        });
    };
}
