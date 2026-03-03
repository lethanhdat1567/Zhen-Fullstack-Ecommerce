import { envConfig } from "@/config/envConfig";
import { JwtPayload } from "@/utils/jwt";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Mở rộng Request để có user
export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (
    req: AuthRequest,
    res: any,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.error({ message: "No token provided" }, 401);

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            envConfig.accessSecret!,
        ) as JwtPayload;

        // Chỉ cần token hợp lệ là cho đi tiếp
        req.user = decoded;
        next();
    } catch (err) {
        return res.error(
            { message: "Invalid or expired token", code: "UNAUTHORIZED" },
            401,
        );
    }
};
