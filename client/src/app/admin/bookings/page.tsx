"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import { DataTable } from "@/components/DataTable/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking, bookingService } from "@/services/bookingService";
import bookingColumns from "@/app/admin/bookings/columns";
import DisableDialog from "@/app/admin/bookings/components/DisableDialog/DisableDialog";
import { HttpError } from "@/lib/http/errors";
import { availableService } from "@/services/availableService";

type DisableData = {
    service: {
        id: string;
        thumbnail: string;
        title: string;
    };
    disables: Date[];
};

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
    const [showDialog, setShowDialog] = useState(false);
    const [disableData, setDisableData] = useState<DisableData>({
        service: {
            id: "",
            thumbnail: "",
            title: "",
        },
        disables: [],
    });

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

    function handleShowDialog(service: any, dates: Date[]) {
        setShowDialog(true);
        setDisableData({
            service,
            disables: dates,
        });
    }

    function handleDestroyDisable(date: Date) {
        setDisableData((prev) => ({
            ...prev,
            disables: prev.disables.filter((d) => d !== date),
        }));
    }

    async function handleSubmit() {
        try {
            setShowDialog(false);
            setDisableData({
                service: {
                    id: "",
                    thumbnail: "",
                    title: "",
                },
                disables: [],
            });
            const payload = {
                service_id: disableData.service.id,
                start_date: disableData.disables[0],
                end_date: disableData.disables[disableData.disables.length - 1],
            };

            await availableService.blockDates(payload);

            toast.success("Block dates successfully!");
            setShowDialog(false);
            setDisableData({
                service: {
                    id: "",
                    thumbnail: "",
                    title: "",
                },
                disables: [],
            });
            fetchBooking();
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
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
                                onShowDialog: handleShowDialog,
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

            <DisableDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                disables={disableData.disables}
                onDestroyDisable={handleDestroyDisable}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default AdminBooking;
