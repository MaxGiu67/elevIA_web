/**
 * Area Content Index
 *
 * Exports all area JSON content for easy importing.
 */

import knowledge from './knowledge.json'
import customerExperience from './customer-experience.json'
import operations from './operations.json'
import workflow from './workflow.json'
import hr from './hr.json'

export const areas = {
  'knowledge': knowledge,
  'customer-experience': customerExperience,
  'operations': operations,
  'workflow': workflow,
  'hr': hr,
} as const

export type AreaId = keyof typeof areas

export const areaList = Object.values(areas)

export function getArea(id: AreaId) {
  return areas[id]
}

export {
  knowledge,
  customerExperience,
  operations,
  workflow,
  hr,
}
