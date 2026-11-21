import { useEffect, useState } from 'react'
import heroImage from './assets/fitness-hero.png'
import strengthImage from './assets/fitness-strength.png'
import './components/styles/home.css'

function ArrowIcon({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Icon({ name }) {
  const paths = {
    strength: <><path d="M4 9v6m3-9v12m10-12v12m3-9v6M7 12h10" /></>,
    movement: <><path d="M3 17c3-5 5-6 8-6 2 0 3 1 5 1 2 0 3-1 5-3" /><path d="m17 6 4 3-3 4" /><path d="M3 21h18" /></>,
    recovery: <><path d="M12 21c5-3 8-7 8-11a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 4 3 8 8 11Z" /><path d="M7 12h3l2-3 2 6 2-3h2" /></>,
    spark: <><path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2ZM19 19l.5 1.5L21 21l-1.5.5L19 23l-.5-1.5L17 21l1.5-.5L19 19Z" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const pillars = [
  { number: '01', icon: 'strength', title: 'Build strength', description: 'Get stronger with focused training that meets you where you are.' },
  { number: '02', icon: 'movement', title: 'Move with purpose', description: 'Find your rhythm through movement that feels as good as it works.' },
  { number: '03', icon: 'recovery', title: 'Recover better', description: 'Make space to reset, recharge, and come back ready for more.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const openSignIn = () => {
    closeMenu()
    setSignInOpen(true)
  }

  useEffect(() => {
    if (!signInOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSignInOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [signInOpen])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const revealElements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    revealElements.forEach((element) => observer.observe(element))
    document.documentElement.classList.add('motion-ready')

    const hero = document.querySelector('.hero-section')
    const feature = document.querySelector('.feature-image-wrap')
    let frame = 0
    const updateParallax = () => {
      frame = 0
      const heroProgress = Math.min(Math.max(-hero.getBoundingClientRect().top / hero.offsetHeight, 0), 1)
      hero.style.setProperty('--parallax-y', `${heroProgress * 85}px`)
      const featureRect = feature.getBoundingClientRect()
      if (featureRect.top < window.innerHeight && featureRect.bottom > 0) {
        const progress = (window.innerHeight - featureRect.top) / (window.innerHeight + featureRect.height)
        feature.style.setProperty('--parallax-y', `${(progress - 0.5) * 70}px`)
      }
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateParallax) }
    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="site-shell">
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="EvhyxLifts home"><span className="brand-mark">E<span>.</span></span><span>EVHYX<span className="brand-dot">LIFTS</span></span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#approach" onClick={closeMenu}>The approach</a>
        <a href="#programs" onClick={closeMenu}>What we do</a>
        <a href="#about" onClick={closeMenu}>Our philosophy</a>
        <button className="nav-cta" type="button" onClick={openSignIn}>Get moving <ArrowIcon diagonal /></button>
      </nav>
    </header>

    <main id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <img className="hero-image" src={heroImage} alt="Athlete running up concrete stairs" />
        <div className="hero-shade" />
        <div className="hero-inner" data-reveal>
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A BETTER WAY TO MOVE <span className="hero-index">/ 001</span></div>
          <h1 id="hero-title">THE WORK<br /><em>IS WORTH IT.</em></h1>
          <p>Strength for the everyday. Movement for the long run. A healthier you starts with showing up.</p>
          <a className="button button-light" href="#programs">Explore the movement <ArrowIcon diagonal /></a>
        </div>
        <div className="hero-bottom"><span>BUILT FOR REAL LIFE</span><span>SCROLL TO EXPLORE <span className="down-arrow">↓</span></span></div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => <div className="marquee-group" key={copy}>
            <span>STRONGER EVERY DAY</span><span className="marquee-star">✳</span>
            <span>MOVE WITH INTENTION</span><span className="marquee-star">✳</span>
            <span>FEEL THE DIFFERENCE</span><span className="marquee-star">✳</span>
          </div>)}
        </div>
      </div>

      <section className="intro-section section-pad" id="approach" data-reveal>
        <div className="section-label"><span className="tiny-square" /> THE APPROACH <span className="label-number">01 / 04</span></div>
        <div className="intro-grid"><h2>MORE THAN<br /><em>A WORKOUT.</em></h2><div className="intro-copy"><div className="icon-badge"><Icon name="spark" /></div><p>Fitness isn’t a finish line. It’s the energy to do more of what you love, the confidence to try something new, and the strength to keep going.</p><a className="text-link" href="#about">Discover our mindset <ArrowIcon diagonal /></a></div></div>
      </section>

      <section className="programs-section section-pad" id="programs" data-reveal>
        <div className="section-label"><span className="tiny-square" /> WHAT WE DO <span className="label-number">02 / 04</span></div>
        <div className="section-heading"><h2>FIND YOUR<br /><em>WAY FORWARD.</em></h2><p>A balanced approach to becoming your strongest self. Start anywhere. Keep moving.</p></div>
        <div className="program-grid">{pillars.map((pillar) => <article className="program-card" key={pillar.number}><div className="program-top"><span>{pillar.number} / 03</span><span className="program-icon"><Icon name={pillar.icon} /></span></div><div className="program-body"><h3>{pillar.title}</h3><p>{pillar.description}</p></div><a href="#contact" aria-label={`Get started with ${pillar.title}`}><ArrowIcon diagonal /></a></article>)}</div>
      </section>

      <section className="feature-section" id="about"><div className="feature-image-wrap"><img src={strengthImage} alt="Athlete lifting a dumbbell in a gym" /><span className="photo-caption">EVHYXLIFTS / IN MOTION</span></div><div className="feature-content" data-reveal><div className="section-label"><span className="tiny-square" /> OUR PHILOSOPHY <span className="label-number">03 / 04</span></div><div><span className="feature-kicker">NO SHORTCUTS. JUST PROGRESS.</span><h2>SHOW UP.<br />PUT IN WORK.<br /><em>FEEL ALIVE.</em></h2><p>The small things add up. One more rep. One more walk. One more day choosing yourself. We’re here for every step of it.</p><a className="text-link" href="#contact">Start your journey <ArrowIcon diagonal /></a></div><div className="feature-foot"><span>CONSISTENCY OVER PERFECTION</span><span>✳</span></div></div></section>

      <section className="contact-section section-pad" id="contact" data-reveal><div className="section-label"><span className="tiny-square" /> YOUR NEXT MOVE <span className="label-number">04 / 04</span></div><div className="contact-grid"><div><span className="contact-kicker">IT STARTS WITH YOU.</span><h2>READY TO<br /><em>FEEL DIFFERENT?</em></h2></div><div className="contact-action"><p>There’s no perfect moment to begin. There’s just this one. Make it count.</p><a className="button button-dark" href="#programs">Explore the approach <ArrowIcon diagonal /></a></div></div></section>
    </main>
    <footer className="site-footer"><a className="footer-brand" href="#top">EVHYXLIFTS.</a><span>MOVE WELL. LIVE FULLY.</span><a href="#top">BACK TO TOP ↑</a></footer>
    {signInOpen && <div className="sign-in-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSignInOpen(false) }}>
      <section className="sign-in-modal" role="dialog" aria-modal="true" aria-labelledby="sign-in-title">
        <button className="modal-close" type="button" onClick={() => setSignInOpen(false)} aria-label="Close sign in dialog">×</button>
        <span className="modal-kicker"><span className="tiny-square" /> MEMBER ACCESS</span>
        <h2 id="sign-in-title">WELCOME<br /><em>BACK.</em></h2>
        <p>Sign in to keep your movement going.</p>
        <form className="sign-in-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="sign-in-email">Email address</label>
          <input id="sign-in-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" autoFocus required />
          <div className="password-label"><label htmlFor="sign-in-password">Password</label><a href="mailto:support@evhyxlifts.com?subject=Username%20reminder">Forgot username?</a></div>
          <input id="sign-in-password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
          <button className="button button-dark sign-in-submit" type="submit">Sign in <ArrowIcon diagonal /></button>
        </form>
      </section>
    </div>}
  </div>
}

export default App
