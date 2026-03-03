"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Props = {
    data: {
        date: string;
        total: number;
    }[];
};

const chartConfig = {
    total: {
        label: "Contacts",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function ChartLineContacts({ data }: Props) {
    const totalContacts = React.useMemo(
        () => data.reduce((acc, curr) => acc + curr.total, 0),
        [data],
    );

    return (
        <Card className="py-4 sm:py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle>Liên hệ</CardTitle>
                    <CardDescription>
                        Tổng liên hệ theo khoảng thời gian đã chọn
                    </CardDescription>
                </div>

                {/* Tổng số bên phải — giữ layout như cũ */}
                <div className="flex">
                    <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                        <span className="text-muted-foreground text-xs">
                            Tổng số lượng
                        </span>
                        <span className="text-lg leading-none font-bold sm:text-3xl">
                            {totalContacts.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={24}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                });
                            }}
                        />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-37.5"
                                    nameKey="total"
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "vi-VN",
                                            {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            },
                                        )
                                    }
                                />
                            }
                        />

                        <Line
                            dataKey="total"
                            type="monotone"
                            stroke="var(--color-total)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
