import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Pen, Trash2 } from "lucide-react"
import { Button } from "../../../../components/ui/button"

interface ScheduleCardProps {
  title: string
  date: Date
  description: string
  imageUrl: string
}

const formatEventDate = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'às' HH:mm", {
    locale: ptBR,
  })
}

export function ScheduleCard({ 
  title, 
  date, 
  description, 
  imageUrl 
}: ScheduleCardProps) {
  return (
    <Card className="w-full max-w-[350px] min-w-[250px] rounded-lg">
      <CardHeader className="p-0 relative">
      <Image 
          src={imageUrl} 
          alt={title}
          className="rounded-t-lg"
        />
        <div className="absolute gap-2 flex top-4 right-4">
          <Button className="size-fit p-2" variant={'secondary'}><Pen className="size-5" /></Button>
          <Button className="size-fit p-2" variant={'secondary'}><Trash2 className="size-5 text-red-500" /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center text-zinc-600">
          <Calendar className="size-5" />
          <p className="text-base my-4">{formatEventDate(date)}</p>
        </div>
        <CardTitle className="text-xl m-0 font-bold">{title}</CardTitle>
        <CardDescription className="line-clamp-5 mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
