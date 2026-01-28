'use client'

/**
 * Error Boundary Component.
 * Catches runtime errors and displays fallback UI.
 * NFR-R4: Error handling gracefully
 */

import { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  section?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })

    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, etc.)
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div
          className="min-h-[200px] flex items-center justify-center p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {this.props.section
                ? `Errore nella sezione ${this.props.section}`
                : 'Si è verificato un errore'}
            </h2>

            <p className="text-gray-600 mb-6">
              Ci scusiamo per l'inconveniente. La pagina potrebbe non funzionare correttamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="
                  inline-flex items-center justify-center gap-2
                  px-4 py-2 rounded-lg
                  bg-primary-500 text-white
                  hover:bg-primary-600 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                "
              >
                <RefreshCw className="w-4 h-4" />
                Riprova
              </button>

              <button
                onClick={this.handleReload}
                className="
                  inline-flex items-center justify-center gap-2
                  px-4 py-2 rounded-lg
                  border border-gray-300
                  hover:bg-gray-50 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                "
              >
                <Home className="w-4 h-4" />
                Ricarica pagina
              </button>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <details className="mt-6 text-left bg-gray-100 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700">
                  Dettagli errore (solo sviluppo)
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Lightweight error boundary for specific sections.
 * Displays a simple message without full error details.
 */
export function SectionErrorBoundary({
  children,
  section,
}: {
  children: ReactNode
  section: string
}) {
  return (
    <ErrorBoundary
      section={section}
      fallback={
        <div className="py-12 px-6 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Impossibile caricare {section}. Il resto della pagina è disponibile.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary
