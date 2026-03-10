export const formatDateVN = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
    });
};

type Lang = "vi" | "en" | "fr";

const localeMap: Record<Lang, string> = {
    vi: "vi-VN",
    en: "en-US",
    fr: "fr-FR",
};

export function formatDate(date: Date | string, lang: Lang = "vi") {
    return new Intl.DateTimeFormat(localeMap[lang], {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export function formatDateWithTime(date: Date | string, lang: Lang = "vi") {
    return new Intl.DateTimeFormat(localeMap[lang], {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}
