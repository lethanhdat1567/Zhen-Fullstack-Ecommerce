"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
    breadcrumbData: {
        title: string;
        href?: string;
    }[];
};

function BreadcrumbBanner({ breadcrumbData }: Props) {
    const t = useTranslations("Site");

    const fullBreadcrumb = [
        { title: t("breadcrumb"), href: "/" },
        ...breadcrumbData,
    ];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {fullBreadcrumb.map((item, index) => {
                    const isLast = index === fullBreadcrumb.length - 1;

                    return (
                        <div key={index} className="flex items-center">
                            <BreadcrumbItem>
                                {isLast || !item.href ? (
                                    <BreadcrumbPage>
                                        {item.title}
                                    </BreadcrumbPage>
                                ) : (
                                    <Link href={item.href}>{item.title}</Link>
                                )}
                            </BreadcrumbItem>

                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadcrumbBanner;
