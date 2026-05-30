import { useEffect, useRef, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Products from './sections/Products'
import Scenarios from './sections/Scenarios'
import Founder from './sections/Founder'
import Vision from './sections/Vision'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Commission from './pages/Commission'

gsap.registerPlugin(ScrollTrigger)

// Lazy load Three.js tunnel for performance
const TunnelTransition = lazy(() => import('./sections/TunnelTransition'))

function HomePage() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <>
      <Navigation lenisRef={lenisRef} />
      <Hero />
      <Manifesto />
      <Products />
      <Scenarios />
      <Founder />
      <Vision />
      <Contact />
      <Suspense fallback={<div style={{ height: '100vh', background: '#000000' }} />}>
        <TunnelTransition />
      </Suspense>
      <Footer />
    </>
  )
}

function BlogLayout() {
  return (
    <>
      <Navigation lenisRef={{ current: null }} />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/*" element={<BlogLayout />} />
        <Route path="/commission" element={<Commission />} />
      </Routes>
    </div>
  )
}

export default App
