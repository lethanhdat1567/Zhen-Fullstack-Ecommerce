"use client";

import AutoBanner from "@/components/Auto/AutoBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "@/app/[locale]/(public)/(header-bg)/orders/components/ProductTable/ProductTable";
import { Separator } from "@/components/ui/separator";
import ServiceTable from "@/app/[locale]/(public)/(header-bg)/orders/components/ServiceTable/ServiceTable";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
    OrderHistoryResponse,
    orderHistoryService,
    OrderStatus,
} from "@/services/orderHistoryService";
import { tabs } from "@/app/[locale]/(public)/(header-bg)/orders/data";

function OrderPage() {
    const locale = useLocale();
    const [tab, setTab] = useState<OrderStatus>("all");
    const [historyData, setHistoryData] = useState<OrderHistoryResponse | null>(
        null,
    );

    const fetchData = async () => {
        try {
            const res = await orderHistoryService.getOrderHistory({
                lang: locale,
                status: tab,
            });

            setHistoryData(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, [tab]);

    if (!historyData) return null;

    return (
        <div>
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Lịch sử mua hàng",
                        href: "/orders",
                    },
                ]}
            />

            <div className="container pb-20">
                <Tabs
                    defaultValue={tab}
                    value={tab}
                    onValueChange={setTab as any}
                    className="w-full"
                >
                    <div className="mb-4 flex items-center justify-between border-b pb-4">
                        <TabsList className="h-auto gap-8 bg-transparent p-0">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="rounded-none bg-transparent px-0 pb-2 text-base shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-(--primary-color)"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            <ProductTable orders={historyData?.orders} />
                            <Separator className="my-4" />
                            <ServiceTable bookings={historyData?.bookings} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

export default OrderPage;
