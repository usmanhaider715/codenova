import React from 'react'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import SEO from '../components/SEO'

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <SEO 
        title="Contact Us"
        description="Get in touch with CodeNova for your software development needs. Contact our expert team for MERN stack development, cloud solutions, mobile apps, and video editing services."
        keywords="contact codenova, software development contact, web development contact, mobile app development contact, cloud solutions contact, video editing contact, Pakistan developers contact"
        url="/contact"
      />
      <Contact />
    </div>
  )
}

export default ContactPage
