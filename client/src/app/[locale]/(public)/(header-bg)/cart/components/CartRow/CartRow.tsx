import CartItem from "@/app/[locale]/(public)/(header-bg)/cart/components/CartRow/CartItem";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { CartItem as CartType } from "@/services/cartService";
import { cartUtils } from "@/utils/cartUtils";
import { Minus, Plus } from "lucide-react";

type Props = {
    cart: CartType;
};

function CartRow({ cart }: Props) {
    return (
        <TableRow>
            <TableCell>
                <Checkbox />
            </TableCell>
            <TableCell className="font-medium">
                <CartItem />
            </TableCell>
            <TableCell>
                {cartUtils.formatCurrency(
                    cart.product.sale_price || cart.product.price,
                )}
            </TableCell>
            <TableCell>
                <div className="flex items-center">
                    <Button variant={"outline"}>
                        <Plus />
                    </Button>
                    <span className="flex h-9 w-10 items-center justify-center border-t border-b">
                        {cart.quantity}
                    </span>
                    <Button variant={"outline"}>
                        <Minus />
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-right font-medium">
                {cartUtils.formatCurrency(cartUtils.getItemSubtotal(cart))}
            </TableCell>
        </TableRow>
    );
}

export default CartRow;
