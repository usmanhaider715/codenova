import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Eye, Code2, Smartphone, Cloud } from 'lucide-react'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Code2
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      description: 'Secure mobile banking application with biometric authentication, transaction history, and real-time notifications.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Node.js', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Smartphone
    },
    {
      id: 3,
      title: 'Cloud Infrastructure',
      category: 'cloud',
      description: 'Scalable cloud infrastructure setup with automated deployment, monitoring, and disaster recovery.',
      image: '/api/placeholder/400/300',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Cloud
    },
    {
      id: 4,
      title: 'SaaS Dashboard',
      category: 'web',
      description: 'Analytics dashboard for SaaS companies with real-time data visualization and custom reporting.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Code2
    },
    {
      id: 5,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'Comprehensive fitness tracking app with workout plans, progress tracking, and social features.',
      image: '/api/placeholder/400/300',
      technologies: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Smartphone
    },
    {
      id: 6,
      title: 'DevOps Pipeline',
      category: 'cloud',
      description: 'Complete CI/CD pipeline with automated testing, deployment, and monitoring for microservices architecture.',
      image: '/api/placeholder/400/300',
      technologies: ['Jenkins', 'Docker', 'AWS', 'Prometheus'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Cloud
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'cloud', label: 'Cloud Solutions' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section className="py-20 bg-nova-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg text-nova-text-light max-w-3xl mx-auto">
            Explore our successful projects and see how we've helped businesses 
            transform their digital presence with innovative solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-nova-blue to-nova-purple text-white'
                  : 'glass-effect text-nova-text-light hover:text-nova-blue hover:bg-nova-gray-light'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="glass-effect rounded-2xl overflow-hidden hover-lift transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-nova-gray to-nova-gray-light flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-nova-blue opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-nova-dark/80 to-transparent" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-nova-blue text-white hover:bg-nova-purple transition-colors duration-300"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-nova-gray-light text-nova-text hover:bg-nova-blue hover:text-white transition-colors duration-300"
                        >
                          <Github className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-nova-text mb-3 group-hover:text-nova-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-nova-text-light mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-nova-gray-light text-nova-blue rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 btn-secondary text-sm py-2"
                      >
                        <Eye className="h-4 w-4 mr-2 inline" />
                        View Project
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-nova-text mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-nova-text-light mb-6">
              Let's create something amazing together. Our team is ready to bring your vision to life.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your Project
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
