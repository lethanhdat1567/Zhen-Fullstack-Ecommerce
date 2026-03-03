"use client";

import Title from "@/app/admin/components/Title/Title";
import productCategoryColumns from "@/app/admin/products/category/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import {
    productCategoryService,
    ProductCategoryTranslation,
} from "@/services/productCategoryService";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { HttpError } from "@/lib/http/errors";
import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";

function ProductCategoryPage() {
    const router = useRouter();
    const [productCategories, setProductCategories] = useState<
        ProductCategoryTranslation[]
    >([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        try {
            const res = await productCategoryService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setProductCategories(res.items as any);
            setTotalPages(res.pagination.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function handleBulkDestroy(rows: any[]) {
        try {
            const ids = rows.map((item: any) => item.original.id);

            await productCategoryService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchCategory();
        } catch (error) {
            if (error instanceof HttpError) {
                toast.error(error.message);
            } else {
                toast.error("Xóa thất bại!");
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategory();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách danh mục sản phẩm" />
                <Link href="/admin/products/category/new">
                    <Button>
                        <Plus /> Thêm danh mục
                    </Button>
                </Link>
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            productCategoryColumns({
                                router,
                                onRefreshs: fetchCategory,
                            }) as any
                        }
                        data={productCategories}
                        onDestroy={handleBulkDestroy}
                        pageCount={totalPages ?? 0}
                        pagination={pagination}
                        setPagination={setPagination}
                        search={search}
                        setSearch={setSearch}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductCategoryPage;
