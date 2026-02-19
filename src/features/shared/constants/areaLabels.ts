/**
 * Shared area label mappings used across esplora components.
 * Maps area IDs to human-readable labels and Tailwind color classes.
 */

export interface AreaLabelInfo {
  label: string
  color: string
}

/** Area labels with dark-theme colors (for hero sections on dark backgrounds). */
export const AREA_LABELS_DARK: Record<string, AreaLabelInfo> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-500/20 text-blue-300' },
  cx: { label: 'Customer Experience', color: 'bg-orange-500/20 text-orange-300' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-500/20 text-orange-300' },
  operations: { label: 'Operations', color: 'bg-green-500/20 text-green-300' },
  workflow: { label: 'Workflow', color: 'bg-purple-500/20 text-purple-300' },
  hr: { label: 'HR', color: 'bg-pink-500/20 text-pink-300' },
}

/** Area labels with light-theme colors (for cards on white backgrounds). */
export const AREA_LABELS_LIGHT: Record<string, AreaLabelInfo> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-100 text-blue-800' },
  cx: { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  operations: { label: 'Operations', color: 'bg-green-100 text-green-800' },
  workflow: { label: 'Workflow', color: 'bg-purple-100 text-purple-800' },
  hr: { label: 'HR', color: 'bg-pink-100 text-pink-800' },
}

/** Maps each use case ID to its parent area. */
export const UC_AREA_MAP: Record<string, string> = {
  'rag-knowledge-base': 'knowledge',
  'estrazione-dati': 'knowledge',
  'sintesi-riunioni': 'knowledge',
  'due-diligence': 'knowledge',
  'chatbot-faq': 'customer-experience',
  'classificazione-ticket': 'customer-experience',
  'copilot-operatore': 'customer-experience',
  'analisi-sentiment': 'customer-experience',
  'report-automatici': 'operations',
  'ricerca-semantica': 'operations',
  'anomaly-detection': 'operations',
  'predictive-maintenance': 'operations',
  'workflow-approval': 'workflow',
  'content-generation': 'workflow',
  'lead-scoring': 'workflow',
  'compliance-checker': 'workflow',
  'screening-cv': 'hr',
  'onboarding-assistant': 'hr',
  'employee-self-service': 'hr',
  'performance-review': 'hr',
}

/** Maps each use case ID to a human-readable display name. */
export const UC_NAMES: Record<string, string> = {
  'rag-knowledge-base': 'RAG Knowledge Base',
  'estrazione-dati': 'Estrazione Dati',
  'sintesi-riunioni': 'Sintesi Riunioni',
  'due-diligence': 'Due Diligence',
  'chatbot-faq': 'Chatbot FAQ',
  'classificazione-ticket': 'Classificazione Ticket',
  'copilot-operatore': 'Copilot Operatore',
  'analisi-sentiment': 'Analisi Sentiment',
  'report-automatici': 'Report Automatici',
  'ricerca-semantica': 'Ricerca Semantica',
  'anomaly-detection': 'Anomaly Detection',
  'predictive-maintenance': 'Predictive Maintenance',
  'workflow-approval': 'Workflow Approval',
  'content-generation': 'Content Generation',
  'lead-scoring': 'Lead Scoring',
  'compliance-checker': 'Compliance Checker',
  'screening-cv': 'Screening CV',
  'onboarding-assistant': 'Onboarding Assistant',
  'employee-self-service': 'Employee Self-Service',
  'performance-review': 'Performance Review',
}
