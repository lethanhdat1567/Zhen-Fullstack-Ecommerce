"use client";

import { createActionsColumn } from "@/app/admin/components/ActionColumn/ActionColumn";
import { createSelectColumn } from "@/app/admin/components/CreateSelectColumn/CreateSelectColumn";
import { SortableHeader } from "@/app/admin/components/SortableHeader/SortableHeader";
import ToggleStatus from "@/app/admin/components/ToggleStatus/ToggleStatus";
import { HttpError } from "@/lib/http/errors";
import { productService } from "@/services/productService";
import { formatDateVN } from "@/utils/formatDate";
import { toast } from "sonner";

type Props = { router: any; onRefreshs: () => void };
export type ProductType = {
    id: string;
    price: string;
    sale_price: string | null;
    stock: number;
    thumbnail: string | null;
    status: "active" | "inactive" | "draft";
    created_at: string;
    updated_at: string;

    title: string;
    slug: string;
    description: string | null;
    content: string | null;

    galleries: {
        id: string;
        image: string;
        sort_order: number;
    }[];

    category: {
        id: string;
        name: string;
        slug: string;
    };
};
const productColumns = ({ router, onRefreshs }: Props) => [
    createSelectColumn(),

    // ===== MÃ =====
    {
        accessorKey: "id",
        header: "Mã",
        cell: ({ row }: { row: any }) => {
            const id = row.original.id;
            return (
                <div className="max-w-30 truncate" title={id}>
                    {id.slice(0, 8)}...
                </div>
            );
        },
    },

    // ===== TÊN SẢN PHẨM =====
    {
        accessorKey: "title",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Tên sản phẩm" />
        ),
    },

    // ===== DANH MỤC =====
    {
        accessorKey: "category.name",
        header: "Danh mục",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.category?.name || "-"}</span>
        ),
    },

    // ===== GIÁ =====
    {
        accessorKey: "price",
        header: "Giá",
        cell: ({ row }: { row: any }) => (
            <span>{Number(row.original.price).toLocaleString("vi-VN")} ₫</span>
        ),
    },

    // ===== GIÁ KHUYẾN MÃI =====
    {
        accessorKey: "sale_price",
        header: "Giá khuyến mãi",
        cell: ({ row }: { row: any }) =>
            row.original.sale_price ? (
                <span className="font-medium text-red-500">
                    {Number(row.original.sale_price).toLocaleString("vi-VN")} ₫
                </span>
            ) : (
                "-"
            ),
    },

    // ===== TỒN KHO =====
    {
        accessorKey: "stock",
        header: "Tồn kho",
    },

    // ===== SỐ ẢNH =====
    {
        accessorKey: "galleries",
        header: "Số ảnh",
        cell: ({ row }: { row: any }) => (
            <span>{row.original.galleries?.length || 0}</span>
        ),
    },

    // ===== TRẠNG THÁI =====
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }: { row: any }) => (
            <ToggleStatus
                status={row.original.status}
                onChange={async () => {
                    try {
                        await productService.toggleStatus(row.original.id);
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

    // ===== NGÀY TẠO =====
    {
        accessorKey: "created_at",
        header: ({ column }: { column: any }) => (
            <SortableHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.created_at)}</span>
        ),
    },

    // ===== NGÀY CẬP NHẬT =====
    {
        accessorKey: "updated_at",
        header: "Ngày cập nhật",
        cell: ({ row }: { row: any }) => (
            <span>{formatDateVN(row.original.updated_at)}</span>
        ),
    },

    // ===== HÀNH ĐỘNG =====
    createActionsColumn<ProductType>({
        onUpdate: (row: any) => {
            router.push(`/admin/products/${row.id}`);
        },
        onDelete: async (row) => {
            try {
                await productService.delete(row.id);
                toast.success("Xóa sản phẩm thành công!");
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

export default productColumns;
