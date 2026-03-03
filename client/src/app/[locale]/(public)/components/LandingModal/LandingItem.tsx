import { resolveMediaSrc } from "@/lib/image";
import { Popup } from "@/services/popupService";
import Image from "next/image";

function LandingItem({ item }: { item: Popup }) {
    return (
        <div className="border-b py-5">
            <h2 className="mb-4 text-xl font-bold"># {item.title}</h2>
            <Image
                src={resolveMediaSrc(item.thumbnail)}
                alt="banner"
                width={1000}
                height={1000}
            />
            <p className="mt-4">{item.content}</p>
        </div>
    );
}

export default LandingItem;
