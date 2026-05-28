import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Founder() {
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
      id="founder"
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
          alignItems: 'center',
        }}
        className="founder-layout"
      >
        {/* Left: Image */}
        <div
          style={{
            width: '45%',
            flexShrink: 0,
            position: 'relative',
          }}
          className="founder-image-wrap"
        >
          <div
            style={{
              border: '1px solid #00FFF3',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/founder.jpg"
              alt="创始人"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'brightness(0.9) contrast(1.05)',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#00FFF3',
              marginTop: '12px',
              textTransform: 'uppercase',
            }}
          >
            FOUNDER / ARCHITECT
          </div>
        </div>

        {/* Right: Text */}
        <div
          ref={contentRef}
          style={{ flex: 1 }}
          className="founder-text"
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#00FFF3',
              marginBottom: '16px',
            }}
          >
            04.
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
            一个人的实验室
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
            阿 Q。一个相信工具应该为人服务的人。
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
            过去三个月，他用 openclaw、Hermes、Codex 三款工具，在几十个不同行业的场景中反复实验。从金融分析到电商运营，从内容创作到企业招聘。不是在看教程，而是在做实战。
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
            他把这些经验，连同自己用阿Q身份经营的公众号「疗愈师阿Q」，以及三个小程序项目——八星朋友匹配度预测工具、现代人修仙助理工具、儿童家庭积分激励工具——一并打包进了AI装机部落的服务体系。
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
            这不仅仅是一个装机服务。这是一个创作者把自己踩过的坑、验证过的路，分享给你的过程。
          </p>
        </div>
      </div>
    </section>
  )
}
