"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";
import { uploadService } from "@/services/uploadService";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    value: string | undefined; // URL từ server
    onChange: (file: string) => void; // chỉ trả file
    onRemove: () => void; // clear URL
    onError: (error: string) => void;
}

function UploadThumbnail({ value, onChange, onRemove, onError }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (loading) return;

        setLoading(true);
        try {
            onError("");
            const res = await uploadService.uploadSingle(file);

            onChange(res.data.url);
        } catch (error) {
            if (error instanceof HttpError) {
                if (
                    error.status === 400 &&
                    error.message === "FILE_SIZE_LIMIT_EXCEEDED"
                ) {
                    onError("Dung lượng ảnh vượt quá 5MB");
                    toast.error("Dung lượng ảnh vượt quá 5MB");
                } else if (
                    error.status === 400 &&
                    error.message === "UNSUPPORTED_MEDIA_TYPE"
                ) {
                    onError(
                        "Chỉ chấp nhận file hình ảnh (JPG, JPEG, PNG, WebP)",
                    );
                    toast.error(
                        "Chỉ chấp nhận file hình ảnh (JPG, JPEG, PNG, WebP)",
                    );
                }
            }
        } finally {
            setLoading(false);
        }

        e.target.value = "";
    };

    const handleRemove = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onRemove?.();
    };

    return (
        <div className="relative flex h-70 w-full items-center justify-center overflow-hidden rounded-sm border border-dashed">
            {/* Hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            {value ? (
                <>
                    <Image
                        src={resolveMediaSrc(value)}
                        alt="thumbnail"
                        width={500}
                        height={500}
                        className="h-full w-full object-contain"
                    />

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 cursor-pointer rounded-full bg-black/60 p-1 text-white hover:bg-black"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleClick}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                Đang tải <Spinner />
                            </>
                        ) : (
                            <>
                                Tải ảnh <Upload className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                    <p className="text-muted-foreground text-sm">
                        Chấp nhận định dạng: JPEG, JPG, PNG, WebP (Tối đa 5MB)
                    </p>
                </div>
            )}
        </div>
    );
}

export default UploadThumbnail;
