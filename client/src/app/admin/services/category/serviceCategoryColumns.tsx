import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { HttpError } from "@/lib/http/errors";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type ServiceCategoryType = {
    id: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
};

type Props = { router: any; onRefreshs: () => void };

const serviceCategoryColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tên danh mục" />
        ),
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => {
            return (
                <ToggleStatus
                    status={row.original.status}
                    onChange={async (newStatus) => {
                        try {
                            await serviceCategoryService.toggleStatus(
                                row.original.id,
                            );
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
        cell: ({ row }: { row: any }) => {
            return <span>{formatDateVN(row.original.created_at)}</span>;
        },
    },
    {
        accessorKey: "updated_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày cập nhật" />
        ),
        cell: ({ row }: { row: any }) => {
            return <span>{formatDateVN(row.original.updated_at)}</span>;
        },
    },
    createActionsColumn<ServiceCategoryType>({
        onUpdate: (row: any) => {
            router.push(`/admin/services/category/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await serviceCategoryService.delete(row.id);
                onRefreshs();
                toast.success("Xóa dịch vụ thành công!");
            } catch (error) {
                if (error instanceof HttpError) {
                    if (error.status === 400) {
                        toast.error(error.message);
                    }
                } else {
                    toast.error("Xóa dịch vụ thất bại!");
                }
            }
        },
    }),
];

export default serviceCategoryColumns;
