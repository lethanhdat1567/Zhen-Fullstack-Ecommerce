"use client";
import { images } from "@/assets/images";
import Image from "next/image";
import { Play } from "lucide-react";
import ModalVideo from "@/components/Modal/ModalVideo/ModalVideo";
import { useState } from "react";

function IntroduceVideo() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="group relative cursor-pointer overflow-hidden">
            <Image
                src={images.fallback}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-in group-hover:scale-125"
            />
            <div
                className="absolute inset-0 flex items-center justify-center text-white"
                onClick={() => setIsOpen(true)}
            >
                <div
                    className="flex items-center justify-center rounded-full border border-white"
                    style={{ height: "150px", width: "150px" }}
                >
                    <Play size={32} className="ml-1" />
                </div>
            </div>

            <ModalVideo
                videoUrl="https://www.youtube.com/embed/W4UeUJA9wLU?si=QdjNWu_m_AwH-959"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    );
}

export default IntroduceVideo;
