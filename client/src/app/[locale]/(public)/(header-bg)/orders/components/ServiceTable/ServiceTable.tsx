import CardItem from "@/app/[locale]/(public)/(header-bg)/orders/components/ServiceTable/components/CardItem/CardItem";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookingHistory } from "@/services/orderHistoryService";

function ServiceTable({ bookings }: { bookings: BookingHistory[] }) {
    return (
        <div>
            <h2 className="mb-2 text-lg font-semibold">Dịch vụ:</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã</TableHead>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead className="text-right">Tổng tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thanh toán</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((bk) => (
                        <CardItem key={bk.id} booking={bk} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ServiceTable;
