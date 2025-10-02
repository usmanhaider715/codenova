import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Professional Software Development Agency"
        description="CodeNova - Leading software development agency specializing in MERN stack development, cloud solutions, mobile app development, and video editing. We build exceptional digital experiences with cutting-edge technology."
        keywords="software development agency, MERN stack development, React development, Node.js development, MongoDB, cloud solutions, AWS, Azure, mobile app development, iOS, Android, video editing, web development Pakistan, Lahore, Karachi, Islamabad"
        url="/"
      />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
    </div>
  )
}

export default Home
