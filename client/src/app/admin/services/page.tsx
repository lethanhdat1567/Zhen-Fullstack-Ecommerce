"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import serviceColumns from "@/app/admin/services/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { Service, serviceService } from "@/services/service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ServicePage() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await serviceService.listServices({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                lang: "vi",
            });

            setServices(res.items);
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
            await serviceService.bulkDelete(ids);
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
                <Title title="Danh sách dịch vụ" />
                <Link href={"/admin/services/new"}>
                    <Button>
                        <Plus /> Thêm dịch vụ
                    </Button>
                </Link>
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            serviceColumns({
                                router,
                                onRefreshs: () => {
                                    fetchServices();
                                },
                            }) as any
                        }
                        data={services}
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

export default ServicePage;
