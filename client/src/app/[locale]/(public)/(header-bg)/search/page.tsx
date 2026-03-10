"use client";

import PostCard from "@/app/[locale]/(public)/(header-bg)/search/components/PostCard/PostCard";
import ProductCard from "@/app/[locale]/(public)/(header-bg)/search/components/ProductCard/ProductCard";
import SearchInput from "@/app/[locale]/(public)/(header-bg)/search/components/SearchInput/SearchInput";
import ServiceCard from "@/app/[locale]/(public)/(header-bg)/search/components/ServiceCard/ServiceCard";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "@/i18n/navigation";
import { searchService } from "@/services/searchService";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type TranslationFields = {
    title: string;
    slug: string;
    description: string;
};

export type Product = {
    id: string;
    category_id: string;
    price: string;
    sale_price: string | null;
    stock: number;
    thumbnail: string | null;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
} & TranslationFields;

export type Service = {
    id: string;
    category_id: string;
    capacity: number;
    price: string;
    sale_price: string | null;
    thumbnail: string | null;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
} & TranslationFields;

export type Post = {
    id: string;
    category_id: string;
    author_id: string | null;
    status: "active" | "inactive";
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
} & TranslationFields;

export type SearchDataType = {
    products: Product[];
    services: Service[];
    posts: Post[];
};

function SearchPage() {
    const locale = useLocale();
    const router = useRouter();
    const params = useSearchParams();
    const q = params.get("q");
    const tab = params.get("tab");

    const [searchData, setSearchData] = useState<SearchDataType | null>(null);
    const [searchValue, setSearchValue] = useState(q || "");
    const searchDebounce = useDebounce(searchValue, 500);
    const [tabValue, setTabValue] = useState(tab || "product");
    const [loading, setLoading] = useState(false);

    const fetchSearchData = async () => {
        try {
            setLoading(true);
            const res = await searchService.search({
                lang: locale,
                q: searchDebounce,
            });
            console.log(res);

            setSearchData(res as any);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSearchData();
        router.replace(`?q=${searchDebounce}&tab=${tab}`, { scroll: false });
    }, [searchDebounce, locale]);

    if (!searchData) return null;

    return (
        <div className="py-20">
            <div className="mx-auto w-2xl">
                <div className="text-center">
                    <h1 className="mb-3 text-4xl font-bold">Tìm Kiếm</h1>
                    <p className="mb-4 text-sm text-neutral-800">
                        Tìm kiếm dịch vụ hoặc sản phẩm bạn yêu thích!.
                    </p>
                    <SearchInput
                        value={searchValue}
                        onChange={(value) => setSearchValue(value)}
                        loading={loading}
                    />
                </div>
                <Tabs
                    defaultValue="product"
                    className="mt-4 w-full"
                    value={tabValue}
                    onValueChange={setTabValue}
                >
                    <TabsList className="h-auto gap-8 bg-transparent p-0">
                        <TabsTrigger
                            value="product"
                            className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                        >
                            Sản phẩm
                        </TabsTrigger>
                        <TabsTrigger
                            value="service"
                            className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                        >
                            Dịch vụ
                        </TabsTrigger>
                        <TabsTrigger
                            value="post"
                            className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                        >
                            Tin tức
                        </TabsTrigger>
                    </TabsList>
                    <Separator className="my-2" />
                    {loading ? (
                        <div className="text-center text-sm text-neutral-800">
                            Đang tìm kiếm...
                        </div>
                    ) : (
                        <>
                            <TabsContent value="product">
                                <div className="space-y-4">
                                    {searchData.products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}

                                    {searchData.products.length === 0 &&
                                        searchValue && (
                                            <div className="text-center text-sm text-neutral-800">
                                                Không tìm thấy kết quả
                                            </div>
                                        )}
                                </div>
                            </TabsContent>
                            <TabsContent value="service">
                                <div className="space-y-4">
                                    {searchData.services.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                        />
                                    ))}

                                    {searchData.services.length === 0 &&
                                        searchValue && (
                                            <div className="text-center text-sm text-neutral-800">
                                                Không tìm thấy kết quả
                                            </div>
                                        )}
                                </div>
                            </TabsContent>

                            <TabsContent value="post">
                                <div className="space-y-4">
                                    {searchData.posts.map((post) => (
                                        <PostCard key={post.id} post={post} />
                                    ))}

                                    {searchData.posts.length === 0 &&
                                        searchValue && (
                                            <div className="text-center text-sm text-neutral-800">
                                                Không tìm thấy kết quả
                                            </div>
                                        )}
                                </div>
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </div>
        </div>
    );
}

export default SearchPage;
