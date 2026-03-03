import recruitmentService from "@/services/recruitment.service";
import { Request, Response } from "express";

class RecruitmentController {
    async createRecruitment(req: Request, res: Response) {
        const result = await recruitmentService.createRecruitment(req.body);
        return res.success(result);
    }

    async updateRecruitment(req: Request, res: Response) {
        const result = await recruitmentService.updateRecruitment(
            req.params.id as string,
            req.body,
        );
        return res.success(result);
    }

    async listRecruitments(req: Request, res: Response) {
        const { lang, page, limit, isActive } = req.query;

        const result = await recruitmentService.listRecruitments({
            lang: typeof lang === "string" ? lang : undefined,
            page: page as string,
            limit: limit as string,
            isActive: isActive === "true" ? true : undefined,
        });

        return res.success(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;

        const result = await recruitmentService.getById(
            id as string,
            typeof lang === "string" ? lang : undefined,
        );

        if (!result) {
            return res.error("Recruitment not found");
        }

        return res.success(result);
    }

    async toggleStatus(req: Request, res: Response) {
        const result = await recruitmentService.toggleStatus(
            req.params.id as string,
        );
        return res.success(result);
    }

    async deleteRecruitment(req: Request, res: Response) {
        const result = await recruitmentService.deleteRecruitment(
            req.params.id as string,
        );
        return res.success(result);
    }

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await recruitmentService.bulkDelete(ids);
        return res.success(result);
    }
}

export default new RecruitmentController();
