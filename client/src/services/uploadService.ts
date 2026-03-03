import { http } from "@/lib/http/http";

export type UploadResponse = {
    url: string;
    type: "image" | "video";
};

export const uploadService = {
    /* ================= SINGLE ================= */

    async uploadSingle(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await http.post<any>("/upload", formData, {});

        return res;
    },

    /* ================= MULTIPLE ================= */

    async uploadMultiple(files: File[]) {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        const res = await http.post<any>("/upload/multiple", formData, {});

        return res;
    },
};
