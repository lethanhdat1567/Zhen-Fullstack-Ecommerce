import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingService } from "@/services/bookingService";
import { resolveMediaSrc } from "@/lib/image";
import { formatDateWithTime } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import PaymentMethodBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/PaymentMethodBadge/PaymentMethodBadge";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

async function OrderServiceDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const booking = await bookingService.getById(id);
    return (
        <div className="container space-y-8 py-10">
            <BackBtn />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Chi tiết đặt dịch vụ
                    </h1>

                    <p className="text-sm text-gray-500">
                        Mã đơn: #{booking.id.slice(-6)}
                    </p>

                    <p className="text-sm text-gray-500">
                        Ngày đặt:{" "}
                        {formatDateWithTime(new Date(booking.created_at))}
                    </p>
                </div>

                <div className="flex gap-2">
                    <StatusBadge status={booking.status} />
                </div>
            </div>

            {/* Customer */}
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">Họ tên:</span>{" "}
                        {booking.customer_name}
                    </p>

                    <p>
                        <span className="font-medium">Email:</span>{" "}
                        {booking.customer_email}
                    </p>

                    <p>
                        <span className="font-medium">Số điện thoại:</span>{" "}
                        {booking.customer_phone}
                    </p>
                </CardContent>
            </Card>

            {/* Service */}
            <Card>
                <CardHeader>
                    <CardTitle>Dịch vụ</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex gap-4">
                        <Image
                            src={resolveMediaSrc(booking.service.thumbnail)}
                            alt={booking.service.title || ""}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                        />

                        <div className="space-y-1">
                            <p className="text-lg font-semibold">
                                {booking.service.title}
                            </p>

                            <p className="text-sm text-gray-500">
                                Sức chứa: {booking.service.capacity} người
                            </p>

                            <p className="text-sm text-gray-500">
                                Giá dịch vụ:{" "}
                                {formatPrice(Number(booking.service.price))}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Booking info */}
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin đặt dịch vụ</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">Check in:</span>{" "}
                        {formatDateWithTime(new Date(booking.check_in))}
                    </p>

                    <p>
                        <span className="font-medium">Check out:</span>{" "}
                        {formatDateWithTime(new Date(booking.check_out))}
                    </p>

                    <p>
                        <span className="font-medium">Số khách:</span>{" "}
                        {booking.guest_count}
                    </p>

                    {booking.note && (
                        <p>
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {booking.note}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Payment */}
            <Card>
                <CardHeader>
                    <CardTitle>Thanh toán</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Phương thức</span>
                        <PaymentMethodBadge
                            method={booking.payment_method as any}
                        />
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Trạng thái</span>
                        <span>
                            {booking.payment_status === "paid"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                        </span>
                    </div>

                    <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                        <span>Tổng thanh toán</span>

                        <span className="text-green-600">
                            {formatPrice(Number(booking.total_price))}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default OrderServiceDetailPage;
