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
import { OAuth2Client } from "google-auth-library";

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

        const exists = await prisma.users.findFirst({
            where: { OR: [{ username }, { email }] },
        });

        if (exists) {
            throw new AppError("Username hoặc email đã tồn tại", 409);
        }

        const password_hash = await hashPassword(password);

        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password_hash,
                full_name,
                role: "user",
                status: "active",
                auth_provider: "local",
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
            throw new AppError("Thông tin đăng nhập không chính xác", 401);
        }

        if (!user.password_hash) {
            throw new AppError(
                "Tài khoản này được đăng ký qua Google. Vui lòng đăng nhập bằng Google hoặc khôi phục mật khẩu.",
                401,
            );
        }

        // 3. So sánh mật khẩu
        const ok = await comparePassword(password, user.password_hash);
        if (!ok) {
            throw new AppError("Thông tin đăng nhập không chính xác", 401);
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

    // auth.service.ts
    static async googleLogin(idToken: string) {
        const googleClient = new OAuth2Client(envConfig.google.clientId);

        if (!idToken) {
            throw new AppError("ID Token is required", 400);
        }

        let payload;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: envConfig.google.clientId,
            });
            payload = ticket.getPayload();
        } catch (error) {
            throw new AppError(
                "Xác thực Google thất bại hoặc Token hết hạn",
                401,
            );
        }

        if (!payload || !payload.email) {
            throw new AppError("Không thể lấy thông tin từ Google", 401);
        }

        // Lấy thông tin chuẩn từ Google
        const {
            email,
            name: full_name,
            picture: avatar,
            sub: google_id,
        } = payload;

        // 2. Tìm user theo email hoặc google_id
        let user = await prisma.users.findFirst({
            where: {
                OR: [{ email }, { google_id }],
            },
        });

        if (!user) {
            // Tự sinh username nếu là user mới
            const emailPrefix = email.split("@")[0];
            const uniqueSuffix = google_id.slice(-4);
            const generatedUsername = `${emailPrefix}_${uniqueSuffix}`;

            user = await prisma.users.create({
                data: {
                    email,
                    username: generatedUsername,
                    full_name: full_name || "",
                    avatar: avatar || "",
                    google_id,
                    auth_provider: "google",
                    status: "active",
                    role: "user",
                    last_login_at: new Date(),
                },
            });
        } else {
            // Cập nhật thông tin nếu user đã tồn tại
            user = await prisma.users.update({
                where: { id: user.id },
                data: {
                    google_id,
                    auth_provider: "google",
                    avatar: avatar || user.avatar,
                    last_login_at: new Date(),
                },
            });
        }

        // 3. Tạo Token hệ thống (JWT của riêng bạn)
        const tokenPayload = { userId: user.id, role: user.role };
        const accessToken = signAccessToken(tokenPayload);
        const refreshToken = signRefreshToken(tokenPayload);

        // 4. Quản lý Refresh Token trong DB
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

        // 5. Trả về format chuẩn cho Frontend
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
