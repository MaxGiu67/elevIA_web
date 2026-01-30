'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'USE CASE', href: '#services' },
  { name: 'PROBLEMI', href: '#problems' },
  { name: 'PERCHÉ NOI', href: '#about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-dark-900">elev</span>
            <span className="text-primary-500">IA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary-500 text-sm font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn-primary text-sm py-2 px-5 flex items-center gap-1"
          >
            ASSESSMENT
            <ChevronDown className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-main py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-primary-500 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-primary w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              RICHIEDI ASSESSMENT
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
