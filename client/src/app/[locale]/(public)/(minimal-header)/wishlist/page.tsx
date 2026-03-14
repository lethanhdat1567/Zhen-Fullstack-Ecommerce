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
        <div className="mb-10 md:mb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: t("breadcrumb"), href: "/favorites" },
                ]}
                hideBanner
            />

            <div className="container mt-6 md:mt-10">
                {favoriteItems.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center md:py-20">
                        <div className="mb-4 rounded-full bg-neutral-100 p-6 text-neutral-400 md:mb-6 md:p-8">
                            <HeartOff
                                className="h-12 w-12 md:h-16 md:w-16"
                                strokeWidth={1}
                            />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-neutral-800 md:text-xl">
                            {t("empty")}
                        </h3>
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="w-full">
                        <div className="mb-6 flex items-center justify-between border-b pb-0 md:mb-8 md:pb-4">
                            <TabsList className="scrollbar-hide flex h-auto w-full justify-start gap-6 overflow-x-auto overflow-y-hidden bg-transparent p-0 md:gap-8">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-none bg-transparent px-0 pb-2 text-sm whitespace-nowrap shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color) md:text-base"
                                >
                                    {t("all")} ({favoriteItems.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="products"
                                    className="rounded-none bg-transparent px-0 pb-2 text-sm whitespace-nowrap shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color) md:text-base"
                                >
                                    {t("product")} ({products.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="services"
                                    className="rounded-none bg-transparent px-0 pb-2 text-sm whitespace-nowrap shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color) md:text-base"
                                >
                                    {t("service")} ({services.length})
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent
                            value="all"
                            className="mt-0 overflow-x-auto"
                        >
                            <TableSection items={favoriteItems} />
                        </TabsContent>
                        <TabsContent
                            value="products"
                            className="mt-0 overflow-x-auto"
                        >
                            {products.length > 0 ? (
                                <TableSection items={products} />
                            ) : (
                                <EmptyTabState msg={t("emptyProduct")} />
                            )}
                        </TabsContent>
                        <TabsContent
                            value="services"
                            className="mt-0 overflow-x-auto"
                        >
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

function EmptyTabState({ msg }: { msg: string }) {
    return (
        <div className="rounded-lg border border-dashed py-12 text-center text-sm text-neutral-500 italic md:py-20 md:text-base">
            {msg}
        </div>
    );
}

export default FavoritePage;
