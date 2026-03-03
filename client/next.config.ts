import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/uploads/**",
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
