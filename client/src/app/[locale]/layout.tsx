import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Montserrat } from "next/font/google";
import LandingModal from "@/app/[locale]/(public)/components/LandingModal/LandingModal";
import QuickContact from "@/app/[locale]/(public)/components/QuickContact/QuickContact";
import { ReactLenis } from "lenis/react";
import { CartProvider } from "@/components/CartProvider/CartProvider";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
});

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;

    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ReactLenis root>
                <CartProvider>
                    <div className={` ${montserrat.className}`}>
                        {children}
                        {/* <QuickContact /> */}
                    </div>
                    <LandingModal />
                </CartProvider>
            </ReactLenis>
        </NextIntlClientProvider>
    );
}
