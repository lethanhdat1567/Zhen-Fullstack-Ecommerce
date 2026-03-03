import * as z from "zod";

/* =========================
   TRANSLATION
========================= */

export const postTranslationSchema = z.object({
    language_code: z.string().min(1, "Language is required"),

    title: z.string().min(1, "Title is required"),

    slug: z.string().min(1, "Slug is required"),

    description: z.string().optional(),

    content: z.string().optional(),
});

/* =========================
   MAIN SCHEMA
========================= */

export const postSchema = z.object({
    category_id: z.string().min(1, "Category is required"),

    status: z.enum(["draft", "active", "inactive"]).default("draft"),
    thumbnail: z.string().optional(),

    translations: z
        .array(postTranslationSchema)
        .min(1, "At least one translation is required"),
});
