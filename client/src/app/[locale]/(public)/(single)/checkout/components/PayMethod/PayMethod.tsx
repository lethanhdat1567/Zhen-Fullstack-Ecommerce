"use client";

import { checkoutSchema } from "@/app/[locale]/(public)/(single)/checkout/schema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { useTranslations } from "next-intl";

type Props = {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>;
};

function PayMethod({ form }: Props) {
    const t = useTranslations("Checkout");
    const paymentMethod = form.watch("payment_method");

    return (
        <div>
            <h2 className="mb-9 text-lg font-semibold">{t("paymentMethod")}</h2>
            <Select
                value={paymentMethod}
                onValueChange={(value: "cod" | "vnpay") => {
                    form.setValue("payment_method", value);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("paymentPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="cod">{t("paymentCOD")}</SelectItem>
                        <SelectItem value="vnpay">
                            {t("paymentVNPAY")}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default PayMethod;
