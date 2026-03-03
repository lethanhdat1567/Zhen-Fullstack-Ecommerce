"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import mediaCategoryColumns, {
    MediaCategoryType,
} from "@/app/admin/media/category/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function MediaCategoryAlbum() {
    const router = useRouter();
    const [mediaCategories, setMediaCategories] = useState<MediaCategoryType[]>(
        [],
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchMediaCategories = async () => {
        try {
            const res = await mediaCategoryService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setMediaCategories(res.items);
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

            await mediaCategoryService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchMediaCategories();
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
        fetchMediaCategories();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách danh mục media" />
                <Link href={"/admin/media/category/new"}>
                    <Button>
                        <Plus /> Thêm danh mục mới
                    </Button>
                </Link>
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            mediaCategoryColumns({
                                router,
                                onRefreshs: fetchMediaCategories,
                            }) as any
                        }
                        data={mediaCategories}
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

export default MediaCategoryAlbum;
