import { Request, Response } from "express";
import { translate } from "@vitalets/google-translate-api";

export const translateController = {
    async post(req: Request, res: Response) {
        try {
            const { text, source, target } = req.body;

            if (!text || !target) {
                return res.error("Missing text or target language", 400);
            }

            const result = await translate(text, {
                from: source || "auto",
                to: target,
            });

            return res.success(
                {
                    translatedText: result.text,
                },
                200,
            );
        } catch (error: any) {
            return res.error(error.message || "Translate failed", 500);
        }
    },
};
