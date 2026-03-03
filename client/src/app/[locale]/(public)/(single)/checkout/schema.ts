import * as z from "zod";

const checkoutItemSchema = z.object({
    product_id: z.string().min(1, "Product ID là bắt buộc"),
    quantity: z.number().int().min(1, "Số lượng phải ít nhất là 1"),
    cart_item_id: z.string().uuid("ID giỏ hàng không hợp lệ").optional(),
});

export const checkoutSchema = z.object({
    full_name: z
        .string()
        .min(2, "Họ tên phải ít nhất 2 ký tự")
        .max(50, "Họ tên quá dài"),

    email: z
        .string()
        .min(1, "Email là bắt buộc")
        .email("Email không đúng định dạng"),

    phone_number: z
        .string()
        .regex(
            /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            "Số điện thoại Việt Nam không hợp lệ",
        ),

    shipping_address: z
        .string()
        .min(10, "Địa chỉ giao hàng cần chi tiết hơn (ít nhất 10 ký tự)"),

    payment_method: z.enum(["cod", "vnpay"], {
        error: "Vui lòng chọn phương thức thanh toán hợp lệ",
    }),

    note: z
        .string()
        .max(200, "Ghi chú không được quá 200 ký tự")
        .optional()
        .or(z.literal("")),

    items: z.array(checkoutItemSchema).min(1, "Giỏ hàng không được để trống"),
});

// Type inference để dùng với TypeScript (nếu cần)
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
