import React, { useEffect, useState } from 'react'

import { About, Footer, Header, Skills, Testimonial, Work } from './container'
import { Navbar } from './components'
import './App.scss'

const THEME_KEY = 'theme'

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch (e) {
    // storage can be blocked; fall through to the default
  }
  return 'dark'
}

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#050814' : '#eaf0ff')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="app__content">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Header />
          <About />
          <Work />
          <Skills />
          <Testimonial />
          <Footer />
        </main>

        <div className="app__footer-bar">
          <div>
            <span>© {new Date().getFullYear()} Naveen. All rights reserved.</span>
            <a href="#home">Back to top</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
