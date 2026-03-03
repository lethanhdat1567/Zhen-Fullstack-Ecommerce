"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { mediaAlbumSchema } from "@/app/admin/media/albums/new/schema";
import { mediaAlbumService } from "@/services/mediaAlbumService";
import MediaAlbumForm from "@/app/admin/media/albums/new/MediaAlbumForm";
import LoadingForm from "@/app/admin/components/LoadingForm/LoadingForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function MediaAlbumCategoryUpdatePage() {
    const params = useParams();
    const albumId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");
    const [loading, setLoading] = useState(true);

    // Form
    const form = useForm<z.infer<typeof mediaAlbumSchema>>({
        resolver: zodResolver(mediaAlbumSchema),
        mode: "onChange",
        defaultValues: {
            category_id: "",
            thumbnail: "",

            galleries: [],

            translations: [
                {
                    language_code: "vi",
                    title: "",
                    slug: "",
                    description: "",
                },
                {
                    language_code: "en",
                    title: "",
                    slug: "",
                    description: "",
                },
                {
                    language_code: "fr",
                    title: "",
                    slug: "",
                    description: "",
                },
            ],
        },
    });

    const fetchAlbum = async () => {
        try {
            const res = await mediaAlbumService.getById(albumId as string);

            const translation = res.translations.map((item: any) => {
                return {
                    language_code: item.language.code,
                    title: item.title,
                    slug: item.slug,
                    description: item.description,
                };
            });

            form.setValue("translations", translation);
            form.setValue("galleries", res.galleries);
            form.setValue("category_id", res.category.id);
            form.setValue("thumbnail", res.thumbnail as string);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbum();
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
                <MediaAlbumForm
                    activeLang={activeLang}
                    form={form}
                    updateId={albumId as string}
                />
            )}
        </div>
    );
}

export default MediaAlbumCategoryUpdatePage;
