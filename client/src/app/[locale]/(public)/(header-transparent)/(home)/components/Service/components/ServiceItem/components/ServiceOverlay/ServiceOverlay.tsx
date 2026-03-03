import { images } from "@/assets/images";
import Image from "next/image";
import Button from "../../../../../../../../../../../components/Button/button";
import { content } from "../../../../data";

type Props = {
    title: string;
    desc: string;
};

function ServiceOverlay({ title, desc }: Props) {
    return (
        <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center bg-(--primary-color)/70 px-8 text-center text-white transition-transform duration-700 ease-in-out group-hover/service:translate-y-0">
            <div className="mb-6">
                <h4 className="text-xl font-semibold uppercase">{title}</h4>
                <div className="mt-4">
                    <Image
                        src={images.lotus}
                        width={73}
                        height={16}
                        alt="lotus"
                        className="mx-auto brightness-0 invert"
                    />
                </div>
            </div>
            <p className="max-w-md text-[15px] leading-5">{desc}</p>

            <Button className="mt-6 border transition-all duration-300 hover:shadow-[1px_1px_#ffffff,2px_2px_#ffffff,3px_3px_#ffffff]">
                Xem tất cả
            </Button>
        </div>
    );
}

export default ServiceOverlay;
