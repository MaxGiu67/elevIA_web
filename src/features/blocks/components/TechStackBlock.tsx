'use client'

import { Cpu, Link2 } from 'lucide-react'

interface TechStackBlockProps {
  stack: string[]
  integrations: string[]
  className?: string
}

export function TechStackBlock({ stack, integrations, className = '' }: TechStackBlockProps) {
  return (
    <div className={`bg-dark-900 text-white rounded-2xl p-8 ${className}`}>
      <h3 className="text-xl font-semibold mb-6">Tecnologie</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tech stack */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-secondary-400" />
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Stack</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-dark-800 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-primary-400" />
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Integrazioni</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {integrations.map((integration, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-dark-800 rounded-full text-sm text-gray-300"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStackBlock
