import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    videoUrl: string;
}

function ModalVideo({ isOpen, setIsOpen, videoUrl }: Props) {
    if (!isOpen || !videoUrl) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40"
            style={{ padding: "80px" }}
            onClick={() => setIsOpen(false)}
        >
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 cursor-pointer bg-[#1e1e1e99] p-2.5 text-white"
            >
                <X size={25} />
            </button>

            <div className="h-full w-full">
                <iframe
                    src={videoUrl}
                    title="Video"
                    allow="autoplay; encrypted-media"
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}

export default ModalVideo;
