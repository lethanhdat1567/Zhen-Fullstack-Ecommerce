import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import { GetPaymentStatusBadge } from "@/app/admin/orders/components/GetPaymentMethodBadge/GetPaymentMethodBadge"; // Dùng chung badge với order
import StatusSelect from "@/app/admin/orders/components/StatusSelect/StatusSelect"; // Tái sử dụng hoặc tạo StatusSelect riêng cho Booking
import { Booking, bookingService } from "@/services/bookingService";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
    router: any;
    onRefreshs: () => void;
    onShowDialog: (service: any, dates: Date[]) => void;
};

const bookingColumns = ({ router, onRefreshs, onShowDialog }: Props) => [
    createSelectColumn(),

    // Mã đặt phòng
    {
        accessorKey: "id",
        header: "Mã đặt phòng",
        cell: ({ row }: { row: any }) => (
            <div
                className="max-w-24 truncate font-mono text-xs"
                title={row.original.id}
            >
                {row.original.id.slice(0, 8)}...
            </div>
        ),
    },

    // Dịch vụ (Service)
    {
        accessorKey: "service.title",
        header: "Dịch vụ",
        cell: ({ row }: { row: any }) => (
            <div className="font-medium text-blue-600">
                {row.original.service?.title || "N/A"}
            </div>
        ),
    },

    // Khách hàng
    {
        accessorKey: "customer_name",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Khách hàng" />
        ),
        cell: ({ row }: { row: any }) => (
            <div className="flex flex-col">
                <span className="font-medium">
                    {row.original.customer_name}
                </span>
                <span className="text-xs text-gray-500">
                    {row.original.customer_phone}
                </span>
            </div>
        ),
    },

    // Thời gian lưu trú (Check-in - Check-out)
    {
        header: "Lưu trú",
        cell: ({ row }: { row: any }) => {
            const start = new Date(row.original.check_in);
            const end = new Date(row.original.check_out);
            return (
                <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                        <span className="w-8 font-bold text-green-600">
                            IN:
                        </span>
                        {format(start, "dd/MM/yyyy")}
                    </div>
                    <div className="flex items-center">
                        <span className="w-8 font-bold text-red-600">OUT:</span>
                        {format(end, "dd/MM/yyyy")}
                    </div>
                </div>
            );
        },
    },

    // Số khách
    {
        accessorKey: "guest_count",
        header: "Khách",
        cell: ({ row }: { row: any }) => (
            <div className="text-center font-medium">
                {row.original.guest_count}
            </div>
        ),
    },

    // Tổng tiền
    {
        accessorKey: "total_price",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tổng tiền" />
        ),
        cell: ({ row }: { row: any }) => {
            const price = Number(row.original.total_price);
            return (
                <span className="font-bold text-orange-600">
                    {price.toLocaleString("vi-VN")}₫
                </span>
            );
        },
    },

    // Thanh toán
    {
        accessorKey: "payment_status",
        header: "Thanh toán",
        cell: ({ row }: { row: any }) => (
            <div className="flex flex-col gap-1">
                <GetPaymentStatusBadge status={row.original.payment_status} />
            </div>
        ),
    },

    // Trạng thái đơn đặt
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => (
            <StatusSelect
                value={row.original.status}
                onChange={async (value) => {
                    try {
                        await bookingService.update(row.original.id, {
                            status: value,
                        });
                        toast.success("Cập nhật trạng thái thành công");

                        if (value === "completed") {
                            const checkIn = new Date(row.original.check_in);
                            const checkOut = new Date(row.original.check_out);

                            const dateArray = [];
                            const currentDate = new Date(checkIn);

                            while (currentDate <= checkOut) {
                                dateArray.push(new Date(currentDate));
                                currentDate.setDate(currentDate.getDate() + 1);
                            }

                            onShowDialog(row.original.service, dateArray);
                        }

                        onRefreshs();
                    } catch (error) {
                        toast.error("Cập nhật thất bại");
                    }
                }}
            />
        ),
    },

    // Actions
    createActionsColumn<Booking>({
        onDetail: (row) => {
            router.push(`/admin/bookings/${row.id}`);
        },
        onDelete: async (row) => {
            await bookingService.delete(row.id);
            toast.success("Xóa thành công!");
            onRefreshs();
        },
    }),
];

export default bookingColumns;
