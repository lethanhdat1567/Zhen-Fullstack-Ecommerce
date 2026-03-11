"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function ErrorBlock() {
    const t = useTranslations("OrderConfirmation.error");

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <XCircle className="h-16 w-16 text-red-500" />

            <h2 className="text-2xl font-semibold text-red-600">
                {t("title")}
            </h2>

            <p className="max-w-md text-gray-500">{t("description")}</p>

            <div className="mt-4 flex gap-3">
                <Button asChild>
                    <Link href="/checkout">{t("retryButton")}</Link>
                </Button>

                <Button variant="outline" asChild>
                    <Link href="/">{t("homeButton")}</Link>
                </Button>
            </div>
        </div>
    );
}

export default ErrorBlock;
