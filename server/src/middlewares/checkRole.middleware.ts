import { AuthRequest } from "@/middlewares/auth.middleware";
import { NextFunction } from "express";

export const checkRole = (...roles: string[]) => {
    return (req: AuthRequest, res: any, next: NextFunction) => {
        if (!req.user) return res.error({ message: "Unauthenticated" }, 401);

        if (!roles.includes(req.user.role)) {
            return res.error(
                { message: "Permission denied", code: "FORBIDDEN" },
                403,
            );
        }
        next();
    };
};
