"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { postSchema } from "@/app/admin/posts/schema";
import { postService } from "@/services/postService";
import PostForm from "@/app/admin/posts/new/PostForm";
import LoadingForm from "@/app/admin/components/LoadingForm/LoadingForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function PostUpdatePage() {
    const params = useParams();
    const albumId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");
    const [loading, setLoading] = useState(true);

    // Form
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema) as any,
        mode: "onChange",
        defaultValues: {
            category_id: "",
            status: "active",
            thumbnail: "",

            translations: [
                {
                    language_code: "vi",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
                {
                    language_code: "en",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
                {
                    language_code: "fr",
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                },
            ],
        },
    });

    const fetchPosts = async () => {
        try {
            const res: any = await postService.getById(albumId as string);

            const translation = res.translations.map((item: any) => {
                return {
                    language_code: item.language.code,
                    title: item.title,
                    slug: item.slug,
                    description: item.description,
                    content: item.content,
                };
            });

            form.setValue("category_id", res.category.id);
            form.setValue("status", res.status);
            form.setValue("thumbnail", res.thumbnail as string);
            form.setValue("translations", translation);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [albumId]);

    return (
        <div className="mx-auto w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackBtn />
                    <Title title="Thêm mới danh mục" />
                </div>
                <div className="flex items-center gap-4">
                    <TabsTranslate
                        activeLang={activeLang}
                        onChange={(v) => setActiveLang(v as "vi" | "en" | "fr")}
                    />
                    <TranslateBtn
                        activeLang={activeLang}
                        form={form}
                        fields={["name", "slug"]}
                    />
                </div>
            </div>

            {loading ? (
                <LoadingForm />
            ) : (
                <PostForm
                    activeLang={activeLang}
                    form={form}
                    updateId={albumId as string}
                />
            )}
        </div>
    );
}

export default PostUpdatePage;
