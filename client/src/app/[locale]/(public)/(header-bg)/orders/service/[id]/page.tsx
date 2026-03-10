import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const booking = {
    id: "153d1731-6d5b-4a1c-b364-d934f7d2bd3c",
    customer_name: "Admin One",
    customer_email: "lethanhdat1567@gmail.com",
    customer_phone: "0901234567",

    check_in: "07/03/2026",
    check_out: "11/03/2026",
    guest_count: 2,

    total_price: 6000000,
    status: "pending",
    payment_method: "cod",
    payment_status: "unpaid",

    note: "Xin phòng có view hướng hồ và 1 giỏ trái cây.",

    created_at: "08/03/2026",

    service: {
        title: "Dịch vụ SEO",
        thumbnail: "/uploads/images/seo.jpg",
        capacity: 2,
        price: 1500000,
    },
};

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

function OrderServiceDetailPage() {
    return (
        <div className="container space-y-8 py-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Chi tiết đặt dịch vụ
                    </h1>
                    <p className="text-sm text-gray-500">
                        Mã đơn: {booking.id}
                    </p>
                    <p className="text-sm text-gray-500">
                        Ngày đặt: {booking.created_at}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Badge>Chờ xác nhận</Badge>
                    <Badge variant="outline">Chưa thanh toán</Badge>
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
                            src={booking.service.thumbnail}
                            alt={booking.service.title}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                        />

                        <div>
                            <p className="text-lg font-semibold">
                                {booking.service.title}
                            </p>

                            <p className="text-sm text-gray-500">
                                Sức chứa: {booking.service.capacity} người
                            </p>

                            <p className="text-sm text-gray-500">
                                Giá: {formatPrice(booking.service.price)}
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
                        {booking.check_in}
                    </p>

                    <p>
                        <span className="font-medium">Check out:</span>{" "}
                        {booking.check_out}
                    </p>

                    <p>
                        <span className="font-medium">Số khách:</span>{" "}
                        {booking.guest_count}
                    </p>

                    <p>
                        <span className="font-medium">Ghi chú:</span>{" "}
                        {booking.note}
                    </p>
                </CardContent>
            </Card>

            {/* Payment */}
            <Card>
                <CardHeader>
                    <CardTitle>Thanh toán</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">Phương thức:</span> Thanh
                        toán khi nhận hàng (COD)
                    </p>

                    <p>
                        <span className="font-medium">Trạng thái:</span> Chưa
                        thanh toán
                    </p>

                    <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                        <span>Tổng thanh toán</span>
                        <span className="text-green-600">
                            {formatPrice(booking.total_price)}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default OrderServiceDetailPage;
