import { useSetAtom } from "jotai"
import { NewsCard } from "./cards/news-card"
import { confirmDeleteInfo, confirmDeleteModal } from "./store"
import { useGetNews } from "./mutations/useNews"
import { PawLoader } from "@/components/paw-loader"
import { When } from "@/components/when"

export function News() {
	const { data, isLoading } = useGetNews()
	const setDeleteInfo = useSetAtom(confirmDeleteInfo)
	const setDeleteModal = useSetAtom(confirmDeleteModal)
	const handleDelete = (title: string) => {
		setDeleteInfo({
			description: "Certeza que deseja excluir essa Notícia?",
			title: `Excluir Notícia:  ${title}`,
		})
		setDeleteModal(true)
	}
	return (
		<div className="flex flex-1 flex-wrap gap-6">
			<When
				condition={!isLoading}
				fallback={
					<div className="flex-1 flex items-center justify-center">
						<PawLoader />
					</div>
				}
			>
				{data?.map(news => (
					<NewsCard
						key={news.id}
						{...news}
						className="w-full"
						onDelete={() => handleDelete(news.title)}
					/>
				))}
			</When>
		</div>
	)
}
