"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import mediaAlbumColumns from "@/app/admin/media/albums/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { MediaAlbum, mediaAlbumService } from "@/services/mediaAlbumService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminMediaAlbum() {
    const router = useRouter();
    const [mediaAlbums, setMediaAlbums] = useState<MediaAlbum[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        try {
            const res = await mediaAlbumService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setMediaAlbums(res.items as any);
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

            await mediaAlbumService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchCategory();
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError && error.status === 409) {
                toast.error(error.message);
                return;
            }

            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategory();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách albums" />
                <Link href={"/admin/media/albums/new"}>
                    <Button>
                        <Plus /> Thêm album mới
                    </Button>
                </Link>
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            mediaAlbumColumns({
                                router,
                                onRefreshs: fetchCategory,
                            }) as any
                        }
                        data={mediaAlbums}
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

export default AdminMediaAlbum;
