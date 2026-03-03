import { MediaAlbum } from "@/app/admin/media/albums/columns";

export const mediaAlbumsMock: MediaAlbum[] = [
    {
        id: "1a1f1c1b-1111-4d4c-81e2-d858585ec101",
        status: "active",
        created_at: "2026-02-19T03:19:30.423Z",
        updated_at: "2026-02-19T03:19:30.423Z",
        category: {
            id: "cat-01",
            name: "Ảnh",
        },
        title: "Album ảnh cưới Đà Lạt",
        slug: "album-anh-cuoi-da-lat",
        description: "Bộ sưu tập ảnh cưới phong cách vintage tại Đà Lạt",
        galleries: [
            {
                id: "g1-1",
                type: "image",
                file_url: "/uploads/images/wedding1.jpg",
                sort_order: 1,
            },
            {
                id: "g1-2",
                type: "image",
                file_url: "/uploads/images/wedding2.jpg",
                sort_order: 2,
            },
        ],
    },
    {
        id: "2b2f2c2b-2222-4d4c-81e2-d858585ec102",
        status: "active",
        created_at: "2026-02-18T08:10:12.000Z",
        updated_at: "2026-02-18T08:10:12.000Z",
        category: {
            id: "cat-02",
            name: "Video",
        },
        title: "Highlight sự kiện khai trương",
        slug: "highlight-su-kien-khai-truong",
        description: "Video tổng hợp sự kiện khai trương showroom",
        galleries: [
            {
                id: "g2-1",
                type: "video",
                file_url: "/uploads/videos/opening.mp4",
                sort_order: 1,
            },
        ],
    },
    {
        id: "3c3f3c3b-3333-4d4c-81e2-d858585ec103",
        status: "active",
        created_at: "2026-02-17T10:22:45.000Z",
        updated_at: "2026-02-17T10:22:45.000Z",
        category: {
            id: "cat-01",
            name: "Ảnh",
        },
        title: "Album du lịch Phú Quốc",
        slug: "album-du-lich-phu-quoc",
        description: "Những khoảnh khắc đẹp tại Phú Quốc",
        galleries: [
            {
                id: "g3-1",
                type: "image",
                file_url: "/uploads/images/travel1.jpg",
                sort_order: 1,
            },
            {
                id: "g3-2",
                type: "image",
                file_url: "/uploads/images/travel2.jpg",
                sort_order: 2,
            },
            {
                id: "g3-3",
                type: "video",
                file_url: "/uploads/videos/travel-intro.mp4",
                sort_order: 3,
            },
        ],
    },
    {
        id: "4d4f4c4b-4444-4d4c-81e2-d858585ec104",
        status: "inactive",
        created_at: "2026-02-16T14:55:20.000Z",
        updated_at: "2026-02-16T14:55:20.000Z",
        category: {
            id: "cat-03",
            name: "Sự kiện",
        },
        title: "Album hội thảo công nghệ",
        slug: "album-hoi-thao-cong-nghe",
        description: "Hình ảnh hội thảo công nghệ 2026",
        galleries: [
            {
                id: "g4-1",
                type: "image",
                file_url: "/uploads/images/event1.jpg",
                sort_order: 1,
            },
        ],
    },
    {
        id: "5e5f5c5b-5555-4d4c-81e2-d858585ec105",
        status: "active",
        created_at: "2026-02-15T09:30:00.000Z",
        updated_at: "2026-02-15T09:30:00.000Z",
        category: {
            id: "cat-04",
            name: "Dự án",
        },
        title: "Album dự án nội thất cao cấp",
        slug: "album-du-an-noi-that-cao-cap",
        description: "Hình ảnh thi công và hoàn thiện dự án nội thất",
        galleries: [
            {
                id: "g5-1",
                type: "image",
                file_url: "/uploads/images/interior1.jpg",
                sort_order: 1,
            },
            {
                id: "g5-2",
                type: "image",
                file_url: "/uploads/images/interior2.jpg",
                sort_order: 2,
            },
        ],
    },
];
