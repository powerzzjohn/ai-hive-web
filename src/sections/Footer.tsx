export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        height: '60px',
        background: '#000000',
        borderTop: '1px solid #222222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          color: '#444444',
        }}
      >
        &copy; 2026 AI 装机部落
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#00FFF3',
          textTransform: 'uppercase',
        }}
      >
        POWERED BY CURIOSITY
      </div>
    </footer>
  )
}
