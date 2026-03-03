import * as z from "zod";

export const adminSchema = z.object({
    full_name: z
        .string()
        .min(3, "Họ tên phải có ít nhất 3 ký tự.")
        .max(100, "Họ tên không được vượt quá 100 ký tự."),

    avatar: z
        .string()
        .optional()
        .refine(
            (val) => !val || val.startsWith("/uploads/"),
            "Avatar không hợp lệ.",
        ),

    username: z
        .string()
        .min(4, "Username phải có ít nhất 4 ký tự.")
        .max(30, "Username không được vượt quá 30 ký tự.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username chỉ được chứa chữ, số và dấu gạch dưới.",
        ),

    email: z.string().email("Email không hợp lệ."),
});
