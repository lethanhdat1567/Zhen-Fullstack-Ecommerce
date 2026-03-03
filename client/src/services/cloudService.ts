import { http } from "@/lib/http/http";

/* =========================
   TYPES
========================= */

export type CloudinarySignatureResponse = {
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
};

export type UploadVideoResponse = {
    secure_url: string;
    public_id: string;
    duration: number;
    format: string;
};

export type ApiResponse<T> = {
    message?: string;
    data: T;
};

/* =========================
   SERVICE
========================= */

export const cloudService = {
    /* =========================
       GET SIGNATURE
    ========================= */
    async getSignature(folder: string) {
        const res = await http.post<ApiResponse<CloudinarySignatureResponse>>(
            "/cloudinary/signature",
            { folder },
        );

        return res.data;
    },

    /* =========================
       UPLOAD VIDEO
    ========================= */
    async uploadVideo(file: File, folder = "my_app_videos") {
        // 1️⃣ xin signature từ BE
        const signRes = await this.getSignature(folder);

        const { timestamp, signature, apiKey, cloudName } = signRes;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", folder);

        // 2️⃣ upload trực tiếp lên Cloudinary
        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
            {
                method: "POST",
                body: formData,
            },
        );

        if (!uploadRes.ok) {
            throw new Error("VIDEO_UPLOAD_FAILED");
        }

        const uploadData: UploadVideoResponse = await uploadRes.json();

        return {
            url: uploadData.secure_url,
            public_id: uploadData.public_id,
            duration: uploadData.duration,
            format: uploadData.format,
        };
    },
};
