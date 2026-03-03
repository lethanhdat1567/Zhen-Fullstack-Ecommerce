import { RequestHandler } from "express";

const responseMiddleware: RequestHandler = (_req, res, next) => {
    res.success = (data: any, status = 200) => {
        return res.status(status).json({
            status: "success",
            data,
        });
    };

    res.error = (data: any, status = 400) => {
        return res.status(status).json({
            status: "error",
            data,
        });
    };

    next();
};

export default responseMiddleware;
