import * as z from "zod";

export const createAdminSchema = z.object({
    username: z
        .string()
        .min(4, "Username phải có ít nhất 4 ký tự.")
        .max(30, "Username không được vượt quá 30 ký tự."),

    email: z.string().email("Email không hợp lệ."),

    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),

    full_name: z
        .string()
        .min(3, "Họ tên phải có ít nhất 3 ký tự.")
        .max(100, "Họ tên không được vượt quá 100 ký tự."),

    avatar: z.string().optional(),
});
