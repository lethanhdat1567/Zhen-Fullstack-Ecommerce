import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IAwardItem {
    id: number;
    title: string;
    image: string | StaticImageData;
}

export const awardsData: IAwardItem[] = [
    {
        id: 1,
        title: "Giải thưởng Top 5 Spa đạt chuẩn cuộc bình chọn “TP.HCM 100 điều thú vị” lần I (2009)",
        image: images.fallback,
    },
    {
        id: 2,
        title: "Giải thưởng Top 5 Spa đạt chuẩn cuộc bình chọn “TP.HCM 100 điều thú vị” lần II (2012)",
        image: images.DSC5622,
    },
    {
        id: 4,
        title: "Giải thưởng The Guide Awards (2012)",
        image: images.VNFlat,
    },
    {
        id: 5,
        title: "Giải thưởng The Guide Awards (2012)",
        image: images.bg_service,
    },
    {
        id: 6,
        title: "Giải thưởng The Guide Awards (2012)",
        image: images.fallback,
    },
    {
        id: 7,
        title: "Giải thưởng The Guide Awards (2012)",
        image: images.DSC5622,
    },
    {
        id: 8,
        title: "Giải thưởng The Guide Awards (2012)",
        image: images.VNFlat,
    },
];
