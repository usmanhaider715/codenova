import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Contact', path: '/contact' }
    ],
    services: [
      { name: 'MERN Development', path: '/services' },
      { name: 'Cloud Solutions', path: '/services' },
      { name: 'Mobile Development', path: '/services' },
      { name: 'Video Editing', path: '/services' }
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Documentation', path: '#' },
      { name: 'API Reference', path: '#' },
      { name: 'Status Page', path: '#' }
    ]
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]

  return (
    <footer className="bg-nova-darker border-t border-nova-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="flex items-center space-x-2 mb-6">
                  <Code2 className="h-8 w-8 text-nova-blue" />
                  <span className="text-2xl font-bold text-gradient">CodeNova</span>
                </Link>
                
                <p className="text-nova-text-light mb-6 max-w-md leading-relaxed">
                  We're a passionate team of developers, designers, and innovators 
                  dedicated to creating exceptional digital experiences that drive 
                  your business forward.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-nova-text-light">
                    <Mail className="h-4 w-4 text-nova-blue" />
                    <span>usmanhaiderkhokhar715@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-nova-text-light">
                    <Phone className="h-4 w-4 text-nova-blue" />
                    <span>+92 319 7331383</span>
                  </div>
                  <div className="flex items-center space-x-3 text-nova-text-light">
                    <MapPin className="h-4 w-4 text-nova-blue" />
                    <span>Pakistan</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Company Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-nova-text mb-6">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-nova-text-light hover:text-nova-blue transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-nova-text mb-6">Services</h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-nova-text-light hover:text-nova-blue transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-nova-text mb-6">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-nova-text-light hover:text-nova-blue transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-nova-gray">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-nova-text-light text-sm"
            >
              © 2024 CodeNova. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center text-nova-text-light hover:text-nova-blue hover:bg-nova-blue/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-nova-text-light hover:text-nova-blue transition-colors duration-300"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
