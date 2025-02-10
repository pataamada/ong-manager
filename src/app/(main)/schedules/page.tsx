"use client"

import { Card } from "@/components/ui/card"
import { CreateEventModal } from "./_components/modals/create-event"
import { CreateNewsModal } from "./_components/modals/create-news"
import { DeleteScheduleModal } from "./_components/modals/delete-schedule"
import { FilterDrawer } from "./_components/modals/filter"
import ScheduleTabs from "./_components/schedule-tabs"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Schedules() {
	return (
	<Suspense>
			<Card className="flex flex-col p-6 flex-1">
			<ScheduleTabs />
			<CreateEventModal />
			<CreateNewsModal />
			<DeleteScheduleModal />
			<FilterDrawer />
		</Card>
	</Suspense>
	)
}
