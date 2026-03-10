"use client";

import TableSection from "@/app/[locale]/(public)/(header-bg)/wishlist/components/TableSection/TableSection";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/navigation";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { HeartOff } from "lucide-react";

function FavoritePage() {
    const favoriteItems = useFavoriteStore((state) => state.items);

    // Lọc dữ liệu theo loại
    const products = favoriteItems.filter((item) => item.type === "product");
    const services = favoriteItems.filter((item) => item.type === "service");

    // Hàm render bảng (tránh lặp code)

    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: "Danh sách yêu thích", href: "/favorites" },
                ]}
            />

            <div className="container mt-10">
                {favoriteItems.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-6 rounded-full bg-neutral-100 p-8 text-neutral-400">
                            <HeartOff size={64} strokeWidth={1} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                            Danh sách trống
                        </h3>
                        <Link
                            href="/"
                            className="mt-6 rounded-tl-3xl rounded-br-3xl bg-(--primary-color) px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                        >
                            KHÁM PHÁ NGAY
                        </Link>
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="w-full">
                        <div className="mb-8 flex items-center justify-between border-b pb-4">
                            <TabsList className="h-auto gap-8 bg-transparent p-0">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    Tất cả ({favoriteItems.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="products"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    Sản phẩm ({products.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="services"
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    Dịch vụ ({services.length})
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
                                <EmptyTabState msg="Không có sản phẩm nào" />
                            )}
                        </TabsContent>
                        <TabsContent value="services">
                            {services.length > 0 ? (
                                <TableSection items={services} />
                            ) : (
                                <EmptyTabState msg="Không có dịch vụ nào" />
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
