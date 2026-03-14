import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { resolveMediaSrc } from "@/lib/image";
import { cartUtils } from "@/utils/cartUtils";
import Image from "next/image";
import { FavoriteItem } from "@/services/favoriteService";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useCartStore } from "@/store/useCartStore";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

function TableSection({ items }: { items: FavoriteItem[] }) {
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
    const addItem = useCartStore((state) => state.addItem);
    const t = useTranslations("Wishlist");

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px] md:min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px] text-sm md:w-112.5 md:text-base">
                            {t("table.info")}
                        </TableHead>
                        <TableHead className="text-sm md:text-base">
                            {t("table.price")}
                        </TableHead>
                        <TableHead className="text-sm md:text-base">
                            {t("table.status")}
                        </TableHead>
                        <TableHead className="text-right text-sm md:text-base">
                            {t("table.action")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={`${item.type}-${item.id}`}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border md:h-20 md:w-20">
                                        <Image
                                            src={resolveMediaSrc(
                                                item.thumbnail,
                                            )}
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
                                        className="line-clamp-2 text-sm transition-colors hover:text-(--primary-color) md:text-base"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-(--primary-color) md:text-base">
                                        {cartUtils.formatCurrency(
                                            item?.sale_price ||
                                                item?.price ||
                                                0,
                                        )}
                                    </span>
                                    {item.sale_price && (
                                        <span className="text-[10px] text-neutral-400 line-through md:text-xs">
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
                                        <span className="text-xs font-medium text-green-600 md:text-sm">
                                            {t("table.inStock")}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-medium text-red-500 md:text-sm">
                                            {t("table.outStock")}
                                        </span>
                                    )
                                ) : (
                                    <span className="text-xs font-medium text-blue-600 md:text-sm">
                                        {t("table.roomAvailable")}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex flex-col items-end gap-2 md:flex-row md:justify-end md:gap-4">
                                    {item.type === "product" && (
                                        <Button
                                            size="sm"
                                            className="h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm"
                                            onClick={async () => {
                                                await addItem(
                                                    item.id,
                                                    1,
                                                    item.stock as number,
                                                );
                                            }}
                                        >
                                            {t("addProductBtn")}
                                        </Button>
                                    )}
                                    {item.type === "service" && (
                                        <Link href={`/booking?id=${item.id}`}>
                                            <Button
                                                size="sm"
                                                className="h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm"
                                            >
                                                {t("addServiceBtn")}
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleFavorite(item)}
                                        className="h-8 w-8 text-neutral-400 hover:bg-red-50 hover:text-red-500 md:h-10 md:w-10"
                                    >
                                        <Trash2
                                            size={18}
                                            className="md:size-5"
                                        />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableSection;
