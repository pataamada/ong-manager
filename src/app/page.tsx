import "@/app/globals.css"
import Adopt from "./-components/adopt"
import Events from "./-components/events"
import Finance from "./-components/finance"
import Footer from "./-components/footer"
import Hero from "./-components/hero"
import History from "./-components/history"
import MeetAnimals from "./-components/meet-animals"
import Navbar from "./-components/navbar"
import PartnersCarousel from "./-components/partners-carousel"
import "./style.css"

export default function Home() {
	return (
		<div className="h-screen w-full">
			<Navbar />
			<main>
				<Hero />
				<PartnersCarousel />
				<div className="max-w-[1600px] mx-auto px-2 [&>section]:lg:pb-[128px] [&>section]:pb-[64px]">
					<Events />
					<History />
					<Adopt />
					<MeetAnimals />
					<Finance />
				</div>
			</main>
			<Footer />
		</div>
	)
}
