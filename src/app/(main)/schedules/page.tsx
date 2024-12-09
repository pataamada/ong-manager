import { AgendaCard } from "@/app/(main)/schedules/-components/schedule-card"
import { EventsList } from "./mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Filters } from "./-components/filters"
import { CreateEventModal } from "./-components/modals/create-event"

export default function Schedules() {
	return (
		<Card className="p-6">
			<Tabs defaultValue="events">
				<div className="flex gap-2 justify-between">
					<TabsList className="mb-6">
						<TabsTrigger value="events">Eventos</TabsTrigger>
						<TabsTrigger value="news">Notícias</TabsTrigger>
					</TabsList>
					<Filters />
					<CreateEventModal />
				</div>
				<TabsContent value="events" className="flex flex-1">
					{/* <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 place-items-center"> */}
					<div className="flex flex-wrap gap-6">
						{EventsList.map(event => (
							<AgendaCard key={event.title} {...event} />
						))}
					</div>
				</TabsContent>
				<TabsContent value="news">Notícias</TabsContent>
			</Tabs>
		</Card>
	)
}
