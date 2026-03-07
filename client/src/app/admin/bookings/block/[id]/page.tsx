"use client";

import DateSection from "@/app/admin/bookings/block/[id]/components/DateSection/DateSection";
import CalendarRangeInput from "@/app/admin/bookings/components/CalendarRangeInput/CalendarRangeInput";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { Availability, availableService } from "@/services/availableService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

function BlockDetail() {
    const { id } = useParams();
    const [disableDates, setDisableDates] = useState<Availability[]>([]);
    const [range, setRange] = useState<DateRange | undefined>(undefined);

    const fetchDates = async () => {
        if (!id) return;

        try {
            const res = await availableService.getCalendar(id as string);
            setDisableDates(res);
        } catch (error) {
            console.log(error);
        }
    };

    async function handleDisableRange() {
        if (range) {
            const payload = {
                service_id: id as string,
                start_date: range.from as Date,
                end_date: range.to as Date,
            };

            try {
                await availableService.blockDates(payload);
                toast.success("Block dates successfully!");
                setRange(undefined);
                fetchDates();
            } catch (error) {
                console.log(error);
                if (error instanceof HttpError) {
                    toast.error(error.message);
                }
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchDates();
    }, [id]);

    const disableDateRange = disableDates.map((date) => new Date(date.date));

    return (
        <div>
            <div className="h-20">Service Detail</div>
            <Button onClick={handleDisableRange}>set Disable</Button>
            <DateSection disableDates={disableDates} onRefresh={fetchDates} />
            <div className="w-full">
                <CalendarRangeInput
                    disableDates={disableDateRange}
                    range={range}
                    setRange={setRange}
                />
            </div>
        </div>
    );
}

export default BlockDetail;
