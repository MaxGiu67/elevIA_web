/**
 * Problems Content Index
 *
 * Exports all problem JSON content for easy importing.
 * Total: 12 problems (2 pages of 6 in carousel)
 */

import conoscenzaDispersa from './conoscenza-dispersa.json'
import estrazioneDatiManuale from './estrazione-dati-manuale.json'
import customerServiceSovraccarico from './customer-service-sovraccarico.json'
import feedbackNonLetti from './feedback-non-letti.json'
import reportManuali from './report-manuali.json'
import anomalieScoporteTardi from './anomalie-scoperte-tardi.json'
import hrSovraccarico from './hr-sovraccarico.json'
import processiLenti from './processi-lenti.json'
import contenutiInconsistenti from './contenuti-inconsistenti.json'
import leadNonQualificati from './lead-non-qualificati.json'
import complianceRischio from './compliance-rischio.json'
import formazioneInefficace from './formazione-inefficace.json'

export const problems = {
  'conoscenza-dispersa': conoscenzaDispersa,
  'estrazione-dati-manuale': estrazioneDatiManuale,
  'customer-service-sovraccarico': customerServiceSovraccarico,
  'feedback-non-letti': feedbackNonLetti,
  'report-manuali': reportManuali,
  'anomalie-scoperte-tardi': anomalieScoporteTardi,
  'hr-sovraccarico': hrSovraccarico,
  'processi-lenti': processiLenti,
  'contenuti-inconsistenti': contenutiInconsistenti,
  'lead-non-qualificati': leadNonQualificati,
  'compliance-rischio': complianceRischio,
  'formazione-inefficace': formazioneInefficace,
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
  processiLenti,
  contenutiInconsistenti,
  leadNonQualificati,
  complianceRischio,
  formazioneInefficace,
}
