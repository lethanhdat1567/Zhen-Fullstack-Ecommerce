import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
import { envConfig } from "@/config/envConfig";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
    host: envConfig.db.host,
    user: envConfig.db.user,
    password: envConfig.db.password,
    database: envConfig.db.name,
    connectionLimit: 20,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
