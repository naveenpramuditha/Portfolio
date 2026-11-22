import React, { useState, useEffect } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../warpper'
import { urlFor, client } from '../../client'

import './Work.scss'

const FILTERS = ['UI/UX', 'Web App', 'Graphic Design', 'React JS', 'All']

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [works, setWorks] = useState([])

  useEffect(() => {
    const query = '*[_type == "works"]'

    client.fetch(query).then((data) => {
      setWorks(data)
    })
  }, [])

  const visible =
    activeFilter === 'All'
      ? works
      : works.filter((work) => Array.isArray(work?.tags) && work.tags.includes(activeFilter))

  return (
    <>
      <div className="section__head section__head--split">
        <div>
          <p className="section__eyebrow">My work</p>
          <h2 className="section__title">
            My creative <span>portfolio.</span>
          </h2>
        </div>

        <div className="app__work-filter" role="group" aria-label="Filter projects">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setActiveFilter(item)}
              aria-pressed={activeFilter === item}
              className={`app__work-filter-item ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="app__work-portfolio">
        {visible.map((work) => (
          <motion.article
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="app__work-item glass"
            key={work._id || work.title}
          >
            <div className="app__work-img">
              <img src={urlFor(work.imgUrl)} alt={work.title} loading="lazy" />
            </div>

            <div className="app__work-content">
              <span className="app__work-tag">{work?.tags?.[0] || 'Project'}</span>
              <h3>{work.title}</h3>
              <p>{work.description}</p>

              <div className="app__work-links">
                {work.projectLink && (
                  <a href={work.projectLink} target="_blank" rel="noopener noreferrer">
                    <AiFillEye aria-hidden="true" /> View project
                  </a>
                )}
                {work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noopener noreferrer">
                    <AiFillGithub aria-hidden="true" /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
)
