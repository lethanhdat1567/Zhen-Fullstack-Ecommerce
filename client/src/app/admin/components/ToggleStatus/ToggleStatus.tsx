"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Status = "active" | "inactive";

type ToggleStatusProps = {
    status: Status;
    onChange?: (value: Status) => void;
    disabled?: boolean;
};

function ToggleStatus({ status, onChange, disabled }: ToggleStatusProps) {
    const [currentStatus, setCurrentStatus] = useState<Status>(status);

    const handleChange = (checked: boolean) => {
        const newStatus: Status = checked ? "active" : "inactive";
        setCurrentStatus(newStatus);
        onChange?.(newStatus);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className="inline-flex">
                    <Switch
                        checked={currentStatus === "active"}
                        onCheckedChange={handleChange}
                        disabled={disabled}
                        className="cursor-pointer"
                    />
                </span>
            </TooltipTrigger>

            <TooltipContent side="right">
                <p>{currentStatus}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default ToggleStatus;
