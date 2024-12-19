"use client"

import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"

export const description = "A pie chart with a legend"

const chartData = [
	{ browser: "aluguel", despesas: 173, fill: "var(--color-aluguel)" },
	{ browser: "racao", despesas: 190, fill: "var(--color-racao)" },
	{ browser: "produtosLimpeza", despesas: 275, fill: "var(--color-produtosLimpeza)" },
	{ browser: "energia", despesas: 287, fill: "var(--color-energia)" },
	{ browser: "agua", despesas: 200, fill: "var(--color-agua)" },
]

const chartConfig = {
	aluguel: {
		label: "Aluguel",
		color: "hsl(var(--chart-1))",
	},
	racao: {
		label: "Ração",
		color: "hsl(var(--chart-5))",
	},
	produtosLimpeza: {
		label: "Produtos de Limpeza",
		color: "hsl(var(--chart-2))",
	},
	despesas: {
		label: "Visitors",
	},
	energia: {
		label: "Energia",
		color: "hsl(var(--chart-3))",
	},
	agua: {
		label: "Água",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig

export function DonutChart() {
	const totalDespesas = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.despesas, 0)
	}, [])
	return (
		<Card className="flex flex-col border-none shadow-none">
			<CardContent className="flex-1 pb-0">
				{/* OBS: O que corta o raio da pizza é o max-h-[px] */}
				<ChartContainer config={chartConfig} className="mx-auto aspect-square h-[380px] w-full">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={chartData}
							dataKey="despesas"
							nameKey="browser"
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
													R$ {totalDespesas.toLocaleString()}
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
						<ChartLegend
							content={<ChartLegendContent nameKey="browser" />}
							className="-translate-y-2 mx-auto mt-13 flex-wrap gap-2 [&>*]:justify-center max-w-[300px]"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
