import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { AreaLegendChart } from "@/components/dashboard/AreaLegendChart"
import { DonationsTable } from "@/components/dashboard/DonationsTable"
import { DonutChart } from "@/components/dashboard/DonutChart"
import { ExpensesTable } from "@/components/dashboard/ExpensesTable"
import { Card } from "@/components/dashboard/card"
import Image from "next/image"

export default async function Dashboard() {
	const currentUser = await getCurrentUser()

	const cardData = [
		{ title: "R$ 300,00", subtitle: "Esse Mês", content: "Total receita", textColor: "" },
		{ title: "R$ 1600,00", subtitle: "Esse Mês", content: "Doações", textColor: "text-green-400" },
		{ title: "R$ 1300,00", subtitle: "Esse Mês", content: "Despesas", textColor: "text-red-400" },
	]

	return (
		<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<Card
				className="sm:col-span-2 lg:col-span-3 gap-4"
				title={`Woof! Bem-vindo de volta, ${currentUser?.user?.displayName || "Admin"}`}
				subtitle="Último acesso às 18:34, 2 de janeiro de 2024"
				childrenPosition="top"
				textPosition="bottom"
			>
				<div className="w-full overflow-hidden relative rounded-md bg-primary">
					<img
						src="/dashboard/banner-dashboard.svg"
						className={"w-full object-cover min-w-[800px]"}
						alt="banner"
					/>
					<div className="absolute right-0 h-full top-1/2 -translate-y-1/2 max-[840px]:flex hidden bg-primary items-center">
						<Image src="/logo.svg" width={100} height={100} alt="Logo Cãodominio Satuba" />
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

			<div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-8 gap-6">
				<Card
					title="Últimas Doações"
					subtitle="Lista de doações"
					showButton={true}
					className="lg:col-span-4"
				>
					<DonationsTable />
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
