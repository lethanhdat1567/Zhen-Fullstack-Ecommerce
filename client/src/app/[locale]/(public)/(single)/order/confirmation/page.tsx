"use client";

import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useSearchParams } from "next/navigation";

function Confirmation() {
    const searchParams = useSearchParams();
    const clearCart = useCartStore((state) => state.clearCart);

    // Lấy giá trị từ query parameters
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    if (status === "success" && orderId) {
        clearCart();
    }

    return (
        <div className="container">
            <h1>Thank you for your purchase!</h1>

            <div className="status-message">
                {status === "success" ? (
                    orderId ? (
                        <div className="text-green-600">
                            Thanh toán thành công. Mã đơn hàng: {orderId}
                        </div>
                    ) : (
                        <div>
                            Thanh toán thành công nhưng không tìm thấy mã đơn
                            hàng.
                        </div>
                    )
                ) : status === "error" ? (
                    orderId ? (
                        <div className="text-red-600">
                            Đã có lỗi xảy ra khi thanh toán đơn hàng: {orderId}
                        </div>
                    ) : (
                        <div className="text-red-600">
                            Đã có lỗi xảy ra trong quá trình xử lý.
                        </div>
                    )
                ) : (
                    <div>Đang kiểm tra trạng thái thanh toán...</div>
                )}
            </div>

            <div className="mt-4">
                <Link href="/checkout" className="text-blue-500 underline">
                    Quay lại trang Checkout
                </Link>
            </div>
        </div>
    );
}

export default Confirmation;
