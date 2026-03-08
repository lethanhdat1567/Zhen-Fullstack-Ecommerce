import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
function SelectPaymentMethod({
    value,
    onChange,
}: {
    value: string;
    onChange: any;
}) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="cod">Tiền mặt</SelectItem>
                    <SelectItem value="vnpay">Chuyển khoản</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectPaymentMethod;
