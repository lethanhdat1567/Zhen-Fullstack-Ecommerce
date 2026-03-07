"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Availability, availableService } from "@/services/availableService";

type Props = {
    from: Date | undefined;
    to: Date | undefined;
    onRangeChange: (range: DateRange | undefined) => void;
    serviceId: string;
};

export function DatePickerWithRange({
    serviceId,
    from,
    to,
    onRangeChange,
}: Props) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: from,
        to: to,
    });
    const [disableDates, setDisableDates] = React.useState<Date[]>([]);

    // Khi người dùng chọn ngày trên Calendar, cập nhật state nội bộ và báo cho Form
    const handleSelect = (newRange: DateRange | undefined) => {
        setDate(newRange);
        onRangeChange(newRange);
    };

    const fetchDates = async () => {
        if (!serviceId) return;

        try {
            const res = await availableService.getCalendar(serviceId);
            const result = res.map((item: Availability) => new Date(item.date));
            setDisableDates(result);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchDates();
    }, [serviceId]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start px-2.5 font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "dd/MM/yyyy")} -{" "}
                                {format(date.to, "dd/MM/yyyy")}
                            </>
                        ) : (
                            format(date.from, "dd/MM/yyyy")
                        )
                    ) : (
                        <span>Chọn ngày nhận - trả phòng</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    disabled={disableDates}
                />
            </PopoverContent>
        </Popover>
    );
}
