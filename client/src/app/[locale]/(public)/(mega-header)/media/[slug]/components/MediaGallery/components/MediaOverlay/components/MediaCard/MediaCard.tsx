import { resolveMediaSrc } from "@/lib/image";
import { MediaAlbum } from "@/services/mediaAlbumService";
import Image from "next/image";
import { CirclePlay, Images } from "lucide-react";

interface Props {
    mediaAlbum: MediaAlbum;
}

function MediaCard({ mediaAlbum }: Props) {
    const albumType = mediaAlbum.galleries[0].type;

    const albumIcon = {
        image: <Images size={50} strokeWidth={1} />,
        video: <CirclePlay size={50} strokeWidth={1} />,
        all: <Images size={50} strokeWidth={1} />,
    };

    return (
        <>
            {/* IMAGE */}
            <Image
                src={resolveMediaSrc(mediaAlbum.thumbnail)}
                alt={mediaAlbum.title}
                fill
                className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-(--primary-color)/50 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="mb-2.5 text-white">{albumIcon[albumType]}</div>
                <h3 className="text-lg text-white">{mediaAlbum.title}</h3>
            </div>
        </>
    );
}

export default MediaCard;
