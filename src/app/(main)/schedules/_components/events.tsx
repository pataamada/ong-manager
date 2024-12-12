"use client"
import { useSetAtom } from "jotai"
import { EventCard } from "./cards/event-card"
import { confirmDeleteInfo, confirmDeleteModal } from "./store"
import { useGetEvents } from "./mutations/useEvents"
import { When } from "@/components/when"
import { PawLoader } from "@/components/paw-loader"

export function Events() {
	const { data, isLoading } = useGetEvents()
	const setDeleteInfo = useSetAtom(confirmDeleteInfo)
	const setDeleteModal = useSetAtom(confirmDeleteModal)
	const handleDelete = (title: string) => {
		setDeleteInfo({
			description: "Certeza que deseja excluir esse evento?",
			title: `Excluir Evento ${title}`,
		})
		setDeleteModal(true)
	}
	return (
		<div className="flex flex-1 flex-wrap gap-6">
			<When
				condition={!isLoading}
				fallback={
					<div className="flex-1 flex items-center justify-center">
						<PawLoader />
					</div>
				}
			>
				{data?.map(event => (
					<EventCard
						key={event.id}
						{...event}
						onDelete={() => handleDelete(event.title)}
						onEdit={() => {}}
					/>
				))}
			</When>
		</div>
	)
}
