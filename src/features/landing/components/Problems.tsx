'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { problemList } from '@/content/problems'
import { useCases, type UseCaseId } from '@/content/use-cases'

/**
 * Problems section showing business challenges elevIA solves.
 * Responsive horizontal carousel with navigation arrows.
 * - Mobile: 1 card visible
 * - Tablet: 2 cards visible
 * - Desktop: 3 cards visible
 */

export function Problems() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1) // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2) // Tablet
      } else {
        setItemsPerView(3) // Desktop
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, problemList.length - itemsPerView)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  // Reset index if it exceeds maxIndex after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

  return (
    <section
      id="problems"
      className="pt-20 pb-28 bg-gray-50"
      aria-labelledby="problems-title"
    >
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-primary-500 uppercase tracking-wider text-sm font-medium mb-2">
            I PROBLEMI CHE RISOLVIAMO
          </p>
          <h2 id="problems-title" className="text-3xl md:text-4xl font-bold text-dark-900">
            La tua azienda ha questi problemi?
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10
                       w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200
                       flex items-center justify-center
                       hover:bg-gray-50 hover:shadow-xl transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Problemi precedenti"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10
                       w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200
                       flex items-center justify-center
                       hover:bg-gray-50 hover:shadow-xl transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Problemi successivi"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-6 md:mx-10">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4 md:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
              role="list"
              aria-label="Problemi aziendali risolti da elevIA"
            >
              {problemList.map((problem) => {
                // Get solution use cases
                const solutions = (problem.solvedBy || []).map((ucId: string) => {
                  const uc = useCases[ucId as UseCaseId]
                  return uc ? { id: uc.id, name: uc.name } : null
                }).filter(Boolean) as Array<{ id: string; name: string }>

                return (
                  <article
                    key={problem.id}
                    className="flex-shrink-0 card hover:shadow-lg transition-shadow duration-300"
                    style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                    role="listitem"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-dark-900 mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4">{problem.description}</p>

                    {solutions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <span className="text-gray-500">Soluzioni:</span>
                        {solutions.slice(0, 2).map((sol, idx) => (
                          <span key={sol.id}>
                            <Link
                              href={`/use-case/${sol.id}`}
                              className="text-secondary-500 font-medium hover:text-secondary-600 transition-colors"
                            >
                              {sol.name}
                            </Link>
                            {idx < Math.min(solutions.length, 2) - 1 && <span className="text-gray-400">, </span>}
                          </span>
                        ))}
                        {solutions.length > 2 && (
                          <span className="text-gray-400">+{solutions.length - 2}</span>
                        )}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-6'
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Vai alla posizione ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Contattaci per parlare del tuo progetto"
          >
            Parliamo del tuo progetto
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
