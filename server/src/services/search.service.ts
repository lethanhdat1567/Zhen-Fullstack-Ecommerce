import { prisma } from "@/lib/prisma";

interface SearchSuggestQuery {
    q?: string;
    lang?: string;
}

interface SearchQuery extends SearchSuggestQuery {
    page?: number;
    limit?: number;
}

class SearchService {
    private async getLanguageId(lang?: string): Promise<string | undefined> {
        const language = await prisma.languages.findUnique({
            where: { code: lang || "vi" },
            select: { id: true },
        });
        return language?.id;
    }

    /**
     * TỐI ƯU TÌM KIẾM:
     * 1. Chấp nhận 1 chữ cái.
     * 2. Tách cụm từ thành các từ đơn để tìm "thoáng" hơn.
     */
    private buildSearchCondition(languageId: string | undefined, q: string) {
        const searchTerm = q.trim();
        // Tách từ: "máy t" -> ["máy", "t"]
        const keywords = searchTerm.split(/\s+/).filter(Boolean);

        return {
            some: {
                language_id: languageId,
                // Dùng OR giữa các từ: Chỉ cần dính 1 từ là ra kết quả
                // Nếu muốn chặt chẽ (phải chứa đủ các từ) thì đổi OR này thành AND
                OR: keywords.map((word) => ({
                    OR: [
                        { title: { contains: word } },
                        { slug: { contains: word } },
                        { description: { contains: word } },
                        { content: { contains: word } },
                    ],
                })),
            },
        };
    }

    /* =========================
      HEADER SEARCH (SUGGEST)
    ========================= */
    async suggest(query: SearchSuggestQuery) {
        const { q, lang = "vi" } = query;

        // ĐÃ SỬA: Chấp nhận search từ 1 ký tự trở lên
        if (!q || q.trim().length < 1) {
            return { products: [], services: [], posts: [] };
        }

        const languageId = await this.getLanguageId(lang);
        const searchCondition = this.buildSearchCondition(languageId, q);

        const [products, services, posts] = await Promise.all([
            prisma.products.findMany({
                where: { status: "active", translations: searchCondition },
                take: 5,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
            prisma.services.findMany({
                where: { status: "active", translations: searchCondition },
                take: 5,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
            prisma.posts.findMany({
                where: { status: "active", translations: searchCondition },
                take: 5,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
        ]);

        return { products, services, posts };
    }

    /* =========================
      FULL SEARCH
    ========================= */
    async search(query: SearchQuery) {
        const { q, lang = "vi", page = 1, limit = 10 } = query;

        // ĐÃ SỬA: Chấp nhận search từ 1 ký tự trở lên
        if (!q || q.trim().length < 1) {
            return { products: [], services: [], posts: [] };
        }

        const languageId = await this.getLanguageId(lang);
        const skip = (page - 1) * limit;
        const searchCondition = this.buildSearchCondition(languageId, q);

        const [products, services, posts] = await Promise.all([
            prisma.products.findMany({
                where: { status: "active", translations: searchCondition },
                skip,
                take: limit,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
            prisma.services.findMany({
                where: { status: "active", translations: searchCondition },
                skip,
                take: limit,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
            prisma.posts.findMany({
                where: { status: "active", translations: searchCondition },
                skip,
                take: limit,
                orderBy: { created_at: "desc" },
                include: this.getTranslationInclude(languageId),
            }),
        ]);

        return { products, services, posts };
    }

    private getTranslationInclude(languageId: string | undefined) {
        return {
            translations: {
                where: { language_id: languageId },
                select: { title: true, slug: true, description: true },
            },
        };
    }
}

export const searchService = new SearchService();
