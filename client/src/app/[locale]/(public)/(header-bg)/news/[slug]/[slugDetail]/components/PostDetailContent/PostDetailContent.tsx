import { Separator } from "@/components/ui/separator";
import { formatDateVN } from "@/utils/formatDate";
import PostSocial from "@/app/[locale]/(public)/(header-bg)/news/[slug]/[slugDetail]/components/PostSocial/PostSocial";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

interface IProp {
    post: any;
}

function PostDetailContent({ post }: IProp) {
    if (!post) return null;

    return (
        <div>
            {/* ================= META + TITLE ================= */}
            <div>
                {/* 
                   Desktop giữ text-[15px]
                   Mobile nhỏ nhẹ cho gọn
                */}
                <p className="mb-4 text-sm text-[#666666] md:mb-5 md:text-[15px]">
                    {formatDateVN(post.created_at)}
                </p>

                {/* 
                   Desktop giữ text-[35px]
                   Mobile giảm để tránh tràn 2-3 dòng quá to
                */}
                <h1 className="mb-6 text-2xl leading-snug font-medium text-(--primary-color) md:mb-7.5 md:text-3xl lg:text-[35px]">
                    {post.name}
                </h1>
            </div>

            <Separator className="mb-6 md:mb-7.5" />

            {/* ================= CONTENT ================= */}
            <div className="mb-10 md:mb-12.5">
                {/* 
                   Thêm padding nhẹ mobile để tiptap không dính sát mép
                   Desktop không đổi
                */}
                <div
                    className="tiptap ProseMirror text-sm leading-relaxed md:text-base"
                    dangerouslySetInnerHTML={{
                        __html: post.content || "",
                    }}
                />

                {/* Social share */}
                <div className="mt-8 md:mt-10">
                    <PostSocial />
                </div>
            </div>

            <Separator className="mb-6 md:mb-7.5" />
        </div>
    );
}

export default PostDetailContent;
