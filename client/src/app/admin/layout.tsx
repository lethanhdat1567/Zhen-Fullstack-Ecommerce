import { ThemeProvider } from "@/app/admin/components/ThemeProvider/ThemeProvider";
import UserDropdown from "@/app/admin/components/UserDropdown/UserDropdown";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Inter } from "next/font/google";
import { ToggleTheme } from "./components/ToggleTheme/ToggleTheme";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider className={`${inter.className} antialiased`}>
                <AppSidebar />
                <SidebarInset className="h-screen w-screen overflow-x-hidden overflow-y-auto">
                    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                        </div>
                        <div className="flex items-center gap-6 pr-3">
                            <ToggleTheme />
                            <Separator
                                orientation="vertical"
                                className="h-6!"
                            />
                            <UserDropdown />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
