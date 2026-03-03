import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type PostQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    lang?: string;
    categorySlug?: string;
    status?: string;
    isActive?: boolean;
};

export type PostTranslationPayload = {
    languageCode: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    thumbnail?: string;
};

export type PostPayload = {
    categoryId: string;
    status?: "active" | "inactive";
    translations: PostTranslationPayload[];
};

export type Post = {
    id: string;
    status: string;
    created_at: string;
    updated_at: string;

    category?: {
        id: string;
        name?: string;
        slug?: string;
    };

    translations?: {
        id: string;
        title: string;
        slug: string;
        description?: string;
        content?: string;
        thumbnail?: string;
        language: {
            code: string;
        };
    }[];
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

export type RelatedPostQueryParams = {
    lang: string;
    postId?: string;
    categorySlug?: string;
    limit?: number;
    isActive?: boolean;
    excludeIds?: string[];
    random?: boolean;
};

/* =========================
   SERVICE
========================= */

export const postService = {
    async create(payload: PostPayload) {
        const res = await http.post<ApiResponse<Post>>("/posts", payload);
        return res.data;
    },

    async update(id: string, payload: PostPayload) {
        const res = await http.put<ApiResponse<Post>>(`/posts/${id}`, payload);
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Post>>(
            `/posts/${id}/toggle-status`,
        );
        return res.data;
    },

    async list(params?: PostQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);
        if (params?.categorySlug)
            query.append("categorySlug", params.categorySlug);
        if (params?.status) query.append("status", params.status);
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString ? `/posts?${queryString}` : "/posts";

        const res = await http.get<ApiResponse<any>>(url, {
            cache: "no-cache",
        });

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<Post>>(`/posts/${id}${query}`);
        return res.data;
    },

    async getDetail(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";

        const res = await http.get<ApiResponse<{ items: Post }>>(
            `/posts/slug/${slug}${query}`,
        );

        return res.data;
    },

    async getRelated(params: RelatedPostQueryParams) {
        const query = new URLSearchParams();

        query.append("lang", params.lang);

        if (params.postId) query.append("postId", params.postId);
        if (params.categorySlug)
            query.append("categorySlug", params.categorySlug);
        if (params.limit) query.append("limit", String(params.limit));
        if (typeof params.isActive === "boolean")
            query.append("isActive", String(params.isActive));
        if (params.excludeIds?.length)
            query.append("excludeIds", params.excludeIds.join(","));
        if (params.random) query.append("random", "true");

        const res = await http.get<ApiResponse<Post[]>>(
            `/posts/related?${query.toString()}`,
            { cache: "no-cache" },
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/posts/${id}`);
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/posts/bulk",
            {
                ids,
            },
        );

        return res.data;
    },
};
