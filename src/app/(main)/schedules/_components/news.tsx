import { NewsCard } from "./cards/news-card"
import { newsList } from "./mock-data"

export function News() {
	return (
		<div className="flex flex-col gap-4">
			{newsList.map(news => (
				<NewsCard key={news.id} {...news} className="w-full" />
			))}
		</div>
	)
}
