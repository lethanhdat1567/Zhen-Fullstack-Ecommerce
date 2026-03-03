import { Skeleton } from "@/components/ui/skeleton";

function DetailItemIntroductionLoading() {
    return (
        <div className="mt-15 flex flex-col items-center justify-center gap-6">
            <Skeleton className="h-16.25 w-3/12" />
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-11/12 rounded-xl" />
            <Skeleton className="h-5 w-10/12 rounded-xl" />
            <Skeleton className="h-5 w-9/12 rounded-xl" />
            <Skeleton className="h-5 w-8/12 rounded-xl" />
            <Skeleton className="h-120 w-full rounded-xl" />
        </div>
    );
}

export default DetailItemIntroductionLoading;
