import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
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
      id="contact"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '240px 0 120px',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '0 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '48px',
            color: '#FFFFFF',
            lineHeight: 1.3,
            margin: '0 0 16px 0',
          }}
        >
          开启对话
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: '18px',
            color: '#A0A0A0',
            lineHeight: 1.8,
            marginBottom: '32px',
          }}
        >
          告诉我们你的想法。剩下的，交给AI装机部落。
        </p>
        <a
          href="mailto:zhou82118@gmail.com"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '24px',
            color: '#00FFF3',
            textDecoration: 'none',
            position: 'relative',
            display: 'inline-block',
            marginBottom: '48px',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderBottom = '1px solid #00FFF3'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderBottom = '1px solid transparent'
          }}
        >
          zhou82118@gmail.com
        </a>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '16px',
            color: '#00FFF3',
            marginBottom: '32px',
          }}
        >
          <a
            href="tel:18898682118"
            style={{
              color: '#00FFF3',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottom = '1px solid #00FFF3'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottom = '1px solid transparent'
            }}
          >
            18898682118
          </a>
          <span style={{ color: '#444444', margin: '0 12px' }}>/</span>
          <span>同微信号</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: '#666666',
            lineHeight: 1.8,
          }}
        >
          <div style={{ marginBottom: '8px' }}>
            微信公众号：疗愈师阿Q
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>八星朋友匹配度预测工具</span>
            <span style={{ color: '#444444' }}>·</span>
            <span>现代人修仙助理工具</span>
            <span style={{ color: '#444444' }}>·</span>
            <span>儿童家庭积分激励工具</span>
          </div>
        </div>
      </div>
    </section>
  )
}
