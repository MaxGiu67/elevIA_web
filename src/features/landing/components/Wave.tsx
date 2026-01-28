'use client'

/**
 * Wave components for section transitions.
 * WaveTop: Dark section extends UP into white section above
 * WaveBottom: Dark section extends DOWN into white section below
 */

export function WaveTop() {
  return (
    <div
      className="absolute -top-[149px] left-0 w-full overflow-hidden leading-none z-10"
      aria-hidden="true"
    >
      <svg
        className="relative block w-full h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,192C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#0a0a0a"
        />
      </svg>
    </div>
  )
}

export function WaveBottom() {
  return (
    <div
      className="absolute -bottom-[149px] left-0 w-full overflow-hidden leading-none z-10"
      aria-hidden="true"
    >
      <svg
        className="relative block w-full h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,128C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="#0a0a0a"
        />
      </svg>
    </div>
  )
}
