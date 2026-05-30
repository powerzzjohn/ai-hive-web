import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { getCommissionByCategory } from '../data/commission'

export default function Commission() {
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 }
      )
    }
    if (sectionsRef.current) {
      gsap.fromTo(
        sectionsRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2, delay: 0.3 }
      )
    }
  }, [])

  const grouped = getCommissionByCategory()

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Back to home */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 40px' }}>
        <Link
          to="/"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#666666', textDecoration: 'none' }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00FFF3' }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#666666' }}
        >
          &larr; 返回首页
        </Link>
      </div>

      {/* Header */}
      <div ref={headerRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 60px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#00FFF3', marginBottom: '16px' }}>
          COMMISSION
        </div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '48px', color: '#FFFFFF', lineHeight: 1.3, margin: '0 0 16px 0' }}>
          分佣计划
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '18px', color: '#A0A0A0', maxWidth: '640px', lineHeight: 1.8 }}>
          成为 AI装机部落的合作伙伴，推荐客户即可获得丰厚分佣。你负责对接需求，我们负责交付方案，互利共赢。
        </p>
      </div>

      {/* How it works */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { step: '01', title: '了解产品', desc: '熟悉我们的服务内容和定价体系' },
            { step: '02', title: '推荐客户', desc: '将需求方介绍给我们，或由你前置接单' },
            { step: '03', title: '我们交付', desc: 'AI装机部落专业团队完成服务交付' },
            { step: '04', title: '获得分佣', desc: '项目完成后，分佣自动结算给你' },
          ].map((item) => (
            <div
              key={item.step}
              style={{ border: '1px solid #222222', padding: '32px', transition: 'border-color 0.3s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#00FFF3' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#222222' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', color: '#00FFF3', marginBottom: '12px' }}>
                {item.step}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>
                {item.title}
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '14px', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Tables */}
      <div ref={sectionsRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', color: '#FFFFFF', margin: '0 0 32px 0', paddingBottom: '12px', borderBottom: '1px solid #222222' }}>
              {category}
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #333' }}>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#666666', fontWeight: 400, textTransform: 'uppercase' }}>编号</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#666666', fontWeight: 400, textTransform: 'uppercase' }}>项目</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#666666', fontWeight: 400, textTransform: 'uppercase' }}>报价</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#00FFF3', fontWeight: 700, textTransform: 'uppercase' }}>前置接单分佣</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#666666', fontWeight: 400, textTransform: 'uppercase' }}>备注</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.2s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0, 255, 243, 0.03)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444444' }}>
                        {item.id}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', marginBottom: '4px' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666666' }}>
                          {item.subtitle}
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#A0A0A0' }}>
                        {item.price}
                      </td>
                      <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '16px', color: '#00FFF3', fontWeight: 700 }}>
                        {item.commission}
                      </td>
                      <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444444', maxWidth: '200px' }}>
                        {item.commissionNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '640px', margin: '80px auto 0', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ padding: '48px 40px', border: '1px solid #00FFF3' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '28px', color: '#FFFFFF', margin: '0 0 16px 0' }}>
            成为合作伙伴
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#A0A0A0', lineHeight: 1.8, margin: '0 0 32px 0' }}>
            无论你是个人推广者、技术社区运营者还是企业服务代理商，都欢迎加入我们的分佣计划。
          </p>
          <a
            href="mailto:powerzzjohn@qq.com?subject=分佣计划合作申请"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#000000',
              background: '#00FFF3',
              padding: '14px 40px',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1' }}
          >
            申请加入分佣计划
          </a>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#00FFF3', marginTop: '20px' }}>
            powerzzjohn@qq.com
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444444', marginTop: '8px' }}>
            18898682118（同微信）
          </div>
        </div>
      </div>
    </div>
  )
}
