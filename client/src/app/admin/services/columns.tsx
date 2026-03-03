import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import TableThumbnail from "@/app/admin/components/TableThumbnail/TableThumbnail";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { serviceService } from "@/services/service";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type ServiceType = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    sku: string;
    price: string;
    thumbnail: string | null;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

type Props = { router: any; onRefreshs: () => void };

const serviceColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),
    {
        accessorKey: "id",
        header: "Mã",
        cell: ({ row }: { row: any }) => {
            const id = row.original.id;
            const shortId = `${id.slice(0, 8)}...`;

            return (
                <div className="max-w-30 cursor-pointer truncate" title={id}>
                    {shortId}
                </div>
            );
        },
    },
    {
        accessorKey: "thumbnail",
        header: "Ảnh",
        cell: ({ row }: { row: any }) => (
            <TableThumbnail
                src={row.original.thumbnail}
                fallbackText={row.original.title}
            />
        ),
    },

    {
        accessorKey: "title",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tên dịch vụ" />
        ),
    },

    {
        accessorKey: "category",
        header: "Danh mục",
        cell: ({ row }: { row: any }) => {
            return row.original.category.name;
        },
    },

    {
        accessorKey: "slug",
        header: "Slug",
    },

    {
        accessorKey: "sku",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="SKU" />
        ),
    },

    {
        accessorKey: "price",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Giá" />
        ),
        cell: ({ row }: { row: any }) => {
            const price = Number(row.original.price);
            return <span>{price.toLocaleString("vi-VN")} đ</span>;
        },
    },

    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => {
            return (
                <ToggleStatus
                    status={row.original.status}
                    onChange={async () => {
                        try {
                            await serviceService.toggleStatus(row.original.id);
                            toast.success("Đổi trạng thái thành công!");
                            onRefreshs();
                        } catch (error) {
                            console.log(error);
                            toast.error("Đổi trạng thái thất bại!");
                        }
                    }}
                />
            );
        },
    },

    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    {
        accessorKey: "updated_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày cập nhật" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.updated_at)}</span>
        ),
    },

    createActionsColumn<ServiceType>({
        onUpdate: (row: any) => {
            router.push(`/admin/services/${row.id}`);
        },
        onDelete: async (row) => {
            await serviceService.deleteService(row.id);
            toast.success("Xóa dịch vụ thành công!");
            onRefreshs();
        },
    }),
];

export default serviceColumns;
