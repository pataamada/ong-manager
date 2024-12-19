"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card } from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
	{ month: "Janeiro", donations: 200, despesas: 100 },
	{ month: "Fevereiro", donations: 180, despesas: 80 },
	{ month: "Março", donations: 205, despesas: 105 },
	{ month: "Abril", donations: 214, despesas: 140 },
	{ month: "Maio", donations: 209, despesas: 130 },
	{ month: "Junho", donations: 305, despesas: 205 },
]

const chartConfig = {
	despesas: {
		label: "Despesas",
		color: "#F87171",
	},
	donations: {
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
						// tickFormatter={(value) => value.slice(0, 3)}
						className="text-xs"
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
					<defs>
						<linearGradient id="fillDonations" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--color-donations)" stopOpacity={1} />
							<stop offset="95%" stopColor="var(--color-donations)" stopOpacity={0.6} />
						</linearGradient>
						<linearGradient id="fillDespesas" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--color-despesas)" stopOpacity={1} />
							<stop offset="95%" stopColor="var(--color-despesas)" stopOpacity={0.6} />
						</linearGradient>
					</defs>
					<Area
						dataKey="despesas"
						type="natural"
						fill="url(#fillDespesas)"
						fillOpacity={1}
						stroke="var(--color-despesas)"
						stackId="a"
					/>
					<Area
						dataKey="donations"
						type="natural"
						fill="url(#fillDonations)"
						fillOpacity={1}
						stroke="var(--color-donations)"
						stackId="a"
					/>

					<ChartLegend className="flex flex-row-reverse" content={<ChartLegendContent />} />
				</AreaChart>
			</ChartContainer>
		</Card>
	)
}
