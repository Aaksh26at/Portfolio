import {
  Code2,
  BarChart3,
  BrainCircuit,
  LayoutDashboard,
  Database,
  Server,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import type { SkillIconKey } from '@/types'

export const skillIcons: Record<SkillIconKey, LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  brain: BrainCircuit,
  dashboard: LayoutDashboard,
  database: Database,
  server: Server,
}

export const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
}
