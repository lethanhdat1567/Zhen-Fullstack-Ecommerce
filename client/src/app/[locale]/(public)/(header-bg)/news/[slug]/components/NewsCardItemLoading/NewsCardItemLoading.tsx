import { Skeleton } from "@/components/ui/skeleton";

function NewsCardItemLoading() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-70 w-full" />
            <Skeleton className="h-3 w-3/12" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="mx-auto h-10 w-5/12" />
        </div>
    );
}

export default NewsCardItemLoading;
