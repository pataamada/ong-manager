import Image from "next/image"

const historyItems = [
	{
		title: "O início",
		description:
			"O Grupo Pata Amada iniciou há mais de 10 anos, com o objetivo de resgatar animais precarizados. Desde então, fomos capazes de abrigar mais de cem animais.",
	},
	{
		title: "A Missão",
		description:
			"O objetivo da ONG sempre foi muito claro: impedir que seres tão mais frágeis sofram da crueldade e da falta de suporte, e nunca nos desviamos ou desviaremos dessa missão.",
	},
	{
		title: "O Futuro",
		description:
			"Mesmo com as dificuldades do caminho, continuaremos a nos doar pela dignidade de existência desses animais. Por isso, contamos com o seu apoio!",
	},
]

const image = {
	src: "/landing/history/image.png",
	alt: "Ilustração de um cachorro e um homem",
}

const History = () => {
	return (
		<section id="about">
			<div className="mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-heading-section mb-4">Nossa História</h2>
					<p className="text-subheading mx-auto text-balance">
						Entenda a nossa história e a nossa luta, como uma Organização Não Governamental que
						advoga pelo bem-estar animal.
					</p>
				</div>

				<div className="flex flex-col lg:flex-row items-center gap-8">
					<Image
						src={image.src}
						alt="Ilustração de um cachorro e um homem"
						width={856}
						height={856}
						className="object-contain lg:max-w-[50%] md:max-w-[60%] max-w-[70%] mx-auto"
						priority
					/>

					{/* Cards section */}
					<div className="w-full lg:w-1/2">
						<div className="space-y-6">
							{historyItems.map((item, index) => (
								<div
									key={`${item.title}-${index}`}
									className="flex items-center lg:gap-11 gap-4 p-4 rounded-lg transition-all"
								>
									<div className="flex-shrink-0 hidden md:block">
										<Image
											src="/landing/history/paw_outline.svg"
											alt="Ilustração de uma pata de cachorro"
											className="lg:max-w-[100%] md:max-w-[75%] max-w-[50%] m-auto"
											width={125}
											height={125}
										/>
									</div>
									<div>
										<h3 className="card-title-2 mb-2 font-normal">{item.title}</h3>
										<p className="card-description">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default History
