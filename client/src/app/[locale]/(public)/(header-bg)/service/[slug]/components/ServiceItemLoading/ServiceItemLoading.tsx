import { Skeleton } from "@/components/ui/skeleton";

function ServiceItemLoading() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export default ServiceItemLoading;
