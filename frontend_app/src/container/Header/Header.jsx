import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

import { images } from '../../constants'
import { AppWrap } from '../../warpper'

import './Header.scss'

const chips = [
  { icon: images.figma, label: 'Figma', className: 'chip--a' },
  { icon: images.flutter, label: 'Flutter', className: 'chip--b' },
  { icon: images.react, label: 'React', className: 'chip--c' },
]

const Header = () => (
  <div className="app__header">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="app__header-info"
    >
      <span className="app__header-hello glass chip">
        <i aria-hidden="true" />
        Hello, I am Naveen
      </span>

      <h1>
        Designed properly.
        <br />
        Built to be <span>used.</span>
      </h1>

      <p className="app__header-lead">
        I turn ideas into clear interfaces and strong visuals, then build them
        in React and Flutter.
      </p>

      <div className="app__header-tags">
        <span className="glass chip">UI/UX Engineer</span>
        <span className="glass chip">Graphic Designer</span>
      </div>

      <div className="app__header-cta">
        <a href="#contact" className="btn btn--primary">
          Take a coffee &amp; chat <HiArrowRight aria-hidden="true" />
        </a>
        <a href="#work" className="btn btn--ghost">
          View my work
        </a>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="app__header-visual"
    >
      <div className="app__header-photo glass">
        <span className="app__header-orb" aria-hidden="true" />
        <img src={images.profileHero} alt="Portrait of Naveen" />
      </div>

      {chips.map((chip) => (
        <div key={chip.label} className={`app__header-chip glass chip ${chip.className}`}>
          <img src={chip.icon} alt="" />
          {chip.label}
        </div>
      ))}
    </motion.div>
  </div>
)

export default AppWrap(Header, 'home')
