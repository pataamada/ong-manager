"use client"
import { CleaningItems } from "@/components/icons/CleaningItems"
import { DogBowl } from "@/components/icons/DogBowl"
import { Badge } from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatRelative } from "date-fns"
import { Calendar, Droplets, HelpCircle, Home, Receipt, Tag, Zap } from "lucide-react"
import { ptBR } from "date-fns/locale"
import type { Expense } from "@/services/finance.service"

interface ExpenseDetailsDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	expense: Expense | null
}

const categoryIcons = {
	agua: Droplets,
	energia: Zap,
	aluguel: Home,
	racao: DogBowl,
	limpeza: CleaningItems,
} as const

type CategoryType = keyof typeof categoryIcons

export function ExpenseDetailsDialog({ open, onOpenChange, expense }: ExpenseDetailsDialogProps) {
	if (!expense) return null

	const CategoryIcon =
		(expense.category && categoryIcons[expense.category as CategoryType]) || HelpCircle

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div
							className={cn("p-3 rounded-full", {
								"bg-blue-100": expense.category === "agua",
								"bg-yellow-100": expense.category === "energia",
								"bg-purple-100": expense.category === "aluguel",
								"bg-orange-100": expense.category === "racao",
								"bg-green-100": expense.category === "limpeza",
								"bg-gray-100": !categoryIcons[expense.category as CategoryType],
							})}
						>
							<CategoryIcon
								className={cn("h-6 w-6", {
									"text-blue-600": expense.category === "agua",
									"text-yellow-600": expense.category === "energia",
									"text-purple-600": expense.category === "aluguel",
									"text-orange-600": expense.category === "racao",
									"text-green-600": expense.category === "limpeza",
									"text-gray-600":
										!categoryIcons[expense.category as CategoryType],
								})}
							/>
						</div>
						<div>
							<DialogTitle className="text-xl font-bold">
								Detalhes da Despesa
							</DialogTitle>
							<DialogDescription className="text-base text-foreground">
								{expense.description}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="grid gap-6 py-6">
					<div className="flex items-center gap-4">
						<Tag className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Categoria</span>
							<Badge
								className={cn("w-fit", {
									"bg-blue-500 hover:bg-blue-600": expense.category === "agua",
									"bg-yellow-500 hover:bg-yellow-600":
										expense.category === "energia",
									"bg-purple-500 hover:bg-purple-600":
										expense.category === "aluguel",
									"bg-orange-500 hover:bg-orange-600":
										expense.category === "racao",
									"bg-green-500 hover:bg-green-600":
										expense.category === "limpeza",
								})}
							>
								{expense.category}
							</Badge>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Calendar className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Data</span>
							<span>
								{formatRelative(new Date(expense.date), new Date(), {
									locale: ptBR,
								})}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Receipt className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Valor</span>
							<span className="text-xl font-semibold text-red-600">
								{formatCurrency(expense.value)}
							</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
