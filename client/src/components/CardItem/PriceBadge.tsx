import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formatPrice";

interface PriceBadgeProps {
    price: number | string;
    sale_price: number | string | null;
    className?: string;
}

export default function PriceBadge({
    price,
    sale_price,
    className,
}: PriceBadgeProps) {
    const numPrice = Number(price);
    const numSalePrice = Number(sale_price);
    const hasSale = numSalePrice > 0 && numSalePrice < numPrice;

    return (
        <div
            className={cn(
                "flex items-center gap-2 font-sans text-xl sm:text-2xl",
                className,
            )}
        >
            {/* Giá chính */}
            <div className="flex items-baseline">
                <span className="font-bold tracking-tighter text-(--primary-color)">
                    {formatPrice(hasSale ? numSalePrice : numPrice)}
                </span>
            </div>

            {/* Giá cũ - Chỉ hiện khi có sale, đặt cạnh nhau cực gọn */}
            {hasSale && (
                <span className="text-sm font-medium text-gray-400/80 line-through decoration-1">
                    {formatPrice(numPrice)}
                </span>
            )}

            {/* Trường hợp miễn phí */}
            {!numPrice && !numSalePrice && (
                <span className="text-sm font-bold tracking-widest text-(--primary-color) uppercase">
                    Free
                </span>
            )}
        </div>
    );
}
