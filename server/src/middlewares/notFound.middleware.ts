import { AppError } from "@/utils/appError";
import { Request, Response, NextFunction } from "express";

const notFoundMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

export default notFoundMiddleware;
