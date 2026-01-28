/**
 * Use Case Content Index
 *
 * Exports all use case JSON content for easy importing.
 */

import ragKnowledgeBase from './rag-knowledge-base.json'
import estrazioneDati from './estrazione-dati.json'
import ricercaSemantica from './ricerca-semantica.json'
import chatbotFaq from './chatbot-faq.json'
import sintesiRiunioni from './sintesi-riunioni.json'
import dueDiligence from './due-diligence.json'
import classificazioneTicket from './classificazione-ticket.json'
import copilotOperatore from './copilot-operatore.json'
import analisiSentiment from './analisi-sentiment.json'
import predictiveMaintenance from './predictive-maintenance.json'
import reportAutomatici from './report-automatici.json'
import anomalyDetection from './anomaly-detection.json'
import leadScoring from './lead-scoring.json'
import workflowApproval from './workflow-approval.json'
import complianceChecker from './compliance-checker.json'
import contentGeneration from './content-generation.json'
import screeningCv from './screening-cv.json'
import onboardingAssistant from './onboarding-assistant.json'
import performanceReview from './performance-review.json'
import employeeSelfService from './employee-self-service.json'

export const useCases = {
  'rag-knowledge-base': ragKnowledgeBase,
  'estrazione-dati': estrazioneDati,
  'ricerca-semantica': ricercaSemantica,
  'chatbot-faq': chatbotFaq,
  'sintesi-riunioni': sintesiRiunioni,
  'due-diligence': dueDiligence,
  'classificazione-ticket': classificazioneTicket,
  'copilot-operatore': copilotOperatore,
  'analisi-sentiment': analisiSentiment,
  'predictive-maintenance': predictiveMaintenance,
  'report-automatici': reportAutomatici,
  'anomaly-detection': anomalyDetection,
  'lead-scoring': leadScoring,
  'workflow-approval': workflowApproval,
  'compliance-checker': complianceChecker,
  'content-generation': contentGeneration,
  'screening-cv': screeningCv,
  'onboarding-assistant': onboardingAssistant,
  'performance-review': performanceReview,
  'employee-self-service': employeeSelfService,
} as const

export type UseCaseId = keyof typeof useCases

export const useCaseList = Object.values(useCases)

export function getUseCase(id: UseCaseId) {
  return useCases[id]
}

export function getUseCasesByArea(areaId: string) {
  return useCaseList.filter(uc => uc.area === areaId)
}

export {
  ragKnowledgeBase,
  estrazioneDati,
  ricercaSemantica,
  chatbotFaq,
  sintesiRiunioni,
  dueDiligence,
  classificazioneTicket,
  copilotOperatore,
  analisiSentiment,
  predictiveMaintenance,
  reportAutomatici,
  anomalyDetection,
  leadScoring,
  workflowApproval,
  complianceChecker,
  contentGeneration,
  screeningCv,
  onboardingAssistant,
  performanceReview,
  employeeSelfService,
}
