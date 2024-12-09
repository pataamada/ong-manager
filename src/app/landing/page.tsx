import { AvailablePets } from "./-components/AvailablePets"
import { CampaignSection } from "./-components/Campaigns"
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
			<div className="relative w-full min-h-screen ">
				<div className="max-w-[1440px] mx-auto relative px-2 [&>div]:lg:pb-[128px] [&>div]:pb-[64px]">
					<HeroSection />
					<OurStory />
					<HowToHelp />
					<AvailablePets />
					<CampaignSection />
					<Volunteers />
					<Partners />
				</div>
			</div>
		</div>
	)
}
