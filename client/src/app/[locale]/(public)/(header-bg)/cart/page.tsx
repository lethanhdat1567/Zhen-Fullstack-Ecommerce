import CartRow from "@/app/[locale]/(public)/(header-bg)/cart/components/CartRow/CartRow";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function CartPage() {
    return (
        <div className="mb-20">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Giỏ hàng",
                        href: "/cart",
                    },
                ]}
            />
            <div className="container">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Thông tin sản phẩm</TableHead>
                            <TableHead>Đơn giá</TableHead>
                            <TableHead>Số lượng</TableHead>
                            <TableHead className="text-right">
                                Thành tiền
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <CartRow />
                        <CartRow />
                        <CartRow />
                        <CartRow />
                    </TableBody>
                </Table>
                <div className="mt-10 ml-auto flex w-sm flex-col items-end">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg">Tổng tiền:</p>
                        <p className="text-xl font-semibold text-(--primary-color)">
                            450.000₫
                        </p>
                    </div>
                    <Button className="mt-4 w-full rounded-sm bg-(--primary-color) py-6!">
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
