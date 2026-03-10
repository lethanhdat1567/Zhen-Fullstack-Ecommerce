import Logo from "@/components/Logo/Logo";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ProductInfo from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/FormInfo/FormInfo";
import { Separator } from "@/components/ui/separator";
import ProductSection from "@/app/[locale]/(public)/(single)/order/confirmation/components/SuccessBlock/components/ProductSection/ProductSection";
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

    return (
        <div className="container pt-10">
            <div className="mx-auto flex w-2xl flex-col items-center gap-4">
                <Logo />
                <h1 className="text-center text-4xl font-semibold text-green-700">
                    Thanh toán đơn hàng thành công
                </h1>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-10">
                <Card className="col-span-8">
                    <CardHeader>
                        <CardTitle>
                            Đơn hàng của bạn đã được đặt thành công.
                        </CardTitle>
                        <CardDescription>
                            Chúng tôi đã gửi email xác nhận đơn hàng.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ProductInfo
                            items={[
                                { label: "Email:", value: order.email },
                                { label: "Số điện thoại:", value: order.phone },
                                { label: "Địa chỉ:", value: order.address },
                                {
                                    label: "Phương thức thanh toán:",
                                    value: paymentMethodMap[
                                        order.paymentMethod
                                    ],
                                },
                                {
                                    label: "Trạng thái:",
                                    value: paymentStatusMap[
                                        order.paymentStatus
                                    ],
                                },
                            ]}
                        />

                        <Separator className="my-4" />

                        <ProductSection items={order.items} />
                    </CardContent>
                </Card>

                <div className="col-span-4">
                    <TotalSection total={order.totalAmount} />
                </div>
            </div>
        </div>
    );
}

export default SuccessBlock;
