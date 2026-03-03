import { GalleriesType } from "@/app/admin/components/Galleries/Galleries";
import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";

type Props = {
    gallery: GalleriesType;
};

function MediaThumbnail({ gallery }: Props) {
    return (
        <div>
            {gallery.type === "image" && (
                <Image
                    src={resolveMediaSrc(gallery.file_url)}
                    alt="preview"
                    width={800}
                    height={600}
                    className="h-120 w-full object-contain"
                />
            )}

            {gallery.type === "video" && (
                <video
                    src={resolveMediaSrc(gallery.file_url) as string}
                    controls
                    className="h-120 w-full object-contain"
                />
            )}
        </div>
    );
}

export default MediaThumbnail;
