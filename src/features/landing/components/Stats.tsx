'use client'

/**
 * Stats section showing key metrics.
 * Displays elevIA's core value propositions in numbers.
 */

const stats = [
  { value: '20', label: 'Use Case AI' },
  { value: '15gg', label: 'Tempo medio di delivery' },
  { value: '85%+', label: 'Accuracy garantita' },
  { value: '99%', label: 'Disponibilità' },
]

export function Stats() {
  return (
    <section
      className="pt-40 pb-16 bg-white"
      aria-labelledby="stats-title"
    >
      <h2 id="stats-title" className="sr-only">Statistiche elevIA</h2>
      <div className="container-main">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          role="list"
          aria-label="Metriche chiave"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              role="listitem"
            >
              <div
                className="text-4xl md:text-5xl font-bold text-primary-500 mb-2"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
