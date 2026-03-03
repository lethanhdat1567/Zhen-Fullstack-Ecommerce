import * as z from "zod";

/* =========================
   TRANSLATION
========================= */

export const recruitmentTranslationSchema = z.object({
    language_code: z.string(),

    title: z.string().optional(),
});

/* =========================
   MAIN SCHEMA
========================= */

export const recruitmentSchema = z.object({
    address: z.string().optional(),

    quantity: z.coerce.number().optional(),

    status: z.enum(["active", "inactive"]).default("active"),

    translations: z.array(recruitmentTranslationSchema),
});
