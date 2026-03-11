import { prisma } from "@/lib/prisma";
import { paginate } from "@/services/pagination.service";
import { AppError } from "@/utils/appError";
import bcrypt from "bcrypt";

export interface CreateAdminDTO {
    username: string;
    email: string;
    password: string;
    full_name?: string;
    phone?: string; // Bổ sung
    address?: string; // Bổ sung
    role?: string;
}

export interface UpdateAdminDTO {
    full_name?: string;
    avatar?: string;
    phone?: string; // Bổ sung
    address?: string; // Bổ sung
    role?: string;
    status?: string;
}

export interface ChangePasswordDTO {
    old_password: string;
    new_password: string;
}

export interface ListAdminQuery {
    search?: string;
}

export const adminService = {
    /* =========================
       CREATE
    ========================= */

    async create(data: CreateAdminDTO) {
        if (!data.username || !data.email || !data.password) {
            throw new AppError("Thiếu thông tin bắt buộc.", 400);
        }

        const password_hash = await bcrypt.hash(data.password, 10);

        try {
            const admin = await prisma.users.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password_hash,
                    full_name: data.full_name,
                    phone: data.phone,
                    address: data.address,
                    role: data.role ?? "user",
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    full_name: true,
                    phone: true, // Trả về thêm phone
                    address: true, // Trả về thêm address
                    role: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                },
            });

            return admin;
        } catch (error: any) {
            if (error.code === "P2002") {
                throw new AppError("Username hoặc email đã tồn tại.", 409);
            }
            throw error;
        }
    },

    /* =========================
       LIST
    ========================= */

    async findAll(params?: ListAdminQuery) {
        const where = params?.search
            ? {
                  OR: [
                      { username: { contains: params.search } },
                      { email: { contains: params.search } },
                      { full_name: { contains: params.search } },
                      { phone: { contains: params.search } }, // Cho phép tìm kiếm theo số điện thoại
                  ],
              }
            : {};

        return paginate(prisma.users, params ?? ({} as any), {
            where,
            orderBy: { created_at: "desc" },
            select: {
                id: true,
                username: true,
                avatar: true,
                email: true,
                full_name: true,
                phone: true, // Bổ sung vào select
                address: true, // Bổ sung vào select
                role: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
    },

    /* =========================
       DETAIL
    ========================= */

    async findById(id: string) {
        return prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                avatar: true,
                email: true,
                full_name: true,
                phone: true, // Bổ sung
                address: true, // Bổ sung
                role: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
        });
    },

    /* =========================
       UPDATE
    ========================= */

    async update(id: string, data: UpdateAdminDTO) {
        return prisma.users.update({
            where: { id },
            data,
            select: {
                id: true,
                username: true,
                avatar: true,
                email: true,
                full_name: true,
                phone: true, // Bổ sung
                address: true, // Bổ sung
                role: true,
                status: true,
                updated_at: true,
            },
        });
    },

    /* ... Các hàm khác (changePassword, delete) giữ nguyên ... */

    async changePassword(id: string, data: ChangePasswordDTO) {
        if (!data.old_password || !data.new_password) {
            throw new AppError("Thiếu thông tin mật khẩu.", 400);
        }

        const admin = await prisma.users.findUnique({
            where: { id },
        });

        if (!admin) {
            throw new AppError("Admin không tồn tại.", 404);
        }

        const isMatch = await bcrypt.compare(
            data.old_password,
            admin.password_hash,
        );

        if (!isMatch) {
            throw new AppError("Mật khẩu cũ không chính xác.", 400);
        }

        const newHash = await bcrypt.hash(data.new_password, 10);

        await prisma.users.update({
            where: { id },
            data: { password_hash: newHash },
        });

        return { message: "Đổi mật khẩu thành công." };
    },

    async delete(id: string) {
        return prisma.users.delete({
            where: { id },
        });
    },

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        const result = await prisma.users.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        return {
            deletedCount: result.count,
        };
    },
};
