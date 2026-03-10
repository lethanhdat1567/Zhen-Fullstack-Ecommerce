import { OrderStatus } from "@/services/orderHistoryService";

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
    {
        pending: {
            label: "Pending",
            className: "border-yellow-500 text-yellow-700 bg-yellow-50",
        },
        confirmed: {
            label: "Confirmed",
            className: "border-blue-500 text-blue-700 bg-blue-50",
        },
        cancelled: {
            label: "Cancelled",
            className: "border-red-500 text-red-700 bg-red-50",
        },
        completed: {
            label: "Completed",
            className: "border-green-500 text-green-700 bg-green-50",
        },
        all: {
            label: "All",
            className: "border-gray-400 text-gray-700 bg-gray-50",
        },
    };

function StatusBadge({ status }: { status: OrderStatus }) {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center rounded-none border-1 px-2 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
}

export default StatusBadge;
