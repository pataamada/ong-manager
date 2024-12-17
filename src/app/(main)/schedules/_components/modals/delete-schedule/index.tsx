"use client"
import { ConfirmDeleteAlert } from "@/components/confirm-delete"
import { useAtom, useAtomValue } from "jotai"
import { confirmDeleteInfo, modalConfirmDelete } from "../../store"
import { useDeleteEvent } from "../../mutations/useEvents"
import { useToast } from "@/hooks/use-toast"
import { useDeleteNews } from "../../mutations/useNews"

export function DeleteScheduleModal() {
	const [modal, setModal] = useAtom(modalConfirmDelete)
	const infoModal = useAtomValue(confirmDeleteInfo)
	const { toast } = useToast()
	const { isPending: isDeletingEvents, mutateAsync: deleteEvent } = useDeleteEvent(toast)
	const { isPending: isDeletingNews, mutateAsync: deleteNews } = useDeleteNews(toast)
	return (
		<ConfirmDeleteAlert
			open={modal}
			onOpenChange={setModal}
			title={infoModal?.title}
			description={infoModal?.description}
			onSubmit={async () => {
				if (infoModal?.id) {
					setModal(false)
					if(infoModal.type === "event") await deleteEvent(infoModal.id)
					if(infoModal.type === "news") await deleteNews(infoModal.id)
				}
			}}
			loading={isDeletingEvents || isDeletingNews}
		/>
	)
}
