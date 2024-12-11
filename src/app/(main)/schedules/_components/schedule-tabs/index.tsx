"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filters } from "../filters"
import { useQueryState } from "nuqs"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSetAtom } from "jotai"
import { createEventModal, createNewsModal } from "../store"
import { Events } from "../events"
import { News } from "../news"
export default function ScheduleTabs() {
	const [tab, setTab] = useQueryState("tab", { defaultValue: "events" })
	const setOpenEventModal = useSetAtom(createEventModal)
	const setOpenNewsModal = useSetAtom(createNewsModal)
	const handleOpenModal = () => {
		if (tab === "events") {
			setOpenEventModal(true)
			return
		}
		setOpenNewsModal(true)
	}
	return (
		<Tabs defaultValue={tab} value={tab} onValueChange={setTab}>
			<div className="flex gap-2 justify-between">
				<TabsList className="mb-2">
					<TabsTrigger value="events">Eventos</TabsTrigger>
					<TabsTrigger value="news">Notícias</TabsTrigger>
				</TabsList>
				<Filters />
				<Button onClick={handleOpenModal}>
					<Plus size={16} />
					<span className="ml-2">{tab === "events" ? "Criar Evento" : "Criar Notícias"}</span>
				</Button>
			</div>
			<TabsContent value="events" className="flex flex-1">
				<Events />
			</TabsContent>
			<TabsContent value="news">
				<News />
			</TabsContent>
		</Tabs>
	)
}
