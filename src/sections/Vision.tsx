import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
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
      id="vision"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '240px 0',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '0 40px',
          textAlign: 'center',
        }}
      >
        <div ref={contentRef}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#00FFF3',
              marginBottom: '16px',
            }}
          >
            05.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '72px',
              color: '#FFFFFF',
              lineHeight: 1.1,
              margin: '0 0 48px 0',
            }}
          >
            无界联盟
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
            下一步，AI装机部落将聚合更多热爱"装机"的 AI 从业者——我们称他们为 AI 架构师。
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
            一起打造一个无界联盟。一起规范整个行业的不良行为，积极接入政府组织管理体系，主动为从业者创造一个公平的经营环境。
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '18px',
              color: '#A0A0A0',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            如果你也相信 AI 应该为每个人服务，如果你也厌倦了那些让人望而生畏的技术壁垒——
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '24px',
              color: '#FFFFFF',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            欢迎加入。
          </p>

          {/* Decorative line */}
          <div
            style={{
              margin: '60px auto 0',
              width: '200px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00FFF3, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
