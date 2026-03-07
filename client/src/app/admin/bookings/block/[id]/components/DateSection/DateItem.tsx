import { Button } from "@/components/ui/button";
import { Availability } from "@/services/availableService";
import { format } from "date-fns";
import { X } from "lucide-react";

type Props = {
    dateItem: Availability;
    onDestroy: (id: string) => void;
};

function DateItem({ dateItem, onDestroy }: Props) {
    return (
        <div className="flex items-center gap-2 rounded-sm bg-black p-2 text-sm text-white">
            {format(dateItem.date, "dd/MM/yyyy")}
            <Button
                size="icon-sm"
                variant={"secondary"}
                onClick={() => onDestroy(dateItem.id)}
            >
                <X />
            </Button>
        </div>
    );
}

export default DateItem;
