"use client";

import AutoBanner from "@/components/Auto/AutoBanner";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/navigation";
import { resolveMediaSrc } from "@/lib/image";
import { useCartStore } from "@/store/useCartStore";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { cartUtils } from "@/utils/cartUtils";
import { HeartOff, Trash2 } from "lucide-react";
import Image from "next/image";

function FavoritePage() {
    const favoriteItems = useFavoriteStore((state) => state.items);
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
    const addItem = useCartStore((state) => state.addItem);

    // Lọc dữ liệu theo loại
    const products = favoriteItems.filter((item) => item.type === "product");
    const services = favoriteItems.filter((item) => item.type === "service");

    // Hàm render bảng (tránh lặp code)
    const renderTable = (items: typeof favoriteItems) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-112.5">Thông tin</TableHead>
                    <TableHead>Đơn giá</TableHead>
                    <TableHead>Tình trạng</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={`${item.type}-${item.id}`}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                        src={resolveMediaSrc(item.thumbnail)}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <Link
                                    href={
                                        item.type === "product"
                                            ? `/product/${item.slug}`
                                            : `/service/${item.slug}`
                                    }
                                    className="line-clamp-2 transition-colors hover:text-(--primary-color)"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-semibold text-(--primary-color)">
                                    {cartUtils.formatCurrency(
                                        item?.sale_price || item?.price || 0,
                                    )}
                                </span>
                                {item.sale_price && (
                                    <span className="text-xs text-neutral-400 line-through">
                                        {cartUtils.formatCurrency(
                                            item.price || 0,
                                        )}
                                    </span>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            {item.type === "product" ? (
                                item.stock && item.stock > 0 ? (
                                    <span className="text-sm font-medium text-green-600">
                                        Còn hàng
                                    </span>
                                ) : (
                                    <span className="text-sm font-medium text-red-500">
                                        Hết hàng
                                    </span>
                                )
                            ) : (
                                <span className="text-sm font-medium text-blue-600">
                                    Còn phòng
                                </span>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            {item.type === "product" && (
                                <Button
                                    onClick={async () => {
                                        await addItem(
                                            item.id,
                                            1,
                                            item.stock as number,
                                        );
                                    }}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            )}
                            {item.type === "service" && (
                                <Link href={`/booking?id=${item.id}`}>
                                    <Button>Đặt phòng</Button>
                                </Link>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFavorite(item)}
                                className="text-neutral-400 hover:bg-red-50 hover:text-red-500"
                            >
                                <Trash2 size={20} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

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
                            {renderTable(favoriteItems)}
                        </TabsContent>
                        <TabsContent value="products">
                            {products.length > 0 ? (
                                renderTable(products)
                            ) : (
                                <EmptyTabState msg="Không có sản phẩm nào" />
                            )}
                        </TabsContent>
                        <TabsContent value="services">
                            {services.length > 0 ? (
                                renderTable(services)
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
