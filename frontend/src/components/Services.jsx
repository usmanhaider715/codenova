import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Code2, 
  Cloud, 
  Smartphone, 
  Video, 
  Database, 
  Server,
  Globe,
  Zap
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: 'MERN Development',
      description: 'Full-stack web applications using MongoDB, Express.js, React, and Node.js for scalable and robust solutions.',
      features: ['RESTful APIs', 'Real-time Applications', 'Database Design', 'Authentication Systems'],
      color: 'from-nova-blue to-nova-purple'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Comprehensive cloud infrastructure and deployment solutions across AWS, Azure, and Google Cloud Platform.',
      features: ['AWS Services', 'Azure Integration', 'GCP Solutions', 'DevOps & CI/CD'],
      color: 'from-nova-purple to-nova-pink'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with modern frameworks and tools.',
      features: ['React Native', 'Flutter', 'iOS Development', 'Android Development'],
      color: 'from-nova-pink to-nova-blue'
    },
    {
      icon: Video,
      title: 'Video Editing',
      description: 'Professional video editing services for reels, advertisements, and creative media content.',
      features: ['Social Media Reels', 'Marketing Videos', 'Motion Graphics', 'Post-Production'],
      color: 'from-nova-blue to-nova-purple'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 bg-nova-darker">
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
            Our Services
          </h2>
          <p className="text-lg text-nova-text-light max-w-3xl mx-auto">
            We offer comprehensive digital solutions tailored to your business needs, 
            from web development to cloud infrastructure and creative media.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="glass-effect rounded-2xl p-8 h-full hover-lift transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-nova-text mb-4 group-hover:text-nova-blue transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-nova-text-light mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-nova-text-light">
                      <Zap className="h-4 w-4 text-nova-blue mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
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
              Ready to Transform Your Digital Presence?
            </h3>
            <p className="text-nova-text-light mb-6">
              Let's discuss your project and create something extraordinary together.
            </p>
            <a 
              href="https://wa.me/923197331383" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Get a Free Quote
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
