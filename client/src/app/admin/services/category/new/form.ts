import * as z from "zod";

const LANGUAGES = ["vi", "en", "fr"] as const;

export const translationSchema = z.object({
    language_code: z.enum(LANGUAGES),

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be at most 100 characters"),

    slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .max(150, "Slug must be at most 150 characters"),
});

export const createServiceSchema = z.object({
    status: z.enum(["active", "inactive"]),

    translations: z
        .array(translationSchema)
        .length(3, "Must have exactly 3 translations")
        .refine((translations) => {
            const codes = translations.map((t) => t.language_code);
            return LANGUAGES.every((lang) => codes.includes(lang));
        }, "Missing required languages"),
});
