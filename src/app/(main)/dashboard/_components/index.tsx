/* eslint-disable @next/next/no-img-element */
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { AreaLegendChart } from "@/app/(main)/dashboard/_components/AreaLegendChart"
import { DonationsTable } from "@/app/(main)/dashboard/_components/DonationsTable"
import { DonutChart } from "@/app/(main)/dashboard/_components/DonutChart"
import { ExpensesTable } from "@/app/(main)/dashboard/_components/ExpensesTable"
import { Card } from "@/app/(main)/dashboard/_components/card"
import Image from "next/image"
import { Counters } from "../_components/Counters"
import { formatRelative } from "date-fns"
import { ptBR } from "date-fns/locale"

export async function DashboardComponent() {
    const currentUser = await getCurrentUser()
    const lastAccess =
        currentUser?.user !== undefined
            ? formatRelative(new Date(currentUser.user.metadata.lastSignInTime), new Date(), {
                    locale: ptBR,
                })
            : "Sem info..."

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card
                className="sm:col-span-2 lg:col-span-3 gap-4"
                title={`Woof! Bem-vindo de volta, ${currentUser?.user?.displayName || "Admin"}`}
                subtitle={`Último acesso: ${lastAccess}`}
                childrenPosition="top"
                textPosition="bottom"
            >
                <div className="w-full overflow-hidden relative rounded-md bg-[#b91c1c]">
                    <img
                        src="/dashboard/banner-dashboard.svg"
                        className={"w-full object-cover min-w-[800px]"}
                        alt="banner"
                    />
      			<div className="absolute right-0 h-full top-1/2 -translate-y-1/2 max-[470px]:flex hidden bg-[#b91c1c] items-center">
                        <Image
                            src="/logo-pata.svg"
                            width={100}
                            height={100}
                            alt="Logo Pata Amada"
                        />
                    </div>
                </div>
            </Card>
            <Counters />
            <Card
                title="Entrada e Saída"
                subtitle="Comparativo de receita"
                className="sm:col-span-2 lg:col-span-3 2xl:col-span-2"
            >
                <AreaLegendChart />
            </Card>

            <Card
                title="Despesas"
                subtitle="Despesas por categoria"
                className="sm:col-span-2 lg:col-span-3 2xl:col-span-1 shadow-none"
            >
                <DonutChart />
            </Card>

            <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-8 gap-6">
                <Card
                    title="Últimas Doações"
                    subtitle="Lista de doações"
                    redirectTo="/finance?filter=donations"
                    className="lg:col-span-4"
                >
                    <DonationsTable />
                </Card>

                <Card
                    title="Últimas despesas"
                    subtitle="Lista de despesas"
                    redirectTo="/finance?filter=expense"
                    className="lg:col-span-4"
                >
                    <ExpensesTable />
                </Card>
            </div>
        </div>
    )
}
