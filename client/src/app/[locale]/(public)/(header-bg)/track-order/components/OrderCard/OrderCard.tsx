import Image from "next/image";
import { LookupOrderResponse } from "@/services/orderHistoryService";
import { resolveMediaSrc } from "@/lib/image";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
    order: LookupOrderResponse;
};

function OrderCard({ order }: Props) {
    if (!order) return null;

    const isProduct = order.type === "product";

    const detailHref = isProduct
        ? `/orders/product/${order.data.id}`
        : `/orders/service/${order.data.id}`;

    return (
        <div className="border bg-white">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="border px-2 py-0.5 text-xs font-semibold">
                        {isProduct ? "PRODUCT ORDER" : "SERVICE BOOKING"}
                    </span>

                    <span className="text-gray-500">
                        #{order.data.id.slice(-6)}
                    </span>
                </div>

                <StatusBadge status={order.data.status} />
            </div>

            {/* BODY */}
            <div className="flex gap-4 p-4">
                <Image
                    src={resolveMediaSrc(
                        isProduct
                            ? order.data.order_items[0].product.thumbnail
                            : order.data.service.thumbnail,
                    )}
                    alt={
                        isProduct
                            ? order.data.order_items[0].product.title
                            : order.data.service.title
                    }
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover"
                />

                <div className="flex flex-1 flex-col gap-1">
                    {isProduct ? (
                        <>
                            <p className="font-semibold">
                                {order.data.order_items[0].product.title}
                            </p>

                            <p className="text-sm text-gray-500">
                                {order.data.order_items.length} sản phẩm
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold">
                                {order.data.service.title}
                            </p>

                            <p className="text-sm text-gray-500">
                                Check-in: {formatDate(order.data.check_in)}
                            </p>

                            <p className="text-sm text-gray-500">
                                Check-out: {formatDate(order.data.check_out)}
                            </p>
                        </>
                    )}
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-500">Tổng cộng</p>

                    <p className="font-semibold text-green-600">
                        $
                        {formatPrice(
                            isProduct
                                ? order.data.total_amount
                                : order.data.total_price,
                        )}
                    </p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t px-4 py-2">
                <Link
                    href={detailHref}
                    className="flex items-center gap-2 border px-3 py-1 text-sm font-medium hover:bg-gray-100"
                >
                    Xem chi tiết <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
}

export default OrderCard;
