export const formatDateVN = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
    });
};
