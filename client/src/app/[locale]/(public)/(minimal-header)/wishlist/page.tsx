"use client";

import TableSection from "@/app/[locale]/(public)/(minimal-header)/wishlist/components/TableSection/TableSection";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { HeartOff } from "lucide-react";
import { useTranslations } from "next-intl";

function FavoritePage() {
    const favoriteItems = useFavoriteStore((state) => state.items);
    const products = favoriteItems.filter((item) => item.type === "product");
    const services = favoriteItems.filter((item) => item.type === "service");

    const t = useTranslations("Wishlist");

    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: t("breadcrumb"), href: "/favorites" },
                ]}
                hideBanner
            />

            <div className="container mt-10">
                {favoriteItems.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-6 rounded-full bg-neutral-100 p-8 text-neutral-400">
                            <HeartOff size={64} strokeWidth={1} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                            {t("empty")}
                        </h3>
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="w-full">
                        <div className="mb-8 flex items-center justify-between border-b pb-4">
                            <TabsList className="h-auto gap-8 bg-transparent p-0">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    {t("all")} ({favoriteItems.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="products"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    {t("product")} ({products.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="services"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    {t("service")} ({services.length})
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="all">
                            <TableSection items={favoriteItems} />
                        </TabsContent>
                        <TabsContent value="products">
                            {products.length > 0 ? (
                                <TableSection items={products} />
                            ) : (
                                <EmptyTabState msg={t("emptyProduct")} />
                            )}
                        </TabsContent>
                        <TabsContent value="services">
                            {services.length > 0 ? (
                                <TableSection items={services} />
                            ) : (
                                <EmptyTabState msg={t("emptyService")} />
                            )}
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
}

// Component phụ cho trạng thái Tab trống
function EmptyTabState({ msg }: { msg: string }) {
    return (
        <div className="rounded-lg border border-dashed py-20 text-center text-neutral-500 italic">
            {msg}
        </div>
    );
}

export default FavoritePage;
