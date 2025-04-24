import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import AnimalsList from "../_components/animals-list"
import { Header } from "../_components/header"
import { CreateAnimalModal } from "../_components/modals/create-animal"
import { DeleteAnimalModal } from "../_components/modals/delete-animal"
import { FilterDrawer } from "../_components/modals/filter"
import { UserRoles } from "@/models/user.model"
import { AnimalsFilters } from "../_components/animals-filters"

export async function AnimalsComponent() {
    const user = await getCurrentUser()
    const isAdmin = user?.role === UserRoles.Admin
    return (
        <div className="flex-1 flex flex-col bg-white rounded-lg p-6 gap-6">
            <Header isAdmin={isAdmin} />
            <AnimalsFilters />
            <AnimalsList isAdmin={isAdmin} />
            <FilterDrawer />
            <CreateAnimalModal />
            <DeleteAnimalModal />
        </div>
    )
}
