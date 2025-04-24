"use client"

import {
	useExpensesCounters,
	useIncomesOutComes,
} from "@/app/(main)/dashboard/_components/queries/useDashboard"
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	type TooltipProps,
	XAxis,
	YAxis,
} from "recharts"

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg border bg-background p-2 shadow-sm">
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col">
						<span className="text-[0.70rem] uppercase text-muted-foreground finance-label">
							{label}
						</span>
						{payload.map((entry, index) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="finance-label text-muted-foreground"
								style={{ color: entry.color }}
							>
								R$ {entry.value?.toFixed(2)}
							</span>
						))}
					</div>
				</div>
			</div>
		)
	}
	return null
}

interface ChartLegendItemProps {
	color: string
	label: string
}

const ChartLegendItem = ({ color, label }: ChartLegendItemProps) => (
	<div className="flex items-center gap-2">
		<div className={"w-5 h-5 rounded"} style={{ backgroundColor: color }} />
		<span className="text-sm font-medium">{label}</span>
	</div>
)


export default function FinancialDashboardSection() {
	const { data: incomesOutcomes } = useIncomesOutComes()
	const { data: expensesCounters } = useExpensesCounters()
	const total = (expensesCounters?.totalDonations || 0) - (expensesCounters?.totalExpenses || 0)
	return (
		<section id="finance" className="w-full py-12 md:py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-800 text-center">
					Transparência
				</h2>

				<p className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-12">
					Aqui você pode ver as despesas e doações da ong
				</p>
				<div className="bg-slate-200 rounded-[40px] px-8 py-8 relative">
					{/* Line Chart */}
					<div className="space-y-4 bg-white rounded-xl sm:px-6 sm:py-4 p-4 pl-2">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<div>
								<span className="text-sm text-zinc-400 font-medium">
									Total esse mês
								</span>
								<p className="text-xl font-bold">R$ {total}</p>
							</div>
							<div className="flex gap-4">
								<ChartLegendItem color="#3B82F6" label="Doações" />
								<ChartLegendItem color="#F97316" label="Despesas" />
							</div>
						</div>

						<div className="h-[300px] rounded-lg">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={incomesOutcomes}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis dataKey="month" className="text-xs" />
									<YAxis className="text-xs" />
									<Tooltip content={<CustomTooltip />} />
									<Line
										type="monotone"
										dataKey="totalDonations"
										stroke="#3B82F6"
										strokeWidth={2}
										dot={{ r: 4 }}
										activeDot={{ r: 6 }}
									/>
									<Line
										type="monotone"
										dataKey="totalExpenses"
										stroke="#F97316"
										strokeWidth={2}
										dot={{ r: 4 }}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}