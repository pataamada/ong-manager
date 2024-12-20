"use client"
import { Card } from "./card"
import { useExpensesCounters } from "./queries/useDashboard"

export function Counters() {
	const { data } = useExpensesCounters()

	return (
		<>
			<Card
				title={
					data === undefined
						? "0"
						: `R$ ${(data?.totalDonations - data?.totalExpenses).toString()}`
				}
				subtitle={"Esse mês"}
			>
				<p>Total Receita</p>
			</Card>
			<Card
				title={data === undefined ? "0" : `R$ ${data?.totalDonations?.toString()}`}
				subtitle={"Esse mês"}
				textColor="text-green-400"
			>
				<p>Doações</p>
			</Card>
			<Card
				title={data === undefined ? "0" : `R$ ${data?.totalExpenses?.toString()}`}
				subtitle={"Esse mês"}
				textColor="text-red-400"
			>
				<p>Despesas</p>
			</Card>
		</>
	)
}
