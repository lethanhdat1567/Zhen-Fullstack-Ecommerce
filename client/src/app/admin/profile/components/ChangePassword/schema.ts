import * as z from "zod";

export const changePasswordSchema = z
    .object({
        old_password: z
            .string()
            .min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự.")
            .max(100, "Mật khẩu không hợp lệ."),

        new_password: z
            .string()
            .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự.")
            .max(100, "Mật khẩu không hợp lệ.")
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                "Mật khẩu mới phải chứa ít nhất 1 chữ cái và 1 số.",
            ),
    })
    .refine((data) => data.old_password !== data.new_password, {
        message: "Mật khẩu mới không được trùng mật khẩu cũ.",
        path: ["new_password"],
    });
