"use client";

import HistorySearch from "@/app/[locale]/(public)/(minimal-header)/order-history/components/HistorySearch/HistorySearch";
import HistoryServiceTable from "@/app/[locale]/(public)/(minimal-header)/order-history/components/HistoryServiceTable/HistoryServiceTable";
import HistoryTable from "@/app/[locale]/(public)/(minimal-header)/order-history/components/HistoryTable/HistoryTable";
import HistoryTabs from "@/app/[locale]/(public)/(minimal-header)/order-history/components/HistoryTabs/HistoryTabs";
import HistoryTypeTab from "@/app/[locale]/(public)/(minimal-header)/order-history/components/HistoryTypeTab/HistoryTypeTab";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import {
    orderHistoryService,
    OrderStatus,
} from "@/services/orderHistoryService";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface HistoryResponse {
    orders: any[];
    bookings: any[];
}

function OrderHistory() {
    const t = useTranslations("OrderHistory");
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const locale = useLocale();
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>("all");
    const [currentType, setCurrentType] = useState<"product" | "service">(
        "product",
    );
    const [searchValue, setSearchValue] = useState("");
    const debounceSearchValue = useDebounce(searchValue, 200);

    const [historyOrders, setHistoryOrders] = useState<HistoryResponse>({
        orders: [],
        bookings: [],
    });

    const fetchHistoryOrders = async (isFirstLoad = false) => {
        try {
            if (isFirstLoad) setLoading(true);
            else setIsSearching(true);

            const res = await orderHistoryService.getOrderHistory({
                lang: locale,
                status: currentStatus,
                search: debounceSearchValue,
            });

            setHistoryOrders(res as unknown as HistoryResponse);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    useEffect(() => {
        fetchHistoryOrders(loading);
    }, [currentStatus, debounceSearchValue, locale]);

    if (loading)
        return (
            <div className="container space-y-6 py-10">
                <Skeleton className="h-10 w-full" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-full max-w-100" />
                    <Skeleton className="h-10 w-full max-w-100" />
                </div>
                <Skeleton className="h-110 w-full" />
            </div>
        );

    return (
        <div className="min-h-[86vh] pb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: t("breadcrumb"), href: "/order-history" },
                ]}
                hideBanner
            />
            <div className="container">
                <HistoryTabs
                    currentStatus={currentStatus}
                    onChangeStatus={setCurrentStatus}
                />
                <div className="relative flex items-center">
                    <HistoryTypeTab
                        setType={setCurrentType}
                        type={currentType}
                    />
                    <HistorySearch
                        searchTerm={searchValue}
                        onSearchChange={setSearchValue}
                    />
                </div>

                <div
                    className={`transition-all duration-200 ${isSearching ? "pointer-events-none opacity-40 grayscale-[0.5]" : "opacity-100"}`}
                >
                    {currentType === "product" && (
                        <HistoryTable data={historyOrders.orders} />
                    )}
                    {currentType === "service" && (
                        <HistoryServiceTable
                            bookings={historyOrders.bookings}
                        />
                    )}
                </div>

                {isSearching && (
                    <div className="mt-4 flex justify-center">
                        <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
