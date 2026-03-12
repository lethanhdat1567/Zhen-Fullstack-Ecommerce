import Image from "next/image";
import { IRecruitmentItem } from "../../data";

interface IProp {
    item: IRecruitmentItem;
    isFirst?: boolean;
    isLast?: boolean;
}

function RecruitmentItem({ item, isFirst, isLast }: IProp) {
    const words = item.title.split(" ");
    const mid = Math.ceil(words.length / 2);

    const firstLine = words.slice(0, mid).join(" ");
    const secondLine = words.slice(mid).join(" ");

    return (
        <div
            className={`group relative h-75 w-full overflow-hidden lg:h-118 ${isFirst ? "rounded-tl-[60px] lg:rounded-tl-[100px]" : ""} ${isLast ? "rounded-br-[60px] lg:rounded-br-[100px]" : ""} `}
        >
            <Image src={item.thumbnail} fill alt="" className="object-cover" />

            {/* overlay tím hover */}
            <div className="absolute inset-0 origin-top scale-y-0 bg-(--primary-color)/60 transition-transform duration-500 group-hover:scale-y-100" />

            {/* thanh dọc */}
            <div className="absolute top-24 left-0 h-12 w-1 bg-(--primary-color) transition-colors duration-500 group-hover:bg-white sm:top-28 sm:h-14 lg:top-35 lg:h-15" />

            {/* content */}
            <div className="absolute top-10 h-full px-6 py-8 text-white sm:px-8 sm:py-10 md:top-4 lg:top-10 lg:px-10 lg:py-15">
                <h3 className="mb-3 text-[16px] leading-snug font-semibold sm:mb-4 sm:text-[18px] md:text-[20px] lg:mb-6 lg:text-[22px]">
                    {firstLine}
                    <br />
                    {secondLine}
                </h3>

                <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[14px]">
                    {item.content}
                </p>
            </div>
        </div>
    );
}

export default RecruitmentItem;
