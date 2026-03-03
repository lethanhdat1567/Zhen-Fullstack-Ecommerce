import { Skeleton } from "@/components/ui/skeleton";

function LoadingTable() {
    return (
        <div className="mt-5 grid grid-cols-1 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-sm" />
            ))}
        </div>
    );
}

export default LoadingTable;
