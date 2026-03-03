// src/lib/mailer.ts
import nodemailer from "nodemailer";
import { envConfig } from "@/config/envConfig";

export const mailer = nodemailer.createTransport({
    host: envConfig.mail.host,
    port: envConfig.mail.port,
    secure: false, // true nếu port 465
    auth: {
        user: envConfig.mail.user,
        pass: envConfig.mail.pass,
    },
});
