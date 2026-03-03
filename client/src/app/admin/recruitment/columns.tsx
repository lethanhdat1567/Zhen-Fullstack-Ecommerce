"use client";

import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { recruitmentService } from "@/services/recruitmentService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

type Props = { router: any; onRefreshs: () => void };

export type RecruitmentType = {
    id: string;
    address?: string | null;
    quantity: number;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    title?: string | null; // đã có vì truyền lang
};

const recruitmentColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),

    // ===== MÃ =====
    {
        accessorKey: "id",
        header: "Mã",
        cell: ({ row }: any) => {
            const id = row.original.id;
            return (
                <div className="max-w-30 truncate" title={id}>
                    {id.slice(0, 8)}...
                </div>
            );
        },
    },

    // ===== TIÊU ĐỀ =====
    {
        accessorKey: "title",
        header: ({ column }: any) => (
            <SortableHeader column={column} title="Tiêu đề" />
        ),
        cell: ({ row }: any) => row.original.title || "-",
    },

    // ===== ĐỊA CHỈ =====
    {
        accessorKey: "address",
        header: "Địa chỉ",
        cell: ({ row }: any) => row.original.address || "-",
    },

    // ===== SỐ LƯỢNG =====
    {
        accessorKey: "quantity",
        header: "Số lượng",
    },

    // ===== TRẠNG THÁI =====
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: any) => (
            <ToggleStatus
                status={row.original.status}
                onChange={async () => {
                    try {
                        await recruitmentService.toggleStatus(row.original.id);
                        toast.success("Đổi trạng thái thành công!");
                        onRefreshs();
                    } catch (error) {
                        console.error(error);
                        toast.error("Đổi trạng thái thất bại!");
                    }
                }}
            />
        ),
    },

    // ===== NGÀY TẠO =====
    {
        accessorKey: "created_at",
        header: ({ column }: any) => (
            <SortableHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }: any) => formatDateVN(row.original.created_at),
    },

    // ===== NGÀY CẬP NHẬT =====
    {
        accessorKey: "updated_at",
        header: "Ngày cập nhật",
        cell: ({ row }: any) => formatDateVN(row.original.updated_at),
    },

    // ===== HÀNH ĐỘNG =====
    createActionsColumn<RecruitmentType>({
        onUpdate: (row: any) => {
            router.push(`/admin/recruitment/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await recruitmentService.delete(row.id);
                toast.success("Xóa tuyển dụng thành công!");
                onRefreshs();
            } catch (error) {
                console.error(error);
                toast.error("Xóa tuyển dụng thất bại!");
            }
        },
    }),
];

export default recruitmentColumns;
