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
            if (!searchDebounce) return;
            try {
                setLoading(true);
                const res = await orderHistoryService.lookupOrder(
                    searchDebounce,
                    locale,
                );

                setOrder(res as any);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [searchDebounce]);

    return (
        <div>
            <div className="mx-auto min-h-[84vh] w-2xl py-20">
                <div className="text-center">
                    <h1 className="mb-3 text-4xl font-semibold">
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground mb-4 text-sm">
                        {t("description")}
                    </p>
                    <InputGroup>
                        <InputGroupInput
                            placeholder={t("searchPlaceholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Separator className="my-4" />
                <div>
                    {loading ? (
                        <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                            <Spinner /> {t("searching")}
                        </div>
                    ) : (
                        <OrderCard order={order as any} />
                    )}
                    {searchDebounce && !loading && !order && (
                        <div>{t("orderNotFound")}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackOrder;
