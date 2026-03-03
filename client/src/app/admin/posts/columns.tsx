import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { HttpError } from "@/lib/http/errors";
import { postService } from "@/services/postService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type PostType = {
    id: string;
    title?: string;
    slug?: string;
    status: "draft" | "active" | "inactive";
    created_at: string;
    updated_at: string;
    category?: {
        id: string;
        name?: string;
    };
};

type Props = { router: any; onRefreshs: () => void };

const postColumns = ({ router, onRefreshs }: Props) => [
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

    // ===== TITLE =====
    {
        accessorKey: "title",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tiêu đề" />
        ),
    },

    // ===== SLUG =====
    {
        accessorKey: "slug",
        header: "Slug",
    },

    // ===== CATEGORY =====
    {
        accessorKey: "category.name",
        header: "Danh mục",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.category?.name ?? "-"}</span>
        ),
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
                        await postService.toggleStatus(row.original.id);

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
    createActionsColumn<PostType>({
        onUpdate: (row: any) => {
            router.push(`/admin/posts/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await postService.delete(row.id);
                toast.success("Xóa bài viết thành công!");
                onRefreshs();
            } catch (error) {
                if (error instanceof HttpError && error.status === 409) {
                    toast.error(error.message);
                    return;
                }
                toast.error("Xóa bài viết thất bại!");
            }
        },
    }),
];

export default postColumns;
