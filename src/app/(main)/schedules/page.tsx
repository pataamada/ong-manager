import { AgendaCard } from "@/components/agenda/AgendaCard"
import { EventsList } from "./mockData"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Filters } from "@/components/agenda/Filters"
import { Card } from "@/components/ui/card"

export default function Agenda() {
	return (
		<Card className="p-6">
			<Tabs defaultValue="account">
				<div className="flex gap-2 justify-between">
					<TabsList className="mb-6">
						<TabsTrigger value="account">Eventos</TabsTrigger>
						<TabsTrigger value="password">Notícias</TabsTrigger>
					</TabsList>
					<Filters />
				</div>
				<TabsContent value="account" className="flex flex-1">
					<div className="grid grid-cols-1 min-[850px]:grid-cols-2 min-[1200px]:grid-cols-3 2xl:grid-cols-4 gap-6 w-fit">
						{EventsList.map(event => (
							<AgendaCard key={event.title} {...event} />
						))}
					</div>
				</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
			</Tabs>
		</Card>
	)
}
