export type PaymentMethod = "cod" | "vnpay";

const paymentMethodConfig: Record<
    PaymentMethod,
    { label: string; className: string }
> = {
    cod: {
        label: "Thanh toán khi nhận hàng",
        className: "border-amber-500 text-amber-700 bg-amber-50",
    },
    vnpay: {
        label: "VNPAY",
        className: "border-blue-500 text-blue-700 bg-blue-50",
    },
};

function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
    const config = paymentMethodConfig[method];

    return (
        <span
            className={`inline-flex items-center rounded-none border px-2 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
}

export default PaymentMethodBadge;
