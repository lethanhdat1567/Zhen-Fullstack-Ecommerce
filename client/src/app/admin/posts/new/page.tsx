"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TranslateBtn from "@/app/admin/components/TranslateBtn/TranslateBtn";
import { postSchema } from "@/app/admin/posts/schema";
import PostForm from "@/app/admin/posts/new/PostForm";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function PostCreatePage() {
    const [activeLang, setActiveLang] = useState<"vi" | "en" | "fr">("vi");

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
                    title: "Hướng dẫn xây dựng REST API với Node.js và Prisma",
                    slug: "huong-dan-xay-dung-rest-api-nodejs-prisma",
                    description:
                        "Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.",
                    content: `
                <h2>Giới thiệu</h2>
                <p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p>

                <h3>Các bước thực hiện</h3>
                <ul>
                    <li>Khởi tạo project</li>
                    <li>Cài đặt Prisma</li>
                    <li>Tạo schema</li>
                    <li>Xây dựng controller</li>
                </ul>

                <p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>
            `,
                },
                {
                    language_code: "en",
                    title: "Build a REST API with Node.js and Prisma",
                    slug: "build-rest-api-nodejs-prisma",
                    description:
                        "A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.",
                    content: `
                <h2>Introduction</h2>
                <p>In this article, we will build a complete REST API using Node.js and Prisma.</p>

                <h3>Steps</h3>
                <ul>
                    <li>Initialize project</li>
                    <li>Install Prisma</li>
                    <li>Create schema</li>
                    <li>Build controllers</li>
                </ul>

                <p>After finishing, you'll have a production-ready backend.</p>
            `,
                },
                {
                    language_code: "fr",
                    title: "Créer une API REST avec Node.js et Prisma",
                    slug: "creer-api-rest-nodejs-prisma",
                    description:
                        "Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.",
                    content: `
                <h2>Introduction</h2>
                <p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p>

                <h3>Étapes</h3>
                <ul>
                    <li>Initialiser le projet</li>
                    <li>Installer Prisma</li>
                    <li>Créer le schéma</li>
                    <li>Développer les contrôleurs</li>
                </ul>

                <p>À la fin, vous aurez un backend prêt pour la production.</p>
            `,
                },
            ],
        },
    });

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

            <PostForm activeLang={activeLang} form={form} />
        </div>
    );
}

export default PostCreatePage;
