import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../warpper'
import { client, urlFor } from '../../client'
import './About.scss'

const About = () => {
  const [abouts, setAbouts] = useState([])

  useEffect(() => {
    const query = '*[_type == "abouts"]'

    client.fetch(query).then((data) => {
      setAbouts(data)
    })
  }, [])

  return (
    <>
      <div className="section__head">
        <p className="section__eyebrow">About</p>
        <h2 className="section__title">
          Transforming ideas into <span>intuitive experiences</span> and{' '}
          <span>stunning visuals.</span>
        </h2>
      </div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="app__profile-item glass"
            key={about.title + index}
          >
            <div className="app__profile-icon">
              <img src={urlFor(about.imgUrl)} alt="" />
            </div>
            <h3>{about.title}</h3>
            <p>{about.description}</p>
          </motion.article>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
)
