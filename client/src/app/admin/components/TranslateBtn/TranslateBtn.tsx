"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { translateService } from "@/services/translateService";
import { useState } from "react";
import slugify from "slugify";

interface TranslateBtnProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    activeLang: string;
    sourceLang?: string;
    fields: string[];
}

function TranslateBtn<T extends FieldValues>({
    form,
    activeLang,
    sourceLang = "vi",
    fields,
}: TranslateBtnProps<T>) {
    const [loading, setLoading] = useState(false);

    async function handleTranslate() {
        if (activeLang === sourceLang) return;

        // * Get Translation
        const translations: any[] = form.getValues(
            "translations" as any,
        ) as any;

        // * Get source
        const source = translations.find((t) => t.language_code === sourceLang);

        if (!source) return;

        try {
            setLoading(true);

            // * Get target index
            const index = translations.findIndex(
                (t) => t.language_code === activeLang,
            );

            if (index === -1) return;

            // * Loop and translate
            for (const field of fields) {
                const value = source[field];
                if (!value?.trim()) continue;

                const translated = await translateService.translate({
                    text: value,
                    source: sourceLang,
                    target: activeLang,
                });

                let finalValue = translated.translatedText;

                // Nếu là slug -> chuẩn hóa
                if (field === "slug") {
                    finalValue = slugify(finalValue, {
                        lower: true,
                        strict: true, // bỏ ký tự đặc biệt
                        locale: activeLang,
                        trim: true,
                    });
                }

                form.setValue(
                    `translations.${index}.${field}` as any,
                    finalValue as any,
                    {
                        shouldDirty: true,
                        shouldValidate: true,
                    },
                );
            }
        } catch (error) {
            console.error("Translate failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="my-4"
            onClick={handleTranslate}
            disabled={loading}
        >
            <Languages className="mr-2 h-4 w-4" />
            {loading ? "Đang dịch..." : "Dịch tự động"}
        </Button>
    );
}

export default TranslateBtn;
