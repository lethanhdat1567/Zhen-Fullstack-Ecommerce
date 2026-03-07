import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import { Badge } from "@/components/ui/badge"; // Giả định bạn có component Badge
import { resolveMediaSrc } from "@/lib/image";
import { availableService } from "@/services/availableService";
import { CalendarOff, Users } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export type ServiceAvailabilitySummary = {
    id: string;
    capacity: number;
    title?: string;
    thumbnail?: string;
    blocked_count: number;
};

type Props = { router: any; onRefreshs: () => void };

const serviceAvailabilityColumns = ({ router, onRefreshs }: Props) => [
    // Thông tin dịch vụ (Thumbnail + Title)
    {
        accessorKey: "title",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Dịch vụ" />
        ),
        cell: ({ row }: { row: any }) => {
            const { title, thumbnail } = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-md border">
                        {thumbnail ? (
                            <Image
                                src={resolveMediaSrc(thumbnail)}
                                alt={title || "service"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="text-muted-foreground flex h-full items-center justify-center text-[10px]">
                                No Img
                            </div>
                        )}
                    </div>
                    <span className="max-w-50 truncate font-medium">
                        {title || "Không có tên"}
                    </span>
                </div>
            );
        },
    },

    // Sức chứa (Capacity)
    {
        accessorKey: "capacity",
        header: "Sức chứa tối đa",
        cell: ({ row }: { row: any }) => (
            <div className="text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{row.original.capacity} khách/lượt</span>
            </div>
        ),
    },

    // Số ngày/lượt bị chặn (Blocked Count)
    {
        accessorKey: "blocked_count",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Trạng thái chặn" />
        ),
        cell: ({ row }: { row: any }) => {
            const count = row.original.blocked_count;
            return (
                <div className="flex items-center gap-2">
                    {count > 0 ? (
                        <Badge
                            variant="destructive"
                            className="flex items-center gap-1"
                        >
                            <CalendarOff className="h-3 w-3" />
                            Đã chặn {count} ngày
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="border-green-200 bg-green-50 text-green-600"
                        >
                            Đang mở hoàn toàn
                        </Badge>
                    )}
                </div>
            );
        },
    },

    // Mã dịch vụ (ID) - Để cuối hoặc ẩn nếu không cần thiết
    {
        accessorKey: "id",
        header: "Mã dịch vụ",
        cell: ({ row }: { row: any }) => (
            <code className="bg-muted rounded px-1 text-[10px]">
                {row.original.id}
            </code>
        ),
    },

    // Actions
    createActionsColumn<ServiceAvailabilitySummary>({
        onDetail: (row) => {
            router.push(`/admin/bookings/block/${row.id}`);
        },
        onDelete: async (row) => {
            const serviceId = row.id;
            const blocks = await availableService.getCalendar(serviceId);
            const blockIds = blocks.map((block) => block.id);

            try {
                await availableService.bulkUnblock(blockIds);
                toast.success("Xóa thành công!");
                onRefreshs();
            } catch (error) {
                console.log(error);
                toast.error("Xóa thất bại!");
            }
        },
    }),
];

export default serviceAvailabilityColumns;
