const paymentMethodMap: Record<string, string> = {
    cod: "Thanh toán khi nhận hàng",
    vnpay: "VNPay",
    momo: "MoMo",
};

const paymentStatusMap: Record<string, string> = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    failed: "Thanh toán thất bại",
};

const statusMap: Record<
    string,
    { label: string; variant: "secondary" | "default" | "destructive" }
> = {
    pending: { label: "Chờ xử lý", variant: "secondary" },
    confirmed: { label: "Đã xác nhận", variant: "default" },
    completed: { label: "Hoàn thành", variant: "default" },
    cancelled: { label: "Đã hủy", variant: "destructive" },
};

export { paymentMethodMap, paymentStatusMap, statusMap };
