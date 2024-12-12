'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import { IPropsTotalizer, Totalizer } from "./_components/Totalizer";
import { NewRegister } from "./_components/modals/new-register";
import { useState } from "react";
import { TableAll } from "./_components/tables/TableAll";
import { TableExpense } from "./_components/tables/TableExpense";
import { TableDonation } from "./_components/tables/TableDonation";

const mockedTotalizers: IPropsTotalizer[] = [
  {
    type: 'total',
    label: 'Total',
    value: 'R$ 300,00'
  },
  {
    type: 'donations',
    label: 'Doações',
    value: 'R$ 1600,00'
  },
  {
    type: 'expenses',
    label: 'Despesas',
    value: 'R$ 1300,00'
  },
]

const mockedFinance = {
  all: [
    {type: 'expense', category: 'Água', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'donation', category: 'Cirurgia', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'expense', category: 'Limpeza', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'donation', category: 'Energia', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'expense', category: 'Ração', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'donation', category: 'Aluguel', description: 'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam', date: '2020-05-06 11:24:08', value: 'R$230,00'},
  ],
  donations: [
    {type: 'donation', animal: 'nina', cause: 'Ração', donor: 'João Victor Zignago', date: '2020-05-06 11:24:08', value: 'R$230,00',avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg'},
    {type: 'donation', animal: 'Donatelo Esquentado', cause: 'Cirugia', donor: 'João Victor Zignago', date: '2020-05-06 11:24:08', value: 'R$230,00',avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg'},
    {type: 'donation', animal: 'Cabeça de Pastel', cause: 'Cirurgia', donor: 'João Victor Zignago', date: '2020-05-06 11:24:08', value: 'R$230,00',avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg'},
  ],
  expense: [
    {type: 'expense', cause: 'Ração', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'expense', cause: 'Limpeza', date: '2020-05-06 11:24:08', value: 'R$230,00'},
    {type: 'expense', cause: 'água', date: '2020-05-06 11:24:08', value: 'R$230,00'},
  ]
}

export default function Finance() {
  const [isModalNewRegister, setIsModalNewRegister] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'donations' | 'expense'>('all')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState(mockedFinance.all.length);

  return (
    <div>
      {isModalNewRegister && (
        <NewRegister
          open={isModalNewRegister}
          onOpenChange={(open) => setIsModalNewRegister(open)}
        />
      )}

      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {mockedTotalizers.map((i) => (
          <Totalizer
            key={i.type}
            type={i.type}
            label={i.label}
            value={i.value}
          />
        ))}
      </div>
      <div className="flex w-full mt-4 p-6 gap-4 rounded-lg bg-[#FFFFFF] border border-[#E4E4E7]">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-4 flex-wrap lg:flex-nowrap">
            <div className="flex p-[5px] rounded-[6px] bg-[#F4F4F5]">
              <div
                onClick={() => setFilterType("all")}
                className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${
                  filterType === "all" ? "bg-[#FFFFFF]" : "bg-[#F4F4F5]"
                }`}
              >
                <div className="font-semibold text-sm text-[#09090B]">
                  Todas
                </div>
              </div>
              <div
                onClick={() => setFilterType("donations")}
                className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${
                  filterType === "donations" ? "bg-[#FFFFFF]" : "bg-[#F4F4F5]"
                }`}
              >
                <div className="font-semibold text-sm text-[##71717A]">
                  Doações
                </div>
              </div>
              <div
                onClick={() => setFilterType("expense")}
                className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${
                  filterType === "expense" ? "bg-[#FFFFFF]" : "bg-[#F4F4F5]"
                }`}
              >
                <div className="font-semibold text-sm text-[##71717A]">
                  Despesas
                </div>
              </div>
            </div>
            <div className="flex justify-end flex-1 gap-4 flex-wrap lg:flex-nowrap">
              <Input
                placeholder="Pesquisar..."
                className="w-full max-w-sm"
                leftIcon={
                  <Image
                    src={`/search.svg`}
                    width={16}
                    height={16}
                    priority
                    alt="ícone"
                  />
                }
              />
              <Input
                placeholder="Selecionar período"
                className="w-full max-w-sm"
                leftIcon={
                  <Image
                    src={`/calendar.svg`}
                    width={16}
                    height={16}
                    priority
                    alt="ícone"
                  />
                }
              />
              <Button
                className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
                onClick={() => setIsModalNewRegister(true)}
              >
                <Plus className="h-5 w-5" />
                Novo registro
              </Button>
            </div>
          </div>

          {/* list */}
          {filterType === "all" && (
            <TableAll
              data={mockedFinance.all}
              totalData={totalData}
              page={page}
              pageSize={pageSize}
              handlePage={(page, pageSize) => ({})}
              handlePageSize={(pageSize) => setPageSize(pageSize)}
            />
          )}
          {filterType === "donations" && (
            <TableDonation
              data={mockedFinance.donations}
              totalData={totalData}
              page={page}
              pageSize={pageSize}
              handlePage={(page, pageSize) => ({})}
              handlePageSize={(pageSize) => setPageSize(pageSize)}
            />
          )}
          {filterType === "expense" && (
            <TableExpense
              data={mockedFinance.expense}
              totalData={totalData}
              page={page}
              pageSize={pageSize}
              handlePage={(page, pageSize) => ({})}
              handlePageSize={(pageSize) => setPageSize(pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
