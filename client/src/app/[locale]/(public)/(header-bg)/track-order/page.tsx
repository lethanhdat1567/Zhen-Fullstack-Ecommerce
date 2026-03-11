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
import { useLocale } from "next-intl";
import OrderCard from "@/app/[locale]/(public)/(header-bg)/track-order/components/OrderCard/OrderCard";
import { Spinner } from "@/components/ui/spinner";

function TrackOrder() {
    const locale = useLocale();
    const [order, setOrder] = useState<OrderHistoryResponse | null>(null);
    const [loading, setLoading] = useState(true);
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
            <div className="mx-auto w-2xl py-20">
                <div className="text-center">
                    <h1 className="mb-3 text-4xl font-semibold">
                        Tra cứu đơn hàng
                    </h1>
                    <p className="text-muted-foreground mb-4 text-sm">
                        Nhập mã đơn hàng để kiểm tra trạng thái và thông tin chi
                        tiết đơn hàng của bạn.
                    </p>
                    <InputGroup>
                        <InputGroupInput
                            placeholder="Search..."
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
                            <Spinner /> Đang tìm kiếm...
                        </div>
                    ) : (
                        <OrderCard order={order as any} />
                    )}
                    {search && !loading && !order && (
                        <div>Không tìm thấy đơn hàng!.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackOrder;
