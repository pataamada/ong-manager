"use client"
import { useIncomesOutComes } from "@/app/(main)/dashboard/_components/queries/useDashboard"
import { Card } from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, XAxis } from "recharts"

const chartConfig = {
	doacoes: {
		label: "Doações",
		color: "#10B981",
	},
	despesas: {
		label: "Despesas",
		color: "#F87171",
	},
} satisfies ChartConfig

export function AreaLegendChart() {
	const { data } = useIncomesOutComes()
	// console.log(data)

	return (
		<Card className="border-none shadow-none">
			<ChartContainer config={chartConfig} className="h-[380px] w-full">
				<AreaChart
					accessibilityLayer
					data={data}
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
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
					<Area
						dataKey="totalExpenses"
						type="natural"
						fill="var(--color-despesas)"
						fillOpacity={0.4}
						stroke={chartConfig.despesas.color}
						stackId="a"
						name={chartConfig.despesas.label}
					/>
					<Area
						dataKey="totalDonations"
						type="natural"
						fill="var(--color-doacoes)"
						fillOpacity={0.4}
						stroke={chartConfig.doacoes.color}
						stackId="a"
						name={chartConfig.doacoes.label}
					/>
					<Legend />
				</AreaChart>
			</ChartContainer>
		</Card>
	)
}
