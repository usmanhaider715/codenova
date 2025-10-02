import React from 'react'
import { motion } from 'framer-motion'
import Services from '../components/Services'
import SEO from '../components/SEO'

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <SEO 
        title="Our Services"
        description="Professional software development services including MERN stack development, cloud solutions, mobile app development, and video editing. Expert team delivering cutting-edge solutions."
        keywords="software development services, MERN stack development, React development, Node.js development, MongoDB, cloud solutions, AWS, Azure, mobile app development, iOS, Android, video editing, web development Pakistan"
        url="/services"
      />
      <Services />
    </div>
  )
}

export default ServicesPage
