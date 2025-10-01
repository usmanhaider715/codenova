import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Target, 
  Users, 
  Lightbulb, 
  Shield, 
  Award, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations and drive measurable results.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and work closely with our clients to understand their vision and goals.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of the curve by embracing cutting-edge technologies and creative problem-solving approaches.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'We build robust, scalable solutions that stand the test of time and provide consistent performance.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Projects Delivered', icon: Award },
    { number: '100%', label: 'Client Satisfaction', icon: CheckCircle },
    { number: '24/7', label: 'Support Available', icon: Clock },
    { number: '5+', label: 'Years Experience', icon: Award }
  ]

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Lead Developer',
      image: '/api/placeholder/200/200',
      description: 'Full-stack developer with 8+ years of experience in MERN stack and cloud architecture.'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Cloud Architect',
      image: '/api/placeholder/200/200',
      description: 'Cloud solutions expert specializing in AWS, Azure, and DevOps practices.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Mobile Development Lead',
      image: '/api/placeholder/200/200',
      description: 'Mobile app specialist with expertise in React Native, Flutter, and native development.'
    },
    {
      name: 'Emily Davis',
      role: 'Creative Director',
      image: '/api/placeholder/200/200',
      description: 'Video editing and creative media expert with a passion for visual storytelling.'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-nova-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6">
              About CodeNova
            </h1>
            <p className="text-xl text-nova-text-light max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of developers, designers, and innovators dedicated to 
              creating exceptional digital experiences that drive your business forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-nova-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-nova-text-light mb-6 leading-relaxed">
                To empower businesses with cutting-edge technology solutions that transform 
                their digital presence and drive sustainable growth. We believe in the power 
                of innovation to solve complex challenges and create meaningful impact.
              </p>
              <p className="text-lg text-nova-text-light mb-8 leading-relaxed">
                Our mission is to be the trusted technology partner that helps companies 
                navigate the digital landscape with confidence, delivering solutions that 
                not only meet today's needs but anticipate tomorrow's opportunities.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-effect rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-nova-blue to-nova-purple flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gradient mb-2">{stat.number}</div>
                      <div className="text-sm text-nova-text-light">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-nova-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
              Our Values
            </h2>
            <p className="text-lg text-nova-text-light max-w-3xl mx-auto">
              These core values guide everything we do and shape how we work with our clients and each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl p-8 hover-lift"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-nova-blue to-nova-purple flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-nova-text mb-4">{value.title}</h3>
                <p className="text-nova-text-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-nova-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-nova-text-light max-w-3xl mx-auto">
              The talented individuals behind CodeNova's success, each bringing unique expertise and passion to every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl p-6 hover-lift text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-nova-blue to-nova-purple flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-nova-text mb-2">{member.name}</h3>
                <p className="text-nova-blue font-medium mb-3">{member.role}</p>
                <p className="text-sm text-nova-text-light leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-nova-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-nova-text-light mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how our team can help bring your vision to life. 
                We're excited to learn about your goals and create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Start Your Project
                  </motion.button>
                </Link>
                <a 
                  href="https://wa.me/923197331383" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Schedule a Call
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
