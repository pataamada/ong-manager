import { Card } from "@/components/dashboard/card"
import Image from "next/image"

import dashboardBanner from "@/assets/images/dashboard/dashboard-banner.svg"
import { AreaLegendChart } from "@/components/dashboard/AreaLegendChart"
import { DonatorsTable } from "@/components/dashboard/DonatorsTable"
import { DonutChart } from "@/components/dashboard/DonutChart"
import { ExpensesTable } from "@/components/dashboard/ExpensesTable"

export default function Dashboard() {
	const cardData = [
		{ title: "R$ 300,00", subtitle: "Esse Mês", content: "Total receita", textColor: "" },
		{ title: "R$ 1600,00", subtitle: "Esse Mês", content: "Doações", textColor: "text-green-400" },
		{ title: "R$ 1300,00", subtitle: "Esse Mês", content: "Despesas", textColor: "text-red-400" },
	]

	return (
		<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<Card
				className="sm:col-span-2 lg:col-span-3 gap-4"
				title="Woof! Bem-vindo de volta, ADM - Pata Amada"
				subtitle="Último acesso ás 18:34, 2 de janeiro de 2024"
				childrenPosition="top"
				textPosition="bottom"
			>
				<div className="w-full overflow-hidden relative rounded-md bg-primary">
					<Image
						src={dashboardBanner}
						className={"w-full object-cover min-w-[800px]"}
						alt="banner"
					/>
					<div className="absolute right-0 h-full top-1/2 -translate-y-1/2 max-[470px]:flex hidden bg-primary items-center">
						<Image src="/logo-pata.svg" width={100} height={100} alt="Pata Amada Logo" />
					</div>
				</div>
			</Card>

			{cardData.map(card => (
				<Card
					key={card.content}
					title={card.title}
					subtitle={card.subtitle}
					textColor={card.textColor}
				>
					<p>{card.content}</p>
				</Card>
			))}

			<Card
				title="Entrada e Saída"
				subtitle="Comparativo de receita"
				className="sm:col-span-2 lg:col-span-3 2xl:col-span-2"
			>
				<AreaLegendChart />
			</Card>

			<Card
				title="Despesas"
				subtitle="Despesas por categoria"
				className="sm:col-span-2 lg:col-span-3 2xl:col-span-1 shadow-none"
			>
				<DonutChart />
			</Card>

			<div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6">
				<Card
					title="Últimas Doações"
					subtitle="Lista de doações"
					showButton={true}
					className="lg:col-span-4"
				>
					<DonatorsTable />
				</Card>

				<Card
					title="Últimas despesas"
					subtitle="Lista de despesas"
					showButton={true}
					className="lg:col-span-4"
				>
					<ExpensesTable />
				</Card>
			</div>
		</div>
	)
}
