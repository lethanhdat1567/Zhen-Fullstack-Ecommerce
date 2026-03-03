"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { uploadService } from "@/services/uploadService";
import { GalleriesType } from "@/app/admin/components/Galleries/Galleries";
import { v4 as uuid } from "uuid";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";
import {
    getAcceptByType,
    MediaType,
} from "@/app/admin/components/Galleries/helpers";
import { Spinner } from "@/components/ui/spinner";
import { cloudService } from "@/services/cloudService";

interface Props {
    multiple?: boolean;
    type?: MediaType;
    onChange: (files: GalleriesType[]) => void;
    currentTotalGalleries: number;
    onError: (error: string) => void;
}

function UploadBtn({
    multiple = true,
    onChange,
    type,
    currentTotalGalleries = 0,
    onError,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    function handleClick() {
        inputRef.current?.click();
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        if (loading) return;

        setLoading(true);
        try {
            onError("");
            if (type === "image") {
                const res = await uploadService.uploadMultiple(files);

                // * Format orders
                const formatted = res.data.map((item: any, index: number) => ({
                    ...item,
                    sort_order: currentTotalGalleries + index + 1,
                    id: uuid(),
                    file_url: item.url,
                }));
                onChange(formatted);
            } else if (type === "video") {
                const MAX_VIDEO = 50 * 1024 * 1024;

                // 🔎 Validate trước khi upload
                const validVideos = files.filter((file) => {
                    if (!file.type.startsWith("video/")) {
                        toast.error("File không đúng định dạng video");
                        return false;
                    }

                    if (file.size > MAX_VIDEO) {
                        toast.error(
                            "Dung lượng video không được vượt quá 50MB",
                        );
                        return false;
                    }

                    return true;
                });

                if (!validVideos.length) return;

                const uploaded = await Promise.all(
                    validVideos.map(async (file, index) => {
                        const result = await cloudService.uploadVideo(file);

                        return {
                            id: uuid(),
                            file_url: result.url,
                            public_id: result.public_id,
                            duration: result.duration,
                            format: result.format,
                            type: "video",
                            sort_order: currentTotalGalleries + index + 1,
                        };
                    }),
                );

                onChange(uploaded as any);
            } else if (type === "all") {
                const MAX_IMAGE = 5 * 1024 * 1024;
                const MAX_VIDEO = 50 * 1024 * 1024;

                const images: File[] = [];
                const videos: File[] = [];

                for (const file of files) {
                    if (file.type.startsWith("image/")) {
                        if (file.size > MAX_IMAGE) {
                            toast.error(
                                "Dung lượng ảnh không được vượt quá 5MB",
                            );
                            continue;
                        }
                        images.push(file);
                    } else if (file.type.startsWith("video/")) {
                        if (file.size > MAX_VIDEO) {
                            toast.error(
                                "Dung lượng video không được vượt quá 50MB",
                            );
                            continue;
                        }
                        videos.push(file);
                    } else {
                        toast.error("File không được hỗ trợ");
                    }
                }

                let results: any[] = [];

                // 🔹 Upload ảnh nếu có
                if (images.length) {
                    const res = await uploadService.uploadMultiple(images);

                    const formattedImages = res.data.map(
                        (item: any, index: number) => ({
                            ...item,
                            id: uuid(),
                            file_url: item.url,
                            type: "image",
                            sort_order:
                                currentTotalGalleries +
                                results.length +
                                index +
                                1,
                        }),
                    );

                    results = [...results, ...formattedImages];
                }

                // 🔹 Upload video nếu có
                if (videos.length) {
                    const uploadedVideos = await Promise.all(
                        videos.map(async (file, index) => {
                            const result = await cloudService.uploadVideo(file);

                            return {
                                id: uuid(),
                                file_url: result.url,
                                public_id: result.public_id,
                                duration: result.duration,
                                format: result.format,
                                type: "video",
                                sort_order:
                                    currentTotalGalleries +
                                    results.length +
                                    index +
                                    1,
                            };
                        }),
                    );

                    results = [...results, ...uploadedVideos];
                }

                if (results.length) {
                    onChange(results);
                }
            }
        } catch (error) {
            console.log(error);
            if (
                error instanceof HttpError &&
                error.status === 400 &&
                error.message === "FILE_SIZE_LIMIT_EXCEEDED"
            ) {
                if (type === "image") {
                    toast.error("Dung lượng ảnh không được vượt quá 5MB");
                    onError("Dung lượng ảnh không được vượt quá 5MB");
                } else if (type === "video") {
                    toast.error("Dung lượng video không được vượt quá 50MB");
                    onError("Dung lượng video không được vượt quá 50MB");
                } else {
                    toast.error(
                        "Dung lượng file không được vượt quá 5MB (ảnh) và 100MB (video)",
                    );
                    onError(
                        "Dung lượng file không được vượt quá 5MB (ảnh) và 100MB (video)",
                    );
                }
            }
        } finally {
            setLoading(false);
        }

        e.target.value = "";
    }

    return (
        <>
            <Button
                type="button"
                onClick={handleClick}
                variant={"outline"}
                disabled={loading}
            >
                {loading ? (
                    <>
                        Đang tải <Spinner />
                    </>
                ) : (
                    <>
                        Tải thêm ảnh <Upload size={16} />
                    </>
                )}
            </Button>

            <input
                ref={inputRef}
                type="file"
                hidden
                multiple={multiple}
                accept={getAcceptByType(type)}
                onChange={handleFileChange}
                disabled={loading}
            />
        </>
    );
}

export default UploadBtn;
