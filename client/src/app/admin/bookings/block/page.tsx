"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import { DataTable } from "@/components/DataTable/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    availableService,
    ServiceAvailabilitySummary,
} from "@/services/availableService";
import serviceAvailabilityColumns from "@/app/admin/bookings/block/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BookingBlockPage() {
    const router = useRouter();
    const [blockServices, setBlockServices] = useState<
        ServiceAvailabilitySummary[]
    >([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchBlocks = async () => {
        try {
            const res = await availableService.getSummary("vi");
            setBlockServices(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function handleBulkDestroy(rows: any) {
        // const ids = rows.map((item: any) => item.original.id);

        try {
            // await availableService.bulkUnblock(ids);
            toast.success("Xóa thành công!");
            fetchBlocks();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBlocks();
    }, [pagination]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách đơn hàng" />
                <Link href={"/admin/bookings/block/create"}>
                    <Button>Create</Button>
                </Link>
            </div>
            {loading ? (
                <LoadingTable />
            ) : (
                <div>
                    <DataTable
                        columns={
                            serviceAvailabilityColumns({
                                router,
                                onRefreshs: () => {
                                    fetchBlocks();
                                },
                            }) as any
                        }
                        data={blockServices}
                        onDestroy={handleBulkDestroy}
                        pageCount={totalPages ?? 0}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            )}
        </div>
    );
}

export default BookingBlockPage;
