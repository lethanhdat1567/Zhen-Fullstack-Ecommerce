import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function PostDetailLoading() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="mb-5 h-3 w-1/12" />
            <Skeleton className="mb-7.5 h-5 w-full" />
            <Separator className="mb-7.5" />

            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-10/12" />
            <Skeleton className="h-5 w-8/12" />
            <Skeleton className="h-5 w-6/12" />
            <Skeleton className="h-5 w-4/12" />
            <Skeleton className="h-90 w-full" />

            <div className="my-10 flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Separator className="mb-7.5" />
        </div>
    );
}

export default PostDetailLoading;
