import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { envConfig } from "@/config/envConfig";

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
        <GoogleOAuthProvider clientId={envConfig.googleClientId as string}>
            <div className={`${inter.className}`}>{children}</div>;
        </GoogleOAuthProvider>
    );
}
