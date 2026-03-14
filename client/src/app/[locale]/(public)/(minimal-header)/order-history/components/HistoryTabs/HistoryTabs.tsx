import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/services/orderHistoryService";
import { useTranslations } from "next-intl";

type Props = {
    currentStatus: OrderStatus;
    onChangeStatus: (value: OrderStatus) => void;
};

function HistoryTabs({ currentStatus, onChangeStatus }: Props) {
    const t = useTranslations("OrderHistory.tabs");

    const statuses = [
        { id: "all", label: t("all") },
        { id: "pending", label: t("pending") },
        { id: "confirmed", label: t("confirmed") },
        { id: "completed", label: t("completed") },
        { id: "cancelled", label: t("cancelled") },
    ];

    return (
        <Tabs
            value={currentStatus}
            onValueChange={onChangeStatus as any}
            className="w-full"
        >
            <TabsList className="flex w-full justify-start overflow-x-auto overflow-y-hidden md:grid md:grid-cols-5">
                {statuses.map((status) => (
                    <TabsTrigger
                        key={status.id}
                        value={status.id}
                        className="min-w-34 flex-1 text-sm md:min-w-0 md:text-base"
                    >
                        {status.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

export default HistoryTabs;
