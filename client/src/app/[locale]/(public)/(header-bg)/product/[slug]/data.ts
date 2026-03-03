import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IProductItem {
    id: string;
    category?: string;
    title: string;
    price: number;
    thumbnail: string | StaticImageData;
    gallery: (string | StaticImageData)[];

    description?: string[];
    introduction?: string[];
}
export type ProductSlug = "can-ho-dich-vu" | "san-pham-spa";
export const productMockData = {
    "can-ho-dich-vu": [
        {
            id: "massage-thai-60p",
            category: "Chăm sóc toàn thân",
            title: "Massage kiểu Thái truyền thống (60 phút)",
            price: 660000,
            thumbnail: images.DSC5622,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: [
                "Kéo giãn cơ thể theo phong cách Thái",
                "Bấm huyệt tăng tuần hoàn máu",
                "Giảm đau nhức vai gáy",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "massage-aroma-90p",
            category: "Chăm sóc thư giãn",
            title: "Massage tinh dầu Aroma (90 phút)",
            price: 820000,
            thumbnail: images.USAFlat,
            gallery: [images.USAFlat, images.DSC5622, images.VNFlat],
            description: [
                "Thư giãn với tinh dầu thiên nhiên",
                "Giảm stress, cải thiện giấc ngủ",
                "Massage nhẹ nhàng toàn thân",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "hot-stone-75p",
            category: "Chăm sóc chuyên sâu",
            title: "Massage đá nóng (75 phút)",
            price: 750000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622, images.USAFlat],
            description: [
                "Đá nóng giúp giãn cơ nhanh",
                "Tăng tuần hoàn máu",
                "Giảm đau mỏi lưng",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
    ],

    "san-pham-spa": [
        {
            id: "tinh-dau-thu-gian",
            category: "Tinh dầu",
            title: "Tinh dầu thư giãn thiên nhiên",
            price: 320000,
            thumbnail: images.DSC5622,
            gallery: [images.DSC5622, images.USAFlat],
            description: [
                "Chiết xuất từ thảo mộc thiên nhiên",
                "Hỗ trợ giảm căng thẳng",
                "Hương thơm dịu nhẹ",
            ],
            introduction: [
                "Muối tinh thương mại là loại muối thường sử dụng hàng ngày, được làm sạch bằng hóa chất, tẩy trắng và nung ở nhiệt độ cao không cần thiết. Ngoài ra, muối tinh thương mại được xử lý bằng các chất chống đóng cứng nhằm ngăn chặn muối hòa tan với nước trong quá trình sản xuất.",
                "Muối tự nhiên – muối Himalaya được hình thành từ 250 triệu năm tại dãy núi Himalaya trải dài khắp châu Á qua Trung Quốc, Nepal, Myanmar, Pakistan, Bhutan, Afghanistan và Ấn Độ. Tại đây muối được hình thành bởi sự kết tinh muối biển (mà sau 250 triệu năm lại nằm sâu bên trong Himalayans) được bao phủ bởi nham thạch. Việc giữ muối trong môi trường hoang sơ được bao phủ bởi băng tuyết qua hàng thế kỷ, bảo vệ muối khỏi sự ô nhiễm mà muối hồng Himalaya được giới khoa học công nhận là loại muối giàu dưỡng chất, tinh khiết nhất hành tinh.",
                "Muối hồng Himalaya là một sự kết hợp tuyệt vời để giải độc và phục hồi cơ thể. Muối hồng Himalaya tạo ra lực tác động mạnh mẽ để giải độc cơ thể của bạn. Các chất dinh dưỡng bổ sung kích thích lưu thông và làm dịu đau cơ. Với thành phần 100 % tự nhiên giàu 80+ khoáng chất nuôi dưỡng và phục hồi da, tắm bằng muối tắm Himalaya là một kinh nghiệm chữa bệnh và trị liệu cho tâm trí và cơ thể.",
            ],
        },
        {
            id: "da-mat-na-collagen",
            category: "Chăm sóc da",
            title: "Mặt nạ Collagen phục hồi da",
            price: 180000,
            thumbnail: images.USAFlat,
            gallery: [images.USAFlat, images.VNFlat],
            description: [
                "Cấp ẩm sâu cho da",
                "Tăng độ đàn hồi",
                "Làm sáng da tự nhiên",
            ],
            introduction: [
                "Mặt nạ collagen phù hợp cho da khô.",
                "Dùng sau liệu trình chăm sóc da.",
            ],
        },
        {
            id: "muoi-tam-thao-duoc",
            category: "Chăm sóc cơ thể",
            title: "Muối tắm thảo dược",
            price: 250000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622],
            description: [
                "Tẩy tế bào chết nhẹ nhàng",
                "Làm sạch và mềm da",
                "Hương thảo dược dễ chịu",
            ],
            introduction: [
                "Muối tắm giúp thư giãn sau ngày dài.",
                "Phù hợp dùng tại nhà hoặc spa.",
            ],
        },
    ],
};
