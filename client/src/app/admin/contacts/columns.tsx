import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import { contactService } from "@/services/contactService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

export type Contact = {
    id: string;
    fullname: string;
    phone_number?: string;
    email: string;
    content: string;
    created_at: string;
    updated_at?: string;
};

type Props = { onRefreshs: () => void; router: any };

const contactColumns = ({ onRefreshs, router }: Props) => [
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

    // Fullname
    {
        accessorKey: "fullname",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Họ tên" />
        ),
    },

    // Email
    {
        accessorKey: "email",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Email" />
        ),
    },

    // Phone
    {
        accessorKey: "phone_number",
        header: "Số điện thoại",
        cell: ({ row }: { row: any }) => row.original.phone_number || "-",
    },

    // Content
    {
        accessorKey: "content",
        header: "Nội dung",
        cell: ({ row }: { row: any }) => (
            <div
                className="max-w-[300px] truncate"
                title={row.original.content}
            >
                {row.original.content}
            </div>
        ),
    },

    // Created at
    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày gửi" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    // Actions (chỉ delete)
    createActionsColumn<Contact>({
        onDelete: async (row) => {
            await contactService.delete(row.id);
            toast.success("Xóa liên hệ thành công!");
            onRefreshs();
        },
        onDetail: (row) => {
            router.push(`/admin/contact/${row.id}`);
        },
    }),
];

export default contactColumns;
