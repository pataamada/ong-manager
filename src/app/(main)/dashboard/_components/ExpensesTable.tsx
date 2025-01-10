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
import { formatRelative } from "date-fns"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { ExpenseDetailsDialog } from "./ExpenseDetailsDialog"
import { Badge } from "@/components/ui/badge"
import { ptBR } from "date-fns/locale"
import { useGetExpense } from "./queries/useDashboard"
import type { Expense } from "@/services/finance.service"
import { colorMap } from "./DonutChart"

export function ExpensesTable() {
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
	const { data } = useGetExpense(true)

	return (
		<>
			<div className="relative overflow-hidden">
				<div className="max-h-[400px] overflow-y-auto">
					<Table className="w-full">
						<TableHeader>
							<TableRow className="border-none">
								<TableHead className="w-5/12">Categoria</TableHead>
								<TableHead className="w-5/12">Descrição</TableHead>
								<TableHead className="w-5/12">Data</TableHead>
								<TableHead className="w-5/12">Valor</TableHead>
								<TableHead className="w-1/12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((expense, index) => (
								<TableRow
									key={expense.id}
									className={cn(
										"border-none hover:bg-black/10 group hover:cursor-pointer",
										index % 2 === 0 ? "bg-white" : "bg-background-second",
									)}
									onClick={() => setSelectedExpense(expense)}
								>
									<TableCell className="font-medium">
										<Badge
											className="text-nowrap"
											style={{
												backgroundColor: colorMap[expense.category] || "hsl(var(--primary))",
											}}
										>
											{expense.category}
										</Badge>
									</TableCell>
									<TableCell>{expense.description}</TableCell>
									<TableCell>
										{formatRelative(new Date(expense.date), new Date(), {
											locale: ptBR,
										})}
									</TableCell>
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
				onOpenChange={open => !open && setSelectedExpense(null)}
				expense={selectedExpense}
			/>
		</>
	)
}
