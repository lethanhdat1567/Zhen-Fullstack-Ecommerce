import { Prisma } from "@prisma/client";

export interface ListQuery {
    search?: string;
    lang?: string;
    categorySlug?: string;
    isActive?: boolean;

    minPrice?: string;
    maxPrice?: string;

    sort?: "latest" | "oldest" | "price_asc" | "price_desc" | "best_seller";

    page?: string;
    limit?: string;
}

export class QueryBuilder {
    private where: any = {};
    private orderBy: any = { created_at: "desc" };

    constructor(private query: ListQuery) {}

    /* =========================
     CATEGORY SCOPE
  ========================= */

    category() {
        const { categorySlug, lang } = this.query;

        if (!categorySlug) return this;

        this.where.category = {
            translations: {
                some: {
                    slug: categorySlug,
                    ...(lang && {
                        language: { code: lang },
                    }),
                },
            },
        };

        return this;
    }

    /* =========================
     SEARCH
  ========================= */

    search() {
        const { search, lang } = this.query;

        if (!search) return this;

        this.where.translations = {
            some: {
                ...(lang && {
                    language: { code: lang },
                }),
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        slug: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        };

        return this;
    }

    /* =========================
     PRICE FILTER
  ========================= */

    price() {
        const { minPrice, maxPrice } = this.query;

        if (!minPrice && !maxPrice) return this;

        this.where.price = {
            ...(minPrice && { gte: Number(minPrice) }),
            ...(maxPrice && { lte: Number(maxPrice) }),
        };

        return this;
    }

    /* =========================
     STATUS
  ========================= */

    status() {
        const { isActive } = this.query;

        if (!isActive) return this;

        this.where.status = "active";

        return this;
    }

    /* =========================
     SORT
  ========================= */

    sort() {
        const { sort } = this.query;

        switch (sort) {
            case "price_asc":
                this.orderBy = { price: "asc" };
                break;

            case "price_desc":
                this.orderBy = { price: "desc" };
                break;

            case "oldest":
                this.orderBy = { created_at: "asc" };
                break;

            case "best_seller":
                this.orderBy = {
                    order_items: {
                        _count: "desc",
                    },
                };
                break;

            case "latest":
            default:
                this.orderBy = { created_at: "desc" };
        }

        return this;
    }

    /* =========================
     BUILD
  ========================= */

    build() {
        return {
            where: this.where,
            orderBy: this.orderBy,
        };
    }
}
