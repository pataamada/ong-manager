"use client"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDateTodayYesterday } from "@/utils/formatDateTodayYesterday"
import { subDays } from "date-fns"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { ExpenseDetailsDialog } from "./ExpenseDetailsDialog"

interface TableData {
	id: number
	description?: string
	category?: string
	date: string
	value: number
}

const legendaProdutos = [
	{
		label: "Aluguel",
		color: "hsl(var(--chart-1))",
	},
	{
		label: "Ração",
		color: "hsl(var(--chart-5))",
	},
	{
		label: "Produtos de Limpeza",
		color: "hsl(var(--chart-2))",
	},
	{
		label: "Visitors",
	},
	{
		label: "Energia",
		color: "hsl(var(--chart-3))",
	},
	{
		label: "Água",
		color: "hsl(var(--chart-4))",
	},
]

const despesas: TableData[] = [
	{
		id: 1,
		description: "Ração de hoje",
		category: "Ração",
		date: new Date().toISOString(),
		value: 230,
	},
	{
		id: 2,
		description: "Shampoo, condicionador, sabonete",
		category: "Produtos de Limpeza",
		date: subDays(new Date(), 1).toISOString(),
		value: 230,
	},
	{
		id: 3,
		description: "Energia elétrica",
		category: "Água",
		date: "2024-09-06T17:55:25.682Z",
		value: 230,
	},
	{
		id: 4,
		description: "Ração para cães adultos",
		category: "Ração",
		date: "2024-09-07T10:30:00.000Z",
		value: 450,
	},
	{
		id: 5,
		description: "Produtos de limpeza",
		category: "Produtos de Limpeza",
		date: "2024-09-07T14:15:00.000Z",
		value: 180,
	},
	{
		id: 6,
		description: "Conta de energia",
		category: "Energia",
		date: "2024-09-08T09:00:00.000Z",
		value: 320,
	},
	{
		id: 7,
		description: "Ração para filhotes",
		category: "Ração",
		date: "2024-09-08T11:45:00.000Z",
		value: 280,
	},
	{
		id: 8,
		description: "Conta de água",
		category: "Água",
		date: "2024-09-09T08:20:00.000Z",
		value: 195,
	},
	{
		id: 9,
		description: "Materiais de limpeza",
		category: "Produtos de Limpeza",
		date: "2024-09-09T13:30:00.000Z",
		value: 150,
	},
	{
		id: 10,
		description: "Aluguel mensal",
		category: "Aluguel",
		date: "2024-09-10T16:00:00.000Z",
		value: 1200,
	}
]

export function ExpensesTable() {
	const [selectedExpense, setSelectedExpense] = useState<TableData | null>(null)

	return (
		<>
			<div className="relative overflow-hidden">
				<div className="max-h-[400px] overflow-y-auto">
					<Table className="w-full">
						<TableHeader>
							<TableRow className="border-none">
								<TableHead className="w-5/12">Descrição</TableHead>
								<TableHead className="w-5/12">Categoria</TableHead>
								<TableHead className="w-5/12">Data</TableHead>
								<TableHead className="w-5/12">Valor</TableHead>
								<TableHead className="w-1/12"/>
							</TableRow>
						</TableHeader>
						<TableBody>
							{despesas.map((expense, index) => (
								<TableRow
									key={expense.id}
									className={cn(
										"border-none hover:bg-black/10 group hover:cursor-pointer",
										index % 2 === 0 ? "bg-white" : "bg-background-second",
									)}
									onClick={() => setSelectedExpense(expense)}
								>
									<TableCell>{expense.description}</TableCell>
									<TableCell className="font-medium">
										<Badge
											className="text-nowrap"
											style={{
												backgroundColor: legendaProdutos.find(item => item.label === expense.category)
													?.color,
											}}
										>
											{expense.category}
										</Badge>
									</TableCell>
									<TableCell>{formatDateTodayYesterday(expense.date)}</TableCell>
									<TableCell>{formatCurrency(expense.value)}</TableCell>
									<TableCell>
										<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<ExpenseDetailsDialog
				open={!!selectedExpense}
				onOpenChange={(open) => !open && setSelectedExpense(null)}
				expense={selectedExpense}
			/>
		</>
	)
}
