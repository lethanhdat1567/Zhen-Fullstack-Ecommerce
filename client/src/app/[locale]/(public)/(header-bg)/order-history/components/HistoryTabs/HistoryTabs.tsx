import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
    currentStatus: string;
    onChangeStatus: (value: string) => void;
};

function HistoryTabs({ currentStatus, onChangeStatus }: Props) {
    const statuses = [
        { id: "all", label: "Tất cả" },
        { id: "pending", label: "Chờ thanh toán" },
        { id: "processing", label: "Đang xử lý" },
        { id: "completed", label: "Hoàn thành" },
        { id: "cancelled", label: "Đã hủy" },
    ];

    return (
        <Tabs
            value={currentStatus}
            onValueChange={onChangeStatus}
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-5">
                {statuses.map((status) => (
                    <TabsTrigger key={status.id} value={status.id}>
                        {status.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

export default HistoryTabs;
