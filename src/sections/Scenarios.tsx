import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenarios = [
  {
    title: '企业家',
    desc: '不懂开发，但需要一个能自动处理客户咨询、数据分析的 AI 系统。',
  },
  {
    title: '内容创作者',
    desc: '想批量生成短视频、图文，但不想研究复杂的提示词工程。',
  },
  {
    title: '电商运营者',
    desc: '需要跨平台的自动上架、客服回复、订单处理。',
  },
  {
    title: '职场精英',
    desc: '想要一个"第二大脑"，自动整理会议纪要、撰写报告、管理日程。',
  },
  {
    title: '探索者',
    desc: '好奇 AI 能做什么，但不想自己折腾环境配置和报错调试。',
  },
]

function DataMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = 400
    const h = 500
    canvas.width = w
    canvas.height = h

    const cols = 8
    const rows = 12
    const cellW = w / cols
    const cellH = h / rows

    let frame = 0
    let animId: number

    const draw = () => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW + cellW / 2
          const y = j * cellH + cellH / 2
          const val = Math.floor(Math.random() * 100)

          // Some cells are bright cyan, most are dark
          const isBright = (i + j + frame) % 7 === 0
          ctx.font = '16px "JetBrains Mono", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = isBright ? '#00FFF3' : '#222222'
          ctx.fillText(String(val).padStart(2, '0'), x, y)
        }
      }

      frame++
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#444444',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}
      >
        LIVE DATA STREAM
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

export default function Scenarios() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemsRef.current) {
      gsap.fromTo(
        itemsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="scenarios"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '240px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          gap: '80px',
          alignItems: 'flex-start',
        }}
        className="scenarios-layout"
      >
        {/* Left: Data matrix */}
        <div
          style={{ width: '45%', flexShrink: 0 }}
          className="scenarios-left"
        >
          <DataMatrix />
        </div>

        {/* Right: Scenarios */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#00FFF3',
              marginBottom: '16px',
            }}
          >
            03.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '48px',
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              margin: '0 0 60px 0',
            }}
          >
            为谁而造
          </h2>

          <div ref={itemsRef}>
            {scenarios.map((s, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '40px',
                  paddingLeft: '24px',
                  borderLeft: '2px solid #222222',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#00FFF3'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#222222'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ color: '#00FFF3', marginRight: '8px' }}>—</span>
                  {s.title}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#A0A0A0',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
