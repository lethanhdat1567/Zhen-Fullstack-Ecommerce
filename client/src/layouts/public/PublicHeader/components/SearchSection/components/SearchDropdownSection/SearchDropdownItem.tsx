import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";

function SearchDropdownItem({ item }: { item: any }) {
    return (
        <div
            key={item.id}
            className="flex cursor-pointer items-center gap-2 rounded-sm p-1 transition hover:bg-neutral-100"
        >
            <Image
                src={resolveMediaSrc(item.thumbnail)}
                alt=""
                width={200}
                height={200}
                className="h-10 w-10 rounded-sm object-cover"
            />
            <h2 className="text-sm">
                {item.translations?.[0]?.title || "No title"}
            </h2>
        </div>
    );
}

export default SearchDropdownItem;
