import Image from "next/image";
import { IIntroduceHistoryItem } from "../../data";
import { images } from "@/assets/images";

type Props = {
    data: IIntroduceHistoryItem;
};

function IntroduceContent({ data }: Props) {
    return (
        <div className="flex justify-center lg:p-6">
            <div className="relative grid w-full max-w-6xl grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-[0_0_60px_rgba(159,57,154,0.15)] md:p-10 lg:grid-cols-12 lg:gap-6 lg:p-12.5">
                {/* Image */}
                <div className="lg:col-span-5">
                    <Image
                        src={data.thumbnail}
                        height={341}
                        alt=""
                        className="h-64 w-full rounded-2xl object-cover md:h-80 lg:h-85.25"
                    />
                </div>

                {/* Content */}
                <div className="lg:col-span-7 lg:pt-6.25">
                    <h3 className="mb-4 text-3xl font-bold text-(--primary-color) md:text-4xl lg:mb-7.5 lg:text-[50px]">
                        {data.year}
                    </h3>

                    <p className="text-sm text-[#4b4b4b] md:text-base">
                        {data.content}
                    </p>
                </div>

                {/* Decor */}
                <Image
                    src={images.decorHis}
                    alt="decor"
                    className="pointer-events-none absolute right-0 bottom-0 w-24 md:w-32 lg:w-auto"
                />
            </div>
        </div>
    );
}

export default IntroduceContent;
