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
import { formatRelative } from "date-fns"
import { useState } from "react"
import { DonationDetailsDialog } from "./DonationDetailsDialog"
import { useGetDonation } from "./queries/useDashboard"
import { ptBR } from "date-fns/locale"
import type { Donation } from "@/services/finance.service"

export function DonationsTable() {
	const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
	const { data, isError } = useGetDonation(true)

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
								{/* <TableHead className="w-[50px]" /> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((doador, index) => (
								<TableRow
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={cn(
										"border-none hover:bg-black/10 group hover:cursor-pointer",
										index % 2 === 0 ? "bg-white" : "bg-background-second",
									)}
									onClick={() => setSelectedDonation(doador)}
								>
									<TableCell>{doador.userName}</TableCell>
									<TableCell className="font-semibold">
										{formatRelative(new Date(doador.date), new Date(), {
											locale: ptBR,
										})}
									</TableCell>
									<TableCell>R$ {doador.value}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<DonationDetailsDialog
				open={!!selectedDonation}
				onOpenChange={open => !open && setSelectedDonation(null)}
				donation={selectedDonation}
			/>
		</>
	)
}
