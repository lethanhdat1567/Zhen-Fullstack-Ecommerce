import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    value: string;
    onChange: (
        value: "pending" | "confirmed" | "completed" | "cancelled",
    ) => void;
};

const STATUS_OPTIONS = [
    {
        value: "pending",
        label: "Chờ xác nhận",
        color: "bg-yellow-100 text-yellow-700",
    },
    {
        value: "confirmed",
        label: "Đã xác nhận",
        color: "bg-blue-100 text-blue-700",
    },
    {
        value: "completed",
        label: "Đã xử lý thành công",
        color: "bg-green-100 text-green-700",
    },
    {
        value: "cancelled",
        label: "Đã hủy",
        color: "bg-red-100 text-red-700",
    },
];

function StatusSelect({ value, onChange }: Props) {
    const current = STATUS_OPTIONS.find((s) => s.value === value);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue>
                    {current && (
                        <span
                            className={`rounded px-2 py-1 text-xs font-medium ${current.color}`}
                        >
                            {current.label}
                        </span>
                    )}
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                            <span
                                className={`rounded px-2 py-1 text-xs font-medium ${status.color}`}
                            >
                                {status.label}
                            </span>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default StatusSelect;
