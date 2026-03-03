"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import serviceCategoryColumns from "@/app/admin/services/category/serviceCategoryColumns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import {
    ServiceCategory,
    serviceCategoryService,
} from "@/services/serviceCategoryService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ServiceCategoryPage() {
    const [serviceCategories, setServiceCategories] = useState<
        ServiceCategory[]
    >([]);
    // Pagination
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const fetchCategory = async () => {
        try {
            const res = await serviceCategoryService.list({
                lang: "vi",
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
            });

            setServiceCategories(res.items);
            setTotalPages(res.pagination.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function handleBulkDestroy(rows: any) {
        const ids = rows.map((item: any) => item.original.id);

        try {
            await serviceCategoryService.bulkDelete(ids);
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
                <Title title="Danh sách danh mục dịch vụ" />
                <Link href={"/admin/services/category/new"}>
                    <Button>
                        <Plus /> Thêm danh mục
                    </Button>
                </Link>
            </div>
            {loading ? (
                <LoadingTable />
            ) : (
                <DataTable
                    columns={
                        serviceCategoryColumns({
                            router,
                            onRefreshs: fetchCategory,
                        }) as any
                    }
                    data={serviceCategories}
                    onDestroy={handleBulkDestroy}
                    pageCount={totalPages ?? 0}
                    pagination={pagination}
                    setPagination={setPagination}
                    search={search}
                    setSearch={setSearch}
                />
            )}
        </div>
    );
}

export default ServiceCategoryPage;
