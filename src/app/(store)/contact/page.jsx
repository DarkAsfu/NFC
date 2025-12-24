'use client'

import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@widely.com',
      description: 'Send us an email anytime',
      color: 'from-purple-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm',
      color: 'from-purple-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Visit us at our headquarters',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '< 24 hours',
      description: 'We typically reply within a day',
      color: 'from-blue-600 to-purple-600'
    }
  ]

  const socialLinks = [
    { icon: Globe, label: 'Website', href: 'https://widely.com' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@widely.com' }
  ]

  return (
    <div className="bg-bG min-h-screen pt-28 md:pt-24 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-mono text-purple-400 tracking-wider uppercase">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Let's start a
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
                conversation
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-white font-semibold mb-2">{method.value}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/5 blur-3xl"></div>
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Send us a message</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  We're here
                  <br />
                  <span className="text-gray-400">to help</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Right - Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl"></div>
                <div className="relative bg-[#eee0ff08] border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-6">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Why contact us?</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Whether you have questions about our products, need technical support, or want to discuss a partnership, we're here to help.
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Product Questions</h4>
                        <p className="text-sm text-gray-500">Learn about NFC cards, features, and pricing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Technical Support</h4>
                        <p className="text-sm text-gray-500">Get help with setup, troubleshooting, or integration</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Partnerships</h4>
                        <p className="text-sm text-gray-500">Explore business opportunities and collaborations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Bulk Orders</h4>
                        <p className="text-sm text-gray-500">Organizations needing multiple cards for teams</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">General Inquiries</h4>
                        <p className="text-sm text-gray-500">Anything else? We're all ears</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-500 mb-4">Follow us</p>
                    <div className="flex gap-4">
                      {socialLinks.map((social, idx) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={idx}
                            href={social.href}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                            aria-label={social.label}
                          >
                            <Icon className="h-5 w-5 text-gray-400" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-900/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-blue-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Frequently Asked</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Common questions
              <br />
              <span className="text-gray-400">answered</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'How do NFC cards work?',
                answer: 'NFC cards use near-field communication technology. When you tap the card to an NFC-enabled phone, it instantly shares your digital profile without requiring any apps or setup.'
              },
              {
                question: 'What information can I share?',
                answer: 'You can share contact details, social media links, portfolio, resume, and any other information you want to include in your digital profile. Customize it to match your needs.'
              },
              {
                question: 'Do I need an app to use NFC cards?',
                answer: 'No! That\'s the beauty of NFC technology. Recipients don\'t need any app—they just tap the card to their phone and your profile opens instantly in their browser.'
              },
              {
                question: 'How long do NFC cards last?',
                answer: 'Our NFC cards are designed to last 10+ years with normal use. They don\'t require batteries and are built to withstand everyday wear and tear.'
              },
              {
                question: 'Can I update my profile after receiving the card?',
                answer: 'Absolutely! Your digital profile is cloud-based, so you can update it anytime. Changes are instantly reflected when someone taps your card.'
              },
              {
                question: 'What if I lose my card?',
                answer: 'Contact our support team immediately. We can help you disable the lost card and issue a replacement. Your profile remains secure and accessible.'
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-[#eee0ff08] border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Can't find what you're looking for? Our support team is ready to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white w-full sm:w-auto">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto">
                  View Documentation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

