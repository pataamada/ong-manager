import AnimalsList from "./_components/animals-list"
import { Header } from "./_components/header"
import { CreateAnimalModal } from "./_components/modals/create-animal"
import { DeleteAnimalModal } from "./_components/modals/delete-animal"
import { FilterDrawer } from "./_components/modals/filter"

export default function Animals() {
	return (
		<div className="w-full flex flex-col bg-white rounded-lg p-6 gap-6 min-h-full">
			<Header />
			<AnimalsList />
			<FilterDrawer />
			<CreateAnimalModal />
			<DeleteAnimalModal />
		</div>
	)
}
