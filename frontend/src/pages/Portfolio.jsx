import React from 'react'
import { motion } from 'framer-motion'
import Portfolio from '../components/Portfolio'
import SEO from '../components/SEO'

const PortfolioPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <SEO 
        title="Our Portfolio"
        description="Explore CodeNova's portfolio of successful projects including web applications, mobile apps, cloud solutions, and video editing work. See our expertise in action."
        keywords="portfolio, web development projects, mobile app projects, cloud solutions projects, video editing projects, MERN stack projects, React projects, Node.js projects, Pakistan software development"
        url="/portfolio"
      />
      <Portfolio />
    </div>
  )
}

export default PortfolioPage
