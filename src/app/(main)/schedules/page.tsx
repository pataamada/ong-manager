import { Card } from "@/components/ui/card"
import { CreateEventModal } from "./_components/modals/create-event"
import { CreateNewsModal } from "./_components/modals/create-news"
import ScheduleTabs from "./_components/schedule-tabs"
import { DeleteScheduleModal } from "./_components/modals/delete-schedule"

export default function Schedules() {
	return (
		<Card className="flex flex-col p-6 flex-1">
			<ScheduleTabs />
			<CreateEventModal />
			<CreateNewsModal />
			<DeleteScheduleModal />
		</Card>
	)
}
