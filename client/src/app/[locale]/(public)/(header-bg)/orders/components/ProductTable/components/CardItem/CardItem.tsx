import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { resolveMediaSrc } from "@/lib/image";
import { OrderHistory } from "@/services/orderHistoryService";
import { ChevronRight } from "lucide-react";
import { formatDateWithTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import { Link } from "@/i18n/navigation";

type Props = {
    order: OrderHistory;
};

function CardItem({ order }: Props) {
    const firstItem = order.order_items[0];
    const moreCount = order.order_items.length - 1;

    return (
        <TableRow className="hover:bg-muted/40 transition">
            {/* Order ID */}
            <TableCell className="min-w-30">
                <p className="max-w-25 truncate font-semibold" title={order.id}>
                    {order.id}
                </p>

                <p className="text-muted-foreground text-xs">
                    {formatDateWithTime(order.created_at)}
                </p>
            </TableCell>

            {/* Product */}
            <TableCell>
                <div className="flex items-center gap-3">
                    <Image
                        src={resolveMediaSrc(firstItem.product.thumbnail)}
                        alt={firstItem.product.title}
                        width={56}
                        height={56}
                        className="rounded-md border object-cover"
                    />

                    <div className="space-y-1">
                        <p className="line-clamp-1 font-medium">
                            {firstItem.product.title}
                        </p>

                        <p className="text-muted-foreground text-xs">
                            SL: {firstItem.quantity}
                            {moreCount > 0 && ` • +${moreCount} sản phẩm`}
                        </p>
                    </div>
                </div>
            </TableCell>

            {/* Total */}
            <TableCell className="text-right font-medium">
                {formatPrice(order.total_amount)}
            </TableCell>

            {/* Status */}
            <TableCell>
                <StatusBadge status={order.status} />
            </TableCell>

            {/* Action */}
            <TableCell className="text-right">
                <Link href={`/orders/product/${order.id}`}>
                    <Button variant="outline">
                        Xem chi tiết <ChevronRight />
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    );
}

export default CardItem;
