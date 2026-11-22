import React, { useState, useEffect } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../warpper'
import { urlFor, client } from '../../client'
import './Testimonial.scss'

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const query = '*[_type == "testimonials"]'
    const brandsQuery = '*[_type == "brands"]'

    client.fetch(query).then((data) => {
      setTestimonials(data)
    })

    client.fetch(brandsQuery).then((data) => {
      setBrands(data)
    })
  }, [])

  const count = testimonials.length
  const current = testimonials[currentIndex]
  const prev = () => setCurrentIndex((i) => (i === 0 ? count - 1 : i - 1))
  const next = () => setCurrentIndex((i) => (i === count - 1 ? 0 : i + 1))

  return (
    <>
      {count > 0 && current && (
        <div className="app__testimonial-item glass">
          <img src={urlFor(current.imgurl)} alt={current.name} />

          <div className="app__testimonial-content">
            <blockquote>{current.feedback}</blockquote>
            <div>
              <h4>{current.name}</h4>
              <h5>{current.company}</h5>
            </div>
          </div>

          {count > 1 && (
            <div className="app__testimonial-btns">
              <button type="button" onClick={prev} aria-label="Previous testimonial">
                <HiChevronLeft />
              </button>
              <button type="button" onClick={next} aria-label="Next testimonial" className="is-primary">
                <HiChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

      {brands.length > 0 && (
        <div className="app__testimonial-brands">
          <p>Trusted by</p>
          <div className="app__testimonial-track">
            {[...brands, ...brands].map((brand, i) => (
              <div
                className="app__testimonial-brand glass"
                key={`${brand._id}-${i}`}
                aria-hidden={i >= brands.length}
              >
                <img src={urlFor(brand.imgUrl)} alt={i < brands.length ? brand.name : ''} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
)
