import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Introduction } from '@/components/sections/Introduction'
import { RecruiterBrief } from '@/components/sections/RecruiterBrief'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Background } from '@/components/sections/Background'
import { Contact } from '@/components/sections/Contact'
import { publicContent } from '@/lib/admin-store'

export const dynamic = 'force-dynamic'
export default async function HomePage() {
  const content = await publicContent()
  return <><Header /><main id="main"><Introduction profile={content.profile} /><RecruiterBrief location={content.profile.location} /><SelectedWork projects={content.projects.filter(p => p.published)} /><Experience /><Skills /><Background about={content.profile.about} /><Contact publicContact={{ email: content.profile.email, phone: content.profile.phone, location: content.profile.location }} /></main><Footer /></>
}
