"use client"

import type { UserWOutPassword } from "@/models/user.model"
import { ConfirmDeleteUserAlert } from "../modals/confirm-delete"
import { useState } from "react"
import { CreateUpdateUserModal } from "../modals/create-update"
import { UserTable } from "./table"
import type { Row } from "@tanstack/react-table"
import { useDeleteUser, useGetUsers } from "../../mutations"
import { FilterDrawer } from "../modals/filter"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/hooks/use-auth"
import { useAtom } from "jotai"
import { confirmDeleteAtom, modalUserAtom } from "../store"

export function UserList() {
	const { data, isLoading } = useGetUsers()
	const { user } = useAuth()
	const { mutateAsync, isPending } = useDeleteUser()
	const queryClient = useQueryClient()
	const [modalUserData, setModalUserData] = useState<UserWOutPassword | undefined | null>()
	const [userModal, setUserModal] = useAtom(modalUserAtom)
	const [confirmDeleteModal, setConfirmDeleteModal] = useAtom(confirmDeleteAtom)

	const handleRoleChange = (row: Row<UserWOutPassword>) => {
		const rowValue = row.original
		const updatedData = data?.map(oldRow => {
			if (oldRow.uid === rowValue.uid) {
				return rowValue
			}
			return oldRow
		})
		queryClient.setQueryData<UserWOutPassword[]>(["users"], updatedData)
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
					await mutateAsync({ uid: modalUserData.uid })
					setConfirmDeleteModal(false)
					setModalUserData(null)
				}}
				loading={isPending}
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
