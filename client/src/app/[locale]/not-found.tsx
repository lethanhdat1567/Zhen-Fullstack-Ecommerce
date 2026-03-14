"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const router = useRouter();
    const t = useTranslations("NotFound");

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            {/* Minh họa Icon */}
            <div className="relative mb-8">
                <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full"></div>
                <div className="bg-primary/5 relative flex h-24 w-24 items-center justify-center rounded-full">
                    <FileQuestion className="text-primary h-12 w-12" />
                </div>
            </div>

            {/* Nội dung thông báo */}
            <h1 className="text-primary mb-2 text-6xl font-extrabold tracking-tight md:text-8xl">
                404
            </h1>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                {t("title") || "Không tìm thấy trang"}
            </h2>
            <p className="mx-auto mb-10 max-w-md text-gray-600">
                {t("description") ||
                    "Có vẻ như đường dẫn này không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại địa chỉ URL."}
            </p>

            {/* Nhóm nút điều hướng */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("back") || "Quay lại"}
                </Button>

                <Button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2"
                >
                    <Home className="h-4 w-4" />
                    {t("home") || "Về trang chủ"}
                </Button>
            </div>

            {/* Trang trí thêm (Tùy chọn) */}
            <div className="mt-16 grid grid-cols-3 gap-8 opacity-20">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <div className="bg-primary h-2 w-2 rounded-full"></div>
            </div>
        </div>
    );
}
