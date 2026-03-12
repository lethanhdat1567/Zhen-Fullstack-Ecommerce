import { images } from "@/assets/images";
import { Product } from "@/services/productService";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

type Props = {
    product: Product;
};
async function ProductIntroduction({ product }: Props) {
    const t = await getTranslations("Product");
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-semibold">
                    {t("ProductDetail.title")}
                </h2>
                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt=""
                    className="mt-[15px] mb-[40px]"
                />
            </div>

            <div
                className="tiptap ProseMirror text-sm leading-relaxed md:text-base"
                dangerouslySetInnerHTML={{
                    __html: product.content || "",
                }}
            />
        </div>
    );
}

export default ProductIntroduction;
