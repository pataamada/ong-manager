"use client"
import { ConfirmDeleteAlert } from "@/components/confirm-delete"
import { useAtom, useAtomValue } from "jotai"
import { confirmDeleteInfo, confirmDeleteModal } from "../../store"

export function DeleteScheduleModal() {
	const [modal, setModal] = useAtom(confirmDeleteModal)
	const infoModal = useAtomValue(confirmDeleteInfo)
	return (
		<ConfirmDeleteAlert
			open={modal}
			onOpenChange={setModal}
			title={infoModal?.title}
			description={infoModal?.description}
		/>
	)
}
