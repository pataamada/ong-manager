"use client"

import type { UserWOutPassword } from "@/models/user.model"
import { ConfirmDeleteUserAlert } from "../modals/confirm-delete"
import { useState } from "react"
import { CreateUpdateUserModal } from "../modals/create-update"
import { UserTable } from "./table"
import type { Row } from "@tanstack/react-table"
import { useDeleteUser, useGetUsers } from "../../mutations"
import { FilterDrawer } from "../modals/filter"

interface UsersListProps {
	users?: UserWOutPassword[]
}
export function UserList({ users = [] }: UsersListProps) {
	const { data } = useGetUsers(users)
	const { mutateAsync, isPending } = useDeleteUser()
	const [updateUser, setUpdateUser] = useState<UserWOutPassword | undefined | null>()
	const [deleteUser, setDeleteUser] = useState<UserWOutPassword | null>()

	const handleRoleChange = (row: Row<UserWOutPassword>) => {
		const rowValue = row.original
		data.map(oldRow => {
			if (oldRow.uid === rowValue.uid) {
				return rowValue
			}
			return oldRow
		})
	}
	const handleOpenCreate = () => {
		setUpdateUser(null)
	}
	const handleOpenEdit = (row: Row<UserWOutPassword>) => {
		setUpdateUser(row.original)
	}
	const handleOpenDelete = (row: Row<UserWOutPassword>) => {
		setDeleteUser(row.original)
	}

	return (
		<>
			{/* <DrawerFilter /> */}
			<UserTable
				data={data}
				onDelete={handleOpenDelete}
				onEdit={handleOpenEdit}
				onRoleChange={handleRoleChange}
				onCreate={handleOpenCreate}
				pageSize={10}
			/>
			<ConfirmDeleteUserAlert
				open={!!deleteUser}
				onOpenChange={() => setDeleteUser(null)}
				onSubmit={async () => {
					if (!deleteUser) {
						return
					}
					await mutateAsync({ uid: deleteUser.uid })
					setDeleteUser(null)
				}}
				loading={isPending}
			/>
			<CreateUpdateUserModal
				open={!!(updateUser || updateUser === null)}
				onOpenChange={() => setUpdateUser(undefined)}
				data={updateUser}
				onClose={() => setUpdateUser(undefined)}
			/>
			<FilterDrawer />
		</>
	)
}
