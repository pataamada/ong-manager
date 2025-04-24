import Image from "next/image"

const Adopt = () => {
	const adoptReasons = [
		{
			title: "O coração da casa",
			description:
				"Um pet traz alegria e amor incondicional para seu lar, transformando-o em um lugar mais feliz.",
			image: "/landing/adopt/firstPet.png",
		},
		{
			title: "Resgate vidas",
			description:
				"Ao adotar, você não só ganha um amigo fiel, mas também salva uma vida e abre espaço para outros resgates.",
			image: "/landing/adopt/secondPet.png",
		},
		{
			title: "A companhia perfeita",
			description:
				"Tenha sempre ao seu lado um companheiro leal, que estará presente em todos os momentos.",
			image: "/landing/adopt/thirdPet.png",
		},
	]

	return (
		<section id="adopt">
			<div className="mx-auto">
				<h2 className="text-heading-section mb-4">Motivos para adotar um PET</h2>
				<p className="text-subheading mb-12">
					Descubra o quanto um pet pode mudar sua vida para melhor!
				</p>

				<div className="flex flex-col xl:flex-row flex-wrap items-center justify-between gap-8">
					{adoptReasons.map((reason, index) => (
						<div className="relative flex-shrink-0 w-[380px]" key={`${reason.title}-${index}`}>
							<div className="flex flex-col items-center text-center p-4 rounded-lg relative">
								<Image
									className="mb-6"
									src={reason.image}
									alt={reason.title}
									width={213}
									height={213}
								/>
								<h3 className="card-subtitle mb-2 font-semibold">{reason.title}</h3>
								<p className="card-description">{reason.description}</p>
							</div>

							{index < adoptReasons.length - 1 && (
								<div
									className="absolute top-1/4 right-[-238px] transform -translate-y-1/2 z-[-1]
                min-[1500px]:block hidden
                "
								>
									<Image alt="Arrow" src="/landing/adopt/arrow.svg" width={238} height={50} />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Adopt
