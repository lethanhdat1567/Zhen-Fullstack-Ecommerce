// src/config/envConfig.ts
import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
    port: process.env.PORT || 8000,
    nodeEnv: process.env.NODE_ENV || "development",

    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessExpires: process.env.JWT_ACCESS_EXPIRES!,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES!,

    db: {
        host: process.env.DATABASE_HOST!,
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        name: process.env.DATABASE_NAME!,
    },

    mail: {
        host: process.env.MAIL_HOST!,
        port: Number(process.env.MAIL_PORT),
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
        from: process.env.MAIL_FROM!,
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
    },
    vnpay: {
        tmnCode: process.env.VNPAY_TMN_CODE!,
        hashSecret: process.env.VNPAY_HASH_SECRET!,
        url: process.env.VNPAY_URL!,
        returnUrl: process.env.VNPAY_RETURN_URL!,
        ipnUrl: process.env.VNPAY_IPN_URL!,

        version: process.env.VNPAY_VERSION || "2.1.0",
        command: process.env.VNPAY_COMMAND || "pay",
        currCode: process.env.VNPAY_CURR_CODE || "VND",
        locale: process.env.VNPAY_LOCALE || "vn",
    },
};
