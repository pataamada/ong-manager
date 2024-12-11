import { Card } from "@/components/ui/card"
import { CreateEventModal } from "./_components/modals/create-event"
import { CreateNewsModal } from "./_components/modals/create-news"
import ScheduleTabs from "./_components/schedule-tabs"

export default function Schedules() {
	return (
		<Card className="p-6">
			<ScheduleTabs />
			<CreateEventModal />
			<CreateNewsModal />
		</Card>
	)
}
