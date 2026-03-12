import { StaticImageData } from "next/image";

export interface IIntroduceHistoryItem {
    year: number;
    content: string;
    thumbnail: string | StaticImageData;
}
