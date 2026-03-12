import { StaticImageData } from "next/image";
import { images } from "@/assets/images";

export interface IFacilityItem {
    id: number;
    title: string;
    subTitle: string;
    gallery: (string | StaticImageData)[];
    thumbnail: string | StaticImageData;
}

export const facilitiesData: IFacilityItem[] = [
    {
        id: 1,
        title: "Tầng 1",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 2,
        title: "Tầng 2",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 3,
        title: "Tầng 3",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 4,
        title: "Tầng 4",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 5,
        title: "Tầng 5",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 6,
        title: "Tầng 6",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
    {
        id: 7,
        title: "Tầng 7",
        subTitle: "Không gian dành riêng các dịch vụ Foot massage",
        gallery: [
            images.USAFlat,
            images.DSC5622,
            images.VNFlat,
            images.fallback,
            images.USAFlat,
            images.DSC5622,
        ],
        thumbnail: images.fallback,
    },
];
