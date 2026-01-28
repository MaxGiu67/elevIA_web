'use client'

/**
 * EsploraContent — Client-side router that decides between
 * personalized (solution plan) and generic (cards) views.
 */

import { useSolutionPlanStore } from '../stores/solutionPlanStore'
import { PersonalizedEsplora } from './PersonalizedEsplora'
import { GenericEsplora } from './GenericEsplora'

interface EsploraContentProps {
  requestedIds: string[]
}

export function EsploraContent({ requestedIds }: EsploraContentProps) {
  const plan = useSolutionPlanStore((s) => s.plan)

  if (plan) {
    return <PersonalizedEsplora plan={plan} />
  }

  return <GenericEsplora requestedIds={requestedIds} />
}

export default EsploraContent
