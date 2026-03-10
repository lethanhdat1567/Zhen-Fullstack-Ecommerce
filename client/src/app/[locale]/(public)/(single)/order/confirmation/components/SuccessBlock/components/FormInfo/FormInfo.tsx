interface InfoItem {
    label: string;
    value: React.ReactNode;
}

interface ProductInfoProps {
    items: InfoItem[];
}

function ProductInfo({ items }: ProductInfoProps) {
    return (
        <div>
            <h3 className="text-md mb-2 font-semibold">Thông tin của bạn:</h3>
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
