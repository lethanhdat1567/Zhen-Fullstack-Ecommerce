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
import { LayoutGrid, ChevronRight } from "lucide-react";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { cartUtils } from "@/utils/cartUtils";
import { format } from "date-fns";
import { vi, enUS, fr } from "date-fns/locale";
import { Link, useRouter } from "@/i18n/navigation";
import { formatDateWithTime } from "@/utils/formatDate";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import { useLocale, useTranslations } from "next-intl";

interface Booking {
    id: string;
    status: string;
    payment_status: string;
    check_in: string;
    check_out: string;
    total_price: string;
    created_at: string;
    service: {
        id: string;
        category_slug: string;
        thumbnail: string | null;
        title: string;
        slug: string;
    };
}

function HistoryServiceTable({ bookings }: { bookings: Booking[] }) {
    const router = useRouter();
    const t = useTranslations("OrderHistory.table");
    const locale = useLocale();

    // Map next-intl locale to date-fns locale
    const getDateFnsLocale = () => {
        switch (locale) {
            case "vi":
                return vi;
            case "fr":
                return fr;
            default:
                return enUS;
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-30">{t("bookingId")}</TableHead>
                        <TableHead>{t("service")}</TableHead>
                        <TableHead>{t("time")}</TableHead>
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
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <TableRow key={booking.id} className="group">
                                <TableCell className="text-muted-foreground text-xs font-medium uppercase">
                                    #{booking.id.split("-")[0]}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border">
                                            {booking.service.thumbnail ? (
                                                <Image
                                                    src={resolveMediaSrc(
                                                        booking.service
                                                            .thumbnail,
                                                    )}
                                                    alt={booking.service.title}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                                                    <LayoutGrid size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <Link
                                                href={`/service/${booking.service.category_slug}/${booking.service.slug}`}
                                                className="text-primary leading-none font-semibold hover:underline"
                                            >
                                                {booking.service.title}
                                            </Link>
                                            <span className="text-muted-foreground mt-1 text-[10px] tracking-wider">
                                                {booking.service.slug}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground flex flex-col text-xs">
                                        <span>
                                            <b className="text-foreground">
                                                In:{" "}
                                            </b>
                                            {formatDateWithTime(
                                                booking.created_at,
                                            )}
                                        </span>
                                        <span>
                                            <b className="text-foreground">
                                                Out:{" "}
                                            </b>
                                            {format(
                                                new Date(booking.check_out),
                                                "dd/MM HH:mm",
                                                { locale: getDateFnsLocale() },
                                            )}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {format(
                                        new Date(booking.created_at),
                                        "dd/MM/yyyy",
                                        { locale: getDateFnsLocale() },
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <StatusBadge
                                            status={booking.status as any}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="text-foreground text-right font-bold">
                                    {cartUtils.formatCurrency(
                                        booking.total_price,
                                    )}
                                </TableCell>
                                <TableCell className="space-x-2 text-center">
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            router.push(
                                                `/orders/service/${booking.id}`,
                                            );
                                        }}
                                    >
                                        {t("viewDetail")}
                                        <ChevronRight />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-muted-foreground h-32 text-center"
                            >
                                {t("emptyService")}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default HistoryServiceTable;
