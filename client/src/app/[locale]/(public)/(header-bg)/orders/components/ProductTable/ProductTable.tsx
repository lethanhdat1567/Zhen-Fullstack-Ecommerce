import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CardItem from "@/app/[locale]/(public)/(header-bg)/orders/components/ProductTable/components/CardItem/CardItem";
import { OrderHistory } from "@/services/orderHistoryService";

function ProductTable({ orders }: { orders: OrderHistory[] }) {
    return (
        <div>
            <h2 className="mb-2 text-lg font-semibold">Sản phẩm:</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã đơn</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-right">Tổng tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order) => (
                        <CardItem key={order.id} order={order} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ProductTable;
