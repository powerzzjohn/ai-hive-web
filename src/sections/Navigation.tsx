import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

interface NavigationProps {
  lenisRef: React.RefObject<Lenis | null>
}

const navItems = [
  { label: '01. 理念', target: '#manifesto' },
  { label: '02. 产品', target: '#products' },
  { label: '03. 场景', target: '#scenarios' },
  { label: '04. 愿景', target: '#vision' },
  { label: '05. 联络', target: '#contact' },
]

export default function Navigation({ lenisRef }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80 },
        { y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 }
      )
    }
  }, [])

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target)
    }
    setMobileOpen(false)
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.9)',
        borderBottom: '1px solid #222222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        transform: 'translateY(-80px)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '24px',
          color: '#FFFFFF',
          letterSpacing: '0.05em',
        }}
      >
        AI 装机部落
      </div>

      {/* Desktop nav */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}
        className="nav-desktop"
      >
        {navItems.map((item) => (
          <a
            key={item.target}
            href={item.target}
            onClick={(e) => handleClick(e, item.target)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#666666',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.color = '#00FFF3'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.color = '#666666'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-mobile-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 2, background: '#FFFFFF', marginBottom: 6 }} />
        <div style={{ width: 24, height: 2, background: '#FFFFFF', marginBottom: 6 }} />
        <div style={{ width: 24, height: 2, background: '#FFFFFF' }} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            padding: '20px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderBottom: '1px solid #222222',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.target}
              href={item.target}
              onClick={(e) => handleClick(e, item.target)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: '#666666',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
