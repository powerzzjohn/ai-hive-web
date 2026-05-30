import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { blogPosts } from '../data/blog'

export default function BlogList() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 }
      )
    }
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.3,
        }
      )
    }
  }, [])

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Back to home */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 40px' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00FFF3' }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#666666' }}
        >
          &larr; 返回首页
        </Link>
      </div>

      {/* Header */}
      <div ref={headerRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 60px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#00FFF3', marginBottom: '16px' }}>
          BLOG
        </div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '48px', color: '#FFFFFF', lineHeight: 1.3, margin: '0 0 16px 0' }}>
          案例与洞察
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '18px', color: '#A0A0A0', maxWidth: '600px' }}>
          真实客户的 AI 转型故事，以及我们用工具解决实际问题的思考。
        </p>
      </div>

      {/* Post Cards */}
      <div ref={cardsRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            style={{
              marginBottom: '40px',
              borderBottom: '1px solid #222222',
              paddingBottom: '40px',
            }}
          >
            <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
                {/* Left: Meta */}
                <div style={{ minWidth: '140px', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#00FFF3', marginBottom: '8px' }}>
                    {post.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444444' }}>
                    {post.date}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444444', marginTop: '4px' }}>
                    {post.readingTime} min read
                  </div>
                </div>

                {/* Right: Content */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '24px',
                      color: '#FFFFFF',
                      lineHeight: 1.4,
                      margin: '0 0 8px 0',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00FFF3' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 300,
                      fontSize: '16px',
                      color: '#A0A0A0',
                      lineHeight: 1.8,
                      margin: '0 0 12px 0',
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#007A7A',
                          border: '1px solid #222222',
                          padding: '2px 8px',
                          borderRadius: '2px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
