import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: string
  code: string
  name: string
  subtitle: string
  description: string
  price: string
  period?: string
  category: string
}

const products: Product[] = [
  {
    id: 'a1',
    code: 'AIZJ-YL-2026001',
    name: 'openclaw 橙皮书',
    subtitle: '从入门到精通',
    description: '一本不需要技术背景的实操手册。7天时间，从安装到产出第一个自动化工作流。',
    price: '¥3.9',
    category: '知识库',
  },
  {
    id: 'a2',
    code: 'AIZJ-YL-2026002',
    name: 'openclaw 全场景指南',
    subtitle: '全球用户 10 大场景 50 个用法',
    description: '整理了全球 openclaw 社区中最高频的 50 个实战场景。覆盖内容创作、数据分析、客服自动化。',
    price: '¥11.9',
    category: '知识库',
  },
  {
    id: 'a3',
    code: 'AIZJ-YL-2026003',
    name: 'openclaw 盈利实录',
    subtitle: '14 天自动化盈利实录',
    description: '真实的 14 天案例拆解：如何用 openclaw 搭建一个全自动的内容分发管道，从 0 到首笔收入。',
    price: '¥11.9',
    category: '知识库',
  },
  {
    id: 'a4',
    code: 'AIZJ-YL-2026004',
    name: 'Hermes agent 指南',
    subtitle: '从入门到精通',
    description: '多智能体协作系统的完整指南。教会你如何指挥多个 AI Agent 分工合作，处理复杂任务。',
    price: '¥11.9',
    category: '知识库',
  },
  {
    id: 'b1',
    code: 'AIZJ-RM-2026001',
    name: 'Openclaw + Codex 装机包',
    subtitle: '基础入门版',
    description: '原始版安装，附赠 AI 保姆 Codex，保证可用。关联微信或飞书任一渠道，即装即用。',
    price: '¥299',
    period: '2 天交付',
    category: '基础装机',
  },
  {
    id: 'b2',
    code: 'AIZJ-RM-2026002',
    name: 'Hermes + Codex 装机包',
    subtitle: '基础入门版',
    description: '多智能体协作入门方案。安装 Hermes 引擎 + Codex 助手，打通你的第一个 AI 协作链路。',
    price: '¥299',
    period: '2 天交付',
    category: '基础装机',
  },
  {
    id: 'b3',
    code: 'AIZJ-SJ-2026001',
    name: '全栈装机包',
    subtitle: 'Openclaw + Hermes + Codex + AI 模型接入',
    description: '升级版基础安装。三大核心工具一次性部署完毕，额外接入 AI 模型 + 图文/视频类自媒体运营流程贯通及指导。',
    price: '¥425',
    period: '3-5 天交付',
    category: '基础装机',
  },
  {
    id: 'c1',
    code: 'AIZJ-SJ-2026002',
    name: 'AI 角色定制',
    subtitle: '总助类方案',
    description: '不只是安装，而是为你量身定制。前期深度沟通，理解你的业务场景，定制专属的 AI 工作角色与落地流程。',
    price: '¥799',
    period: '5-7 天交付',
    category: '定制方案',
  },
  {
    id: 'd1',
    code: 'AIZJ-WYYY-2026001',
    name: '企业员工招聘',
    subtitle: '半自动无忧运营',
    description: '通过 AI 实现主流招聘网站的数字化运营。一次性设定，含数据分析、警告提示，人工+AI 结合的半自动无忧运营。附赠 AI 保姆 Codex。',
    price: '¥799',
    period: '3 天交付',
    category: '企业无忧运营',
  },
  {
    id: 'd2',
    code: 'AIZJ-WYYY-2026002',
    name: '电商店铺运营',
    subtitle: '半自动无忧运营',
    description: '通过 AI 实现国内外主要电商平台的数字化运营。含数据分析、无库存货源上架、自动发货、群消息沟通、警告提示。',
    price: '¥1,799',
    period: '5-7 天交付',
    category: '企业无忧运营',
  },
  {
    id: 'd3',
    code: 'AIZJ-WYYY-2026003',
    name: '金融/理财运营',
    subtitle: '半自动无忧运营',
    description: '通过 AI 实现金融理财产品的数字化运营。含数据分析、模拟盘、警告提示，人工+AI 结合的半自动运营。',
    price: '¥2,688+',
    period: '10 天交付',
    category: '企业无忧运营',
  },
  {
    id: 'd4',
    code: 'AIZJ-WYYY-2026004',
    name: '企业 GEO 优化',
    subtitle: 'AI 推荐引擎',
    description: '通过多种工具实现企业信息、主推业务、权威品牌力的 AI 平台咨询结果优化。主要针对 AI 搜索优化，30 天上榜，全年有效，每月提供月报。',
    price: '¥4,888',
    period: '365 天服务',
    category: '企业无忧运营',
  },
]

function ProductItem({ product, index }: { product: Product; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!itemRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      // Title glow reveal effect
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          textShadow: '0 0 40px rgba(0, 255, 243, 0.8)',
        },
        {
          opacity: 1,
          textShadow: '0 0 0px rgba(0, 255, 243, 0)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      // Content fade in
      gsap.fromTo(
        itemRef.current!.querySelectorAll('.product-meta'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 70%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={itemRef}
      className="product-item"
      style={{
        marginBottom: index < products.length - 1 ? '80px' : '0',
        position: 'relative',
      }}
    >
      <div
        className="product-meta"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#00FFF3',
          marginBottom: '8px',
          textTransform: 'uppercase',
        }}
      >
        {product.code} · {product.category}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ flex: '1 1 400px' }}>
          <h3
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '24px',
              color: '#FFFFFF',
              lineHeight: 1.4,
              margin: '0 0 8px 0',
              opacity: 0,
            }}
          >
            {product.name}
          </h3>
          <div
            className="product-meta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#007A7A',
              marginBottom: '12px',
            }}
          >
            {product.subtitle}
          </div>
          <p
            className="product-meta"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#A0A0A0',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: 0,
            }}
          >
            {product.description}
          </p>
        </div>

        <div
          className="product-meta"
          style={{
            textAlign: 'right',
            flexShrink: 0,
            minWidth: '120px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '20px',
              fontWeight: 700,
              color: '#00FFF3',
              marginBottom: '4px',
            }}
          >
            {product.price}
          </div>
          {product.period && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#666666',
              }}
            >
              {product.period}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
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
      id="products"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#000000',
        padding: '240px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <div ref={headerRef} style={{ marginBottom: '100px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#00FFF3',
              marginBottom: '16px',
            }}
          >
            02.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '48px',
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            核心产品
          </h2>
        </div>

        {products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
