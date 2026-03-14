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
            <div className="container space-y-4 py-6 md:space-y-6 md:py-10">
                <Skeleton className="h-10 w-full" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Skeleton className="h-10 w-full sm:max-w-75" />
                    <Skeleton className="h-10 w-full sm:max-w-75" />
                </div>
                <Skeleton className="h-100 w-full md:h-150" />
            </div>
        );

    return (
        <div className="min-h-[86vh] pb-10 md:pb-20">
            <AutoBanner
                breadcrumbData={[
                    { title: t("breadcrumb"), href: "/order-history" },
                ]}
                hideBanner
            />
            <div className="container px-4 md:px-6">
                <div className="mb-4 overflow-x-auto pb-2 md:mb-6">
                    <HistoryTabs
                        currentStatus={currentStatus}
                        onChangeStatus={setCurrentStatus}
                    />
                </div>

                <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="w-full md:w-auto">
                        <HistoryTypeTab
                            setType={setCurrentType}
                            type={currentType}
                        />
                    </div>
                    <div className="w-full md:max-w-md">
                        <HistorySearch
                            searchTerm={searchValue}
                            onSearchChange={setSearchValue}
                        />
                    </div>
                </div>

                <div
                    className={`transition-all duration-200 ${
                        isSearching
                            ? "pointer-events-none opacity-40 grayscale-[0.5]"
                            : "opacity-100"
                    } overflow-x-auto`}
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
                    <div className="mt-6 flex justify-center">
                        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
