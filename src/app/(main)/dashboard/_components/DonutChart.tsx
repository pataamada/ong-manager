"use client"
import { useExpensesCategory } from "@/app/(main)/dashboard/_components/queries/useDashboard"
import { Card, CardContent } from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

function getChartColor(entry: string): string | undefined {
	const colorMap: { [key: string]: string } = {
		aluguel: "var(--chart-rent)",
		racao: "var(--chart-feed)",
		limpeza: "var(--chart-cleaning)",
		energia: "var(--chart-energy)",
		manutencao: "var(--chart-maintenance)",
		agua: "var(--chart-water)",
		internet: "var(--chart-internet)",
		brinquedos: "var(--chart-toys)",
	}
	return colorMap[entry] || "hsl(var(--primary))"
}
export function DonutChart() {
	const { data, isError } = useExpensesCategory()

	if (isError || data === undefined || data === null) {
		return "Error while loading"
	}

	const totalDespesas = Object.values(data).reduce((acc, curr) => acc + curr, 0)

	const chartConfig: ChartConfig = {}
	Object.entries(data).forEach(
		entry =>
			(chartConfig[entry[0]] = {
				label: entry[0].toString(),
				color: getChartColor(entry[0].toString()),
			}),
	)

	const chartData = Object.entries(data).map(([key, value]) => {
		return { name: key, despesas: value, fill: getChartColor(key) }
	})

	return (
		<Card className="flex flex-col border-none shadow-none">
			<CardContent className="flex-1 !p-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto w-full h-[380px]"
				>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={chartData}
							dataKey="despesas"
							nameKey="name"
							innerRadius={70}
							outerRadius={130}
							strokeWidth={5}
							isAnimationActive={false}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													R$ {totalDespesas}
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
						<ChartLegend
							content={<ChartLegendContent nameKey="name" />}
							className="-translate-y-2 mx-auto mt-13 flex-wrap gap-2 [&>*]:justify-center max-w-[300px]"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
