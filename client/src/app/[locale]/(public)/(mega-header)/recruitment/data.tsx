import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IRecruitmentItem {
    thumbnail: string | StaticImageData;
}

export const recruitmentData: IRecruitmentItem[] = [
    {
        thumbnail: images.td1,
    },
    {
        thumbnail: images.td2,
    },
    {
        thumbnail: images.td3,
    },
    {
        thumbnail: images.td2,
    },
];
