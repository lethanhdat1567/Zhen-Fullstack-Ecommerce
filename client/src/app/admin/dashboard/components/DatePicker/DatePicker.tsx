"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

type Props = {
    initDate?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
};

export function DatePickerWithRange({ initDate, onSelect }: Props) {
    const [date, setDate] = React.useState<DateRange | undefined>(initDate);

    // sync khi initDate thay đổi (ví dụ đổi preset)
    React.useEffect(() => {
        if (initDate) setDate(initDate);
    }, [initDate]);

    return (
        <Field className="w-64">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="justify-start gap-2 rounded-none font-normal"
                    >
                        <CalendarIcon className="h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd/MM/yyyy")} –{" "}
                                    {format(date.to, "dd/MM/yyyy")}
                                </>
                            ) : (
                                format(date.from, "dd/MM/yyyy")
                            )
                        ) : (
                            <span>Chọn khoảng ngày</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0"
                    align="end"
                    side="bottom"
                >
                    <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={date}
                        defaultMonth={date?.from}
                        onSelect={(range) => {
                            setDate(range);
                            onSelect?.(range);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}
