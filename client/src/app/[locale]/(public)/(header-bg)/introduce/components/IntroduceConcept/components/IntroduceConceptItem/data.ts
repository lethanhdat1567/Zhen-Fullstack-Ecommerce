import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IConceptItem {
    id: number;
    title: string;
    description: string;
    thumbnail: string | StaticImageData;
}

export const introductConceptData: IConceptItem[] = [
    {
        id: 1,
        title: "Khứu giác",
        description:
            "Mùi hương dễ chịu từ tinh dầu thiên nhiên lan tỏa khắp không gian giúp thư giãn ngay khi bước vào spa.",
        thumbnail: images.icon_1,
    },
    {
        id: 2,
        title: "Thị giác",
        description:
            "Không gian tối giản, ánh sáng dịu nhẹ đưa tâm trí vào trạng thái tĩnh lặng và thư thái.",
        thumbnail: images.icon_2,
    },
    {
        id: 3,
        title: "Vị giác",
        description:
            "Thức uống thảo mộc thanh mát không chỉ ngon mà còn tốt cho sức khỏe và làn da.",
        thumbnail: images.icon_3,
    },
    {
        id: 4,
        title: "Xúc giác",
        description:
            "Liệu trình massage giúp cơ thể thả lỏng, tái tạo năng lượng và mang lại cảm giác dễ chịu.",
        thumbnail: images.icon_4,
    },
    {
        id: 5,
        title: "Thính giác",
        description:
            "Âm nhạc trị liệu nhẹ nhàng giúp xóa tan căng thẳng và đưa bạn vào giấc ngủ sâu.",
        thumbnail: images.icon_5,
    },
];
