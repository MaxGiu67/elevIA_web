/**
 * Hook for monitoring AI service availability.
 * FR19: Il sistema può rilevare indisponibilità del servizio AI entro 15 secondi
 * NFR-R2: Timeout detection
 */

import { useState, useEffect, useCallback, useRef } from 'react'

import { API_URL } from '@/config/api'
const HEALTH_CHECK_INTERVAL = 30000 // 30 seconds
const HEALTH_CHECK_TIMEOUT = 15000 // 15 seconds (FR19)
const MAX_CONSECUTIVE_FAILURES = 3

export type AIStatus = 'available' | 'unavailable' | 'checking' | 'unknown'

interface UseAIStatusReturn {
  status: AIStatus
  lastChecked: Date | null
  consecutiveFailures: number
  checkNow: () => Promise<void>
  isAvailable: boolean
  isUnavailable: boolean
}

export function useAIStatus(): UseAIStatusReturn {
  const [status, setStatus] = useState<AIStatus>('unknown')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [consecutiveFailures, setConsecutiveFailures] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const checkHealth = useCallback(async (): Promise<void> => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setStatus('checking')

    try {
      const response = await Promise.race([
        fetch(`${API_URL}/api/health`, {
          signal: controller.signal,
        }),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), HEALTH_CHECK_TIMEOUT)
        }),
      ])

      if (response.ok) {
        const data = await response.json()

        if (data.status === 'ok') {
          setStatus('available')
          setConsecutiveFailures(0)
        } else {
          throw new Error('Health check returned non-ok status')
        }
      } else {
        throw new Error(`Health check failed: ${response.status}`)
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled, don't update state
        return
      }

      setConsecutiveFailures((prev) => prev + 1)

      // Mark as unavailable after MAX_CONSECUTIVE_FAILURES
      if (consecutiveFailures + 1 >= MAX_CONSECUTIVE_FAILURES) {
        setStatus('unavailable')
      } else {
        setStatus('unknown')
      }
    } finally {
      setLastChecked(new Date())
      abortControllerRef.current = null
    }
  }, [consecutiveFailures])

  // Initial check and periodic polling
  useEffect(() => {
    checkHealth()

    intervalRef.current = setInterval(checkHealth, HEALTH_CHECK_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [checkHealth])

  return {
    status,
    lastChecked,
    consecutiveFailures,
    checkNow: checkHealth,
    isAvailable: status === 'available',
    isUnavailable: status === 'unavailable',
  }
}

export default useAIStatus
