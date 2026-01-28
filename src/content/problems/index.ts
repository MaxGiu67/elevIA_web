/**
 * Problems Content Index
 *
 * Exports all problem JSON content for easy importing.
 */

import conoscenzaDispersa from './conoscenza-dispersa.json'
import estrazioneDatiManuale from './estrazione-dati-manuale.json'
import customerServiceSovraccarico from './customer-service-sovraccarico.json'
import feedbackNonLetti from './feedback-non-letti.json'
import reportManuali from './report-manuali.json'
import anomalieScoporteTardi from './anomalie-scoperte-tardi.json'
import hrSovraccarico from './hr-sovraccarico.json'

export const problems = {
  'conoscenza-dispersa': conoscenzaDispersa,
  'estrazione-dati-manuale': estrazioneDatiManuale,
  'customer-service-sovraccarico': customerServiceSovraccarico,
  'feedback-non-letti': feedbackNonLetti,
  'report-manuali': reportManuali,
  'anomalie-scoperte-tardi': anomalieScoporteTardi,
  'hr-sovraccarico': hrSovraccarico,
} as const

export type ProblemId = keyof typeof problems

export const problemList = Object.values(problems)

export function getProblem(id: ProblemId) {
  return problems[id]
}

export {
  conoscenzaDispersa,
  estrazioneDatiManuale,
  customerServiceSovraccarico,
  feedbackNonLetti,
  reportManuali,
  anomalieScoporteTardi,
  hrSovraccarico,
}
