import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type ProductQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    lang?: string;
    categorySlug?: string;
    isActive?: boolean;
};

export type ProductTranslationPayload = {
    language_code: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
};

export type ProductPayload = {
    category_id: string;
    price: number;
    sale_price?: number;
    stock: number;
    thumbnail?: string;
    status?: "active" | "inactive" | "draft";
    translations: ProductTranslationPayload[];
    galleries?: string[];
};

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type ListProductResponse = {
    items: Product[];
    pagination: Pagination;
};

export type Product = {
    id: string;
    price: string;
    sku: string;
    slug: string;
    sale_price?: string;
    content: string;
    stock: number;
    thumbnail?: string;
    status: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    category: {
        id: string;
        name: string;
        translations: {
            name: string;
            slug: string;
            language: {
                code: string;
            };
        }[];
    };
    translations?: {
        id: string;
        title: string;
        slug: string;
        description?: string;
        content?: string;
        language: {
            code: string;
        };
    }[];
    galleries?: {
        id: string;
        image: string;
        sort_order: number;
    }[];
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

export type RelatedProductQueryParams = {
    lang: string; // bắt buộc
    productId?: string;
    categorySlug?: string;
    limit?: number;
    isActive?: boolean;
    excludeIds?: string[];
    random?: boolean;
};

export type RelatedProduct = {
    id: string;
    title: string | null;
    slug: string | null;
    description?: string | null;
    thumbnail?: string | null;
    price: number;
    sale_price?: number | null;
    stock: number;
    created_at: string;
    category?: {
        id: string;
        name: string | null;
    } | null;
};

/* =========================
   SERVICE
========================= */

export const productService = {
    async create(payload: ProductPayload) {
        const res = await http.post<ApiResponse<Product>>("/products", payload);
        return res.data;
    },

    async update(id: string, payload: ProductPayload) {
        const res = await http.put<ApiResponse<Product>>(
            `/products/${id}`,
            payload,
        );
        return res.data;
    },

    async toggleStatus(id: string) {
        const res = await http.patch<ApiResponse<Product>>(
            `/products/${id}/toggle-status`,
        );
        return res.data;
    },

    async list(params?: ProductQueryParams) {
        const query = new URLSearchParams();

        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.lang) query.append("lang", params.lang);
        if (params?.categorySlug)
            query.append("categorySlug", params.categorySlug);
        if (typeof params?.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        const queryString = query.toString();
        const url = queryString ? `/products?${queryString}` : "/products";

        const res = await http.get<ApiResponse<ListProductResponse>>(url);

        return res.data;
    },

    async getById(id: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<Product>>(
            `/products/${id}${query}`,
        );
        return res.data;
    },

    async getBySlug(slug: string, lang?: string) {
        const query = lang ? `?lang=${lang}` : "";
        const res = await http.get<ApiResponse<Product>>(
            `/products/slug/${slug}${query}`,
        );
        return res.data;
    },

    async getRelatedProducts(params: RelatedProductQueryParams) {
        const query = new URLSearchParams();

        query.append("lang", params.lang);

        if (params.productId) query.append("productId", params.productId);

        if (params.categorySlug)
            query.append("categorySlug", params.categorySlug);

        if (params.limit) query.append("limit", String(params.limit));

        if (typeof params.isActive === "boolean")
            query.append("isActive", String(params.isActive));

        if (params.excludeIds?.length)
            query.append("excludeIds", params.excludeIds.join(","));

        if (params.random) query.append("random", "true");

        const res = await http.get<ApiResponse<RelatedProduct[]>>(
            `/products/related?${query.toString()}`,
            { cache: "no-cache" },
        );

        return res.data;
    },

    async delete(id: string) {
        const res = await http.delete<ApiResponse<null>>(`/products/${id}`);
        return res.data;
    },

    async bulkDelete(ids: string[]) {
        const res = await http.delete<ApiResponse<{ deletedCount: number }>>(
            "/products/bulk",
            {
                ids,
            },
        );
        return res.data;
    },
};
