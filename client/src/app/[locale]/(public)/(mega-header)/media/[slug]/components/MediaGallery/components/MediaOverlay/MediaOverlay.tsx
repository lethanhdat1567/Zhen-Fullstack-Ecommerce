"use client";

import { MediaAlbum } from "@/services/mediaAlbumService";
import ModalImg from "@/components/Modal/ModalImg/ModalImg";
import { useState } from "react";
import MediaCard from "@/app/[locale]/(public)/(mega-header)/media/[slug]/components/MediaGallery/components/MediaOverlay/components/MediaCard/MediaCard";

interface Props {
    mediaAlbum: MediaAlbum;
}

export default function MediaOverlay({ mediaAlbum }: Props) {
    const [open, setOpen] = useState(false);

    const galleries = [...mediaAlbum.galleries].sort(
        (a, b) => a.sort_order - b.sort_order,
    );

    return (
        <>
            <div
                className="group relative h-full w-full cursor-pointer overflow-hidden"
                onClick={() => setOpen(true)}
            >
                <MediaCard mediaAlbum={mediaAlbum} />
            </div>
            <ModalImg isOpen={open} setIsOpen={setOpen} images={galleries} />
        </>
    );
}
