import DateItem from "@/app/admin/bookings/block/[id]/components/DateSection/DateItem";
import { Card, CardFooter } from "@/components/ui/card";
import { HttpError } from "@/lib/http/errors";
import { Availability, availableService } from "@/services/availableService";
import { toast } from "sonner";

type Props = {
    disableDates: Availability[];
    onRefresh: () => void;
};

function DateSection({ disableDates, onRefresh }: Props) {
    async function handleDestroy(id: string) {
        try {
            await availableService.unblockDate(id);
            onRefresh();
            toast.success("Xóa thành công!");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    return (
        <Card>
            <CardFooter className="flex flex-wrap gap-2 space-x-2">
                {disableDates.map((date) => (
                    <DateItem
                        key={date.id}
                        dateItem={date}
                        onDestroy={handleDestroy}
                    />
                ))}
            </CardFooter>
        </Card>
    );
}

export default DateSection;
