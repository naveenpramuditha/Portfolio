import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../warpper'
import { urlFor, client } from '../../client'
import './Skills.scss'

const Skills = () => {
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"] | order(year desc)'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(query).then((data) => {
      setExperiences(data)
    })

    client.fetch(skillsQuery).then((data) => {
      setSkills(data)
    })
  }, [])

  return (
    <>
      <div className="section__head">
        <p className="section__eyebrow">Skills &amp; experiences</p>
        <h2 className="section__title">
          What I know,
          <br />
          where I have <span>worked.</span>
        </h2>
      </div>

      <div className="app__skills-container">
        <div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="app__skills-item glass"
              key={skill.name}
            >
              <div className="app__skills-icon" style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt="" />
              </div>
              <p>{skill.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <div className="app__skills-exp-item glass" key={experience.year}>
              <p className="app__skills-exp-year">{experience.year}</p>

              <div className="app__skills-exp-works">
                {(experience.works || []).map((work) => (
                  <div className="app__skills-exp-work" key={work.name + work.company}>
                    <h4>{work.name}</h4>
                    <span>{work.company}</span>
                    {work.desc && <p>{work.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
)
