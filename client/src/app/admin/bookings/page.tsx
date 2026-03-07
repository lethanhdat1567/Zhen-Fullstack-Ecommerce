"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import { DataTable } from "@/components/DataTable/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking, bookingService } from "@/services/bookingService";
import bookingColumns from "@/app/admin/orders/columns";

function AdminBooking() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBooking = async () => {
        try {
            const res = await bookingService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                status: activeTab === "all" ? null : (activeTab as any),
                lang: "vi",
            });

            setBookings(res.items);
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
            await bookingService.bulkDelete(ids);
            toast.success("Xóa thành công!");
            fetchBooking();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBooking();
    }, [pagination, search, activeTab]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách đơn hàng" />
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">Tất cả</TabsTrigger>
                        <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
                        <TabsTrigger value="confirmed">Đang xử lý</TabsTrigger>
                        <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                        <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {loading ? (
                <LoadingTable />
            ) : (
                <div>
                    <DataTable
                        columns={
                            bookingColumns({
                                router,
                                onRefreshs: () => {
                                    fetchBooking();
                                },
                            }) as any
                        }
                        data={bookings}
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

export default AdminBooking;
