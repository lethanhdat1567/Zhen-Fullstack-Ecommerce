"use client";

import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderConfirmItem } from "@/app/[locale]/(public)/(single)/order/confirmation/page";
import { resolveMediaSrc } from "@/lib/image";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/utils/formatPrice";

interface ProductSectionProps {
    items: OrderConfirmItem[];
}

function ProductSection({ items }: ProductSectionProps) {
    const t = useTranslations("OrderConfirmation.success");

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-20">
                        {t("tableThumbnail")}
                    </TableHead>
                    <TableHead>{t("tableProduct")}</TableHead>
                    <TableHead className="text-center">
                        {t("tableQuantity")}
                    </TableHead>
                    <TableHead className="text-right">
                        {t("tablePrice")}
                    </TableHead>
                    <TableHead className="text-right">
                        {t("tableTotal")}
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <Image
                                src={resolveMediaSrc(product.thumbnail)}
                                alt={product.title}
                                width={50}
                                height={50}
                                className="h-15 w-15 rounded-md object-cover"
                            />
                        </TableCell>

                        <TableCell className="font-medium">
                            {product.title}
                        </TableCell>

                        <TableCell className="text-center">
                            {product.quantity}
                        </TableCell>

                        <TableCell className="text-right">
                            {formatPrice(product.price)}
                        </TableCell>

                        <TableCell className="text-right font-semibold">
                            {formatPrice(product.total)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ProductSection;
