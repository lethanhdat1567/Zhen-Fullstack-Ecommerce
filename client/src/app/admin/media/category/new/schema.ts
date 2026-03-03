import * as z from "zod";

/* =========================
   TRANSLATION
========================= */

export const mediaCategoryTranslationSchema = z.object({
    language_code: z.string().min(1, "Language is required"),

    name: z.string().min(1, "Name is required"),

    slug: z.string().min(1, "Slug is required"),
});

/* =========================
   MAIN SCHEMA
========================= */

export const mediaCategorySchema = z.object({
    status: z.enum(["active", "inactive"]),

    translations: z
        .array(mediaCategoryTranslationSchema)
        .min(1, "At least one translation is required"),
});
