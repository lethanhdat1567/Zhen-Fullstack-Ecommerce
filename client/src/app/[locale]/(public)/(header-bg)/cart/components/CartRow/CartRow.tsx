import CartItem from "@/app/[locale]/(public)/(header-bg)/cart/components/CartRow/CartItem";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";

function CartRow() {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <CartItem />
            </TableCell>
            <TableCell>80.000₫</TableCell>
            <TableCell>
                <div className="flex items-center">
                    <Button variant={"outline"}>
                        <Plus />
                    </Button>
                    <span className="flex h-9 w-10 items-center justify-center border-t border-b">
                        2
                    </span>
                    <Button variant={"outline"}>
                        <Minus />
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-right">80.000₫</TableCell>
        </TableRow>
    );
}

export default CartRow;
