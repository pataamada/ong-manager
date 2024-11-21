"use client"

import {
	type ColumnFiltersState,
	type PaginationState,
	type Row,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import { Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { columns } from "./columns"
import type { UserWOutPassword } from "@/models/user.model"
import { useState } from "react"
import Image from "next/image"
import { filterDrawerAtom } from "../filters"
import { useSetAtom } from "jotai"

interface UsersTableProps {
	data: UserWOutPassword[]
	onDelete?: (row: Row<UserWOutPassword>) => unknown
	onEdit?: (row: Row<UserWOutPassword>) => unknown
	onRoleChange?: (row: Row<UserWOutPassword>) => unknown
	onCreate?: () => unknown
	pageSize?: number
	toggle?: () => void
}

export function UserTable({
	onDelete,
	onEdit,
	data,
	onRoleChange,
	onCreate,
	pageSize = 5,
}: UsersTableProps) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize,
	})
	const setFilter = useSetAtom(filterDrawerAtom)
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data,
		columns: columns({ roleChange: onRoleChange, delete: onDelete, edit: onEdit }),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			pagination,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className="w-full flex flex-col bg-white rounded-lg p-6 gap-6 min-h-full">
			<div className="flex items-center gap-2">
				<Input
					placeholder="Pesquise por nome, email..."
					value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
					onChange={event => table.getColumn("user")?.setFilterValue(event.target.value)}
					className="max-w-sm mr-auto"
				/>

				<Button variant="outline" size="icon" onClick={() => setFilter(true)}>
					<Filter className="h-4 w-4 text-black" />
				</Button>
				<Button onClick={() => onCreate?.()} className="flex items-center gap-2">
					<Plus />
					Novo usuário
				</Button>
			</div>

			{table.getRowModel().rows?.length ? (
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map(row => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="w-full flex-grow flex flex-col items-center justify-center">
					<Image src="empty-state.svg" alt="empty users image" height={200} width={200} />
					<span className="text-lg text-zinc-400">Parece que não tem usuários cadastrados</span>
				</div>
			)}

			{!!table.getRowModel().rows?.length && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} de{" "}
						{table.getFilteredRowModel().rows.length} linha(s) selecionada.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Anterior
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Próximo
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
