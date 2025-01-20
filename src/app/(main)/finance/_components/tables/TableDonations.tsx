"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatDateToBrazilian } from "@/utils/formatData";

interface Data {
  animal?: string;
  category: string;
  userName?: string;
  date: string;
  value: number;
}

interface TableProps {
  data: Data[];
}

export function TableDonations({ data }: TableProps) {
  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "animal",
      header: "Animal",
      cell: ({ row }) => {
        const { animalId, avatar } = row.original; // Obter dados da linha.

        return (
          <div className="flex items-center gap-2">
            <Image
              src={avatar || "/finance/dog.svg"} // Imagem padrão.
              width={40}
              height={40}
              alt="animal avatar"
              className="rounded"
            />
            {animalId ? (
              <div className="font-normal text-base text-[#09090B]">
                {animalId}
              </div>
            ) : (
              <div className="font-normal text-[#A1A1AA]">
                Nenhum animal especificado
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ getValue }) => (
        <div className="flex justify-center items-center p-1 px-3 rounded-full bg-[#F4F4F5] max-w-max">
          <div className="text-sm text-center font-semibold text-[#09090B]">
            {getValue() as string}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: "Doador",
      cell: ({ getValue }) => (
        <div className="font-normal text-base text-[#09090B]">
          {(getValue() as string) ? (
            <div className="font-normal text-base text-[#09090B]">
              {getValue() as string}
            </div>
          ) : (
            <div className="font-normal text- text-[#A1A1AA]">Anônimo</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ getValue }) => (
        <div className="font-normal text-base text-[#09090B]">
          {formatDateToBrazilian(getValue() as string)}
        </div>
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ getValue }) => (
        <div className={"font-normal text-base text-[#10B981]"}>
          {(getValue() as number).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data.filter((row) =>
      row.category.toLowerCase().includes(filter.toLowerCase())
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      {/* <Input
        placeholder="Filter by category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-md"
      /> */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
