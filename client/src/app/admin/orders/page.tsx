"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import { DataTable } from "@/components/DataTable/data-table";
import { Order, orderService } from "@/services/orderService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import orderColumns from "@/app/admin/orders/columns";

function AdminOrder() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const [orders, setOrders] = useState<Order[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await orderService.getAllOrders({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
                status: activeTab === "all" ? null : activeTab,
            });

            setOrders(res.items);
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
            await orderService.bulkDestroy(ids);
            toast.success("Xóa thành công!");
            fetchOrders();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrders();
    }, [pagination, search, activeTab]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách đơn hàng" />
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">Tất cả</TabsTrigger>
                        <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
                        <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
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
                            orderColumns({
                                router,
                                onRefreshs: () => {
                                    fetchOrders();
                                },
                            }) as any
                        }
                        data={orders}
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

export default AdminOrder;
