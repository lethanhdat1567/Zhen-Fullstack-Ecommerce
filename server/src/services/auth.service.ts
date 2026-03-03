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
    // ================= REGISTER =================
    static async register(data: RegisterInput) {
        const { username, email, password, full_name } = data;

        // 1. Kiểm tra tồn tại
        const exists = await prisma.users.findFirst({
            where: { OR: [{ username }, { email }] },
        });

        if (exists) {
            throw new AppError("Username or email already exists", 409);
        }

        // 2. Hash mật khẩu và tạo User
        const password_hash = await hashPassword(password);

        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password_hash,
                full_name,
                role: "user",
                status: "active",
            },
        });

        const payload = {
            userId: newUser.id,
            role: newUser.role,
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        await prisma.user_tokens.create({
            data: {
                user_id: newUser.id,
                token: refreshToken,
                type: "refresh",
                expired_at: new Date(Date.now() + ms(REFRESH_EXPIRES_IN)),
            },
        });

        // Cập nhật last login lần đầu tiên
        await prisma.users.update({
            where: { id: newUser.id },
            data: { last_login_at: new Date() },
        });

        // 4. Trả về format giống hệt hàm Login
        return {
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar || null,
            },
            accessToken,
            refreshToken,
            expiresIn: ms(ACCESS_EXPIRES_IN),
        };
    }

    // ================= LOGIN =================
    static async login(username: string, password: string) {
        const user = await prisma.users.findFirst({
            where: {
                OR: [{ username }, { email: username }],
                status: "active",
            },
        });

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const ok = await comparePassword(password, user.password_hash);
        if (!ok) {
            throw new AppError("Invalid credentials", 401);
        }

        const payload = {
            userId: user.id,
            role: user.role,
        };

        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // Remove old and add new refresh token
        await prisma.user_tokens.deleteMany({
            where: { user_id: user.id, type: "refresh" },
        });

        await prisma.user_tokens.create({
            data: {
                user_id: user.id,
                token: refreshToken,
                type: "refresh",
                expired_at: new Date(Date.now() + ms(REFRESH_EXPIRES_IN)),
            },
        });

        // Update last login
        await prisma.users.update({
            where: { id: user.id },
            data: { last_login_at: new Date() },
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            accessToken,
            refreshToken,
            expiresIn: ms(ACCESS_EXPIRES_IN),
        };
    }

    // ================= REFRESH =================
    static async refresh(refreshToken: string) {
        const tokenInDb = await prisma.user_tokens.findFirst({
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
            userId: payload.userId,
            role: payload.role,
        });

        return {
            accessToken: newAccessToken,
            expiresIn: ms(ACCESS_EXPIRES_IN),
        };
    }

    // ================= LOGOUT =================
    static async logout(refreshToken: string) {
        await prisma.user_tokens.deleteMany({
            where: { token: refreshToken, type: "refresh" },
        });

        return { message: "Logged out successfully" };
    }

    // ================= RESET PASSWORD =================
    static async requestResetPassword(email: string) {
        const admin = await prisma.users.findUnique({
            where: { email },
        });

        // Không leak email
        if (!admin) return;

        const token = crypto.randomUUID();

        await prisma.user_tokens.deleteMany({
            where: {
                user_id: admin.id,
                type: "reset_password",
            },
        });

        const expiredAt = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.user_tokens.create({
            data: {
                user_id: admin.id,
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
        const tokenRecord = await prisma.user_tokens.findFirst({
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
        const tokenRecord = await prisma.user_tokens.findFirst({
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

        await prisma.users.update({
            where: { id: tokenRecord.user_id },
            data: { password_hash },
        });

        await prisma.user_tokens.delete({
            where: { id: tokenRecord.id },
        });

        return { message: "Password reset successfully" };
    }
}
