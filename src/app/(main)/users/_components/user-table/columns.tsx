"use client"
import { BadgeMenu } from "@/components/custom-ui/badge-menu"
// import { BadgeMenu } from "@/components/custom-ui/badge-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User, UserRoles } from "@/models/user.model"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Edit2, MoreHorizontal, Trash } from "lucide-react"

export const columns = (roleChangeCallback: (row: Row<User>) => unknown): ColumnDef<User>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "user",
		accessorFn: row => `${row.name}-${row.email}`,
		header: "Usuário",
		meta: {
			title: "Usuário",
		},
		filterFn: (user, _, filterValue) => {
			return user.original.email.includes(filterValue.toLowerCase())
		},
		cell: ({ row }) => (
			<div className="capitalize">
				<h6>{row.original.name}</h6>
				<span>{row.original.email}</span>
			</div>
		),
	},
	{
		accessorKey: "uuid",
		meta: {
			title: "ID",
		},
		header: () => <div className="text-center">ID</div>,
		cell: ({ row }) => <div className="text-center lowercase">{row.original.uid}</div>,
	},
	{
		accessorKey: "cpf",
		meta: {
			title: "CPF",
		},
		header: () => <div className="text-center">CPF</div>,
		cell: ({ row }) => <div className="text-center font-medium">{row.original.cpf}</div>,
	},
	{
		accessorKey: "role",
		meta: {
			title: "Cargo",
		},
		header: () => <div className="text-center">Cargo</div>,
		cell: ({ row, getValue }) => (
			<div className="w-full flex justify-center">
				<BadgeMenu
					title="Selecionar Cargo"
					value={getValue() as string}
					onValueChange={value => {
						row.original.role = value as UserRoles
						roleChangeCallback(row)
					}}
					options={[
						{
							title: "Administrador",
							value: "ADMIN",
							description: "Ver, Criar, Atualizar e Apagar",
						},
						{ title: "Funcionário", value: "WORKER", description: "Ver, Criar, Atualizar" },
						{ title: "Padrinho", value: "PARTNER", description: "Ver" },
					]}
				/>
			</div>
		),
	},
	{
		id: "actions",
		meta: {
			title: "ações",
		},
		header: () => <div className="text-right">Ações</div>,
		enableHiding: false,
		cell: () => {
			return (
				<div className="w-full flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem className="gap-2">
								<Edit2 size={16} />
								<span>Editar</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="gap-2 text-red-500">
								<Trash size={16} />
								<span>Apagar</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
