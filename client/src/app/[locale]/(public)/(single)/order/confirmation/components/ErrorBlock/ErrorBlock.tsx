"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function ErrorBlock() {
    const t = useTranslations("OrderConfirmation.error");

    return (
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-12 text-center md:py-24">
            <XCircle className="h-16 w-16 text-red-500 md:h-20 md:w-20" />

            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-red-600 md:text-2xl">
                    {t("title")}
                </h2>
                <p className="mx-auto max-w-sm text-sm text-gray-500 md:max-w-md md:text-base">
                    {t("description")}
                </p>
            </div>

            <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button asChild className="h-12 px-8 sm:h-10">
                    <Link href="/checkout">{t("retryButton")}</Link>
                </Button>

                <Button variant="outline" asChild className="h-12 px-8 sm:h-10">
                    <Link href="/">{t("homeButton")}</Link>
                </Button>
            </div>
        </div>
    );
}

export default ErrorBlock;
