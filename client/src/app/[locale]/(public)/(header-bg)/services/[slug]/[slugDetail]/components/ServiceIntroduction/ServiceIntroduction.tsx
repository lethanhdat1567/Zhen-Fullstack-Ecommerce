import { images } from "@/assets/images";
import Image from "next/image";
import { Service } from "@/services/service";
import { getTranslations } from "next-intl/server";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

type Props = {
    service: Service;
};
async function ServiceIntroduction({ service }: Props) {
    const t = await getTranslations("Service");
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-semibold">
                    {t("ServiceDetail.title")}
                </h2>
                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt=""
                    className="mt-3.75 mb-10"
                />
            </div>

            <div
                className="tiptap ProseMirror text-sm leading-relaxed md:text-base"
                dangerouslySetInnerHTML={{
                    __html: service.content || "",
                }}
            />
        </div>
    );
}

export default ServiceIntroduction;
