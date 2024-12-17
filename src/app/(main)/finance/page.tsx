'use client'

import { findDonationsAction, findExpensesAction } from "@/actions/transaction/findFinance";
import { PawLoader } from "@/components/paw-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { When } from "@/components/when";
import { PAGE_SIZES_TABLE } from "@/utils";
import { paginateItems } from "@/utils/paginateItems";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IPropsTotalizer, Totalizer } from "./_components/Totalizer";
import { NewRegister } from "./_components/modals/new-register";
import { TableDonation } from "./_components/tables/TableDonation";
import { TableExpense } from "./_components/tables/TableExpense";

const mockedTotalizers: IPropsTotalizer[] = [
  {
    type: 'total',
    label: 'Total',
    value: 'R$ 0,00'
  },
  {
    type: 'donations',
    label: 'Doações',
    value: 'R$ 0,00'
  },
  {
    type: 'expenses',
    label: 'Despesas',
    value: 'R$ 0,00'
  },
]

export default function Finance() {
  const [isModalNewRegister, setIsModalNewRegister] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'donations' | 'expense'>('donations')
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES_TABLE[0]);
  const [totalDataDonations, setTotalDataDonations] = useState(0);
  const [totalDataExpenses, setTotalDataExpenses] = useState(0);
  const [donations, setDonations] = useState([]);
  const [donationsPagination, setDonationsPagination] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expensesPagination, setExpensesPagination] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllDonations = async () => {
    setIsLoading(true)
    try {
      const response = await findDonationsAction()
      setDonations(response?.data)
      handlePaginationDonations(response?.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }
  const getAllExpenses = async () => {
    setIsLoading(true)
    try {
      const response = await findExpensesAction()
      setExpenses(response?.data)
      handlePaginationExpenses(response?.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const handlePaginationDonations = (items: any) => {
    setIsLoading(true)
    const {data, totalItems} = paginateItems(items, page, pageSize);
    setDonationsPagination(data)
    setTotalDataDonations(totalItems)
    setIsLoading(false)
  }
  const handlePaginationExpenses = (items: any) => {
    setIsLoading(true)
    const {data, totalItems} = paginateItems(items, page, pageSize);
    setExpensesPagination(data)
    setTotalDataExpenses(totalItems)
    setIsLoading(false)
  }

  // const clearCollection = async (collectionName = 'donations') => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, collectionName));
  //     const deletePromises = querySnapshot.docs.map((docItem) =>
  //       deleteDoc(doc(db, collectionName, docItem.id))
  //     );
  
  //     await Promise.all(deletePromises);
  //     console.log(`Coleção ${collectionName} foi limpa com sucesso!`);
  //   } catch (error) {
  //     console.error("Erro ao limpar a coleção:", error);
  //   }
  // };
  
  useEffect(() => {
    getAllDonations()
    getAllExpenses()
    // clearCollection()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (filterType === 'donations') {
      handlePaginationDonations(donations)
    } else if (filterType === 'expense') {
      handlePaginationExpenses(expenses)
    } else {
      // handlePaginationAll()
    }
  }, [filterType ,page, pageSize])

  return (
    <div>
      {isModalNewRegister && (
        <NewRegister
          open={isModalNewRegister}
          onOpenChange={(open) => setIsModalNewRegister(open)}
          onReloadData={getAllDonations}
        />
      )}

      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {[
        {
          type: 'total',
          label: 'Total',
          value: donations.reduce((sum, item) => sum + item.value, 0) - expenses.reduce((sum, item) => sum + item.value, 0)
        },
        {
          type: 'donations',
          label: 'Doações',
          value: donations.reduce((sum, item) => sum + item.value, 0)
        },
        {
          type: 'expenses',
          label: 'Despesas',
          value: expenses.reduce((sum, item) => sum + item.value, 0)
        },
      ].map((i) => (
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
              {/* <div
                onClick={() => setFilterType("all")}
                className={`flex justify-center items-center rounded-[3px] px-3 h-[34px] hover:cursor-pointer ${
                  filterType === "all" ? "bg-[#FFFFFF]" : "bg-[#F4F4F5]"
                }`}
              >
                <div className="font-semibold text-sm text-[#09090B]">
                  Todas
                </div>
              </div> */}
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
              {/* <Input
                placeholder="Pesquisar..."
                className="w-full max-w-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
              /> */}
              <Button
                className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
                onClick={() => setIsModalNewRegister(true)}
              >
                <Plus className="h-5 w-5" />
                Novo registro
              </Button>
            </div>
          </div>

          <When
            condition={!isLoading}
            fallback={
              <div className="flex flex-1 items-center justify-center">
                <PawLoader />
              </div>
            }
          >
            {/* list */}
            {/* {filterType === "all" && (
            <TableAll
              data={[]}
              totalData={totalData}
              page={page}
              pageSize={pageSize}
              handlePage={(currentPage) => setPage(currentPage)}
              handlePageSize={(pageSize) => setPageSize(pageSize)}
            />
          )} */}
            {filterType === "donations" && (
              <TableDonation
                data={donationsPagination}
                totalData={totalDataDonations}
                page={page}
                pageSize={pageSize}
                handlePage={(currentPage) => setPage(currentPage)}
                handlePageSize={(pageSize) => setPageSize(pageSize)}
              />
            )}
            {filterType === "expense" && (
              <TableExpense
                data={expensesPagination}
                totalData={totalDataExpenses}
                page={page}
                pageSize={pageSize}
                handlePage={(currentPage) => setPage(currentPage)}
                handlePageSize={(pageSize) => setPageSize(pageSize)}
              />
            )}
          </When>
        </div>
      </div>
    </div>
  );
}
