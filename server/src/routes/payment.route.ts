import paymentController from "@/controllers/payment.controller";
import { Router } from "express";

const router = Router();

router.post("/create", paymentController.create);
router.get("/check-payment-vnpay", paymentController.checkPaymentVnpay);

export default router;
