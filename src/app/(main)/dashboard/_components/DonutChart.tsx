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

// const chartData = [
// 	{ browser: "aluguel", despesas: 173, fill: "var(--color-aluguel)" },
// 	{ browser: "racao", despesas: 190, fill: "var(--color-racao)" },
// 	{ browser: "produtosLimpeza", despesas: 275, fill: "var(--color-produtosLimpeza)" },
// 	{ browser: "energia", despesas: 287, fill: "var(--color-energia)" },
// 	{ browser: "agua", despesas: 200, fill: "var(--color-agua)" },
// ]

// const chartConfig = {
// 	aluguel: {
// 		label: "Aluguel",
// 		color: "hsl(var(--chart-1))",
// 	},
// 	racao: {
// 		label: "Ração",
// 		color: "hsl(var(--chart-5))",
// 	},
// 	produtosLimpeza: {
// 		label: "Produtos. Limpeza",
// 		color: "hsl(var(--chart-2))",
// 	},
// 	despesas: {
// 		label: "despesas",
// 	},
// 	energia: {
// 		label: "Energia",
// 		color: "hsl(var(--chart-3))",
// 	},
// 	agua: {
// 		label: "Água",
// 		color: "hsl(var(--chart-4))",
// 	},
// } satisfies ChartConfig

function getChartColor(entry: string): string | undefined {
	const colorMap: { [key: string]: string } = {
		// aluguel: "chart-1",
		// racao: "chart-5",
		// produtosLimpeza: "chart-2",
		// energia: "chart-3",
		// agua: "chart-4",
		aluguel: "purple-500",
		racao: "red-500",
		produtosLimpeza: "green-500",
		energia: "yellow-500",
		agua: "blue-500",
	}

	return colorMap[entry]
}
export function DonutChart() {
	const { data, isError } = useExpensesCategory()

	if (isError || data === undefined || data === null) {
		return "Error while loading"
	}

	// console.log(data)

	const totalDespesas = Object.values(data).reduce((acc, curr) => acc + curr, 0)

	const chartConfig: ChartConfig = {}
	Object.entries(data).forEach(
		entry =>
			(chartConfig[entry[0]] = {
				label: entry[0].toString(),
				color: getChartColor(entry[0].toString()),
			}),
	)
	// console.log(chartConfig)

	const chartData = Object.entries(data).map(entry => {
		return { browser: entry[0], despesas: entry[1], fill: "var(--color-produtosLimpeza)" }
	})
	// console.log(chartData)

	return (
		<Card className="flex flex-col border-none shadow-none">
			<CardContent className="flex-1 pb-0">
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
													R$ {totalDespesas}
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
