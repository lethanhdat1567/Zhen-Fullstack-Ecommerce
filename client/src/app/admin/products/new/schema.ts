import * as z from "zod";

/* =========================
   TRANSLATION
========================= */

export const productTranslationSchema = z.object({
    language_code: z.string().min(1, "Language is required"),

    title: z.string().min(1, "Title is required"),

    slug: z.string().min(1, "Slug is required"),

    description: z.string().optional(),

    content: z.string().optional(),
});

export const productGallerySchema = z.object({
    id: z.string().optional(),
    file_url: z.string().min(1),
    sort_order: z.number().optional(),
});

/* =========================
   MAIN SCHEMA
========================= */

export const productSchema = z.object({
    category_id: z.string().min(1, "Category is required"),

    // dùng coerce để nhận cả string từ input
    price: z.coerce.number().min(0, "Price must be >= 0").optional(),

    sale_price: z.coerce.number().min(0).optional(),

    stock: z.coerce.number().min(0, "Stock must be >= 0"),

    thumbnail: z.string().optional(),

    status: z.enum(["active", "inactive", "draft"]).default("draft"),

    translations: z
        .array(productTranslationSchema)
        .min(1, "At least one translation is required"),

    galleries: z.array(productGallerySchema).optional(),
});
