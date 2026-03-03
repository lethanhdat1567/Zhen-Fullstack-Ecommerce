"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import recruitmentColumns from "@/app/admin/recruitment/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { Recruitment, recruitmentService } from "@/services/recruitmentService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminRecruitmentPage() {
    const router = useRouter();

    const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchRecruitments = async () => {
        try {
            setLoading(true);

            const res = await recruitmentService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                lang: "vi",
            });

            setRecruitments(res.items as any);
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

            await recruitmentService.bulkDelete(ids);

            toast.success("Xóa thành công!");
            fetchRecruitments();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        fetchRecruitments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách tuyển dụng" />
                <Link href={"/admin/recruitment/new"}>
                    <Button>
                        <Plus /> Thêm vị trí tuyển dụng
                    </Button>
                </Link>
            </div>

            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            recruitmentColumns({
                                router,
                                onRefreshs: fetchRecruitments,
                            }) as any
                        }
                        data={recruitments}
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

export default AdminRecruitmentPage;
