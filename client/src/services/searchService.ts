import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type SearchSuggestParams = {
    q?: string;
    lang?: string;
};

export type SearchParams = {
    q?: string;
    lang?: string;
    page?: number;
    limit?: number;
};

export type SearchItem = {
    id: string;
    thumbnail?: string;
    created_at: string;

    translations?: {
        title?: string;
        slug?: string;
        description?: string;
    }[];
};

export type SearchSuggestResult = {
    products: SearchItem[];
    services: SearchItem[];
    posts: SearchItem[];
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const searchService = {
    /* =========================
       HEADER SEARCH SUGGEST
    ========================= */
    async suggest(params?: SearchSuggestParams) {
        const query = new URLSearchParams();

        if (params?.q) query.append("q", params.q);
        if (params?.lang) query.append("lang", params.lang);

        const queryString = query.toString();
        const url = queryString
            ? `/search/suggest?${queryString}`
            : "/search/suggest";

        const res = await http.get<ApiResponse<SearchSuggestResult>>(url, {
            cache: "no-cache",
        });

        return res.data;
    },

    /* =========================
       FULL SEARCH PAGE
    ========================= */
    async search(params?: SearchParams) {
        const query = new URLSearchParams();

        if (params?.q) query.append("q", params.q);
        if (params?.lang) query.append("lang", params.lang);
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));

        const queryString = query.toString();
        const url = queryString ? `/search?${queryString}` : "/search";

        const res = await http.get<ApiResponse<SearchSuggestResult>>(url, {
            cache: "no-cache",
        });

        return res.data;
    },
};
