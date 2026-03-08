import { envConfig } from "@/config/envConfig";
import { JwtPayload } from "@/utils/jwt";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const optionalAuthMiddleware = (
    req: AuthRequest,
    res: any,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    // Không có token -> cho qua
    if (!authHeader) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            envConfig.accessSecret!,
        ) as JwtPayload;

        req.user = decoded;
    } catch (err) {
        // Token sai cũng bỏ qua
        // Không throw error vì đây là optional auth
    }

    next();
};
