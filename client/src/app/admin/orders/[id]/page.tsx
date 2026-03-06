import { orderService } from "@/services/orderService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDateVN } from "@/utils/formatDate";
import { resolveMediaSrc } from "@/lib/image";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

type Props = {
    params: {
        id: string;
    };
};

function getStatusBadge(status: string) {
    switch (status) {
        case "pending":
            return <Badge className="bg-yellow-500">Chờ xử lý</Badge>;
        case "processing":
            return <Badge className="bg-blue-500">Đang xử lý</Badge>;
        case "completed":
            return <Badge className="bg-green-600">Hoàn thành</Badge>;
        case "cancelled":
            return <Badge className="bg-red-500">Đã hủy</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

function getPaymentBadge(status: string) {
    switch (status) {
        case "paid":
            return <Badge className="bg-green-600">Đã thanh toán</Badge>;
        case "pending":
            return <Badge className="bg-yellow-500">Chờ thanh toán</Badge>;
        case "unpaid":
            return <Badge className="bg-gray-500">Chưa thanh toán</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

async function OrderDetailPage({ params }: Props) {
    const { id } = await params;
    const order = await orderService.getOrderDetail(id);

    return (
        <div className="space-y-6 p-6">
            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <BackBtn />
                        <h1 className="text-2xl font-semibold">
                            Đơn hàng #{order.id.slice(0, 8)}
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {formatDateVN(order.created_at)}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                            Trạng thái:
                        </span>
                        {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                            Thanh toán:
                        </span>
                        {getPaymentBadge(order.payment_status)}
                    </div>
                </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* CUSTOMER */}
                <Card>
                    <CardHeader>
                        <CardTitle>Khách hàng</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Tên:</span>{" "}
                            {order.full_name}
                        </p>

                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {order.email || "-"}
                        </p>

                        <p>
                            <span className="font-medium">SĐT:</span>{" "}
                            {order.phone_number}
                        </p>
                    </CardContent>
                </Card>

                {/* SHIPPING */}
                <Card>
                    <CardHeader>
                        <CardTitle>Địa chỉ giao hàng</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                        <p>{order.shipping_address}</p>

                        {order.note && (
                            <p className="text-muted-foreground">
                                Ghi chú: {order.note}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* PAYMENT */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thanh toán</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Phương thức:</span>{" "}
                            {order.payment_method.toUpperCase()}
                        </p>

                        <p>
                            <span className="font-medium">Trạng thái:</span>{" "}
                            {getPaymentBadge(order.payment_status)}
                        </p>

                        <p>
                            <span className="font-medium">Tổng tiền:</span>{" "}
                            {Number(order.total_amount).toLocaleString()}₫
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* ORDER ITEMS */}
            <Card>
                <CardHeader>
                    <CardTitle>Sản phẩm</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        Sản phẩm
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        Giá
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        SL
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Thành tiền
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.order_items.map((item: any) => {
                                    const title =
                                        item.product.translations?.[0]?.title;

                                    return (
                                        <tr key={item.id} className="border-t">
                                            <td className="flex items-center gap-3 px-4 py-3">
                                                <Image
                                                    src={resolveMediaSrc(
                                                        item.thumbnail,
                                                    )}
                                                    alt={title}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-md border object-cover"
                                                />

                                                <span className="font-medium">
                                                    {title}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {Number(
                                                    item.price,
                                                ).toLocaleString()}
                                                ₫
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {item.quantity}
                                            </td>

                                            <td className="px-4 py-3 text-right font-medium">
                                                {(
                                                    Number(item.price) *
                                                    item.quantity
                                                ).toLocaleString()}
                                                ₫
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                            <tfoot>
                                <tr className="bg-muted/30 border-t">
                                    <td
                                        colSpan={3}
                                        className="px-4 py-3 text-right font-semibold"
                                    >
                                        Tổng
                                    </td>

                                    <td className="px-4 py-3 text-right text-lg font-bold">
                                        {Number(
                                            order.total_amount,
                                        ).toLocaleString()}
                                        ₫
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default OrderDetailPage;
