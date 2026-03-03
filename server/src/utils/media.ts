import fs from "fs";
import path from "path";

export const deleteFile = async (filePath: string) => {
    try {
        const fullPath = path.join(process.cwd(), filePath);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    } catch (error) {
        console.error("Delete file error:", error);
    }
};

export const deleteMultipleFiles = async (paths: string[]) => {
    for (const filePath of paths) {
        await deleteFile(filePath);
    }
};
