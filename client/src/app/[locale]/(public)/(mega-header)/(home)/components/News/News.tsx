import PostCard from "@/components/PostCard/PostCard";
import HeaderNews from "./components/HeaderNews/HeaderNews";

import NewsItem from "./components/NewsItem/NewsItem";
import { postService } from "@/services/postService";
import { getLocale } from "next-intl/server";
import AnimatedContent from "@/components/AnimatedContent";

async function News() {
    const locale = await getLocale();

    const res = await postService.getRelated({
        lang: locale,
        limit: 3,
    });

    return (
        <section className="bg-white py-10 sm:py-14 lg:py-16 xl:py-20">
            <div className="container">
                <HeaderNews />

                <div className="pt-6 sm:pt-8 lg:pt-10">
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
        </section>
    );
}

export default News;
