import { Header as SiteHeader } from './SiteHeader'
import { publicContent } from '@/lib/admin-store'
export async function Header() {
  const { profile } = await publicContent()
  return <SiteHeader name={profile.name} />
}
