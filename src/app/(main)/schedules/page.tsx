import { eventsList,newsList } from "./mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Filters } from "./-components/filters"
import { CreateEventModal } from "./-components/modals/create-event"
import { ScheduleCard } from "./-components/schedule-card"
import { NewsCard } from "./-components/news-card"

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
					<div className="flex flex-wrap gap-6">
						{eventsList.map(event => (
							<ScheduleCard key={event.title} {...event} />
						))}
					</div>
				</TabsContent>
				<TabsContent value="news">
					<div className="flex flex-col gap-4">
						{newsList.map(news => (
							<NewsCard key={news.title} {...news} className="w-full" />
						))}
					</div>
				</TabsContent>
			</Tabs>
		</Card>
	)
}
