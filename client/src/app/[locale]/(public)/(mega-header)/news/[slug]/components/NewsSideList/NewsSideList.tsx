import { Post } from "@/services/postService";
import NewsCardLarge from "./components/NewsCardLarge/NewsCardLarge";
import NewsCardSmall from "./components/NewsCardSmall/NewsCardSmall";
import AnimatedContent from "@/components/AnimatedContent";

interface IProps {
    posts: Post[];
}
async function NewsSideList({ posts }: IProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <AnimatedContent className="md:col-span-7">
                <NewsCardLarge item={posts?.[0]} />
            </AnimatedContent>

            <div className="flex flex-col gap-5 md:col-span-5">
                {posts?.slice(1).map((item: any, index) => (
                    <NewsCardSmall key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}

export default NewsSideList;
