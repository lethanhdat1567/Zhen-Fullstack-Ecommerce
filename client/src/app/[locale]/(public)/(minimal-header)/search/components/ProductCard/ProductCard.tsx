import { Product } from "@/app/[locale]/(public)/(minimal-header)/search/page";
import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
};

function ProductCard({ product }: Props) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex gap-4 rounded-lg border p-3 transition hover:shadow-sm"
        >
            {/* Thumbnail */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
                <Image
                    src={resolveMediaSrc(product.thumbnail)}
                    alt={product.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="group-hover:text-primary line-clamp-1 text-sm font-semibold">
                        {product.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {product.description}
                    </p>
                </div>

                <span className="mt-2 text-base font-semibold text-green-600">
                    {product.sale_price || product.price}
                </span>
            </div>
        </Link>
    );
}

export default ProductCard;
