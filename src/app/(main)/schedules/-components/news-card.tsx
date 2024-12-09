import { Badge } from "@/components/ui/badge"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pen, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

type NewsCardProps = {
	title: string
	description: string
	publishedAt: string
	image: string
	tags?: string[]
	className?: string
}
export function NewsCard({
	description,
	image,
	publishedAt,
	tags = [],
	title,
	className,
}: NewsCardProps) {
	return (
		<Card className={cn("grid grid-cols-[minmax(350px,1fr)_3fr] grid-rows-1 rounded-lg relative", className)}>
			<CardHeader className="p-4 relative w-full">
				<Image src={image} alt={title} className="rounded-lg w-full" objectFit="contain"/>
			</CardHeader>
			<CardContent className="flex flex-col p-4 gap-2">
				<div className="flex gap-2">
					{tags.map(tag => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>

				<CardTitle className="text-xl m-0 font-bold">{title}</CardTitle>
				<CardDescription className="line-clamp-5 mb-auto">{description}</CardDescription>
				<p className="text-sm">
					{format(publishedAt, "dd 'de' MMMM 'às' HH:mm", {
						locale: ptBR,
					})}
				</p>

				<div className="absolute gap-2 flex top-4 right-4">
					<Button className="size-fit p-2" variant={"secondary"}>
						<Pen className="size-5" />
					</Button>
					<Button className="size-fit p-2" variant={"secondary"}>
						<Trash2 className="size-5 text-red-500" />
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
