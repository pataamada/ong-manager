"use client"

import * as React from "react"
import {
	type ColumnFiltersState,
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
import { usersMock } from "../mock"
import type { User } from "@/models/user.model"

export function UsersTable() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [data, setData] = React.useState(usersMock)
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const handleRoleChange = (row: Row<User>) => {
		const rowValue = row.original
		const updatedData = data.map(oldRow => {
			if (oldRow.uid === rowValue.uid) {
				return rowValue
			}
			return oldRow
		})
		setData(() => updatedData)
	}
	const handleEdit = (row: Row<User>) => {
		console.log(row)
	}
	const handleDelete = (row: Row<User>) => {
		console.log(row)
	}
	const table = useReactTable({
		data,
		columns: columns({ roleChange: handleRoleChange, delete: handleDelete, edit: handleEdit }),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})
	return (
		<div className="w-full">
			<div className="flex items-center py-4 gap-2">
				<Input
					placeholder="Pesquise por nome, email..."
					value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
					onChange={event => table.getColumn("user")?.setFilterValue(event.target.value)}
					className="max-w-sm mr-auto"
				/>
				<Button variant="outline" size="icon">
					<Filter size={20} />
				</Button>
				<Button>
					<Plus />
					Novo usuário
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
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
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
