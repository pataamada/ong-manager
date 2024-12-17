import { PAGE_SIZES_TABLE } from "@/utils";
import { formatDateToBrazilian } from "@/utils/formatData";
import { DataTable } from "mantine-datatable";
import Image from "next/image";

interface ITableDonation {
  data: {
    type: string;
    animalId?: string
    avatar?: string
    category: string
    userName?: string
    date: string;
    value: string;
  }[];
  page: number;
  pageSize: number;
  totalData: number;
  handlePage: (page: number, pageSize: number) => void;
  handlePageSize: (pageSize: number) => void;
}

export const TableDonation = ({
  data,
  page,
  pageSize,
  totalData,
  handlePage,
  handlePageSize,
}: ITableDonation) => {
  return (
    <DataTable
      records={data}
      totalRecords={totalData}
      page={page}
      recordsPerPage={pageSize}
      recordsPerPageLabel="Registros por página"
      recordsPerPageOptions={PAGE_SIZES_TABLE}
      onRecordsPerPageChange={handlePageSize}
      onPageChange={(p) => handlePage(p, pageSize)}
      minHeight={500}
      backgroundColor={{ dark: "#fff", light: "#000" }}
      paginationSize="md"
      noRecordsText="Sem registros"
      emptyState={
        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <Image
            src="empty-state.svg"
            alt="empty users image"
            height={200}
            width={200}
          />
          <span className="text-lg text-zinc-400">
            Não há nenhum registro financeiro cadastrado
          </span>
        </div>
      }
      paginationText={({ from, to, totalRecords }) =>
        totalRecords === 0
          ? "Vazio"
          : `Mostrando ${from} a ${to} de ${totalRecords} registros`
      }
      verticalSpacing="lg"
      horizontalSpacing="xl"
      columns={[
        {
          accessor: "animal",
          title: "Animal",
          titleClassName: "font-normal text-base text-[#52525B]",
          render: ({ animalId, avatar }) => (
            <div className="flex items-center gap-2">
              <Image
                src={avatar ? avatar : "finance/dog.svg"}
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
                <div className="font-normal text- text-[#A1A1AA]">
                  Nenhum animal especificado
                </div>
              )}
            </div>
          ),
        },
        {
          accessor: "category",
          title: "Causa",
          titleClassName: "font-normal text-base text-[#52525B]",
          render: ({ category }) => (
            <div className="flex justify-center items-center p-1 px-3 rounded-full bg-[#F4F4F5] max-w-max">
              <div className="text-sm font-semibold text-[#09090B]">
                {category}
              </div>
            </div>
          ),
        },
        {
          accessor: "userName",
          title: "Doador",
          titleClassName: "font-normal text-base text-[#52525B]",
          render: ({ userName }) => (
            <div className="font-normal text-base text-[#09090B]">
              {userName ? (
                <div className="font-normal text-base text-[#09090B]">
                  {userName}
                </div>
              ) : (
                <div className="font-normal text- text-[#A1A1AA]">Anônimo</div>
              )}
            </div>
          ),
        },
        {
          accessor: "date",
          title: "Data",
          titleClassName: "font-normal text-base text-[#52525B]",
          render: ({ date }) => (
            <div className="font-normal text-base text-[#09090B]">{formatDateToBrazilian(date)}</div>
          ),
        },
        {
          accessor: "value",
          title: "Valor",
          titleClassName: "font-normal text-base text-[#52525B]",
          render: ({ value, type }) => (
            <div
              className={`font-normal text-base text-[#10B981]`}
            >
              {value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          ),
        },
      ]}
    />
  );
};
