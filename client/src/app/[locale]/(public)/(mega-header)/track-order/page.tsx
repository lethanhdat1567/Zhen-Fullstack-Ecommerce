"use client";

import { Separator } from "@/components/ui/separator";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import {
    OrderHistoryResponse,
    orderHistoryService,
} from "@/services/orderHistoryService";
import { useLocale, useTranslations } from "next-intl";
import OrderCard from "@/app/[locale]/(public)/(mega-header)/track-order/components/OrderCard/OrderCard";
import { Spinner } from "@/components/ui/spinner";

function TrackOrder() {
    const t = useTranslations("TrackOrder");
    const locale = useLocale();
    const [order, setOrder] = useState<OrderHistoryResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const searchDebounce = useDebounce(search, 500);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!searchDebounce) {
                setOrder(null);
                return;
            }
            try {
                setLoading(true);
                const res = await orderHistoryService.lookupOrder(
                    searchDebounce,
                    locale,
                );

                setOrder(res as any);
            } catch (error) {
                console.log(error);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [searchDebounce, locale]);

    return (
        <div className="container px-4">
            <div className="mx-auto min-h-[84vh] w-full max-w-2xl py-10 md:py-20">
                <div className="text-center">
                    <h1 className="mb-3 text-2xl font-semibold md:text-4xl">
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm">
                        {t("description")}
                    </p>
                    <div className="mx-auto max-w-lg">
                        <InputGroup>
                            <InputGroupInput
                                placeholder={t("searchPlaceholder")}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputGroupAddon>
                                <SearchIcon size={18} />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                <Separator className="my-6 md:my-8" />

                <div className="w-full">
                    {loading ? (
                        <div className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm">
                            <Spinner /> {t("searching")}
                        </div>
                    ) : (
                        <>
                            {order && <OrderCard order={order as any} />}

                            {searchDebounce && !order && (
                                <div className="text-muted-foreground py-10 text-center text-sm">
                                    {t("orderNotFound")}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackOrder;
