/**
 * Shared utility functions for extracting data from use case JSON structures.
 * Handles both the `components.*` and legacy `mattoncini[]` formats.
 */

/** A single block inside the mattoncini array. */
interface MattonciniBlock {
  type: string
  content?: Record<string, unknown>
}

/** Minimal shape of a use case object (covers both JSON formats). */
export interface UseCaseData {
  name?: string
  area?: string
  effort?: string
  hero?: { subtitle?: string }
  components?: {
    header?: { title?: string; tagline?: string }
    problem?: { statement?: string }
    kpi?: { metrics?: KpiMetric[] }
    tech?: { stack?: string[]; integrations?: string[] }
    comparison?: ComparisonData
    solution?: Record<string, unknown>
  }
  mattoncini?: MattonciniBlock[]
}

export interface KpiMetric {
  value: string
  label: string
  icon: string
}

export interface ComparisonData {
  before: string[]
  after: string[]
}

/** Find a block by type inside the mattoncini array. */
function findBlock(uc: UseCaseData, type: string): MattonciniBlock | undefined {
  return uc.mattoncini?.find((m) => m.type === type)
}

/** Extract the display name from a use case. */
export function getUseCaseName(uc: UseCaseData): string {
  return uc.components?.header?.title ?? uc.name ?? ''
}

/** Extract the tagline / subtitle from a use case. */
export function getUseCaseTagline(uc: UseCaseData): string {
  return uc.components?.header?.tagline ?? uc.hero?.subtitle ?? ''
}

/** Extract the problem statement from a use case. */
export function getUseCaseProblem(uc: UseCaseData): string {
  if (uc.components?.problem?.statement) return uc.components.problem.statement
  const block = findBlock(uc, 'problem')
  return (block?.content?.statement as string) ?? ''
}

/** Extract KPI metrics from a use case. */
export function getUseCaseKpis(uc: UseCaseData): KpiMetric[] {
  if (uc.components?.kpi?.metrics) return uc.components.kpi.metrics
  const block = findBlock(uc, 'kpi')
  return (block?.content?.metrics as KpiMetric[]) ?? []
}

/** Extract tech stack from a use case. */
export function getUseCaseTech(uc: UseCaseData): string[] {
  if (uc.components?.tech?.stack) return uc.components.tech.stack
  const block = findBlock(uc, 'tech-stack')
  return (block?.content?.stack as string[]) ?? []
}

/** Extract integrations from a use case. */
export function getUseCaseIntegrations(uc: UseCaseData): string[] {
  if (uc.components?.tech?.integrations) return uc.components.tech.integrations
  const block = findBlock(uc, 'tech-stack')
  return (block?.content?.integrations as string[]) ?? []
}

/** Extract before/after comparison data from a use case. */
export function getUseCaseComparison(uc: UseCaseData): ComparisonData | null {
  if (uc.components?.comparison) return uc.components.comparison
  const block = findBlock(uc, 'comparison')
  return (block?.content as unknown as ComparisonData) ?? null
}

/** Extract the effort duration string (defaults to '15 giorni'). */
export function getUseCaseEffort(uc: UseCaseData): string {
  return uc.effort ?? '15 giorni'
}
