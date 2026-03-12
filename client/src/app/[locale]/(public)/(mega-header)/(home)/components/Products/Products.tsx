import "swiper/css";
import "swiper/css/navigation";
import HeaderProduct from "./components/HeaderProduct/HeaderProduct";
import Image from "next/image";
import { images } from "@/assets/images";
import { productService } from "@/services/productService";
import { getLocale } from "next-intl/server";
import ProductItem from "@/app/[locale]/(public)/(mega-header)/(home)/components/Products/components/ProductItem/ProductItem";
import AnimatedContent from "@/components/AnimatedContent";

async function Products() {
    const locale = await getLocale();
    const products = await productService.getRelatedProducts({
        lang: locale,
        limit: 3,
    });

    return (
        <section className="relative py-12 md:py-16 lg:py-20">
            <div className="relative z-10 container">
                <HeaderProduct />

                <div className="pt-2 lg:pt-10">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {products.map((item, index) => (
                            <AnimatedContent key={index} delay={index / 10}>
                                <ProductItem
                                    thumbnail={item.thumbnail || ""}
                                    title={item.title || ""}
                                    isScale={index === 1}
                                />
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
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
