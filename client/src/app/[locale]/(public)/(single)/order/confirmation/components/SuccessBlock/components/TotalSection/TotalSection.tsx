import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface TotalSectionProps {
    total: number;
}

function TotalSection({ total }: TotalSectionProps) {
    const shipping = 0;
    const subtotal = total - shipping;

    const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex justify-between text-base">
                    <span className="text-gray-500">Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-base">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                </div>

                <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                    <span>Tổng thanh toán</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                </div>

                <Button className="mt-2 w-full">
                    Lịch sử mua hàng <ChevronRight />
                </Button>
            </CardContent>
        </Card>
    );
}

export default TotalSection;
