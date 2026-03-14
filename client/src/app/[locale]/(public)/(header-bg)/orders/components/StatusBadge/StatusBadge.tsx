import { OrderStatus } from "@/services/orderHistoryService";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrderStatus, string> = {
    pending: "border-yellow-500 text-yellow-700 bg-yellow-50/50",
    confirmed: "border-blue-500 text-blue-700 bg-blue-50/50",
    cancelled: "border-red-500 text-red-700 bg-red-50/50",
    completed: "border-green-500 text-green-700 bg-green-50/50",
    all: "border-gray-400 text-gray-700 bg-gray-50",
};

function StatusBadge({ status }: { status: OrderStatus }) {
    const t = useTranslations("orderStatus");
    const style = statusStyles[status] || statusStyles.all;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-sm border px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase sm:text-xs",
                style,
            )}
        >
            {t(status)}
        </span>
    );
}

export default StatusBadge;
