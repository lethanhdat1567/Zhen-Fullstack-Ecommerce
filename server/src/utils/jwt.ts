import { envConfig } from "@/config/envConfig";
import jwt from "jsonwebtoken";

const accessSecret = envConfig.accessSecret as any;
const refreshSecret = envConfig.refreshSecret as any;

export type JwtPayload = {
    adminId: string;
    role: string;
};

/* ======================
   SIGN
====================== */

export const signAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, accessSecret, {
        expiresIn: envConfig.accessExpires || ("15m" as any),
    });
};

export const signRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, refreshSecret, {
        expiresIn: envConfig.refreshExpires || ("7d" as any),
    });
};

/* ======================
   VERIFY
====================== */

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret) as JwtPayload;
};
