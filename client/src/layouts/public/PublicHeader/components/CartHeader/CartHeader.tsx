import { Button } from "@/components/ui/button";
import CartHeaderItem from "@/layouts/public/PublicHeader/components/CartHeader/CartHeaderItem";
import { ShoppingBag } from "lucide-react";

function CartHeader() {
    return (
        <div className="group/cart relative">
            <Button variant="ghost" size={"icon-lg"} className="rounded-full">
                <ShoppingBag size={30} />
            </Button>

            <div className="invisible absolute right-0 bottom-0 z-999 w-100 translate-y-[96%] scale-95 bg-white text-black opacity-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cart:visible group-hover/cart:translate-y-full group-hover/cart:scale-100 group-hover/cart:opacity-100">
                <div className="max-h-97.5 overflow-y-auto" data-lenis-prevent>
                    <CartHeaderItem />
                    <CartHeaderItem />
                    <CartHeaderItem />
                    <CartHeaderItem />
                    <CartHeaderItem />
                    <CartHeaderItem />
                </div>
                <div className="flex items-center justify-between px-2 py-5">
                    <span className="flex text-lg font-medium">Tổng tiền:</span>
                    <p className="text-lg font-semibold text-(--primary-color)">
                        1.000.000đ
                    </p>
                </div>
                <div className="w-full p-2">
                    <Button className="w-full rounded-full bg-(--primary-color) py-5!">
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartHeader;
