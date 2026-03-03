import * as z from "zod";

/* =========================
   TRANSLATION SCHEMA
========================= */

export const serviceTranslationSchema = z.object({
    language_code: z.string().min(1, "Thiếu language_code"),

    title: z.string().min(1, "Vui lòng nhập tiêu đề"),

    slug: z.string().min(1, "Vui lòng nhập slug"),

    description: z.string().optional().nullable(),

    content: z.string().optional().nullable(),
});

/* =========================
   GALLERY SCHEMA
========================= */

export const serviceGallerySchema = z.object({
    file_url: z.string().min(1, "Thiếu file_url"),

    sort_order: z.coerce.number().optional(),
});

/* =========================
   CREATE SERVICE SCHEMA
========================= */

export const createServiceSchema = z.object({
    sku: z.string().min(1, "Vui lòng nhập SKU"),

    price: z.coerce.number().optional().nullable(),

    thumbnail: z.string().optional().nullable(),

    status: z.enum(["active", "inactive"]),

    category_id: z.string().min(1, "Thiếu category_id"),

    translations: z
        .array(serviceTranslationSchema)
        .min(1, "Phải có ít nhất 1 bản dịch"),

    galleries: z.array(serviceGallerySchema).optional(),
});
