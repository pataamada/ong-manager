"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An area chart with a legend"

const chartData = [
  { month: "Janeiro", despesas: 186, doacoes: 80 },
  { month: "Fevereiro", despesas: 305, doacoes: 200 },
  { month: "Março", despesas: 237, doacoes: 120 },
  { month: "Abril", despesas: 73, doacoes: 190 },
  { month: "Maio", despesas: 209, doacoes: 130 },
  { month: "Junho", despesas: 214, doacoes: 140 },
]

const chartConfig = {
  despesas: {
    label: "Despesas",
		color: "#F87171",
  },
  doacoes: {
    label: "Doações",
		color: "#10B981",
  },
} satisfies ChartConfig

export function AreaLegendChart() {
  return (
    <Card className="border-none shadow-none">
        <ChartContainer config={chartConfig} className="h-[380px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              className="text-xs"
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="doacoes"
              type="natural"
              fill="var(--color-doacoes)"
              fillOpacity={0.4}
              stroke="var(--color-doacoes)"
              stackId="a"
            />
            <Area
              dataKey="despesas"
              type="natural"
              fill="var(--color-despesas)"
              fillOpacity={0.4}
              stroke="var(--color-despesas)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
    </Card>
  )
}
