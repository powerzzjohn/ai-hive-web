import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  g: number
  b: number
  alpha: number
  baseX: number
  baseY: number
}

function DriftGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)
  const visibleRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DENSITY = 25
    const dots: Dot[] = []

    const initDots = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      dots.length = 0
      const cols = Math.ceil(w / DENSITY)
      const rows = Math.ceil(h / DENSITY)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * DENSITY + Math.random() * DENSITY,
            y: j * DENSITY + Math.random() * DENSITY,
            baseX: i * DENSITY + DENSITY / 2,
            baseY: j * DENSITY + DENSITY / 2,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: 1 + Math.random() * 2,
            g: 255,
            b: 243,
            alpha: 0.3 + Math.random() * 0.7,
          })
        }
      }
      dotsRef.current = dots
    }

    initDots()

    const handleResize = () => initDots()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      if (!visibleRef.current) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const dot of dotsRef.current) {
        // Drift
        dot.x += dot.vx
        dot.y += dot.vy

        // Wrap around
        if (dot.x < 0) dot.x = w
        if (dot.x > w) dot.x = 0
        if (dot.y < 0) dot.y = h
        if (dot.y > h) dot.y = 0

        // Mouse repulsion
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100 && dist > 0) {
          const ax = (dx / dist) * 0.5
          const ay = (dy / dist) * 0.5
          dot.vx += ax
          dot.vy += ay
        }

        // Friction
        dot.vx *= 0.99
        dot.vy *= 0.99

        // Render
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, ${dot.g}, ${dot.b}, ${dot.alpha})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    // IntersectionObserver for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
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

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      <DriftGridCanvas />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '240px 40px',
        }}
        className="manifesto-layout"
      >
        {/* Left text */}
        <div
          ref={textRef}
          style={{
            width: '40%',
            minWidth: '320px',
          }}
          className="manifesto-text"
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#00FFF3',
              marginBottom: '16px',
            }}
          >
            01.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '48px',
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              margin: '0 0 32px 0',
            }}
          >
            这不是教程，
            <br />
            是行动。
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '18px',
              color: '#A0A0A0',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}
          >
            你不需要成为程序员。你不需要读100篇论文。你甚至不需要知道"大模型"和"API"有什么区别。
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '18px',
              color: '#A0A0A0',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}
          >
            你只需要一个想法——关于如何让自己或团队的工作效率提升10倍的想法。剩下的事，交给AI装机部落。
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '18px',
              color: '#A0A0A0',
              lineHeight: 1.8,
            }}
          >
            我们相信，AI 的真正价值不在于技术本身，而在于它如何被装进每个人的日常。我们做的，就是把这个"装"的过程，从复杂变为简单，从昂贵变为触手可及。
          </p>
        </div>

        {/* Right area - floating text */}
        <div
          style={{
            width: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          className="manifesto-right"
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: '#00FFF3',
              textShadow: '0 0 30px rgba(0, 255, 243, 0.5), 0 0 60px rgba(0, 255, 243, 0.2)',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          >
            "您给想法，我给方案"
          </div>
        </div>
      </div>
    </section>
  )
}
