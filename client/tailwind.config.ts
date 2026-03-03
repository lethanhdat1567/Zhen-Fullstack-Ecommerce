import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                slowPing: {
                    "0%": { transform: "scale(1)", opacity: "0.6" },
                    "70%": { transform: "scale(1.8)", opacity: "0.2" },
                    "100%": { transform: "scale(2.2)", opacity: "0" },
                },
            },
            animation: {
                "slow-ping": "slowPing 3s cubic-bezier(0,0,0.2,1) infinite",
            },
        },
    },
    plugins: [],
};

export default config;
