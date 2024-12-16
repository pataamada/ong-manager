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
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { DonationDetailsDialog } from "./DonationDetailsDialog"

interface TableData {
	id: number
	name?: string
	email?: string
	anonymous: boolean
	data: string
	valor: number
}

const doadores: TableData[] = [
	{
		id: 1,
		name: "Edvaldo pereira cintra",
		email: "Edvaldo@gmail.com",
		anonymous: false,
		data: "2024-10-15T01:34:28.843Z",
		valor: 230,
	},
	{
		id: 2,
		anonymous: true,
		data: "2024-10-15T01:34:28.843Z",
		valor: 230,
	},
	{
		id: 3,
		name: "Edvaldo pereira cintra",
		email: "Edvaldo@gmail.com",
		anonymous: false,
		data: "2024-10-16T01:34:28.843Z",
		valor: 230,
	},
	{
		id: 4,
		name: "Edvaldo pereira cintra",
		email: "Edvaldo@gmail.com",
		anonymous: false,
		data: "2024-10-16T01:34:28.843Z",
		valor: 230,
	},
	{
		id: 5,
		name: "Edvaldo pereira cintra",
		email: "Edvaldo@gmail.com",
		anonymous: false,
		data: "2024-10-16T01:34:28.843Z",
		valor: 230,
	},
	{
		id: 6,
		name: "Maria Silva",
		email: "maria.silva@email.com",
		anonymous: false,
		data: "2024-10-17T14:30:00.000Z",
		valor: 150,
	},
	{
		id: 7,
		anonymous: true,
		data: "2024-10-17T16:45:00.000Z",
		valor: 500,
	},
	{
		id: 8,
		name: "João Santos",
		email: "joao.santos@email.com",
		anonymous: false,
		data: "2024-10-18T09:15:00.000Z",
		valor: 300,
	},
	{
		id: 9,
		name: "Ana Oliveira",
		email: "ana.oliveira@email.com",
		anonymous: false,
		data: "2024-10-18T11:20:00.000Z",
		valor: 175,
	},
	{
		id: 10,
		anonymous: true,
		data: "2024-10-18T13:40:00.000Z",
		valor: 1000,
	},
	{
		id: 11,
		name: "Carlos Ferreira",
		email: "carlos.ferreira@email.com",
		anonymous: false,
		data: "2024-10-19T10:00:00.000Z",
		valor: 450,
	},
	{
		id: 12,
		name: "Beatriz Lima",
		email: "beatriz.lima@email.com",
		anonymous: false,
		data: "2024-10-19T15:25:00.000Z",
		valor: 200,
	}
]

export function DonationsTable() {
	const [selectedDonation, setSelectedDonation] = useState<TableData | null>(null)

	return (
		<>
			<div className="relative overflow-hidden">
				<div className="max-h-[400px] overflow-y-auto">
					<Table className="w-full">
						<TableHeader className="sticky top-0 bg-background z-10">
							<TableRow className="border-none">
								<TableHead className="w-5/12">Doador</TableHead>
								<TableHead className="w-5/12">Data</TableHead>
								<TableHead className="w-5/12">Valor</TableHead>
								<TableHead className="w-[50px]"/>
							</TableRow>
						</TableHeader>
						<TableBody>
							{doadores.map((donor, index) => (
								<TableRow
									key={donor.id}
									className={cn(
										"border-none hover:bg-black/10 group hover:cursor-pointer",
										index % 2 === 0 ? "bg-white" : "bg-background-second",
									)}
									onClick={() => setSelectedDonation(donor)}
								>
									<TableCell className="font-medium">
										{donor.anonymous ? (
											<Badge className="bg-black hover:bg-black/80">Anônimo</Badge>
										) : (
											<>
												<p className="font-semibold">{donor.name} </p>
												<p className="font-normal">{donor.email}</p>
											</>
										)}
									</TableCell>
									<TableCell>{formatDateTodayYesterday(donor.data)}</TableCell>
									<TableCell className="font-semibold">
										{formatCurrency(donor.valor)}
									</TableCell>
									<TableCell>
										<ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<DonationDetailsDialog
				open={!!selectedDonation}
				onOpenChange={(open) => !open && setSelectedDonation(null)}
				donation={selectedDonation}
			/>
		</>
	)
}
