"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { useParams } from "next/navigation";
import { productSchema } from "@/app/admin/products/new/schema";
import { productService } from "@/services/productService";
import ProductForm from "@/app/admin/products/new/ProductForm";
import LoadingForm from "@/app/admin/components/LoadingForm/LoadingForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function ProductUpdatePage() {
    const params = useParams();
    const productId = params.id;
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");
    const [loading, setLoading] = useState(true);

    // Form
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema) as any,
        mode: "onChange",
        defaultValues: {
            category_id: "",
            price: 0,
            sale_price: 0,
            stock: 0,
            thumbnail: "",
            galleries: [],
            status: "active",
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

    const fetchProduct = async () => {
        try {
            const res: any = await productService.getById(productId as string);

            /* =========================
           TRANSLATIONS
        ========================== */

            const translations = res.translations.map((item: any) => ({
                language_code: item.language.code,
                title: item.title || "",
                slug: item.slug || "",
                description: item.description || "",
                content: item.content || "",
            }));

            /* =========================
           GALLERIES
        ========================== */

            const galleries = res.galleries.map((item: any) => ({
                id: item.id,
                file_url: item.image,
                sort_order: item.sort_order,
                type: "image",
            }));

            /* =========================
           SET FORM VALUE
        ========================== */

            form.reset({
                category_id: res.category_id,
                price: Number(res.price),
                sale_price: res.sale_price ? Number(res.sale_price) : undefined,
                stock: res.stock,
                thumbnail: res.thumbnail || "",
                status: res.status,
                translations,
                galleries,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

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
                <ProductForm
                    activeLang={activeLang}
                    form={form}
                    updateId={productId as string}
                />
            )}
        </div>
    );
}

export default ProductUpdatePage;
