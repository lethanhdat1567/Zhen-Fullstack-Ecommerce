"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { type DateRange } from "react-day-picker";

type Props = {
    disableDates: Date[];
    range: DateRange | undefined;
    setRange: (range: DateRange | undefined) => void;
};

function CalendarRangeInput({ range, setRange, disableDates }: Props) {
    return (
        <Card className="w-full">
            <CardContent className="w-full p-0">
                <Calendar
                    className="w-full"
                    mode="range"
                    onSelect={setRange}
                    numberOfMonths={2}
                    disabled={disableDates}
                    selected={range}
                />
            </CardContent>
        </Card>
    );
}

export default CalendarRangeInput;
