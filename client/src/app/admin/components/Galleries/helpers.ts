export type MediaType = "image" | "video" | "all";

export const getAcceptByType = (type?: MediaType): string => {
    switch (type) {
        case "image":
            return "image/*";
        case "video":
            return "video/*";
        case "all":
        default:
            return "image/*,video/*";
    }
};
