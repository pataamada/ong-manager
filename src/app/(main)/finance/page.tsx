"use client";
import {
  findDonationsAction,
  findExpensesAction,
} from "@/actions/transaction/findFinance";
import { PawLoader } from "@/components/paw-loader";
import { Button } from "@/components/ui/button";
import { When } from "@/components/when";
import { ETransactionTypeDonation } from "@/models/donation.model";
import type { Donation, Expense } from "@/services/finance.service";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Totalizer } from "./_components/Totalizer";
import { NewRegister } from "./_components/modals/new-register";
import { TableDonations } from "./_components/tables/TableDonations";
import { TableExpense } from "./_components/tables/TableExpense";

export default function Finance() {
  const [isModalNewRegister, setIsModalNewRegister] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "donations" | "expense">(
    "donations"
  );
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllDonations = async () => {
    setIsLoading(true);
    try {
      const response = await findDonationsAction();
      if (response?.data) {
        setDonations(response.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setIsLoading(false);
  };
  const getAllExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await findExpensesAction();
      if (response?.data) {
        setExpenses(response.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setIsLoading(false);
  };

  const onReloadData = async () => {
    await getAllDonations();
    await getAllExpenses();
  };

  useEffect(() => {
    getAllDonations();
    getAllExpenses();
  }, []);

  return (
    <div>
      {isModalNewRegister && (
        <NewRegister
          open={isModalNewRegister}
          onOpenChange={(open) => setIsModalNewRegister(open)}
          onReloadData={onReloadData}
        />
      )}

      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        {[
          {
            type: "total",
            label: "Total",
            value:
              donations.reduce((sum, item) => sum + item.value, 0) -
              expenses.reduce((sum, item) => sum + item.value, 0),
          },
          {
            type: "donations",
            label: "Doações",
            value: donations.reduce((sum, item) => sum + item.value, 0),
          },
          {
            type: "expenses",
            label: "Despesas",
            value: expenses.reduce((sum, item) => sum + item.value, 0),
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
            {filterType === "donations" && (
              <TableDonations
                data={donations.map(
                  ({ animalId, category, userName, date, value }) => ({
                    type: ETransactionTypeDonation.Donation,
                    animalId: animalId ?? "",
                    category,
                    userName,
                    date,
                    value,
                  })
                )}
              />
            )}
            {filterType === "expense" && (
              <TableExpense
                data={expenses.map(
                  ({ category, description, date, value }) => ({
                    category,
                    description,
                    date,
                    value,
                  })
                )}
              />
            )}
          </When>
        </div>
      </div>
    </div>
  );
}
