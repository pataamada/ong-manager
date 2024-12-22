import { Badge } from "@/components/ui/badge"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { When } from "@/components/when"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Pen, Trash2 } from "lucide-react"

type NewsCardProps = {
	title: string
	description: string
	createdAt: string | number
	image: string
	tags?: string[]
	hasEditButton?: boolean
	hasDeleteButton?: boolean
	className?: string
	onDelete?: () => void
	onEdit?: () => void
}
export function NewsCard({
	description,
	image,
	createdAt,
	tags = [],
	title,
	hasEditButton = false,
	hasDeleteButton = false,
	className,
	onDelete,
	onEdit,
}: NewsCardProps) {
	return (
		<Card
			className={cn(
				"grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[minmax(350px,1fr)_3fr] md:grid-rows-1 place-items-center rounded-lg relative",
				className,
			)}
		>
			<CardHeader className="p-4 bg-zinc-100 relative w-full h-full min-h-[200px] md:min-h-0">
				<Image
					priority
					fill
					src={image}
					alt={title}
					className="rounded-lg w-full object-contain"
					sizes="350px"
				/>
			</CardHeader>
			<CardContent className="w-full flex flex-col h-full p-4 gap-2">
				<div className="flex gap-2">
					{tags.map(tag => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>

				<CardTitle className="text-xl m-0 font-bold">{title}</CardTitle>
				<CardDescription className="line-clamp-5 mb-auto min-h-[200px]">
					{description}
				</CardDescription>
				<p className="text-sm text-gray-400">
					{format(createdAt, "dd 'de' MMMM 'às' HH:mm", {
						locale: ptBR,
					})}
				</p>

				<div className="absolute gap-2 flex top-6 right-6 md:top-4 md:right-4">
					<When condition={hasEditButton}>
						<Button className="size-fit p-2" variant={"secondary"} onClick={onEdit}>
							<Pen className="size-4" />
						</Button>
					</When>
					<When condition={hasDeleteButton}>
						<Button className="size-fit p-2" variant={"secondary"} onClick={onDelete}>
							<Trash2 className="size-4 text-red-500" />
						</Button>
					</When>
				</div>
			</CardContent>
		</Card>
	)
}
