import { ScheduleCard } from "./cards/schedule-card"
import { eventsList } from "./mock-data"

export function Events() {
	return (
		<div className="flex flex-wrap gap-6">
			{eventsList.map(event => (
				<ScheduleCard key={event.id} {...event} />
			))}
		</div>
	)
}
