import * as z from "zod";

export const mediaAlbumSchema = z.object({
    category_id: z.string().min(1, "Category is required"),

    thumbnail: z.string().min(1, "Thumbnail is required").optional(),

    galleries: z
        .array(
            z.object({
                id: z.string(),
                type: z.enum(["image", "video"]),
                file_url: z.string().min(1, "File is required"),
                sort_order: z.number(),
            }),
        )
        .min(1, "At least one media item is required"),

    translations: z
        .array(
            z.object({
                language_code: z.string().min(1, "Language is required"),
                title: z.string().min(1, "Title is required"),
                slug: z.string().min(1, "Slug is required"),
                description: z.string().optional(),
            }),
        )
        .min(1, "At least one translation is required"),
});
