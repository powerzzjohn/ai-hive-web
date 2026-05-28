import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function roundedDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rounded: number
) {
  ctx.beginPath()
  ctx.moveTo(x, y - radius + rounded)
  ctx.quadraticCurveTo(x, y - radius, x + rounded, y - radius + rounded * 0.5)
  ctx.lineTo(x + radius - rounded, y - rounded * 0.5)
  ctx.quadraticCurveTo(x + radius, y, x + radius - rounded, y + rounded * 0.5)
  ctx.lineTo(x + rounded, y + radius - rounded * 0.5)
  ctx.quadraticCurveTo(x, y + radius, x - rounded, y + radius - rounded * 0.5)
  ctx.lineTo(x - radius + rounded, y + rounded * 0.5)
  ctx.quadraticCurveTo(x - radius, y, x - radius + rounded, y - rounded * 0.5)
  ctx.lineTo(x - rounded, y - radius + rounded * 0.5)
  ctx.quadraticCurveTo(x, y - radius, x, y - radius + rounded)
  ctx.closePath()
  ctx.fill()
}

function PulsingStarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      time += 16
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const baseRadius = 100 + Math.sin(time * 0.001) * 5

      ctx.save()
      ctx.translate(cx, cy)

      // Glow effect via shadow
      ctx.shadowColor = '#00FFFF'
      ctx.shadowBlur = 20

      // 4 overlapping diamonds with 45° rotation difference
      for (let i = 0; i < 4; i++) {
        ctx.save()
        ctx.rotate((i * 45 * Math.PI) / 180 + time * 0.0005)

        let radius: number
        if (i === 0) radius = baseRadius
        else if (i === 1) radius = baseRadius * 0.85
        else if (i === 2) radius = baseRadius * 0.85
        else radius = 60

        if (i < 3) {
          ctx.fillStyle = 'rgba(0, 127, 127, 0.5)'
        } else {
          ctx.fillStyle = 'rgba(0, 255, 255, 0.5)'
        }

        roundedDiamond(ctx, 0, 0, radius, radius * 0.15)
        ctx.restore()
      }

      ctx.restore()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        cursor: 'crosshair',
      }}
    />
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Label animation
    gsap.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    )

    // Title typewriter effect
    if (titleRef.current) {
      const text = titleRef.current.getAttribute('data-text') || ''
      titleRef.current.textContent = ''
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex < text.length && titleRef.current) {
          titleRef.current.textContent += text[charIndex]
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }

    // Subtitle
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.5 }
    )

    // CTA button
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 2 }
    )
  }, [])

  const handleExplore = () => {
    const el = document.getElementById('manifesto')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      <PulsingStarCanvas />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '100%',
          paddingBottom: '10vh',
          textAlign: 'center',
        }}
      >
        <div
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: '#00FFF3',
            marginBottom: '16px',
            opacity: 0,
          }}
        >
          // 您给想法，我给方案
        </div>

        <h1
          ref={titleRef}
          data-text="AI 装机部落"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(40px, 8vw, 72px)',
            color: '#FFFFFF',
            letterSpacing: '0.1em',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
            minHeight: '1.1em',
          }}
        />

        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: '18px',
            color: '#A0A0A0',
            maxWidth: '480px',
            lineHeight: 1.8,
            marginBottom: '32px',
            opacity: 0,
          }}
        >
          从入门到精通，让每一位创造者拥有属于自己的 AI 工具。
        </p>

        <button
          ref={ctaRef}
          onClick={handleExplore}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: '#00FFF3',
            background: 'transparent',
            border: '1px solid #00FFF3',
            borderRadius: '4px',
            padding: '12px 32px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget
            btn.style.background = '#00FFF3'
            btn.style.color = '#000000'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget
            btn.style.background = 'transparent'
            btn.style.color = '#00FFF3'
          }}
        >
          开始探索
        </button>
      </div>
    </section>
  )
}
