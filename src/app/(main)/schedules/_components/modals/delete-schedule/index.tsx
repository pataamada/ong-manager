"use client"
import { ConfirmDeleteAlert } from "@/components/confirm-delete"
import { useAtom, useAtomValue } from "jotai"
import { confirmDeleteInfo, modalConfirmDelete } from "../../store"
import { useDeleteNews } from "../../mutations/useNews"
import { useToast } from "@/hooks/use-toast"

export function DeleteScheduleModal() {
	const [modal, setModal] = useAtom(modalConfirmDelete)
	const infoModal = useAtomValue(confirmDeleteInfo)
	const { toast } = useToast()
	const { isPending: isDeleting, mutateAsync: deleteNews } = useDeleteNews(toast)

	return (
		<ConfirmDeleteAlert
			open={modal}
			onOpenChange={setModal}
			title={infoModal?.title}
			description={infoModal?.description}
			onSubmit={async () => {
				if (infoModal?.id) {
					setModal(false)
					await deleteNews(infoModal.id)
				}
			}}
			loading={isDeleting}
		/>
	)
}
