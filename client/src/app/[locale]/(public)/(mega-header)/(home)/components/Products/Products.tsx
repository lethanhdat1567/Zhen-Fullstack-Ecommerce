import "swiper/css";
import "swiper/css/navigation";
import HeaderProduct from "./components/HeaderProduct/HeaderProduct";
import Image from "next/image";
import { images } from "@/assets/images";
import { productService } from "@/services/productService";
import { getLocale } from "next-intl/server";
import CardRelated from "@/components/CardRelated/CardRelated";

async function Products() {
    const locale = await getLocale();

    const relatedProduct = await productService.getRelatedProducts({
        lang: locale,
        isActive: true,
        limit: 6,
    });

    return (
        <section className="relative py-12 md:py-16 lg:py-20">
            <div className="relative z-10 container">
                <HeaderProduct />

                <CardRelated
                    type="product"
                    item={relatedProduct as any}
                    hideTitle
                />
            </div>

            <Image
                src={images.bg_decor_vertical}
                alt=""
                className="pointer-events-none absolute right-0 bottom-10 z-0 hidden w-screen object-cover opacity-70 lg:block"
                style={{
                    filter: "sepia(1) hue-rotate(90deg) saturate(400%) brightness(0.4)",
                }}
            />
        </section>
    );
}

export default Products;
