"use client";

import Title from "@/app/admin/components/Title/Title";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { resolveMediaSrc } from "@/lib/image";
import { siteSettingService } from "@/services/siteService";
import { uploadService } from "@/services/uploadService";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function UploadLogo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fetchLogo = async () => {
        try {
            const res = await siteSettingService.get();
            setPreviewUrl(res.logo as string);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLogo();
    }, []);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadService.uploadSingle(file);

            setPreviewUrl(res.data.url);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSave() {
        try {
            if (!previewUrl) return;

            await siteSettingService.update({
                logo: previewUrl,
            });

            toast.success("Cập nhật logo thành công");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div>
            <Title title="Quản lý Logo" className="mt-5 pb-3" />

            <div className="flex items-start gap-4 pb-6">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />

                {previewUrl ? (
                    <div className="relative h-50 w-50 overflow-hidden rounded-sm">
                        <Image
                            src={resolveMediaSrc(previewUrl)}
                            fill
                            className="object-contain"
                            alt="Logo"
                        />
                    </div>
                ) : (
                    <div className="flex h-50 w-50 items-center justify-center rounded-sm border border-dashed">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => inputRef.current?.click()}
                        >
                            Tải logo <Upload />
                        </Button>
                    </div>
                )}

                <div>
                    <div className="text-muted-foreground space-y-1 text-xs">
                        <p>• Định dạng hỗ trợ: JPG, PNG, WEBP</p>
                        <p>• Dung lượng tối đa: 2MB</p>
                        <p>• Kích thước khuyến nghị: 200x200px</p>
                    </div>

                    <Button type="button" className="mt-4" onClick={handleSave}>
                        Lưu ảnh
                    </Button>

                    {previewUrl && (
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4 ml-2"
                            onClick={() => {
                                if (inputRef.current) {
                                    inputRef.current.value = "";
                                    inputRef.current.click();
                                }
                            }}
                        >
                            Đổi ảnh
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadLogo;
