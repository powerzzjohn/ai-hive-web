import { useEffect, useRef } from 'react'
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
import TunnelTransition from './sections/TunnelTransition'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
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
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation lenisRef={lenisRef} />
      <Hero />
      <Manifesto />
      <Products />
      <Scenarios />
      <Founder />
      <Vision />
      <Contact />
      <TunnelTransition />
      <Footer />
    </div>
  )
}

export default App
