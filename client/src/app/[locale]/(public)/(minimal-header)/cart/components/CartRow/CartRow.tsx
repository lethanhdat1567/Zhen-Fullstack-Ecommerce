import CartItem from "@/app/[locale]/(public)/(minimal-header)/cart/components/CartRow/CartItem";
import CartRowQuantity from "@/app/[locale]/(public)/(minimal-header)/cart/components/CartRow/CartRowQuantity";
import { TableCell, TableRow } from "@/components/ui/table";
import { CartItem as CartType } from "@/services/cartService";
import { cartUtils } from "@/utils/cartUtils";

type Props = {
    cart: CartType;
};

function CartRow({ cart }: Props) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <CartItem item={cart} />
            </TableCell>
            <TableCell>
                {cartUtils.formatCurrency(
                    cart.product.sale_price || cart.product.price,
                )}
            </TableCell>
            <TableCell>
                <CartRowQuantity item={cart} />
            </TableCell>
            <TableCell className="text-right font-medium">
                {cartUtils.formatCurrency(cartUtils.getItemSubtotal(cart))}
            </TableCell>
        </TableRow>
    );
}

export default CartRow;
