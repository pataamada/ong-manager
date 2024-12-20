import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Pen, Trash2 } from "lucide-react"
import { Button } from "../../../../../components/ui/button"

interface EventCardProps {
	title: string
	date: string | number
	description: string
	imageUrl: string
	onDelete?: () => void
	onEdit?: () => void
}

export function EventCard({
	title,
	date,
	description,
	imageUrl,
	onDelete,
	onEdit,
}: EventCardProps) {
	return (
		<Card className="w-full max-w-[400px] min-w-[250px] rounded-lg h-[500px]">
			<CardHeader className="p-0 relative h-[220px]">
				<Image
					priority
					fill
					src={imageUrl}
					alt={title}
					className="rounded-t-lg w-full object-contain"
					sizes="220px"
				/>
				<div className="absolute gap-2 flex top-4 right-4">
					<Button className="size-fit p-2" variant={"secondary"} onClick={onEdit}>
						<Pen className="size-5" />
					</Button>
					<Button className="size-fit p-2" variant={"secondary"} onClick={onDelete}>
						<Trash2 className="size-5 text-red-500" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 items-center text-zinc-600">
					<Calendar className="size-5" />
					<p className="text-base my-4">
						{format(date, "dd 'de' MMMM 'às' HH:mm", {
							locale: ptBR,
						})}
					</p>
				</div>
				<CardTitle className="text-xl m-0 font-bold">{title}</CardTitle>
				<CardDescription className="line-clamp-5 mt-2">{description}</CardDescription>
			</CardContent>
		</Card>
	)
}
