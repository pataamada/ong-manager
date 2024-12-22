"use client"

import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import type { UserWOutPassword } from "@/models/user.model"
import type { Row } from "@tanstack/react-table"
import { useAtom } from "jotai"
import { useState } from "react"
import { useDeleteUser, useGetUsers, useUpdateUser } from "../../mutations"
import { ConfirmDeleteUserAlert } from "../modals/confirm-delete"
import { CreateUpdateUserModal } from "../modals/create-update"
import { FilterDrawer } from "../modals/filter"
import { confirmDeleteAtom, modalUserAtom } from "../store"
import { UserTable } from "./table"

export function UserList() {
	const { data, isLoading } = useGetUsers()
	const { toast } = useToast()
	const { user } = useAuth()
	const { mutateAsync: deleteUser, isPending: isPendingDelete } = useDeleteUser(toast)
	const { mutateAsync: updateUser } = useUpdateUser()
	const [modalUserData, setModalUserData] = useState<UserWOutPassword | undefined | null>()
	const [userModal, setUserModal] = useAtom(modalUserAtom)
	const [confirmDeleteModal, setConfirmDeleteModal] = useAtom(confirmDeleteAtom)

	const handleRoleChange = async (row: Row<UserWOutPassword>) => {
		const rowValue = row.original
		await updateUser({ role: rowValue.role, uid: rowValue.uid })
	}
	const handleOpenCreate = () => {
		setModalUserData(null)
		setUserModal(true)
	}
	const handleOpenEdit = (row: Row<UserWOutPassword>) => {
		setModalUserData(row.original)
		setUserModal(true)
	}
	const handleOpenDelete = (row: Row<UserWOutPassword>) => {
		setModalUserData(row.original)
		setConfirmDeleteModal(true)
	}
	return (
		<>
			<UserTable
				data={data || []}
				currentUser={user}
				onDelete={handleOpenDelete}
				onEdit={handleOpenEdit}
				onRoleChange={handleRoleChange}
				onCreate={handleOpenCreate}
				loading={isLoading}
			/>
			<ConfirmDeleteUserAlert
				open={confirmDeleteModal}
				onOpenChange={open => setConfirmDeleteModal(open)}
				onSubmit={async () => {
					if (!modalUserData) {
						return
					}
					await deleteUser({ uid: modalUserData.uid })
					setConfirmDeleteModal(false)
					setModalUserData(null)
				}}
				loading={isPendingDelete}
			/>
			<CreateUpdateUserModal
				open={userModal}
				onOpenChange={open => setUserModal(open)}
				data={modalUserData}
				onClose={() => setUserModal(false)}
			/>
			<FilterDrawer />
		</>
	)
}
