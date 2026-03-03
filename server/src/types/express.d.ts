import "express";

declare module "express-serve-static-core" {
    interface Response {
        success(data: any, status?: number): this;
        error(data: any, status?: number): this;
    }
}
