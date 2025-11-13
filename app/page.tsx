import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import HowItWorks from '@/components/HowItWorks'
import FeaturesShowcase from '@/components/FeaturesShowcase'
import GamesShowcase from '@/components/GamesShowcase'
import FAQSection from '@/components/FAQSection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesShowcase />
      <GamesShowcase />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}

