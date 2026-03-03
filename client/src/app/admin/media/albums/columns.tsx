import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { HttpError } from "@/lib/http/errors";
import { mediaAlbumService } from "@/services/mediaAlbumService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type MediaGalleryItem = {
    id: string;
    type: "image" | "video";
    file_url: string;
    sort_order: number;
};

export type MediaCategory = {
    id: string;
    name: string;
};

export type MediaAlbum = {
    id: string;
    status: "active" | "inactive";

    category: MediaCategory;

    title: string;
    slug: string;
    description: string | null;

    galleries: MediaGalleryItem[];

    created_at: string;
    updated_at: string;
};

export type MediaAlbumType = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    status: "active" | "inactive" | "draft";
    created_at: string;
    updated_at: string;
    category: {
        id: string;
        name: string;
    };
    galleries: {
        id: string;
        type: "image" | "video";
        file_url: string;
        sort_order: number;
    }[];
};

type Props = { router: any; onRefreshs: () => void };

const mediaAlbumColumns = ({ router, onRefreshs }: Props) => [
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
            <SortableHeader column={column} title="Tên album" />
        ),
    },

    // ===== CATEGORY =====
    {
        accessorKey: "category.name",
        header: "Danh mục",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.category?.name}</span>
        ),
    },

    // ===== SLUG =====
    {
        accessorKey: "slug",
        header: "Slug",
    },

    // ===== GALLERY COUNT =====
    {
        accessorKey: "galleries",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Số media" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{row.original.galleries?.length || 0}</span>
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
                        await mediaAlbumService.toggleStatus(row.original.id);
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
    createActionsColumn<MediaAlbumType>({
        onUpdate: (row: any) => {
            router.push(`/admin/media/albums/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await mediaAlbumService.delete(row.id);
                toast.success("Xóa album thành công!");
                onRefreshs();
            } catch (error) {
                console.log(error);
                if (error instanceof HttpError && error.status === 409) {
                    toast.error(error.message);
                    return;
                }
                toast.error("Xóa album thất bại!");
            }
        },
    }),
];

export default mediaAlbumColumns;
