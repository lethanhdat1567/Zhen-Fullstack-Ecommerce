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
        <div className="w-full">
            <h2 className="mb-4 text-lg font-semibold md:mb-9">
                {t("paymentMethod")}
            </h2>
            <Select
                value={paymentMethod}
                onValueChange={(value: "cod" | "vnpay") => {
                    form.setValue("payment_method", value);
                }}
            >
                <SelectTrigger className="h-10 w-full md:h-12">
                    <SelectValue placeholder={t("paymentPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="cod" className="py-3 md:py-2">
                            {t("paymentCOD")}
                        </SelectItem>
                        <SelectItem value="vnpay" className="py-3 md:py-2">
                            {t("paymentVNPAY")}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default PayMethod;
