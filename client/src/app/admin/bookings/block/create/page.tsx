"use client";

import SelectService from "@/app/admin/bookings/block/create/components/SelectService/SelectService";
import CalendarRangeInput from "@/app/admin/bookings/components/CalendarRangeInput/CalendarRangeInput";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { availableService } from "@/services/availableService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CreateBlockPage() {
    const router = useRouter();
    const [range, setRange] = useState<any>(undefined);
    const [serviceId, setServiceId] = useState("");
    const [disables, setDisable] = useState<Date[]>([]);

    function handleDisable() {
        try {
            const payload = {
                service_id: serviceId,
                start_date: range.from,
                end_date: range.to,
            };

            if (range) {
                availableService.blockDates(payload);
                toast.success("Block dates successfully!");
                router.push("/admin/bookings/block");
            }
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        if (serviceId) {
            availableService.getCalendar(serviceId).then((res) => {
                setDisable(res.map((item: any) => new Date(item.date)));
            });
        }
    }, [serviceId]);

    return (
        <div>
            <SelectService value={serviceId} onChange={setServiceId} />
            <CalendarRangeInput
                range={range}
                disableDates={disables}
                setRange={setRange}
            />
            <Button onClick={handleDisable}>Disable</Button>
        </div>
    );
}

export default CreateBlockPage;
