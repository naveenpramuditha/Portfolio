import React, { useState } from 'react'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../warpper'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { username, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    }

    client
      .create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError('Something went wrong. Please try again or email me directly.')
      })
  }

  return (
    <>
      <div className="section__head">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">
          Take a coffee <span>&amp; chat with me.</span>
        </h2>
      </div>

      <div className="app__footer-panel glass">
        <div className="app__footer-cards">
          <a href="mailto:naveenpramuditha2000@gmail.com" className="app__footer-card">
            <span><HiOutlineMail aria-hidden="true" /></span>
            <div>
              <small>Email</small>
              naveenpramuditha2000@gmail.com
            </div>
          </a>
          <a href="tel:+94763356990" className="app__footer-card">
            <span><HiOutlinePhone aria-hidden="true" /></span>
            <div>
              <small>Phone</small>
              +94 (076) 335 6990
            </div>
          </a>
          <p className="app__footer-note">
            Have a product that needs clearer screens? Send a short note and I
            will reply with next steps.
          </p>
        </div>

        {!isFormSubmitted ? (
          <form className="app__footer-form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input type="text" name="username" placeholder="Jane Perera" value={username} onChange={handleChangeInput} required />
            </label>
            <label>
              Your email
              <input type="email" name="email" placeholder="jane@company.com" value={email} onChange={handleChangeInput} required />
            </label>
            <label>
              Your message
              <textarea name="message" placeholder="Tell me about your project." value={message} onChange={handleChangeInput} required />
            </label>

            {error && <p className="app__footer-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </form>
        ) : (
          <div className="app__footer-thanks">
            <h3>Thank you for getting in touch!</h3>
            <p>I will get back to you soon.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
)
