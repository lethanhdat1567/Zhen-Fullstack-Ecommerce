"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import postCategoryColumns from "@/app/admin/posts/category/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import {
    postCategoryService,
    PostCategoryTranslationPayload,
} from "@/services/postCategoryService";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PostCategoryPage() {
    const router = useRouter();
    const [postCategories, setPostCategories] = useState<
        PostCategoryTranslationPayload[]
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
            const res = await postCategoryService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setPostCategories(res.items as any);
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

            await postCategoryService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchCategory();
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                toast.error(error.message);
            } else {
                toast.error("Xóa thất bại!");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategory();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách danh mục" />
                <Link href={"/admin/posts/category/new"}>
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
                            postCategoryColumns({
                                router,
                                onRefreshs: fetchCategory,
                            }) as any
                        }
                        data={postCategories}
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

export default PostCategoryPage;
