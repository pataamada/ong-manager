import { AvailablePets } from "./-components/AvailablePets"
import { CampaignSection } from "./-components/Campaigns"
import { Footer } from "./-components/Footer"
import { HeroSection } from "./-components/HeroSection"
import { HowToHelp } from "./-components/HowToHelp"
import { Header } from "./-components/Navbar"
import { OurStory } from "./-components/OurStory"
import { Partners } from "./-components/Partners"
import { Volunteers } from "./-components/Volunteers"
import "./style.css"

/* TODO: Remover todos os icones do Fortawesome e substituir por icones do iconify */

export default function LandingPage() {
	return (
		<div className="flex flex-col items-center lg:bg-[url('/Patinhas.png')]">
			<Header />
			<div className="relative w-full min-h-screen">
				<div className="max-w-[1440px] mx-auto relative px-2 [&>div]:lg:pb-[128px] [&>div]:pb-[64px]">
					<div id="hero">
						<HeroSection />
					</div>
					<div id="our-story">
						<OurStory />
					</div>
					<div id="how-to-help">
						<HowToHelp />
					</div>
					<div id="available-pets">
						<AvailablePets />
					</div>
					<div id="campaign-section">
						<CampaignSection />
					</div>
					<div id="volunteers">
						<Volunteers />
					</div>
					<div id="partners">
						<Partners />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	)
}
