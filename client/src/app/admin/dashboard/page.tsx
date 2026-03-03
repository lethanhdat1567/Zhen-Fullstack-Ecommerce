"use client";

import { useEffect, useState } from "react";
import Title from "@/app/admin/components/Title/Title";
import BlockInfo from "@/app/admin/dashboard/components/BlockInfo/BlockInfo";
import { DatePickerWithRange } from "@/app/admin/dashboard/components/DatePicker/DatePicker";
import { DateRange } from "react-day-picker";
import { dashboardService } from "@/services/dashboardService";
import { ChartLineContacts } from "@/app/admin/dashboard/components/Charts/LineCharts";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardPage() {
    const [blocks, setBlocks] = useState({
        totalServices: 0,
        totalProducts: 0,
        totalPosts: 0,
        totalContacts: 0,
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date();
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(new Date().setDate(today.getDate() - 6)),
        to: today,
    });

    async function fetchOverview(params?: {
        start_date?: string;
        end_date?: string;
    }) {
        try {
            const res = await dashboardService.getOverview(params);

            setBlocks(res.blocks);
            setChartData(res.charts.contacts as any);
        } catch (error) {
            console.error("Dashboard error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOverview();
    }, []);

    function handleSelectDate(range: DateRange | undefined) {
        if (!range?.from || !range?.to) return;

        fetchOverview({
            start_date: range.from.toISOString(),
            end_date: range.to.toISOString(),
        });
    }

    return (
        <div>
            {loading ? (
                <div>
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-50 w-full rounded-none"
                            />
                        ))}
                    </div>
                    <Skeleton className="mt-5 h-100 w-full rounded-none" />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <Title title="Thống kê" />
                        <DatePickerWithRange
                            initDate={dateRange}
                            onSelect={handleSelectDate}
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-4 gap-4">
                        <BlockInfo
                            title="Dịch vụ"
                            value={blocks.totalServices}
                        />

                        <BlockInfo
                            title="Sản phẩm"
                            value={blocks.totalProducts}
                        />

                        <BlockInfo title="Bài viết" value={blocks.totalPosts} />

                        <BlockInfo
                            title="Liên hệ"
                            value={blocks.totalContacts}
                        />
                    </div>

                    <div className="mt-8">
                        <ChartLineContacts data={chartData as any} />
                    </div>
                </>
            )}
        </div>
    );
}

export default DashboardPage;
