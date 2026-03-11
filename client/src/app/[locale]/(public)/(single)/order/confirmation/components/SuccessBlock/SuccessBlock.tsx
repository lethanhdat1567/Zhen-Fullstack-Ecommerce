import Logo from "@/components/Logo/Logo";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import OrderInfo from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/FormInfo/FormInfo";
import { Separator } from "@/components/ui/separator";
import ItemSection from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/ProductSection/ProductSection";
import TotalSection from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/TotalSection/TotalSection";
import { OrderConfirmationResult } from "@/app/[locale]/(public)/(single)/order/confirmation/page";

interface SuccessBlockProps {
    order: OrderConfirmationResult;
}

function SuccessBlock({ order }: SuccessBlockProps) {
    const paymentMethodMap: Record<string, string> = {
        cod: "Thanh toán khi nhận hàng",
        vnpay: "VNPay",
        momo: "MoMo",
    };

    const paymentStatusMap: Record<string, string> = {
        paid: "Đã thanh toán",
        unpaid: "Chưa thanh toán",
        failed: "Thanh toán thất bại",
    };

    const orderLabelMap = {
        product: {
            title: "Thanh toán đơn hàng thành công",
            description: "Đơn hàng của bạn đã được đặt thành công.",
        },
        service: {
            title: "Đặt dịch vụ thành công",
            description: "Dịch vụ của bạn đã được đặt thành công.",
        },
    };

    const labels = orderLabelMap[order.type];

    const infoItems = [
        { label: "Email:", value: order.email },
        { label: "Số điện thoại:", value: order.phone },

        ...(order.type === "product" && order.address
            ? [{ label: "Địa chỉ:", value: order.address }]
            : []),

        {
            label: "Phương thức thanh toán:",
            value: paymentMethodMap[order.paymentMethod] || order.paymentMethod,
        },
        {
            label: "Trạng thái:",
            value: paymentStatusMap[order.paymentStatus] || order.paymentStatus,
        },
    ];

    return (
        <div className="container pt-10">
            {/* Header */}
            <div className="mx-auto flex w-2xl flex-col items-center gap-4">
                <Logo />
                <h1 className="text-center text-4xl font-semibold text-green-700">
                    {labels.title}
                </h1>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-10">
                {/* Order info */}
                <Card className="col-span-8">
                    <CardHeader>
                        <CardTitle>{labels.description}</CardTitle>
                        <CardDescription>
                            Chúng tôi đã gửi email xác nhận đơn hàng.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <OrderInfo items={infoItems} />

                        <Separator className="my-4" />

                        <ItemSection items={order.items} />
                    </CardContent>
                </Card>

                {/* Total */}
                <div className="col-span-4">
                    <TotalSection total={order.totalAmount} />
                </div>
            </div>
        </div>
    );
}

export default SuccessBlock;
