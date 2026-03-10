import bookingService from "@/services/booking.service";
import { Request, Response } from "express";

class BookingController {
    async listBookings(req: Request, res: Response) {
        const { search, status, page, limit, lang } = req.query;

        const result = await bookingService.listBookings({
            search: typeof search === "string" ? search : undefined,
            status: typeof status === "string" ? status : undefined,
            lang: typeof lang === "string" ? lang : undefined,
            page: page as string,
            limit: limit as string,
        });

        return res.success(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const { lang } = req.query;
        const result = await bookingService.getById(
            id as string,
            lang as string,
        );

        if (!result) return res.error("Booking not found", 404);
        return res.success(result);
    }

    async createBooking(req: any, res: Response) {
        const result = await bookingService.createBooking({
            ...req.body,
            user_id: req.user?.userId,
        });
        return res.success(result);
    }

    async updateBooking(req: Request, res: Response) {
        const { id } = req.params;
        const result = await bookingService.updateBooking(
            id as string,
            req.body,
        );
        return res.success(result);
    }

    async deleteBooking(req: Request, res: Response) {
        const { id } = req.params;
        await bookingService.deleteBooking(id as string);
        return res.success({ message: "Deleted successfully" });
    }

    async bulkDelete(req: Request, res: Response) {
        const { ids } = req.body;
        const result = await bookingService.bulkDelete(ids);
        return res.success(result);
    }
}

export default new BookingController();
