"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, LayoutGrid, Calendar, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { cartUtils } from "@/utils/cartUtils";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import { Link, useRouter } from "@/i18n/navigation";
import { formatDateWithTime } from "@/utils/formatDate";
import { useTranslations } from "next-intl";

interface OrderItem {
    product: {
        thumbnail: string;
        title: string;
        slug: string;
        category_slug: string;
    };
    quantity: number;
    price: string;
}

interface Order {
    id: string;
    total_amount: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    payment_status: string;
    created_at: string;
    order_items: OrderItem[];
}

function HistoryTable({ data }: { data: Order[] }) {
    const router = useRouter();
    const t = useTranslations("OrderHistory.table");

    return (
        <div className="rounded-md border border-slate-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-30">{t("orderId")}</TableHead>
                        <TableHead>{t("product")}</TableHead>
                        <TableHead>{t("orderDate")}</TableHead>
                        <TableHead>{t("status")}</TableHead>
                        <TableHead className="text-right">
                            {t("total")}
                        </TableHead>
                        <TableHead className="w-50 text-center">
                            {t("action")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((order) => (
                            <TableRow
                                key={order.id}
                                className="group transition-colors hover:bg-slate-50/50"
                            >
                                <TableCell className="text-muted-foreground text-xs font-medium uppercase">
                                    #{order.id.split("-")[0]}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-col gap-3">
                                        {order.order_items.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-100 shadow-sm transition-transform">
                                                        {item.product
                                                            .thumbnail ? (
                                                            <Image
                                                                src={resolveMediaSrc(
                                                                    item.product
                                                                        .thumbnail,
                                                                )}
                                                                alt={
                                                                    item.product
                                                                        .title
                                                                }
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                                                                <LayoutGrid
                                                                    size={20}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <Link
                                                            href={`/product/${item.product.category_slug}/${item.product.slug}`}
                                                            className="text-primary text-sm leading-none font-semibold hover:underline"
                                                        >
                                                            {item.product.title}
                                                        </Link>
                                                        <span className="text-muted-foreground mt-1 text-[10px] tracking-wider uppercase">
                                                            {t("quantity", {
                                                                qty: item.quantity,
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell className="text-muted-foreground text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar
                                            size={14}
                                            className="opacity-70"
                                        />
                                        {formatDateWithTime(order.created_at)}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <StatusBadge
                                            status={order.status as any}
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="text-foreground text-right font-bold">
                                    {cartUtils.formatCurrency(
                                        order.total_amount,
                                    )}
                                </TableCell>

                                <TableCell className="space-x-2 text-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            router.push(
                                                `/orders/product/${order.id}`,
                                            );
                                        }}
                                    >
                                        {t("viewDetail")}
                                        <RefreshCw size={14} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-muted-foreground h-32 text-center"
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <ShoppingBag
                                        size={24}
                                        className="opacity-20"
                                    />
                                    {t("emptyProduct")}
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default HistoryTable;
