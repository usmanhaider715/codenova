import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'CodeNova transformed our entire digital infrastructure. Their MERN stack expertise and cloud solutions helped us scale from startup to enterprise level. The team\'s dedication and technical excellence exceeded all our expectations.',
      project: 'E-commerce Platform & Cloud Migration'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Founder, FitnessApp',
      company: 'FitnessApp',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'Working with CodeNova was a game-changer for our mobile app. They delivered a beautiful, performant React Native application that our users love. Their attention to detail and user experience design is outstanding.',
      project: 'Mobile Fitness Tracking App'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Director, CreativeStudio',
      company: 'CreativeStudio',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The video editing services provided by CodeNova elevated our brand presence across all platforms. Their creative approach and technical skills helped us create compelling content that drives engagement and conversions.',
      project: 'Brand Video Campaign & Social Media Content'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'CTO, DataCorp',
      company: 'DataCorp',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'CodeNova\'s cloud infrastructure solutions revolutionized our data processing capabilities. Their AWS expertise and DevOps practices ensured seamless scalability and 99.9% uptime. Highly recommended for enterprise solutions.',
      project: 'Cloud Infrastructure & DevOps Pipeline'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-nova-text-light max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients 
            have to say about working with CodeNova.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-2xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <Quote className="h-12 w-12 text-nova-blue opacity-50" />
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-nova-text-light leading-relaxed mb-8 max-w-3xl mx-auto">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-nova-blue to-nova-purple flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Client Details */}
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-nova-text">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-nova-blue font-medium">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-nova-text-light">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full glass-effect hover:bg-nova-blue hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full glass-effect hover:bg-nova-blue hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-nova-blue scale-125'
                    : 'bg-nova-text-light hover:bg-nova-blue'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: '50+', label: 'Happy Clients' },
            { number: '100+', label: 'Projects Completed' },
            { number: '5.0', label: 'Average Rating' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-nova-text-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
