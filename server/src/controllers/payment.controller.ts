import { Request, Response } from "express";
import {
    VNPay,
    ignoreLogger,
    ProductCode,
    VnpLocale,
    dateFormat,
    HashAlgorithm,
} from "vnpay";
import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";

class PaymentController {
    // Khởi tạo instance với ép kiểu đúng chuẩn
    public vnpay = new VNPay({
        tmnCode: "LIONK40A",
        secureSecret: "L8AHXKVQS9Z4ARG2RBTLRZJVF2DEZ7YO",
        vnpayHost: "https://sandbox.vnpayment.vn",
        testMode: true,
        hashAlgorithm: "SHA512" as HashAlgorithm,
        loggerFn: ignoreLogger,
    });

    create = async (req: Request, res: Response) => {
        const { totalAmount } = req.body;

        const vnpayRes = await this.vnpay.buildPaymentUrl({
            vnp_Amount: totalAmount,
            vnp_IpAddr: req.ip || "127.0.0.1",
            vnp_TxnRef: uuid(),
            vnp_OrderInfo: "Thanh toan don hang " + uuid(),
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl:
                "http://localhost:8000/api/payment/check-payment-vnpay",
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
        });

        return res.json({ url: vnpayRes });
    };

    checkPaymentVnpay = async (req: Request, res: Response) => {
        try {
            const verify = this.vnpay.verifyReturnUrl(req.query as any);

            if (!verify.isVerified) {
                // Nếu sai chữ ký, đẩy về trang lỗi của FE
                return res.redirect(
                    "http://localhost:3000/order/confirmation?status=error",
                );
            }

            const responseCode = verify.vnp_ResponseCode;
            const orderId = verify.vnp_TxnRef;

            // --- LOGIC CẬP NHẬT DATABASE ---
            if (responseCode === "00") {
                await prisma.orders.update({
                    where: { id: orderId },
                    data: { payment_status: "paid" },
                });

                // Thanh toán thành công -> Đẩy về trang Success của FE
                return res.redirect(
                    `http://localhost:3000/order/confirmation?orderId=${orderId}&status=success`,
                );
            } else {
                await prisma.orders.update({
                    where: { id: orderId },
                    data: { payment_status: "failed" },
                });

                // Thanh toán lỗi (User hủy hoặc thẻ lỗi) -> Đẩy về trang Fail của FE
                return res.redirect(
                    `http://localhost:3000/order/confirmation?orderId=${orderId}&status=error`,
                );
            }
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            return res.redirect(
                "http://localhost:3000/order/confirmation?status=error",
            );
        }
    };
}

export default new PaymentController();
