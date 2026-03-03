import { resolveMediaSrc } from "@/lib/image";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
    id: string;
    src: string;
    onDestroy: (id: string) => void;
    type: "image" | "video";
};

function GalleriesItem({ id, src, onDestroy, type }: Props) {
    const mediaSrc = resolveMediaSrc(src);

    return (
        <div className="group/galleries relative h-37 w-full rounded-md transition">
            {type === "image" ? (
                <Image
                    className="h-full w-full object-cover"
                    src={mediaSrc}
                    alt="Gallery item"
                    width={500}
                    height={500}
                />
            ) : (
                <video
                    className="h-full w-full object-cover"
                    src={mediaSrc as string}
                    controls
                    preload="metadata"
                />
            )}

            <button
                type="button"
                className="absolute -top-2 -right-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white bg-black text-white shadow"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    onDestroy(id);
                }}
            >
                <X size={15} />
            </button>
        </div>
    );
}

export default GalleriesItem;
