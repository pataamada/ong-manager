"use client"
import { useAtom, useSetAtom } from "jotai"
import { Timestamp } from "firebase/firestore"
import {
	confirmDeleteAnimalAtom,
	confirmDeleteInfoAtom,
	createAnimalModalAtom,
	filtersAtom,
	searchFilterAtom,
	updateAnimalInfo,
} from "./store"
import AnimalsCard from "./card"
import Image from "next/image"
import { When } from "@/components/when"
import { contains } from "@/utils/contains"
import { useGetAnimals } from "./mutations"
import { useCallback } from "react"
import { PawLoader } from "@/components/paw-loader"
import type { Animal } from "@/models/animal.model"
import { differenceInYears } from "date-fns"
export default function AnimalsList({ isAdmin = true }: { isAdmin?: boolean }) {
	const { data: animals, isLoading } = useGetAnimals()
	const [searchValue] = useAtom(searchFilterAtom)
	const [filters] = useAtom(filtersAtom)
	const setCreateModal = useSetAtom(createAnimalModalAtom)
	const setDeleteInfo = useSetAtom(confirmDeleteInfoAtom)
	const setUpdateInfo = useSetAtom(updateAnimalInfo)
	const setDeleteModal = useSetAtom(confirmDeleteAnimalAtom)
	const getYears = (animal: Animal) => {
		if (!animal.birthDate) return 0
		return (
			differenceInYears(
				Date(),
				new Timestamp(animal.birthDate.seconds, animal.birthDate.nanoseconds).toDate(),
			) || 0
		)
	}
	const filteredAnimals =
		animals?.filter(animal => {
			return (
				contains(animal.name, searchValue) &&
				(!filters.type || animal.type === filters.type) &&
				(!filters.sex || animal.sex === filters.sex) &&
				(!filters.available || animal.available === filters.available) &&
				(!filters.neutered || animal.castration === filters.neutered) &&
				(filters.maxAge === undefined || (animal.birthDate && getYears(animal) <= filters.maxAge))
			)
		}) || []

	const handleDelete = useCallback(
		(id: string, name: string) => {
			setDeleteInfo({
				id,
				description: "Certeza que deseja excluir esse Animal?",
				title: `Excluir Animal: ${name}`,
			})
			setDeleteModal(true)
		},
		[setDeleteInfo, setDeleteModal],
	)

	const handleEdit = useCallback(
		(animal: Animal) => {
			setUpdateInfo(animal)
			setCreateModal(true)
		},
		[setUpdateInfo, setCreateModal],
	)
	return (
		<div className="w-full flex flex-1 flex-col rounded-lg gap-6 min-h-full">
			<When
				condition={!isLoading}
				fallback={
					<div className="flex flex-1 items-center justify-center">
						<PawLoader />
					</div>
				}
			>
				<When
					condition={filteredAnimals.length > 0}
					fallback={
						<div className="w-full flex-grow flex flex-col items-center justify-center">
							<Image
								src="empty-state.svg"
								alt="empty animals image"
								height={200}
								width={200}
							/>
							<span className="text-lg text-zinc-400">
								Parece que não tem animais cadastrados
							</span>
						</div>
					}
				>
					<div className="flex flex-wrap gap-6">
						{filteredAnimals.map(animal => (
							<AnimalsCard
								key={animal.id}
								animal={animal}
								onDelete={handleDelete}
								onEdit={handleEdit}
								showActions={isAdmin}
							/>
						))}
					</div>
				</When>
			</When>
		</div>
	)
}
