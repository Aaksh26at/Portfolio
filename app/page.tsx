import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { RecruiterSnapshot } from '@/components/sections/RecruiterSnapshot'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { DataPipeline } from '@/components/sections/DataPipeline'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { Certifications } from '@/components/sections/Certifications'
import { GithubProof } from '@/components/sections/GithubProof'
import { CurrentlyLearning } from '@/components/sections/CurrentlyLearning'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <RecruiterSnapshot />
        <About />
        <Projects />
        <Skills />
        <DataPipeline />
        <Experience />
        <Education />
        <Certifications />
        <GithubProof />
        <CurrentlyLearning />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
