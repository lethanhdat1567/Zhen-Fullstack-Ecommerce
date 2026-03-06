"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackBtn() {
    const router = useRouter();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={"outline"} onClick={() => router.back()}>
                    <ChevronLeft />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Quay lại</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default BackBtn;
