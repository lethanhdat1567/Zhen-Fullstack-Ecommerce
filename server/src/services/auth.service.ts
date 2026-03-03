// services/auth.service.ts
import { AppError } from "@/utils/appError";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} from "@/utils/jwt";
import { comparePassword, hashPassword } from "@/utils/password";
import crypto from "crypto";
import ms, { StringValue } from "ms";
import { envConfig } from "@/config/envConfig";
import { prisma } from "@/lib/prisma";
import { mailer } from "@/lib/mailer";

type RegisterInput = {
    username: string;
    email: string;
    password: string;
    full_name?: string;
};

const ACCESS_EXPIRES_IN = envConfig.accessExpires as StringValue;
const REFRESH_EXPIRES_IN = envConfig.refreshExpires as StringValue;

export class AuthService {
    // ================= REGISTER =================
    static async register(data: RegisterInput) {
        const { username, email, password, full_name } = data;

        const exists = await prisma.admins.findFirst({
            where: { OR: [{ username }, { email }] },
        });

        if (exists) {
            throw new AppError("Username or email already exists", 409);
        }

        const password_hash = await hashPassword(password);

        const admin = await prisma.admins.create({
            data: {
                username,
                email,
                password_hash,
                full_name,
                role: "admin",
                status: "active",
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                created_at: true,
            },
        });

        return admin;
    }

    // ================= LOGIN =================
    static async login(username: string, password: string) {
        const admin = await prisma.admins.findFirst({
            where: {
                OR: [{ username }, { email: username }],
                status: "active",
            },
        });

        if (!admin) {
            throw new AppError("Invalid credentials", 401);
        }

        const ok = await comparePassword(password, admin.password_hash);
        if (!ok) {
            throw new AppError("Invalid credentials", 401);
        }

        const payload = {
            adminId: admin.id,
            role: admin.role,
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // 1 admin = 1 refresh session
        await prisma.admin_tokens.deleteMany({
            where: { admin_id: admin.id, type: "refresh" },
        });

        await prisma.admin_tokens.create({
            data: {
                admin_id: admin.id,
                token: refreshToken,
                type: "refresh",
                expired_at: new Date(Date.now() + ms(REFRESH_EXPIRES_IN)),
            },
        });

        // Update last login
        await prisma.admins.update({
            where: { id: admin.id },
            data: { last_login_at: new Date() },
        });

        return {
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                avatar: admin.avatar,
            },
            accessToken,
            refreshToken,
            expiresIn: ms(ACCESS_EXPIRES_IN),
        };
    }

    // ================= REFRESH =================
    static async refresh(refreshToken: string) {
        const tokenInDb = await prisma.admin_tokens.findFirst({
            where: {
                token: refreshToken,
                type: "refresh",
                expired_at: { gt: new Date() },
            },
        });

        if (!tokenInDb) {
            throw new AppError("Invalid refresh token", 401);
        }

        const payload = verifyRefreshToken(refreshToken);

        const newAccessToken = signAccessToken({
            adminId: payload.adminId,
            role: payload.role,
        });

        return {
            accessToken: newAccessToken,
            expiresIn: ms(ACCESS_EXPIRES_IN),
        };
    }

    // ================= LOGOUT =================
    static async logout(refreshToken: string) {
        await prisma.admin_tokens.deleteMany({
            where: { token: refreshToken, type: "refresh" },
        });

        return { message: "Logged out successfully" };
    }

    // ================= RESET PASSWORD =================
    static async requestResetPassword(email: string) {
        const admin = await prisma.admins.findUnique({
            where: { email },
        });

        // Không leak email
        if (!admin) return;

        const token = crypto.randomUUID();

        await prisma.admin_tokens.deleteMany({
            where: {
                admin_id: admin.id,
                type: "reset_password",
            },
        });

        const expiredAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await prisma.admin_tokens.create({
            data: {
                admin_id: admin.id,
                token,
                type: "reset_password",
                expired_at: expiredAt,
            },
        });

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        await mailer.sendMail({
            from: envConfig.mail.from,
            to: admin.email,
            subject: "Reset your password",
            html: `
            <h2>Password Reset</h2>
            <p>You requested to reset your password.</p>
            <p>This link will expire in 15 minutes.</p>
            <a href="${resetLink}" 
               style="display:inline-block;padding:10px 16px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">
               Reset Password
            </a>
        `,
        });
    }

    static async verifyResetToken(token: string) {
        const tokenRecord = await prisma.admin_tokens.findFirst({
            where: {
                token,
                type: "reset_password",
                expired_at: { gt: new Date() },
            },
            select: { id: true },
        });

        if (!tokenRecord) {
            throw new AppError("Invalid or expired token", 400);
        }

        return { valid: true };
    }

    static async resetPassword(token: string, newPassword: string) {
        const tokenRecord = await prisma.admin_tokens.findFirst({
            where: {
                token,
                type: "reset_password",
                expired_at: { gt: new Date() },
            },
        });

        if (!tokenRecord) {
            throw new AppError("Invalid or expired token", 400);
        }

        const password_hash = await hashPassword(newPassword);

        await prisma.admins.update({
            where: { id: tokenRecord.admin_id },
            data: { password_hash },
        });

        await prisma.admin_tokens.delete({
            where: { id: tokenRecord.id },
        });

        return { message: "Password reset successfully" };
    }
}
