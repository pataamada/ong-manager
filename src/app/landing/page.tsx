import { AvailablePets } from "./-components/available-pets"
import { CampaignSection } from "./-components/campaigns"
import { Footer } from "./-components/footer"
import { HeroSection } from "./-components/hero-section"
import { HowToHelp } from "./-components/how-to-help"
import { Header } from "./-components/navbar"
import { OurStory } from "./-components/our-story"
import { Partners } from "./-components/partners"
import { Volunteers } from "./-components/volunteers"
import "./style.css"


export default function LandingPage() {
	return (
		<div className="flex flex-col items-center lg:bg-[url('/Patinhas.png')]">
			<Header />
			<div className="relative w-full min-h-screen">
				<div className="max-w-[1440px] mx-auto relative px-2 [&>div]:lg:pb-[128px] [&>div]:pb-[64px]">
						<HeroSection />
						<OurStory />
						<HowToHelp />
						<AvailablePets />
						<CampaignSection />
						<Volunteers />
						<Partners />
				</div>
				<Footer />
			</div>
		</div>
	)
}
