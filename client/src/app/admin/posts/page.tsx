"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import postColumns from "@/app/admin/posts/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { Post, postService } from "@/services/postService";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PostPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        try {
            const res = await postService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setPosts(res.items as any);
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

            await postService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchCategory();
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
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
                <Title title="Danh sách danh mục" />
                <Link href={"/admin/posts/new"}>
                    <Button>
                        <Plus /> Thêm bài viết mới
                    </Button>
                </Link>
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            postColumns({
                                router,
                                onRefreshs: fetchCategory,
                            }) as any
                        }
                        data={posts}
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

export default PostPage;
