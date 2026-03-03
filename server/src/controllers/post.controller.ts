import postService from "@/services/post.service";
import { Request, Response } from "express";

class PostController {
    async createPost(req: Request, res: Response) {
        const result = await postService.createPost(req.body);
        return res.success(result);
    }

    async updatePost(req: Request, res: Response) {
        const { id } = req.params;
        const result = await postService.updatePost(id as string, req.body);
        return res.success(result);
    }

    async listPosts(req: Request, res: Response) {
        const { lang, search, categorySlug, isActive, page, limit } = req.query;

        const result = await postService.listPosts({
            lang: typeof lang === "string" ? lang : undefined,
            search: typeof search === "string" ? search : undefined,
            categorySlug:
                typeof categorySlug === "string" ? categorySlug : undefined,
            isActive: isActive === "true" ? true : undefined,
            page: page as string,
            limit: limit as string,
        });

        return res.success(result);
    }

    async getDetail(req: Request, res: Response) {
        const { slug } = req.params;
        const { lang } = req.query;

        const result = await postService.getDetail(
            slug as string,
            typeof lang === "string" ? lang : undefined,
        );

        return res.success(result);
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { lang } = req.query;

            const result = await postService.getById(
                id as string,
                lang as string | undefined,
            );

            if (!result) {
                return res.status(404).error("Post not found");
            }

            return res.success(result);
        } catch (error: any) {
            return res.status(500).error(error.message);
        }
    }

    async getRelatedPosts(req: Request, res: Response) {
        const {
            lang,
            postId,
            categorySlug,
            isActive,
            limit,
            excludeIds,
            random,
        } = req.query;

        const result = await postService.getRelatedPosts({
            lang: typeof lang === "string" ? lang : undefined,
            postId: typeof postId === "string" ? postId : undefined,
            categorySlug:
                typeof categorySlug === "string" ? categorySlug : undefined,
            isActive: isActive === "true" ? true : undefined,
            limit: limit as string,
            excludeIds:
                typeof excludeIds === "string"
                    ? excludeIds.split(",").filter(Boolean)
                    : undefined,
            random: random === "true",
        });

        return res.success(result);
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        const result = await postService.deletePost(id as string);
        return res.success(result);
    }

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;

        if (!Array.isArray(ids) || !ids.length) {
            return res.error("ids must be a non-empty array");
        }

        const result = await postService.bulkDelete(ids);

        return res.success(result);
    }

    async toggleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const result = await postService.toggleStatus(id as string);

        return res.success(result);
    }
}

export default new PostController();
