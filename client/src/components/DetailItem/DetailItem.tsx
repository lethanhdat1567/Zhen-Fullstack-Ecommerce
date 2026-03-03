import DetailSummary from "./components/DetailSummary/DetailSummary";
import DetailGallery from "./components/DetailGallery/DetailGallery";
import { Service } from "@/services/service";
import { Product } from "@/services/productService";

type Props = {
    item: Service | Product;
};

function DetailItem({ item }: Props) {
    return (
        <div className="mb-15 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <DetailGallery item={item} />
            <DetailSummary item={item} />
        </div>
    );
}

export default DetailItem;
