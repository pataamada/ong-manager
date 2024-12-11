import ScheduleCardImage from "@/assets/images/agenda/caodominio-agenda-card-image.svg"

interface ScheduleCardProps {
	id: number
	title: string
	date: Date
	description: string
	imageUrl: string
}

export const eventsList: ScheduleCardProps[] = [
	{
		id: 1,
		title: "CãoDomínio Satuba: Um Dia de Amor e Adoção!",
		date: new Date("2023-12-22T13:30:00"),
		description:
			"O Encontro cãodomínio é um evento dedicado a quem ama os animais, repleto de oportunidades para transformar vidas! Nesta edição, teremos uma grande feira de adoção com cães e gatos resgatados, todos prontos para encontrar um lar cheio de carinho. Além disso, o evento contará com atividades para todas as idades, incluindo um espaço kids, praça de alimentação, bazar solidário, palestras sobre cuidados e bem-estar animal, e sorteios. É uma chance única de contribuir com a causa, seja adotando, doando ou simplesmente participando deste dia especial de solidariedade e amor pelos animais!",
		imageUrl: ScheduleCardImage,
	},
	{
		id: 2,
		title: "CãoDomínio Satuba: Um Dia de Amor e Adoção!",
		date: new Date("2023-12-22T13:30:00"),
		description:
			"O Encontro cãodomínio é um evento dedicado a quem ama os animais, repleto de oportunidades para transformar vidas! Nesta edição, teremos uma grande feira de adoção com cães e gatos resgatados, todos prontos para encontrar um lar cheio de carinho. Além disso, o evento contará com atividades para todas as idades, incluindo um espaço kids, praça de alimentação, bazar solidário, palestras sobre cuidados e bem-estar animal, e sorteios. É uma chance única de contribuir com a causa, seja adotando, doando ou simplesmente participando deste dia especial de solidariedade e amor pelos animais!",
		imageUrl: ScheduleCardImage,
	},
	{
		id: 3,
		title: "CãoDomínio Satuba: Um Dia de Amor e Adoção!",
		date: new Date("2023-12-22T13:30:00"),
		description:
			"O Encontro cãodomínio é um evento dedicado a quem ama os animais, repleto de oportunidades para transformar vidas! Nesta edição, teremos uma grande feira de adoção com cães e gatos resgatados, todos prontos para encontrar um lar cheio de carinho. Além disso, o evento contará com atividades para todas as idades, incluindo um espaço kids, praça de alimentação, bazar solidário, palestras sobre cuidados e bem-estar animal, e sorteios. É uma chance única de contribuir com a causa, seja adotando, doando ou simplesmente participando deste dia especial de solidariedade e amor pelos animais!",
		imageUrl: ScheduleCardImage,
	},
]

interface News {
	title: string
	description: string
	tags: string[]
	publishedAt: string
	image: string
	id: number
}

export const newsList: News[] = [
	{
		id: 1,
		title: "Ajude no tratamento da Aurora!",
		description:
			"A pequena Aurora, uma cachorrinha cheia de doçura e vontade de viver, está precisando da sua ajuda! Ela foi resgatada em uma situação delicada e agora enfrenta um longo tratamento para recuperar sua saúde. Com o apoio da comunidade, estamos levantando recursos para cobrir os custos médicos, incluindo exames, medicamentos, consultas veterinárias e cuidados especiais que Aurora tanto necessita. Cada contribuição, seja grande ou pequena, faz toda a diferença para que ela possa ter uma vida saudável e feliz. Junte-se a nós nessa corrente do bem e ajude a transformar a vida da Aurora!",
		tags: ["CaoDomino", "Aurora"],
		publishedAt: "2024-01-01",
		image: ScheduleCardImage,
	},
	{
		id: 2,
		title: "Ajude no tratamento da Aurora!",
		description:
			"A pequena Aurora, uma cachorrinha cheia de doçura e vontade de viver, está precisando da sua ajuda! Ela foi resgatada em uma situação delicada e agora enfrenta um longo tratamento para recuperar sua saúde. Com o apoio da comunidade, estamos levantando recursos para cobrir os custos médicos, incluindo exames, medicamentos, consultas veterinárias e cuidados especiais que Aurora tanto necessita. Cada contribuição, seja grande ou pequena, faz toda a diferença para que ela possa ter uma vida saudável e feliz. Junte-se a nós nessa corrente do bem e ajude a transformar a vida da Aurora!",
		tags: ["CaoDomino", "Aurora"],
		publishedAt: "2024-01-01",
		image: ScheduleCardImage,
	},
	{
		id: 3,
		title: "Ajude no tratamento da Aurora!",
		description:
			"A pequena Aurora, uma cachorrinha cheia de doçura e vontade de viver, está precisando da sua ajuda! Ela foi resgatada em uma situação delicada e agora enfrenta um longo tratamento para recuperar sua saúde. Com o apoio da comunidade, estamos levantando recursos para cobrir os custos médicos, incluindo exames, medicamentos, consultas veterinárias e cuidados especiais que Aurora tanto necessita. Cada contribuição, seja grande ou pequena, faz toda a diferença para que ela possa ter uma vida saudável e feliz. Junte-se a nós nessa corrente do bem e ajude a transformar a vida da Aurora!",
		tags: ["CaoDomino", "Aurora"],
		publishedAt: "2024-01-01",
		image: ScheduleCardImage,
	},
]
