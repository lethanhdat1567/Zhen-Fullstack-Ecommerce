import { Post } from "@/app/[locale]/(public)/(minimal-header)/search/page";
import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
    post: Post;
};

function PostCard({ post }: Props) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            className="group flex gap-4 rounded-lg border p-3 transition hover:shadow-sm"
        >
            {/* Thumbnail */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
                {post.thumbnail && (
                    <Image
                        src={resolveMediaSrc(post.thumbnail)}
                        alt={post.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="group-hover:text-primary line-clamp-1 text-sm font-semibold">
                        {post.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {post.description}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
