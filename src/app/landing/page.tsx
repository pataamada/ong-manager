import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"

import { faInstagram, faGithub, faLinkedin, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

export default function LandingPage() {
	return (
		<div className="flex flex-col items-center">
			{/* header */}
			<header className="w-full h-[60px] max-w-[1280px] mx-auto flex justify-between items-center gap-8 px-4 sm:h-[50px] md:px-8 mt-4">
				{/* logo */}
				<div className="w-[180px] h-[60px] sm:w-[140px] flex items-center gap-2">
					<img src="/icon.svg" alt="Icon" className="w-[60px] h-[60px] object-contain" />
					<img
						src="/home/logo-caodominio-satuba.svg"
						alt="Logo"
						className="w-auto h-[40px] object-contain"
					/>
				</div>

				{/* Grupo de páginas */}
				<nav className="w-[350px] h-[24px] sm:flex hidden justify-between gap-6">
					<a href="#animais" className="text-base text-[#27272A]">
						Animais para adoção
					</a>
					<a href="#doacoes" className="text-base text-[#27272A]">
						Doações
					</a>
					<a href="#agenda" className="text-base text-[#27272A]">
						Agenda
					</a>
				</nav>

				{/* Botão "Quero adotar" */}
				<Button className="w-[176px] h-[40px] bg-[#10B981] text-white rounded-tl-lg p-2 px-4 flex items-center gap-2">
					<FontAwesomeIcon icon={faPaw} className="w-5 h-5" />
					Quero adotar
				</Button>
			</header>

			{/* plano de fundo abaixo da header */}
			<div className="relative w-full min-h-screen">
				{" "}
				{/* Mudança: min-h-screen */}
				{/* fundo */}
				<div className="absolute inset-0 bg-[url('/Patinhas.png')] bg-no-repeat bg-cover bg-left z-0" />
				<div className="absolute inset-0 bg-[url('/Patinhas.png')] bg-no-repeat bg-cover bg-right z-0" />
				{/* Conteúdo principal */}
				<div className="relative flex flex-col lg:flex-row items-center px-4 lg:px-16 mt-16 ml-[240px]">
					{/* Agrupamento dos lados */}
					<div className="flex w-full">
						<div className="flex flex-col items-start gap-8 max-w-[50%] ml-4 pt-[10%]">
							<p className="text-xl text-gray-600 text-center mx-auto">
								Transforme a vida de um animal.
							</p>
							<h3 className="text-4xl font-bold text-[#27272A] leading-tight text-left break-words max-w-[600px]">
								Adote ou ajude um peludo <br /> em busca de um novo lar!
							</h3>
							<div className="flex flex-row gap-4 mt-2 text-center mx-auto">
								{/* Botão Quero Adotar */}
								<Button className="w-44 h-10 bg-[#10B981] text-white rounded-tl-lg px-4 flex items-center gap-2 cursor-default">
									<FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
									Quero adotar!
								</Button>
								{/* Botão Apadrinhar */}
								<Button className="w-44 h-10 bg-white text-[#10B981] border-2 border-[#10B981] rounded-tl-lg px-4 flex items-center gap-2 cursor-default hover:bg-gray-100">
									<FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
									Apadrinhar
								</Button>
							</div>
						</div>
						{/* ate aqui */}
						<div className="flex flex-col items-center gap-4 max-w-[50%] relative">
							{/* Ícone */}
							<img
								src="/home/Vector.svg"
								alt="Icon"
								className="w-[500px] h-[500px] object-contain mb-4 relative z-10"
							/>
							{/* QR Code */}
							<div className="absolute z-20 transform translate-x-[150px] translate-y-[320px]">
								<img
									src="/home/Groups.svg"
									alt="QR Code"
									className="w-[200px] h-[200px] object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* descrição final */}
				<div className="text-[28px] text-[#27272A] mt-6 leading-relaxed text-center max-w-[1407px] mx-auto px-4 lg:px-16">
					<p>A Cão Domínio é uma ONG dedicada a resgatar, cuidar e encontrar lares</p>
					<p>
						amorosos para cães abandonados.
						<span className="text-[#10B981] font-bold"> Junte-se a nós nessa missão!</span>
					</p>
				</div>
				{/* fim da descrição */}
				{/* Um pouco da nossa história - início */}
				<div className="flex items-center justify-between gap-8 px-4 lg:px-16 py-8 pt-[20%] pb-[15%]">
					<div className="flex-1">
						<img
							src="/our-story/img-nossa-historia.png"
							alt="Imagem Nossa Historia"
							className="w-full h-auto"
						/>
					</div>
					<div className="flex-1">
						<h2 className="text-3xl font-bold text-[#27272A] mb-4 text-center">
							Um pouco da nossa <span className="text-[#10B981] font-bold">história</span>
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed text-center">
							A Cão Domínio começou há mais de 30 anos, quando um grupo de apaixonados por animais
							se uniu para cuidar de cães abandonados, sem condições de sobreviver nas ruas. Em um
							terreno cedido pela prefeitura, a missão de resgatar e proteger esses animais se
							tornou o propósito de nossas vidas.
						</p>
					</div>
				</div>
				{/* Um pouco da nossa história - fim */}
				{/* Como ajudar o Cãodomínio - início */}
				<div className="bg-[#F4F4F5] px-4 lg:px-16 py-8">
					{/* Título */}
					<h2 className="text-3xl font-bold text-[#27272A] mb-8 text-center">
						Como <span className="font-bold">ajudar o Cãodomínio?</span>
					</h2>

					{/* Container Principal */}
					<div className="flex items-start justify-between gap-8">
						<div className="flex-1 flex justify-end pr-8">
							<img
								src="/how-to-help/img-como-ajudar.png"
								alt="Como ajudar o caodomínio"
								className="w-[822px] h-[585px] object-contain rounded-lg"
							/>
						</div>

						<div className="flex-1 flex flex-col gap-8 mt-9">
							{/* Primeira Div */}
							<div className="flex items-center gap-4">
								<img
									src="/how-to-help/como-ajudar-1.svg"
									alt="como ajudar"
									className="w-[110px] h-[100px]"
								/>
								<div>
									<h3 className="font-bold text-lg text-[#27272A]">
										{" "}
										<span className="text-[#10B981] font-bold">Adote</span> um animal!
									</h3>
									<p className="text-gray-600">
										Transforme a vida de um peludo e encontre um amigo fiel para sempre!
									</p>
								</div>
							</div>
							{/* Segunda Div */}
							<div className="flex items-center gap-4">
								<img
									src="/how-to-help/como-ajudar-2.svg"
									alt="como ajudar"
									className="w-[110px] h-[100px]"
								/>
								<div>
									<h3 className="font-bold text-lg text-[#27272A]">
										<span className="text-[#10B981] font-bold">Doe</span> qualquer quantia
									</h3>
									<p className="text-gray-600">
										Toda doação conta! Com sua ajuda, garantimos amor e cuidados aos animais.
									</p>
								</div>
							</div>
							{/* Terceira Div */}
							<div className="flex items-center gap-4">
								<img
									src="/how-to-help/como-ajudar-3.svg"
									alt="como ajudar"
									className="w-[110px] h-[100px]"
								/>
								<div>
									<h3 className="font-bold text-lg text-[#27272A]">
										<span className="text-[#10B981] font-bold">Apadrinhe</span> um animal!
									</h3>
									<p className="text-gray-600">
										Ajude a cuidar à distância de um bichinho, oferecendo suporte conínuo.
									</p>
								</div>
							</div>
							{/* Quarta Div */}
							<div className="flex items-center gap-4">
								<img
									src="/how-to-help/como-ajudar-4.svg"
									alt="como ajudar"
									className="w-[110px] h-[100px]"
								/>
								<div>
									<h3 className="font-bold text-lg text-[#27272A]">
										<span className="text-[#10B981] font-bold">Voluntarie-se</span> e ajude o
										Cãodomínio
									</h3>
									<p className="text-gray-600">
										Doe seu tempo e faça a diferença diretamente no nosso abrigo!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Como ajudar o Cãodomínio - fim */}
				{/* conheça nossos peludos - inicio */}
				<div className="text-center py-8">
					{/* Título principal */}
					<h3 className="text-4xl font-bold">
						Conheça nossos
						<span className="text-[#10B981]"> peludos!</span>
					</h3>
					<p className="text-2xl mt-4 text-gray-600">Eles adoram carinho e merecem amor!</p>

					{/* conteúdo - imagens e informações */}
					<div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 mt-8">
						{/* informações do bichinho */}
						<div className="flex-1 max-w-[400px] bg-white p-4 rounded-lg">
							{/* Mini botões */}
							<div className="flex flex-wrap gap-2 mb-4">
								{["Gato", "Castrada", "Fêmea"].map(tag => (
									<span
										key={tag}
										className="bg-gray-100 text-black text-sm font-medium px-4 py-2 rounded-full"
									>
										{tag}
									</span>
								))}
							</div>

							{/* título e descrição */}
							<h2 className="text-2xl font-semibold text-gray-800 mb-2">Nina</h2>
							<p className="text-gray-600 mb-4">
								Nina é uma gata adorável, cheia de energia e amor para compartilhar. Ela está à
								procura de um lar cheio de carinho!
							</p>

							{/* botões */}
							<div className="flex flex-row gap-4 mt-2 text-center mx-auto">
								{/* Botão Quero Adotar */}
								<Button className="w-44 h-10 bg-[#10B981] text-white rounded-tl-lg px-4 flex items-center gap-2 cursor-default">
									<FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
									Quero adotar!
								</Button>
								{/* Botão Apadrinhar */}
								<Button className="w-44 h-10 bg-white text-[#10B981] border-2 border-[#10B981] rounded-tl-lg px-4 flex items-center gap-2 cursor-default hover:bg-gray-100">
									<FontAwesomeIcon icon={faPaw} className="w-4 h-4" />
									Apadrinhar
								</Button>
							</div>
						</div>

						{/* container esquerdo - card principal */}
						<div className="w-[350px] h-[450px] rounded-[16px] bg-gray-200 overflow-hidden">
							<img
								src="/adopt-puppies/Card.png"
								alt="Imagem principal do bichinho"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
				{/* conheça nossos peludos - fim */}
				{/* nossos voluntarios - inicio */}
				<div className="text-center py-8">
					<h3 className="text-2xl font-bold mb-2">Nossos voluntários</h3>
					<p className="mb-8 text-gray-600">Conheça quem nos ajuda pessoalmente</p>
					{/* cards */}
					<div className="flex justify-center">
						{/* Card 1 */}
						<div className="flex flex-col items-center m-[80px]">
							<img
								src="/volunteers/card-voluntario-1.png"
								alt="Voluntário 1"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Pedro Santos</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<a href="#xx" className="text-blue-500 mt-2">
								<FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
							</a>
						</div>

						{/* Card 2 */}
						<div className="flex flex-col items-center m-[80px]">
							<img
								src="/volunteers/card-voluntario-2.png"
								alt="Voluntário 2"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Maria Silva</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<a href="#xx" className="text-blue-500 mt-2">
								<FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
							</a>
						</div>

						{/* Card 3 */}
						<div className="flex flex-col items-center m-[80px]">
							<img
								src="/volunteers/card-voluntario-3.png"
								alt="Voluntário 3"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>João Souza</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<a href="#xx" className="text-blue-500 mt-2">
								<FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
							</a>
						</div>

						{/* Card 4 */}
						<div className="flex flex-col items-center m-[80px]">
							<img
								src="/volunteers/card-voluntario-4.png"
								alt="Voluntário 4"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Ana Costa</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<a href="#xx" className="text-blue-500 mt-2">
								<FontAwesomeIcon icon={faInstagram} size="lg" className="w-6 h-6 text-black" />
							</a>
						</div>
					</div>
					{/* fim dos cards */}
				</div>
				{/* nossos voluntarios - fim */}
				{/* parceiros - inicio */}
				<div className="text-center py-8">
					<h3 className="text-2xl font-bold mb-2">Parceiros</h3>
					<p className="mb-8">Conheça os parceiros da ONG</p>
					{/* CARDS */}
					<div className="flex justify-center gap-6">
						{/* Card 1 */}
						<div className="bg-gray-300 border border-gray-400 rounded-lg p-4 flex flex-col items-center w-48">
							<img
								src="/partners/card-parceiro-1.png"
								alt="Parceiro 1"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Parceiro 1</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<div className="flex mt-2 gap-2">
								<a href="#xx" className="text-blue-500">
									<FontAwesomeIcon icon={faLinkedinIn} size="lg" className="w-6 h-6 text-black" />
								</a>
								<a href="#xx" className="text-gray-800">
									<FontAwesomeIcon icon={faGithub} size="lg" className="w-6 h-6 text-black" />
								</a>
							</div>
						</div>

						{/* Card 2 */}
						<div className="bg-gray-300 border border-gray-400 rounded-lg p-4 flex flex-col items-center w-48">
							<img
								src="/partners/card-parceiro-2.png"
								alt="Parceiro 2"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Parceiro 2</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<div className="flex mt-2 gap-2">
								<a href="#xx" className="text-blue-500">
									<FontAwesomeIcon icon={faLinkedinIn} size="lg" className="w-6 h-6 text-black" />
								</a>
								<a href="#xx" className="text-gray-800">
									<FontAwesomeIcon icon={faGithub} size="lg" className="w-6 h-6 text-black" />
								</a>
							</div>
						</div>

						{/* Card 3 */}
						<div className="bg-gray-300 border border-gray-400 rounded-lg p-4 flex flex-col items-center w-48">
							<img
								src="/partners/card-parceiro-3.png"
								alt="Parceiro 3"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Parceiro 3</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<div className="flex mt-2 gap-2">
								<a href="#xx" className="text-blue-500">
									<FontAwesomeIcon icon={faLinkedinIn} size="lg" className="w-6 h-6 text-black" />
								</a>
								<a href="#xx" className="text-gray-800">
									<FontAwesomeIcon icon={faGithub} size="lg" className="w-6 h-6 text-black" />
								</a>
							</div>
						</div>

						{/* Card 4 */}
						<div className="bg-gray-300 border border-gray-400 rounded-lg p-4 flex flex-col items-center w-48">
							<img
								src="/partners/card-parceiro-4.png"
								alt="Parceiro 4"
								className="w-32 h-32 rounded-full mb-4"
							/>
							<strong>Parceiro 4</strong>
							<p className="text-sm text-gray-600">Front-end UX</p>
							<div className="flex mt-2 gap-2">
								<a href="#xx" className="text-blue-500">
									<FontAwesomeIcon icon={faLinkedinIn} size="lg" className="w-6 h-6 text-black" />
								</a>
								<a href="#xx" className="text-gray-800">
									<FontAwesomeIcon icon={faGithub} size="lg" className="w-6 h-6 text-black" />
								</a>
							</div>
						</div>
					</div>
					{/* FIM DOS CARDS */}

					{/* Área para os logos */}
					<div className="flex justify-center gap-6 py-6 mx-auto">
						<img
							src="/partners/ifal-icon.png"
							alt="Logo Parceiro 1"
							className="w-[200.38px] h-[175.83px]"
						/>
						<img
							src="/partners/logo.png"
							alt="Logo Parceiro 2"
							className="w-[200.38px] h-[175.83px]"
						/>
						<img
							src="/partners/qualifica-tech.png"
							alt="Logo Parceiro 3"
							className="w-[260.44px] h-[149.4px]"
						/>
					</div>
				</div>
				{/* parceiros - fim */}
				{/* teste */}
				{/* teste */}
			</div>
		</div>
	)
}
