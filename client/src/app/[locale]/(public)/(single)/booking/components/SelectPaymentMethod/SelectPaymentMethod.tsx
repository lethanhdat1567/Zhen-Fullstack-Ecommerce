import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
function SelectPaymentMethod({
    value,
    onChange,
}: {
    value: string;
    onChange: any;
}) {
    const t = useTranslations("Booking");

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="cod">{t("paymentCash")}</SelectItem>
                    <SelectItem value="vnpay">
                        {t("paymentTransfer")}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectPaymentMethod;
