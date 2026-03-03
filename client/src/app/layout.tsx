import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import SliceSession from "@/app/(auth)/SliceSession/SliceSession";

export const metadata: Metadata = {
    title: "Your Company",
    description: "Company website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={`antialiased`}>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster />
                <SliceSession />
            </body>
        </html>
    );
}
