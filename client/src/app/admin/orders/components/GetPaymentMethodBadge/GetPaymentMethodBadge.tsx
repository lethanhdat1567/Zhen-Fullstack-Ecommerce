export function GetPaymentStatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; className: string }> = {
        pending: {
            label: "Đang thanh toán",
            className: "bg-yellow-100 text-yellow-700",
        },
        paid: {
            label: "Đã thanh toán",
            className: "bg-green-100 text-green-700",
        },
        unpaid: {
            label: "Chưa thanh toán",
            className: "bg-red-100 text-red-700",
        },
        failed: {
            label: "Thanh toán thất bại",
            className: "bg-red-100 text-red-700",
        },
    };

    const item = map[status];

    return (
        <span className={`rounded px-2 py-1 text-xs ${item?.className}`}>
            {item?.label || status}
        </span>
    );
}
