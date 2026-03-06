import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import { GetPaymentStatusBadge } from "@/app/admin/orders/components/GetPaymentMethodBadge/GetPaymentMethodBadge";
import StatusSelect from "@/app/admin/orders/components/StatusSelect/StatusSelect";
import { orderService } from "@/services/orderService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type Order = {
    id: string;
    user_id?: string | null;
    full_name: string;
    email?: string | null;
    phone_number: string;
    shipping_address: string;
    note?: string | null;
    total_amount: string;
    status: "pending" | "processing" | "done" | "cancelled";
    payment_method: string;
    payment_status: string;
    created_at: string;
    updated_at?: string;
    _count: {
        order_items: number;
    };
};

type Props = { router: any; onRefreshs: () => void };

const orderColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),

    // Order ID
    {
        accessorKey: "id",
        header: "Mã đơn",
        cell: ({ row }: { row: any }) => {
            const id = row.original.id;
            const shortId = `${id.slice(0, 8)}...`;

            return (
                <div className="max-w-32 truncate" title={id}>
                    {shortId}
                </div>
            );
        },
    },

    // Customer
    {
        accessorKey: "full_name",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Khách hàng" />
        ),
        cell: ({ row }: { row: any }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.full_name}</span>
                <span className="text-xs text-gray-500">
                    {row.original.phone_number}
                </span>
            </div>
        ),
    },

    // Email
    {
        accessorKey: "email",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Email" />
        ),
        cell: ({ row }: { row: any }) => row.original.email || "-",
    },

    // Total
    {
        accessorKey: "total_amount",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tổng tiền" />
        ),
        cell: ({ row }: { row: any }) => {
            const amount = Number(row.original.total_amount);

            return (
                <span className="font-medium">
                    {amount.toLocaleString("vi-VN")}₫
                </span>
            );
        },
    },

    // Items count
    {
        accessorKey: "_count.order_items",
        header: "Sản phẩm",
        cell: ({ row }: { row: any }) => (
            <span>{row.original._count?.order_items || 0}</span>
        ),
    },

    // Payment method
    {
        accessorKey: "payment_method",
        header: "Thanh toán",
        cell: ({ row }: { row: any }) => (
            <span className="uppercase">{row.original.payment_method}</span>
        ),
    },

    // Payment Status
    {
        accessorKey: "paymentStatus",
        header: "Trạng thái thanh toán",
        cell: ({ row }: { row: any }) => (
            <GetPaymentStatusBadge status={row.original.payment_status} />
        ),
    },

    // Status
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => (
            <StatusSelect
                value={row.original.status}
                onChange={async (value) => {
                    await orderService.updateStatus(row.original.id, value);
                    toast.success("Cập nhật trạng thái thành công");
                    onRefreshs();
                }}
            />
        ),
    },

    // Created at
    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày đặt hàng" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    // Actions
    createActionsColumn<Order>({
        onDetail: (row) => {
            router.push(`/admin/orders/${row.id}`);
        },

        onDelete: async (row) => {
            await orderService.destroy(row.id);
            toast.success("Xóa đơn hàng thành công!");
            onRefreshs();
        },
    }),
];

export default orderColumns;
