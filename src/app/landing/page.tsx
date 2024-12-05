import { Header } from "./-components/Navbar"
import { HeroSection } from "./-components/HeroSection"
import { OurStory } from "./-components/OurStory"
import { HowToHelp } from "./-components/HowToHelp"
import { AvailablePets } from "./-components/AvailablePets"
import { Volunteers } from "./-components/Volunteers"
import { Partners } from "./-components/Partners"
import './style.css'

/* TODO: Remover todos os icones do Fortawesome e substituir por icones do iconify */

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center lg:bg-[url('/Patinhas.png')]">
            <Header />
            <div className="relative w-full min-h-screen ">
                
                <div className="max-w-[1440px] mx-auto relative px-2 [&>div]:pb-[128px]">
                    <HeroSection />
                    <OurStory />
                    <HowToHelp />
                    <AvailablePets />
                   {/*  <Volunteers />
                    <Partners /> */}
                </div>
            </div>
        </div>
    )
}