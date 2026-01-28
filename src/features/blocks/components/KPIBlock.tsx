'use client'

import { Clock, Target, CheckCircle, TrendingUp, Zap, Shield, Sun, Activity, Eye, Calendar, Users, Database, Package, Bell, Award, HelpCircle, UserPlus } from 'lucide-react'

interface Metric {
  value: string
  label: string
  icon: string
}

interface KPIBlockProps {
  metrics: Metric[]
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  target: Target,
  'check-circle': CheckCircle,
  'trending-up': TrendingUp,
  'trending-down': TrendingUp,
  zap: Zap,
  shield: Shield,
  sun: Sun,
  activity: Activity,
  eye: Eye,
  calendar: Calendar,
  users: Users,
  database: Database,
  package: Package,
  bell: Bell,
  award: Award,
  'help-circle': HelpCircle,
  'user-plus': UserPlus,
}

export function KPIBlock({ metrics, className = '' }: KPIBlockProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {metrics.map((metric, index) => {
        const IconComponent = iconMap[metric.icon] || Target
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-6 h-6 text-secondary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-gray-600">{metric.label}</p>
          </div>
        )
      })}
    </div>
  )
}

export default KPIBlock
