import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { envConfig } from "@/config/envConfig";
import responseMiddleware from "@/middlewares/response.middlewares";
import notFoundMiddleware from "@/middlewares/notFound.middleware";
import errorHandler from "@/middlewares/errorHandler.middleware";
import { cleanUploadsCron } from "@/cron/cleanUploads.cron";
import router from "@/routes";
import { backupDatabaseCron } from "@/cron/backup.cron";

const app = express();
cleanUploadsCron();
backupDatabaseCron();

/* =======================
   Middlewares
======================= */
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (envConfig.nodeEnv === "development") {
    app.use(morgan("dev"));
}

app.use(responseMiddleware);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* =======================
   Health check
======================= */
app.use("/api", router);

app.use(notFoundMiddleware);
app.use(errorHandler);

/* =======================
   Start server
======================= */
app.listen(envConfig.port, () => {
    console.log(`🚀 Server running at http://localhost:${envConfig.port}`);
});
