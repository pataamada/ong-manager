import { useAtomValue, useSetAtom } from "jotai"
import { NewsCard } from "./cards/news-card"
import {
	confirmDeleteInfo,
	filterOrderAtom,
	filterSearchAtom,
	modalConfirmDelete,
	modalCreateNews,
	updateNewsData,
} from "./store"
import { useGetNews } from "./mutations/useNews"
import { PawLoader } from "@/components/paw-loader"
import { When } from "@/components/when"
import Image from "next/image"
import { Timestamp } from "firebase/firestore"
import { contains } from "@/utils/contains"
import { useCallback } from "react"

export function News() {
	const { data, isLoading } = useGetNews()
	const search = useAtomValue(filterSearchAtom)
	const order = useAtomValue(filterOrderAtom)
	const setNewsModal = useSetAtom(modalCreateNews)
	const setDeleteInfo = useSetAtom(confirmDeleteInfo)
	const setDeleteModal = useSetAtom(modalConfirmDelete)
	const setUpdateData = useSetAtom(updateNewsData)
	const handleDelete = useCallback(
		(id: string, title: string) => {
			setDeleteInfo({
				id,
				description: "Certeza que deseja excluir essa Notícia?",
				title: `Excluir Notícia:  ${title}`,
			})
			setDeleteModal(true)
		},
		[setDeleteInfo, setDeleteModal],
	)
	const filteredData = data
		?.filter(
			news =>
				contains(news.title, search) ||
				contains(news.description, search) ||
				news.tags?.some(tag => contains(tag, search)),
		)
		.sort((a, b) =>
			order === "older"
				? a.createdAt.seconds - b.createdAt.seconds
				: b.createdAt.seconds - a.createdAt.seconds,
		)
	return (
		<div className="flex flex-1 flex-col gap-6">
			<When
				condition={!isLoading}
				fallback={
					<div className="flex-1 flex items-center justify-center">
						<PawLoader />
					</div>
				}
			>
				<When
					condition={data?.length}
					fallback={
						<div className="w-full flex-grow flex flex-col items-center justify-center">
							<Image src="empty-state.svg" alt="empty users image" height={200} width={200} />
							<span className="text-lg text-zinc-400">Parece que não tem notícias cadastradas</span>
						</div>
					}
				>
					{filteredData?.map(news => (
						<NewsCard
							key={news.id}
							image={news.photo}
							description={news.description}
							title={news.title}
							tags={news.tags}
							createdAt={new Timestamp(
								news.updatedAt.seconds,
								news.updatedAt.nanoseconds,
							).toMillis()}
							className="w-full"
							onEdit={() => {
								setUpdateData({ ...news })
								setNewsModal(true)
							}}
							onDelete={() => handleDelete(news.id, news.title)}
						/>
					))}
				</When>
			</When>
		</div>
	)
}
