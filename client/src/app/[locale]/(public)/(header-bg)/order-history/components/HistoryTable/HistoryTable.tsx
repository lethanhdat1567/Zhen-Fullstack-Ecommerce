import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Đảm bảo đã install Button shadcn
import { RefreshCw } from "lucide-react"; // Icon mua lại
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { cartUtils } from "@/utils/cartUtils";

interface OrderItem {
    product: {
        thumbnail: string;
        title: string;
    };
    quantity: number;
    price: string;
}

interface Order {
    id: string;
    total_amount: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    created_at: string;
    order_items: OrderItem[];
}

function HistoryTable({ data }: { data: Order[] }) {
    // Hàm xử lý Mua lại
    const handleReorder = (order: Order) => {
        // Giả sử bạn có hàm addToCart trong cartUtils hoặc dùng context/redux
        console.log("Reordering items from order:", order.id);

        // Logic mẫu: lặp qua các item và add vào giỏ hàng
        // order.order_items.forEach(item => {
        //    cartStore.addItem({ id: item.product_id, quantity: item.quantity });
        // });

        alert("Đã thêm các sản phẩm vào giỏ hàng!");
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge
                        variant="outline"
                        className="border-yellow-200 bg-yellow-100 text-yellow-700"
                    >
                        Chờ thanh toán
                    </Badge>
                );
            case "processing":
                return (
                    <Badge
                        variant="outline"
                        className="border-blue-200 bg-blue-100 text-blue-700"
                    >
                        Đang xử lý
                    </Badge>
                );
            case "completed":
                return (
                    <Badge
                        variant="outline"
                        className="border-green-200 bg-green-100 text-green-700"
                    >
                        Hoàn thành
                    </Badge>
                );
            case "cancelled":
                return <Badge variant="destructive">Đã hủy</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Mã đơn</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>Ngày đặt</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Tổng cộng</TableHead>
                        <TableHead className="w-[100px] text-center">
                            Thao tác
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((order) => (
                            <TableRow key={order.id} className="group">
                                <TableCell className="text-xs font-medium">
                                    #{order.id.split("-")[0].toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        {order.order_items.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <div className="relative h-8 w-8 overflow-hidden rounded border">
                                                        <Image
                                                            src={resolveMediaSrc(
                                                                item.product
                                                                    .thumbnail,
                                                            )}
                                                            alt={
                                                                item.product
                                                                    .title
                                                            }
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span className="max-w-[180px] truncate">
                                                        {item.product.title}{" "}
                                                        <span className="text-muted-foreground text-xs font-normal">
                                                            x{item.quantity}
                                                        </span>
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString("vi-VN")}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(order.status)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {cartUtils.formatCurrency(
                                        order.total_amount,
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:bg-primary hover:text-primary-foreground h-8 w-8 p-0 transition-colors"
                                        title="Mua lại đơn này"
                                        onClick={() => handleReorder(order)}
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                Không tìm thấy đơn hàng nào.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default HistoryTable;
