/**
 * Content Index
 *
 * Central export point for all content (use cases, areas, problems).
 */

export * from './use-cases'
export * from './areas'
export * from './problems'

// Re-export with namespaces for clarity
import { useCases, useCaseList, getUseCase, getUseCasesByArea } from './use-cases'
import { areas, areaList, getArea } from './areas'
import { problems, problemList, getProblem } from './problems'

export const content = {
  useCases,
  useCaseList,
  getUseCase,
  getUseCasesByArea,
  areas,
  areaList,
  getArea,
  problems,
  problemList,
  getProblem,
}

export default content
