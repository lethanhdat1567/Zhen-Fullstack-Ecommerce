import * as z from "zod";

const bookingSchema = z
    .object({
        service_id: z.string().min(1, "Vui lòng chọn dịch vụ."),

        customer_name: z
            .string()
            .min(2, "Tên khách hàng quá ngắn.")
            .max(50, "Tên khách hàng không nên dài quá 50 ký tự."),

        customer_email: z
            .string()
            .email("Email không đúng định dạng.")
            .or(z.literal("")),

        customer_phone: z
            .string()
            .regex(
                /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
                "Số điện thoại không hợp lệ.",
            ),

        guests: z
            .number()
            .min(1, "Ít nhất phải có 1 khách.")
            .max(20, "Số lượng khách vượt quá giới hạn cho phép."),

        check_in: z.date({
            error: "Vui lòng chọn ngày nhận phòng hợp lệ.",
        }),

        check_out: z.date({
            error: "Vui lòng chọn ngày trả phòng hợp lệ.",
        }),
        payment_method: z.enum(["vnpay", "cod"], {
            error: "Vui lòng chọn phương thức thanh toán.",
        }),

        note: z
            .string()
            .max(500, "Ghi chú không nên dài quá 500 ký tự.")
            .optional()
            .or(z.literal("")),
    })
    .refine(
        (data) => {
            // Vì đã là kiểu Date nên có thể so sánh trực tiếp
            return data.check_out > data.check_in;
        },
        {
            message: "Ngày trả phòng phải sau ngày nhận phòng.",
            path: ["check_out"],
        },
    );

export default bookingSchema;
