"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import adminColumns from "@/app/admin/users/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { User, userService } from "@/services/userService";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminUser() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await userService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
            });

            setUsers(res.items);
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
            await userService.bulkDelete(ids);
            toast.success("Xóa thành công!");
            fetchServices();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách tài khoản" />
                <Link href={"/admin/users/new"}>
                    <Button>
                        <Plus /> Thêm tài khoản
                    </Button>
                </Link>
            </div>
            {loading ? (
                <LoadingTable />
            ) : (
                <div>
                    <DataTable
                        columns={
                            adminColumns({
                                router,
                                onRefreshs: () => {
                                    fetchServices();
                                },
                            }) as any
                        }
                        data={users}
                        onDestroy={handleBulkDestroy}
                        pageCount={totalPages ?? 0}
                        pagination={pagination}
                        setPagination={setPagination}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
            )}
        </div>
    );
}

export default AdminUser;
