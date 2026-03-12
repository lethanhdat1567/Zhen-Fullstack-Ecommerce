"use client";

import { GalleriesType } from "@/app/admin/components/Galleries/Galleries";
import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";

type Props = { gallery: GalleriesType };

function MediaItem({ gallery }: Props) {
    return (
        <div className="h-24 w-full cursor-pointer border">
            {gallery.type === "image" && (
                <Image
                    src={resolveMediaSrc(gallery.file_url)}
                    className={`h-full w-full object-cover`}
                    width={500}
                    height={500}
                    alt={gallery.id}
                />
            )}

            {gallery.type === "video" && <div>Video</div>}
        </div>
    );
}

export default MediaItem;
