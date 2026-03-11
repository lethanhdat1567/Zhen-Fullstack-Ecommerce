import { useTranslations } from "next-intl";

interface InfoItem {
    label: string;
    value: React.ReactNode;
}

interface ProductInfoProps {
    items: InfoItem[];
}

function ProductInfo({ items }: ProductInfoProps) {
    const t = useTranslations("OrderConfirmation.success");

    return (
        <div>
            <h3 className="text-md mb-2 font-semibold">
                {t("personalInfoTitle")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold">{item.label}</h4>
                        <p className="text-gray-600">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductInfo;
