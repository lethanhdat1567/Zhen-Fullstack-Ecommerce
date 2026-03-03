import Image from "next/image";
import { useState } from "react";
import ModalImg from "@/components/Modal/ModalImg/ModalImg";
import { MediaAlbum } from "@/services/mediaAlbumService";
import { resolveMediaSrc } from "@/lib/image";

interface Props {
    setHoveredId: (v: string | null) => void;
    id: string;
    item: MediaAlbum;
    icon: React.ReactNode;
}

export default function IntroduceFacilitiesOverlay({
    setHoveredId,
    id,
    item,
    icon,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setIsOpen(true)}
                className="group relative h-full w-full cursor-pointer overflow-hidden"
            >
                <Image
                    src={resolveMediaSrc(item.thumbnail)}
                    alt=""
                    fill
                    className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex translate-y-10 flex-col items-center justify-center pb-10 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="mb-5 text-lg font-bold">{item.title}</h3>

                    <div className="flex w-80.75 flex-col items-center justify-center">
                        <p className="text-center text-[15px]">
                            {item.description}
                        </p>
                        <div className="mt-8.75">{icon}</div>
                    </div>
                </div>
            </div>
            <ModalImg
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                images={item.galleries}
            />
        </>
    );
}
