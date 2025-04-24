import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { AnimalSex, type Animal } from "@/models/animal.model"
import { Button } from "@/components/ui/button"
import { Pen, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Timestamp } from "firebase/firestore"
import { Icon } from "@/components/icon"
import { getAge } from "@/utils/get-age"
import { useContact } from "@/utils/contact"
import { cn } from "@/lib/utils"

type AnimalsCardProps = {
	onDelete?: (id: string, name: string) => void
	onEdit?: (animal: Animal) => void
	showActions?: boolean
	animal: Animal
}

export default function AnimalsCard({
	animal,
	onEdit,
	onDelete,
	showActions = true,
}: AnimalsCardProps) {
	const { handleContact } = useContact()
	return (
		<Card className="relative w-full max-w-80 min-h-[420px]">
			<div className="flex relative h-[220px] w-full overflow-hidden rounded-t-md">
				{showActions && (
					<div className="absolute z-10 gap-2 flex top-6 right-6 md:top-4 md:right-4">
						<Button
							className="size-fit p-2"
							variant={"secondary"}
							onClick={() => onEdit?.(animal)}
						>
							<Pen className="size-4" />
						</Button>

						<Button
							className="size-fit p-2"
							variant={"secondary"}
							onClick={() => onDelete?.(animal.id, animal.name)}
						>
							<Trash2 className="size-4 text-red-500" />
						</Button>
					</div>
				)}
				{animal?.photo ? (
					<Image
						src={animal?.photo}
						fill
						sizes="300px"
						priority
						alt={`Foto de ${animal.name}`}
						className="object-cover"
					/>
				) : (
					<div className="flex-1 flex items-center justify-center bg-zinc-200">
						<Icon name="CameraOff" className="size-10 text-neutral-400" />
					</div>
				)}
			</div>

			<CardContent className="p-4 content-center">
				<div className="flex py-1 gap-2">
					<Badge variant="secondary">
						<span className="font-bold">
							{" "}
							{animal.castration ? "Castrado" : "Não castrado"}
						</span>
					</Badge>
					<Badge variant={animal.available ? "default" : "destructive"}>
						<span className="mr-2">
							{animal.available ? "Disponível" : "Indisponível"}
						</span>
						<Icon
							name={animal.available ? "Check" : "X"}
							className="w-4 h-4"
							strokeWidth="2px"
						/>
					</Badge>
				</div>
				<div className="flex flex-row p-0 pb-2 items-center justify-between">
					<h6 className="text-h5 text-zinc-800 text-2xl">{animal.name}</h6>
				</div>

				<div className="flex flex-col">
					<div className="flex flex-row gap-y-1 justify-between">
						<p className="text-zinc-400 text-base text-start">Idade:</p>
						<p className="text-zinc-600 text-base text-end">
							{animal?.birthDate
								? getAge(
										new Timestamp(
											animal.birthDate.seconds,
											animal.birthDate.nanoseconds,
										).toDate(),
									)
								: ""}
						</p>
					</div>
					<div className="flex flex-row gap-y-1 justify-between">
						<p className="text-zinc-400 text-base text-start">Sexo:</p>
						<p className="text-zinc-600 text-base text-end">
							{animal.sex === AnimalSex.M ? "Macho" : "Fêmea"}
						</p>
					</div>
					<div className="flex flex-row gap-y-1 justify-between">
						<span className="text-zinc-400 text-base text-start flex-auto">
							Data de Cadastro:
						</span>
						<span className="text-zinc-600 text-base text-end">
							{format(
								new Timestamp(
									animal.createdAt.seconds,
									animal.createdAt.nanoseconds,
								).toMillis(),
								"dd/MM/yyyy",
							)}
						</span>
					</div>
					<div className="flex flex-row gap-y-1 justify-between">
						<span className="text-zinc-400 text-base text-start flex-auto">
							Atualizado em:
						</span>
						<span className="text-zinc-600 text-base text-end">
							{format(
								new Timestamp(
									animal.updatedAt.seconds,
									animal.updatedAt.nanoseconds,
								).toMillis(),
								"dd/MM/yyyy - HH:mm",
							)}
						</span>
					</div>
							{
								!showActions &&  (
									<Button
										className={cn("size-fit font-bold flex gap-2 p-2 text-white w-full mt-2", {
											"bg-gray-500": !animal.available
										})}
										size="sm"
										onClick={() => handleContact({ animal })}
										disabled={!animal.available}
									>
										{ animal.available ? "Adotar" : "Adotado" }
										<Icon name="PawPrint" width={16} height={16} />
									</Button>
								) 
							}
				</div>
			</CardContent>
		</Card>
	)
}
