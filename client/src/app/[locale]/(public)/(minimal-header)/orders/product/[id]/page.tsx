import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { orderService } from "@/services/orderService";
import { formatDateWithTime } from "@/utils/formatDate";
import { resolveMediaSrc } from "@/lib/image";
import { formatPrice } from "@/utils/formatPrice";
import { getLocale } from "next-intl/server";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";
import StatusBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/StatusBadge/StatusBadge";
import PaymentMethodBadge from "@/app/[locale]/(public)/(header-bg)/orders/components/PaymentMethodBadge/PaymentMethodBadge";

async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const locale = await getLocale();

    const order = await orderService.getOrderDetail(id, locale);

    return (
        <div className="container space-y-8 py-10">
            <BackBtn />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Chi tiết đơn hàng #{order.id.slice(-6)}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Ngày đặt:{" "}
                        {formatDateWithTime(new Date(order.created_at))}
                    </p>
                </div>

                <div className="flex gap-2">
                    <StatusBadge status={order.status} />
                </div>
            </div>

            {/* Customer info */}
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">Họ tên:</span>{" "}
                        {order.full_name}
                    </p>

                    <p>
                        <span className="font-medium">Email:</span>{" "}
                        {order.email}
                    </p>

                    <p>
                        <span className="font-medium">Số điện thoại:</span>{" "}
                        {order.phone_number}
                    </p>

                    <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {order.shipping_address}
                    </p>

                    <p>
                        <span className="font-medium">Phương thức:</span>{" "}
                        <PaymentMethodBadge method={order.payment_method} />
                    </p>

                    {order.note && (
                        <p>
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {order.note}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Product list */}
            <Card>
                <CardHeader>
                    <CardTitle>Sản phẩm</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">Ảnh</TableHead>
                                <TableHead>Sản phẩm</TableHead>
                                <TableHead className="text-center">
                                    Số lượng
                                </TableHead>
                                <TableHead className="text-right">
                                    Giá
                                </TableHead>
                                <TableHead className="text-right">
                                    Tổng
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {order.order_items.map((item: any) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Image
                                                src={resolveMediaSrc(
                                                    item.product.thumbnail,
                                                )}
                                                alt={item.product.title}
                                                width={50}
                                                height={50}
                                                className="h-14 w-14 rounded-md object-cover"
                                            />
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {item.product.title}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {item.quantity}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatPrice(item.price)}
                                        </TableCell>

                                        <TableCell className="text-right font-semibold">
                                            {formatPrice(
                                                item.price * item.quantity,
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Tóm tắt thanh toán</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Tạm tính</span>
                        <span>{formatPrice(Number(order.total_amount))}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Tổng thanh toán</span>

                        <span className="text-green-600">
                            {formatPrice(Number(order.total_amount))}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductDetailPage;
