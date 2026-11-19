import type { Metadata } from 'next'
import './admin.css'
export const metadata: Metadata = { title: 'Portfolio admin', robots: { index: false, follow: false }, alternates: { canonical: '/admin' } }
export const dynamic = 'force-dynamic'
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className="admin-app">{children}</div> }
