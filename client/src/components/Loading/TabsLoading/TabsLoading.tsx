import { Skeleton } from "@/components/ui/skeleton";

function TabsLoading() {
    return (
        <div className="flex items-center justify-center gap-5">
            <Skeleton className="h-12 w-2/12 rounded-tl-[23px] rounded-br-[23px]" />
            <Skeleton className="h-12 w-2/12 rounded-tl-[23px] rounded-br-[23px]" />
            <Skeleton className="h-12 w-2/12 rounded-tl-[23px] rounded-br-[23px]" />
        </div>
    );
}

export default TabsLoading;
