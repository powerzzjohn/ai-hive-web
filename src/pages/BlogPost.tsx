import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import gsap from 'gsap'
import { getPostBySlug, blogPosts } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug || '')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }
      )
    }
  }, [slug])

  if (!post) {
    return (
      <div style={{ background: '#000000', minHeight: '100vh', paddingTop: '120px', textAlign: 'center' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '48px' }}>404</h1>
        <Link to="/blog" style={{ color: '#00FFF3', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          &larr; 返回博客列表
        </Link>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2)

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '120px' }}>
      <div ref={contentRef} style={{ maxWidth: '760px', margin: '0 auto', padding: '0 40px' }}>
        {/* Back */}
        <div style={{ marginBottom: '40px' }}>
          <Link
            to="/blog"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#666666', textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00FFF3' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#666666' }}
          >
            &larr; 返回博客列表
          </Link>
        </div>

        {/* Meta */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#00FFF3', marginBottom: '16px' }}>
          {post.category} &middot; {post.date} &middot; {post.readingTime} min read
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '36px', color: '#FFFFFF', lineHeight: 1.3, margin: '0 0 12px 0' }}>
          {post.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '18px', color: '#A0A0A0', margin: '0 0 40px 0' }}>
          {post.subtitle}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#007A7A', border: '1px solid #222222', padding: '2px 8px', borderRadius: '2px' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#222222', marginBottom: '48px' }} />

        {/* Content */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '18px', color: '#A0A0A0', lineHeight: 1.8 }}
        />

        {/* CTA */}
        <div style={{ marginTop: '80px', padding: '40px', border: '1px solid #222222', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', color: '#FFFFFF', margin: '0 0 12px 0' }}>
            也想让你的业务用上 AI？
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '16px', color: '#A0A0A0', margin: '0 0 24px 0' }}>
            告诉我们你的想法，剩下的交给 AI装机部落。
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: '#00FFF3' }}>
            <a href="mailto:zhou82118@gmail.com" style={{ color: '#00FFF3', textDecoration: 'none' }}>zhou82118@gmail.com</a>
            <span style={{ color: '#444444', margin: '0 12px' }}>/</span>
            <span>18898682118（同微信）</span>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 24px 0' }}>
              相关阅读
            </h3>
            {relatedPosts.map((rp) => (
              <div key={rp.slug} style={{ marginBottom: '16px', borderBottom: '1px solid #222222', paddingBottom: '16px' }}>
                <Link to={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#007A7A', marginBottom: '4px' }}>
                    {rp.category} &middot; {rp.date}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: '#FFFFFF', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00FFF3' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                  >
                    {rp.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let tableRows: string[] = []
  let inList = false
  let listItems: string[] = []
  let listType: 'ul' | 'ol' = 'ul'

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Headings
    if (line.startsWith('## ')) {
      flushList(result, listItems, listType)
      flushTable(result, tableRows)
      result.push('<h2 style="font-family:var(--font-sans);font-weight:700;font-size:28px;color:#FFFFFF;margin:48px 0 20px 0;line-height:1.3;">' + escapeHtml(line.slice(3)) + '</h2>')
      continue
    }
    if (line.startsWith('### ')) {
      flushList(result, listItems, listType)
      flushTable(result, tableRows)
      result.push('<h3 style="font-family:var(--font-sans);font-weight:700;font-size:22px;color:#FFFFFF;margin:40px 0 16px 0;line-height:1.4;">' + escapeHtml(line.slice(4)) + '</h3>')
      continue
    }

    // Blockquote
    if (line.startsWith('> "') && line.endsWith('"')) {
      flushList(result, listItems, listType)
      flushTable(result, tableRows)
      const q = escapeHtml(line.slice(3, -1))
      result.push('<blockquote style="border-left:3px solid #00FFF3;padding-left:20px;margin:24px 0;font-style:italic;color:#CCCCCC;font-size:16px;line-height:1.8;">"' + q + '"</blockquote>')
      continue
    }
    if (line.startsWith('> ')) {
      flushList(result, listItems, listType)
      flushTable(result, tableRows)
      result.push('<blockquote style="border-left:3px solid #00FFF3;padding-left:20px;margin:24px 0;color:#CCCCCC;font-size:16px;line-height:1.8;">' + escapeHtml(line.slice(2)) + '</blockquote>')
      continue
    }

    // Table
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList(result, listItems, listType)
      if (line.includes('---')) {
        continue
      }
      const cells = line.split('|').filter(c => c.trim()).map(c => escapeHtml(c.trim()))
      if (cells.length > 0) {
        tableRows.push('<tr>' + cells.map(c => '<td style="border:1px solid #333;padding:8px 12px;color:#A0A0A0;font-size:14px;">' + c + '</td>').join('') + '</tr>')
      }
      continue
    } else {
      flushTable(result, tableRows)
    }

    // Unordered list
    if (line.startsWith('- ')) {
      flushTable(result, tableRows)
      if (!inList || listType !== 'ul') {
        flushList(result, listItems, listType)
        inList = true
        listType = 'ul'
      }
      listItems.push(escapeHtml(line.slice(2)))
      continue
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\. (.+)$/)
    if (olMatch) {
      flushTable(result, tableRows)
      if (!inList || listType !== 'ol') {
        flushList(result, listItems, listType)
        inList = true
        listType = 'ol'
      }
      listItems.push('<span style="color:#00FFF3;font-family:var(--font-mono);margin-right:8px;">' + olMatch[1] + '.</span>' + escapeHtml(olMatch[2]))
      continue
    }

    // Empty line
    if (line === '') {
      flushList(result, listItems, listType)
      flushTable(result, tableRows)
      continue
    }

    // Regular paragraph
    flushList(result, listItems, listType)
    flushTable(result, tableRows)
    const p = processInline(escapeHtml(line))
    result.push('<p style="margin:16px 0;color:#A0A0A0;line-height:1.8;">' + p + '</p>')
  }

  flushList(result, listItems, listType)
  flushTable(result, tableRows)

  return result.join('\n')
}

function flushTable(result: string[], rows: string[]) {
  if (rows.length > 0) {
    result.push('<table style="border-collapse:collapse;margin:20px 0;width:100%;font-family:var(--font-sans);">' + rows.join('') + '</table>')
    rows.length = 0
  }
}

function flushList(result: string[], items: string[], type: 'ul' | 'ol') {
  if (items.length > 0) {
    const tag = type === 'ul' ? 'ul' : 'ol'
    const style = type === 'ul'
      ? 'margin:16px 0;padding-left:24px;'
      : 'margin:16px 0;padding-left:24px;list-style:none;'
    result.push('<' + tag + ' style="' + style + '">' + items.map(item => '<li style="color:#A0A0A0;margin-bottom:8px;line-height:1.8;">' + item + '</li>').join('') + '</' + tag + '>')
    items.length = 0
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function processInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#FFFFFF;font-weight:700;">$1</strong>')
}
