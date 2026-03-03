import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IMediaItem {
    thumbnail: string | StaticImageData;
    gallery?: (string | StaticImageData)[];
    videoUrl?: string;
    fileUrl?: string;
}
export type MediaSlug = "hinh-anh" | "video" | "e-brochure";
export const mediaMockData = {
    "hinh-anh": [
        {
            thumbnail: images.DSC5622,
            gallery: [
                images.USAFlat,
                images.DSC5622,
                images.VNFlat,
                images.fallback,
                images.USAFlat,
                images.DSC5622,
            ],
        },
        {
            thumbnail: images.DSC5622,
            gallery: [
                images.USAFlat,
                images.DSC5622,
                images.VNFlat,
                images.fallback,
                images.USAFlat,
                images.DSC5622,
            ],
        },
        {
            thumbnail: images.DSC5622,
            gallery: [
                images.USAFlat,
                images.DSC5622,
                images.VNFlat,
                images.fallback,
                images.USAFlat,
                images.DSC5622,
            ],
        },
    ],

    video: [
        {
            thumbnail: images.fallback,
            gallery: [images.USAFlat, images.DSC5622],
            videoUrl:
                "https://www.youtube.com/embed/d6pgocXnK8U?si=m675HC9CEe_PHjWg",
        },
    ],
    "e-brochure": [
        {
            fileUrl: "/files/N23DVCN048_ThaiThanhQuan_BT_Ch7.pdf",
        },
    ],
};
