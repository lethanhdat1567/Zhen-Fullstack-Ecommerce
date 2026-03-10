import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingHistory } from "@/services/orderHistoryService";
import { paymentStatusMap } from "@/app/[locale]/(public)/(header-bg)/orders/helpers";
import { ChevronRight } from "lucide-react";
import { resolveMediaSrc } from "@/lib/image";
import { formatDate, formatDateWithTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import { Link } from "@/i18n/navigation";

type Props = {
    booking: BookingHistory;
};

function CardItem({ booking }: Props) {
    const paymentStatus = paymentStatusMap[booking.payment_status];

    return (
        <TableRow className="hover:bg-muted/40 transition">
            {/* Booking ID */}
            <TableCell className="min-w-30">
                <p
                    className="max-w-30 truncate font-semibold"
                    title={booking.id}
                >
                    {booking.id}
                </p>

                <p className="text-muted-foreground text-xs">
                    {formatDateWithTime(booking.created_at)}
                </p>
            </TableCell>

            {/* Service */}
            <TableCell>
                <div className="flex items-center gap-3">
                    <Image
                        src={resolveMediaSrc(booking.service.thumbnail)}
                        alt={booking.service.title}
                        width={56}
                        height={56}
                        className="rounded-md border object-cover"
                    />

                    <p className="line-clamp-1 font-medium">
                        {booking.service.title}
                    </p>
                </div>
            </TableCell>

            {/* Check-in/out */}
            <TableCell>
                <div className="text-sm">
                    <p>{formatDate(booking.check_in)}</p>
                    <p className="text-muted-foreground">
                        → {formatDate(booking.check_out)}
                    </p>
                </div>
            </TableCell>

            {/* Price */}
            <TableCell className="text-right font-medium">
                {formatPrice(booking.total_price)}
            </TableCell>

            {/* Status */}
            <TableCell>
                <StatusBadge status={booking.status} />
            </TableCell>

            {/* Payment */}
            <TableCell>
                <Badge>{paymentStatus}</Badge>
            </TableCell>

            {/* Action */}
            <TableCell className="text-right">
                <Link href={`/orders/service/${booking.id}`}>
                    <Button variant="outline">
                        Xem chi tiết <ChevronRight />
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    );
}

export default CardItem;
