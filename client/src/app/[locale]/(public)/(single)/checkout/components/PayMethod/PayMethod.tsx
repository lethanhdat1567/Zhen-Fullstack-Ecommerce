import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function PayMethod() {
    return (
        <div>
            <h2 className="mb-10 text-lg font-semibold">
                Phương thức thanh toán
            </h2>
            <Select>
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
