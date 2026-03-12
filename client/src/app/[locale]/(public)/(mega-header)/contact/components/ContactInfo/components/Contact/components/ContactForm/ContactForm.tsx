"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactService } from "@/services/contactService";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const contactSchema = z.object({
    fullname: z.string().min(1, "Vui lòng nhập họ và tên"),
    phone_number: z
        .string()
        .min(8, "Số điện thoại không hợp lệ")
        .regex(/^[0-9+()\s-]+$/, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    content: z.string().min(1, "Vui lòng nhập nội dung"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const t = useTranslations("Contact");

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await contactService.create(data);
            toast.success(
                "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
            );
            reset();
        } catch (error) {
            console.log(error);
            toast.error("Đã có lỗi xảy ra!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-180 space-y-10"
        >
            <div className="mb-7.5 text-[#666666]">
                <label className="text-[14px]">{t("formUsername")}</label>
                <input
                    {...register("fullname")}
                    type="text"
                    className="w-full border-b border-[#e6cfe3] py-3 text-[18px] outline-none"
                />
                {errors.fullname && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.fullname.message}
                    </p>
                )}
            </div>

            <div className="mb-7.5 text-[#666666]">
                <label className="text-[14px]"> {t("formPhone")}</label>
                <input
                    {...register("phone_number")}
                    type="text"
                    className="w-full border-b border-[#e6cfe3] py-3 text-[18px] outline-none"
                />
                {errors.phone_number && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone_number.message}
                    </p>
                )}
            </div>

            <div className="mb-7.5 text-[#666666]">
                <label className="text-[14px]">Email</label>
                <input
                    {...register("email")}
                    type="text"
                    className="w-full border-b border-[#e6cfe3] py-3 text-[18px] outline-none"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="mb-7.5 text-[#666666]">
                <label className="text-[14px]"> {t("formContent")}</label>
                <textarea
                    {...register("content")}
                    rows={3}
                    className="mt-5 w-full border border-[#e6cfe3] px-3.75 py-2.5 text-[18px] outline-none"
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative h-12 w-42.25 cursor-pointer rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-4 py-2 text-center text-white disabled:opacity-50"
                >
                    {isSubmitting ? `${t("sending")}....` : t("submitTextDone")}
                </button>
            </div>
        </form>
    );
}

export default ContactForm;
