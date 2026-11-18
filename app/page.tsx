import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Introduction } from '@/components/sections/Introduction'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Background } from '@/components/sections/Background'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return <><Header /><main id="main"><Introduction /><SelectedWork /><Experience /><Skills /><Background /><Contact /></main><Footer /></>
}
