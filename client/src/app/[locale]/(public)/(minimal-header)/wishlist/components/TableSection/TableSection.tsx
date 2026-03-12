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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-112.5">{t("table.info")}</TableHead>
                    <TableHead>{t("table.price")}</TableHead>
                    <TableHead>{t("table.status")}</TableHead>
                    <TableHead className="text-right">
                        {t("table.action")}
                    </TableHead>
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
                                        {t("table.inStock")}
                                    </span>
                                ) : (
                                    <span className="text-sm font-medium text-red-500">
                                        {t("table.outStock")}
                                    </span>
                                )
                            ) : (
                                <span className="text-sm font-medium text-blue-600">
                                    {t("table.roomAvailable")}
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
                                    {t("addProductBtn")}
                                </Button>
                            )}
                            {item.type === "service" && (
                                <Link href={`/booking?id=${item.id}`}>
                                    <Button>{t("addServiceBtn")}</Button>
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
}

export default TableSection;
