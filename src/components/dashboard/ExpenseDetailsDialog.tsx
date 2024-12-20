"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/formatCurrency"
import { Calendar, Receipt, Tag, Droplets, Zap, Home, HelpCircle } from "lucide-react"
import { DogBowl } from "@/components/icons/DogBowl"
import { CleaningItems } from "@/components/icons/CleaningItems"
import { formatDateTodayYesterday } from "@/utils/formatDateTodayYesterday"
import { cn } from "@/lib/utils"

interface ExpenseDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: {
    id: number
    description?: string
    category?: string
    date: string
    value: number
  } | null
}

const categoryIcons = {
  "Água": Droplets,
  "Energia": Zap,
  "Aluguel": Home,
  "Ração": DogBowl,
  "Produtos de Limpeza": CleaningItems,
} as const

type CategoryType = keyof typeof categoryIcons

export function ExpenseDetailsDialog({ open, onOpenChange, expense }: ExpenseDetailsDialogProps) {
  if (!expense) return null

  const CategoryIcon = expense.category && categoryIcons[expense.category as CategoryType] || HelpCircle

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-full",
              {
                "bg-blue-100": expense.category === "Água",
                "bg-yellow-100": expense.category === "Energia",
                "bg-purple-100": expense.category === "Aluguel",
                "bg-orange-100": expense.category === "Ração",
                "bg-green-100": expense.category === "Produtos de Limpeza",
                "bg-gray-100": !categoryIcons[expense.category as CategoryType],
              }
            )}>
              <CategoryIcon className={cn(
                "h-6 w-6",
                {
                  "text-blue-600": expense.category === "Água",
                  "text-yellow-600": expense.category === "Energia",
                  "text-purple-600": expense.category === "Aluguel",
                  "text-orange-600": expense.category === "Ração",
                  "text-green-600": expense.category === "Produtos de Limpeza",
                  "text-gray-600": !categoryIcons[expense.category as CategoryType],
                }
              )} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Detalhes da Despesa</DialogTitle>
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
                className={cn(
                  "w-fit",
                  {
                    "bg-blue-500 hover:bg-blue-600": expense.category === "Água",
                    "bg-yellow-500 hover:bg-yellow-600": expense.category === "Energia",
                    "bg-purple-500 hover:bg-purple-600": expense.category === "Aluguel",
                    "bg-orange-500 hover:bg-orange-600": expense.category === "Ração",
                    "bg-green-500 hover:bg-green-600": expense.category === "Produtos de Limpeza",
                  }
                )}
              >
                {expense.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Data</span>
              <span>{formatDateTodayYesterday(expense.date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Receipt className="h-5 w-5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Valor</span>
              <span className="text-xl font-semibold text-red-600">{formatCurrency(expense.value)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
