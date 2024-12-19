import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatRelative } from "date-fns"
import { Calendar, Heart, Receipt, User } from "lucide-react"
import { ptBR } from "date-fns/locale"
import type { Donation } from "@/services/finance.service"

interface DonationDetailsDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	donation: Donation | null
}

export function DonationDetailsDialog({
	open,
	onOpenChange,
	donation,
}: DonationDetailsDialogProps) {
	if (!donation) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="bg-green-100 p-3 rounded-full">
							<Heart className="h-6 w-6 text-primary" />
						</div>
						<div>
							<DialogTitle className="text-xl font-bold">Detalhes da Doação</DialogTitle>
							{/* <DialogDescription className="text-base text-foreground">
								{donation.anonymous ? "Doação Anônima" : "Doação Identificada"}
							</DialogDescription> */}
						</div>
					</div>
				</DialogHeader>

				<div className="grid gap-6 py-6">
					<div className="flex items-center gap-4">
						<User className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Nome</span>
							<span>{donation.userName}</span>
						</div>
					</div>
					{/* {!donation.anonymous && (
						<>

							<div className="flex items-center gap-4">
								<Mail className="h-5 w-5" />
								<div className="flex flex-col gap-1">
									<span className="text-sm text-muted-foreground">Email</span>
									<span>{donation.email}</span>
								</div>
							</div>
						</>
					)} */}

					<div className="flex items-center gap-4">
						<Calendar className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Data</span>
							<span>
								{formatRelative(new Date(donation.date), new Date(), {
									locale: ptBR,
								})}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Receipt className="h-5 w-5" />
						<div className="flex flex-col gap-1">
							<span className="text-sm text-muted-foreground">Valor</span>
							<span className="text-xl font-semibold text-green-600">
								{formatCurrency(donation.value)}
							</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
