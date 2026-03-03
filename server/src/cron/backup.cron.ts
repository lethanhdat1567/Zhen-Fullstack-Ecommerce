import cron from "node-cron";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { envConfig } from "@/config/envConfig";

const backupFolder = path.join(process.cwd(), "backups");

// đảm bảo folder tồn tại
if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder);
}

export const backupDatabaseCron = () => {
    cron.schedule("*0 2 * * *", () => {
        console.log("📦 Starting database backup...");

        const date = new Date().toISOString().replace(/[:.]/g, "-");
        const backupPath = path.join(backupFolder, `backup-${date}.sql`);

        const command = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump.exe" -h ${envConfig.db.host} -u ${envConfig.db.user} -p"${envConfig.db.password}" ${envConfig.db.name} > "${backupPath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Backup error:", error);
                return;
            }

            console.log("✅ Backup created:", backupPath);
        });
    });
};
