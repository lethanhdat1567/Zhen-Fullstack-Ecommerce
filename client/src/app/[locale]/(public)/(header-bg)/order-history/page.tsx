"use client";

import HistorySearch from "@/app/[locale]/(public)/(header-bg)/order-history/components/HistorySearch/HistorySearch";
import HistoryTable from "@/app/[locale]/(public)/(header-bg)/order-history/components/HistoryTable/HistoryTable";
import HistoryTabs from "@/app/[locale]/(public)/(header-bg)/order-history/components/HistoryTabs/HistoryTabs";
import AutoBanner from "@/components/Auto/AutoBanner";
import { orderService } from "@/services/orderService";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

function OrderHistory() {
    const locale = useLocale();
    const [currentStatus, setCurrentStatus] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [historyOrders, setHistoryOrders] = useState([]);

    const fetchHistoryOrders = async () => {
        try {
            const res = await orderService.getMyOrders({
                lang: locale,
                status: currentStatus,
                search: searchValue,
            });
            setHistoryOrders(res as any);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchHistoryOrders();
    }, [currentStatus, searchValue, locale]);

    return (
        <div className="pt-4 pb-20">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Lịch sử mua hàng",
                        href: "/order-history",
                    },
                ]}
                hideBanner
            />
            <div className="container">
                <HistoryTabs
                    currentStatus={currentStatus}
                    onChangeStatus={setCurrentStatus}
                />
                <HistorySearch
                    searchTerm={searchValue}
                    onSearchChange={setSearchValue}
                />
                <HistoryTable data={historyOrders} />
            </div>
        </div>
    );
}

export default OrderHistory;
