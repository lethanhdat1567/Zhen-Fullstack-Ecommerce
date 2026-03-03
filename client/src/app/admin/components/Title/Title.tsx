import { cn } from "@/lib/utils";

function Title({ title, className }: { title: string; className?: string }) {
    return <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>;
}

export default Title;
