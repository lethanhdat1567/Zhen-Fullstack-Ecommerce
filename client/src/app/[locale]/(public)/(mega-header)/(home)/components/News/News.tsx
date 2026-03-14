import PostCard from "@/components/PostCard/PostCard";
import HeaderNews from "./components/HeaderNews/HeaderNews";

import NewsItem from "./components/NewsItem/NewsItem";
import { postService } from "@/services/postService";
import { getLocale } from "next-intl/server";
import AnimatedContent from "@/components/AnimatedContent";
import Image from "next/image";
import { images } from "@/assets/images";

async function News() {
    const locale = await getLocale();

    const res = await postService.getRelated({
        lang: locale,
        limit: 3,
    });

    return (
        <section className="relative bg-white py-10 sm:py-14 lg:py-16 xl:py-20">
            <div className="relative z-10 container">
                <HeaderNews />

                <div className="pt-4">
                    {/* Mobile + Tablet */}
                    <div className="xl:hidden">
                        <NewsItem />
                    </div>

                    {/* Desktop */}
                    <div className="hidden xl:block">
                        <div className="grid gap-4 xl:grid-cols-3">
                            {res.map((item, index) => (
                                <AnimatedContent key={index} delay={index / 10}>
                                    <PostCard item={item} />
                                </AnimatedContent>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Image
                src={images.bg_about_us}
                className="absolute bottom-0 left-0 z-0 h-auto w-auto"
                alt="decor"
                width={500}
                height={500}
            />
        </section>
    );
}

export default News;
