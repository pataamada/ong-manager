"use client"
import { ConfirmDeleteAlert } from "@/components/confirm-delete"
import { useAtom, useAtomValue } from "jotai"
import { useToast } from "@/hooks/use-toast"
import { confirmDeleteAnimalAtom, confirmDeleteInfoAtom } from "../store"
import { useDeleteAnimal } from "../mutations"

export function DeleteAnimalModal() {
	const [modal, setModal] = useAtom(confirmDeleteAnimalAtom)
	const infoModal = useAtomValue(confirmDeleteInfoAtom)
	const { toast } = useToast()
	const { isPending, mutateAsync: deleteAnimal } = useDeleteAnimal(toast)
	return (
		// TODO: ADICIONAR IMAGENS NO MODAL DE CONFIRMAÇÃO DE DELEÇÃO
		<ConfirmDeleteAlert
			open={modal}
			onOpenChange={setModal}
			title={infoModal?.title}
			description={infoModal?.description}
			onSubmit={async () => {
				if (infoModal?.id) {
					await deleteAnimal(infoModal.id)
					setModal(false)
				}
			}}
			loading={isPending}
		/>
	)
}
