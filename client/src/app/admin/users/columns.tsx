import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import TableThumbnail from "@/app/admin/components/TableThumbnail/TableThumbnail";
import { userService } from "@/services/userService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type Admin = {
    id: string;
    username: string;
    email: string;
    full_name?: string;
    avatar?: string;
    role: string;
    status: string;
    created_at: string;
    updated_at?: string;
};

type Props = { router: any; onRefreshs: () => void };

const adminColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),

    // ID
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

    // Avatar
    {
        accessorKey: "avatar",
        header: "Ảnh",
        cell: ({ row }: { row: any }) => {
            return (
                <TableThumbnail
                    src={row.original.avatar}
                    fallbackText={
                        row.original.full_name || row.original.username
                    }
                />
            );
        },
    },

    // Full name
    {
        accessorKey: "full_name",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Họ và tên" />
        ),
        cell: ({ row }: { row: any }) => row.original.full_name || "-",
    },

    // Username
    {
        accessorKey: "username",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Username" />
        ),
    },

    // Email
    {
        accessorKey: "email",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Email" />
        ),
    },

    // Role
    {
        accessorKey: "role",
        header: "Vai trò",
        cell: ({ row }: { row: any }) => (
            <span className="capitalize">{row.original.role}</span>
        ),
    },

    // Created at
    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    // Updated at
    {
        accessorKey: "updated_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày cập nhật" />
        ),
        cell: ({ row }: { row: any }) =>
            row.original.updated_at ? (
                <span>{formatDateVN(row.original.updated_at)}</span>
            ) : (
                "-"
            ),
    },

    // Actions
    createActionsColumn<Admin>({
        onDelete: async (row) => {
            await userService.delete(row.id);
            toast.success("Xóa admin thành công!");
            onRefreshs();
        },
    }),
];

export default adminColumns;
