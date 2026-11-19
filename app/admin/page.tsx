import { isAdmin, authConfigured } from '@/lib/admin-auth'
import { storageConfigured } from '@/lib/admin-store'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
export default async function AdminPage() {
  if (!await isAdmin()) return <AdminLogin configured={authConfigured() && storageConfigured()} />
  return <AdminDashboard emailConfigured={!!process.env.RESEND_API_KEY && !!process.env.CONTACT_FROM_EMAIL} analyticsConfigured={!!process.env.NEXT_PUBLIC_GA_ID} />
}
