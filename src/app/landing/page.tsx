import { Header } from "./-components/Navbar"
import { HeroSection } from "./-components/HeroSection"
import { OurStory } from "./-components/OurStory"
import { HowToHelp } from "./-components/HowToHelp"
import { AvailablePets } from "./-components/AvailablePets"
import { Volunteers } from "./-components/Volunteers"
import { Partners } from "./-components/Partners"
import './style.css'

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="relative w-full min-h-screen">
                {/* <div className="absolute inset-0 bg-[url('/Patinhas.png')] bg-no-repeat bg-cover bg-left z-0" />
                <div className="absolute inset-0 bg-[url('/Patinhas.png')] bg-no-repeat bg-cover bg-right z-0" /> */}
                
                {/* <HeroSection /> */}
                {/* <OurStory />
                <HowToHelp />
                <AvailablePets />
                <Volunteers />
                <Partners /> */}
            </div>
        </div>
    )
}