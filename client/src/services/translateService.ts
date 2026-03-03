import { http } from "@/lib/http/http";

export type TranslateParams = {
    text: string;
    source?: string;
    target: string;
};

type TranslateResponse = {
    translatedText: string;
};

export const translateService = {
    async translate({ text, source, target }: TranslateParams) {
        const res = await http.post<{
            data: TranslateResponse;
        }>(
            "/translate",
            {
                text,
                source,
                target,
            },
            {
                cache: "no-store",
            },
        );

        return res.data;
    },
};
