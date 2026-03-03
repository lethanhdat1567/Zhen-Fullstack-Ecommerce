import * as z from "zod";

/* =========================
   TRANSLATION
========================= */

export const popupTranslationSchema = z.object({
    language_code: z.string(),

    title: z.string().min(1, "Vui lòng nhập tiêu đề"),

    content: z.string().optional(),
});

/* =========================
   MAIN SCHEMA
========================= */

export const popupSchema = z.object({
    status: z.enum(["active", "inactive"]).optional(),

    thumbnail: z.string().optional(),

    sort_order: z.coerce.number().optional(),

    translations: z
        .array(popupTranslationSchema)
        .min(1, "Cần ít nhất 1 ngôn ngữ"),
});
