import Image from "next/image";
import { images } from "@/assets/images";
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
import { Badge } from "@/components/ui/badge";
import {
    paymentMethodMap,
    paymentStatusMap,
} from "@/app/[locale]/(public)/(header-bg)/orders/helpers";

const order = {
    id: "ORD-123456",
    createdAt: "10/03/2026",
    status: "processing",
    paymentStatus: "unpaid",
    paymentMethod: "cod",
    customer: {
        name: "Lê Thành Đạt",
        email: "dat.dev@gmail.com",
        phone: "0901234567",
        address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    items: [
        {
            id: 1,
            title: "Omega 3 Tinh Khiết",
            thumbnail: images.fallback,
            quantity: 2,
            price: 30000,
        },
        {
            id: 2,
            title: "Vitamin D3",
            thumbnail: images.fallback,
            quantity: 1,
            price: 120000,
        },
    ],
};

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

function ProductDetailPage() {
    const subtotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="container space-y-8 py-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Chi tiết đơn hàng #{order.id}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Ngày đặt: {order.createdAt}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Badge>Đang xử lý</Badge>
                    <Badge variant="outline">Chưa thanh toán</Badge>
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
                        {order.customer.name}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span>{" "}
                        {order.customer.email}
                    </p>
                    <p>
                        <span className="font-medium">Số điện thoại:</span>{" "}
                        {order.customer.phone}
                    </p>
                    <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {order.customer.address}
                    </p>
                    <p>
                        <span className="font-medium">Phương thức:</span>{" "}
                        {paymentMethodMap[order.paymentMethod]}
                    </p>

                    <p>
                        <span className="font-medium">Trạng thái:</span>{" "}
                        {paymentStatusMap[order.paymentStatus]}
                    </p>
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
                                <TableHead className="w-[80px]">Ảnh</TableHead>
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
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            width={50}
                                            height={50}
                                            className="rounded-md object-cover"
                                        />
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {item.title}
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
                            ))}
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
                        <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Tổng thanh toán</span>
                        <span className="text-green-600">
                            {formatPrice(total)}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductDetailPage;
