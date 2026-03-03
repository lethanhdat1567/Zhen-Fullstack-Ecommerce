import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    console.log(err);

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    res.error(
        {
            message,
        },
        statusCode,
    );
};

export default errorHandler;
