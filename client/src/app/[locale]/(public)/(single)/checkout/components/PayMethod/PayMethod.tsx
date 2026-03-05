import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

type Props = {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>;
};

function PayMethod({ form }: Props) {
    const paymentMethod = form.watch("payment_method");

    return (
        <div>
            <h2 className="mb-10 text-lg font-semibold">
                Phương thức thanh toán
            </h2>
            <Select
                value={paymentMethod}
                onValueChange={(value: "cod" | "vnpay") => {
                    form.setValue("payment_method", value);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="cod">
                            Thanh toán khi nhận hàng
                        </SelectItem>
                        <SelectItem value="vnpay">
                            Thanh toán qua VN PAY
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default PayMethod;
