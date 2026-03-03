import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { HttpError } from "@/lib/http/errors";
import { productCategoryService } from "@/services/productCategoryService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type MediaCategoryType = {
    id: string;
    name: string;
    slug: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
};

type Props = { router: any; onRefreshs: () => void };

const productCategoryColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),

    // ===== ID =====
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

    // ===== NAME =====
    {
        accessorKey: "name",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tên danh mục" />
        ),
    },

    // ===== SLUG =====
    {
        accessorKey: "slug",
        header: "Slug",
    },

    // ===== STATUS =====
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => (
            <ToggleStatus
                status={row.original.status}
                onChange={async () => {
                    try {
                        await productCategoryService.toggleStatus(
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
        ),
    },

    // ===== CREATED AT =====
    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    // ===== UPDATED AT =====
    {
        accessorKey: "updated_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày cập nhật" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.updated_at)}</span>
        ),
    },

    // ===== ACTIONS =====
    createActionsColumn<MediaCategoryType>({
        onUpdate: (row: any) => {
            router.push(`/admin/products/category/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await productCategoryService.delete(row.id);
                toast.success("Xóa danh mục thành công!");
                onRefreshs();
            } catch (error) {
                console.log(error);
                if (error instanceof HttpError) {
                    toast.error(error.message);
                } else {
                    toast.error("Xóa danh mục thất bại!");
                }
            }
        },
    }),
];

export default productCategoryColumns;
