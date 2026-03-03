import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
    title: string;
    thumbnail: string;
    isScale?: boolean;
};

function ProductItem({ title, thumbnail, isScale }: Props) {
    return (
        <div
            className={`relative h-68 transition-transform duration-300 ${
                isScale ? "z-10 scale-100 lg:scale-110" : "scale-100"
            }`}
        >
            <Link href="/">
                <Image
                    src={resolveMediaSrc(thumbnail)}
                    alt=""
                    fill
                    className="object-cover"
                />
            </Link>

            <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-(--primary-color)/60 py-4">
                <h3 className="text-[14px] text-white">{title}</h3>
            </div>
        </div>
    );
}

export default ProductItem;
