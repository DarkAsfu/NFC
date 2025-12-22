'use client'

import { Sparkles, Layers, Cpu, ArrowRight, TrendingUp, Code2, Server, Lock, Zap, Globe2, Smartphone, CreditCard, Radio, QrCode, Users, FileText, Share2, Mail, Phone, Linkedin, Twitter, Github, Instagram, Facebook, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// NFC Card Tap Animation Component
function NFCTapAnimation() {
  const [isTapped, setIsTapped] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const cardControls = useAnimation()
  const phoneControls = useAnimation()
  const profileControls = useAnimation()
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView && isMounted) {
      const sequence = async () => {
        // Initial delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Card moves toward phone top edge (where NFC chip is)
        await cardControls.start({
          x: 0,
          y: -20,
          scale: 0.9,
          rotate: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        })
        
        // Card taps on phone top (slight bounce)
        await cardControls.start({
          x: 0,
          y: -30,
          scale: 0.85,
          rotate: 0,
          transition: { duration: 0.2 }
        })
        
        await cardControls.start({
          x: 0,
          y: -20,
          scale: 0.9,
          rotate: 0,
          transition: { duration: 0.2 }
        })
        
        // Phone lights up
        await phoneControls.start({
          scale: 1.05,
          transition: { duration: 0.3 }
        })
        
        // Profile appears
        profileControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        })
        
        // Phone returns to normal
        phoneControls.start({
          scale: 1,
          transition: { duration: 0.3, delay: 0.2 }
        })
        
        // Card returns to original position (top right, outside phone)
        await new Promise(resolve => setTimeout(resolve, 2000))
        cardControls.start({
          x: 180,
          y: -20,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.6, ease: "easeInOut" }
        })
        
        // Reset profile
        profileControls.start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.3 }
        })
      }
      
      // Loop the animation
      const interval = setInterval(() => {
        sequence()
      }, 5000)
      
      // Initial run
      sequence()
      
      return () => clearInterval(interval)
    }
  }, [inView, isMounted, cardControls, phoneControls, profileControls])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] flex items-center justify-center">
      {/* Phone - Using Dashboard Preview Frame */}
      <motion.div
        animate={phoneControls}
        className="relative z-10"
      >
        <div className='rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 overflow-hidden shadow-2xl' style={{ width: '375px', maxWidth: '100%', height: '750px', transform: 'scale(0.65)', transformOrigin: 'top center' }}>
          {/* Scrollable Content Area */}
          <div className='bg-black overflow-y-auto scrollbar-hide relative' style={{ height: '750px' }}>
            {/* Default Screen (when profile not showing) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{
                opacity: [1, 0, 0, 1]
              }}
              transition={{
                duration: 5,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0
              }}
              className="absolute inset-0 h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-6 flex items-center justify-center">
                  <Smartphone className="h-12 w-12 text-gray-600" />
                </div>
                <div className="text-gray-600 text-base">Tap NFC card</div>
              </div>
            </motion.div>
            
            {/* Profile Content - Modern Theme */}
            <motion.div
              animate={profileControls}
              initial={{ opacity: 0, y: 20 }}
              className="absolute inset-0 w-full"
            >
              <div className="h-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-full">
                {/* Header with Gradient */}
                <div className="relative h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-visible">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-center">
                    <div className="relative w-24 h-24 rounded-full bg-white border-4 border-white shadow-2xl mx-auto overflow-hidden ring-4 ring-purple-500/20">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
                        alt="Profile"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="px-5 pt-24 pb-6">
                  {/* Name and Title */}
                  <div className="text-center mb-6">
                    <h3 className="text-white font-bold text-2xl mb-1.5">John Doe</h3>
                    <p className="text-gray-300 text-sm font-medium">Software Engineer</p>
                    <p className="text-gray-500 text-xs mt-1">San Francisco, CA</p>
                  </div>
                  
                  {/* Contact Info - Modern Cards */}
                  <div className="space-y-2.5 mb-5">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center border border-purple-500/40 shrink-0 shadow-md">
                          <Mail className="w-5 h-5 text-purple-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-400 text-[10px] mb-0.5 font-medium uppercase tracking-wide">Email</div>
                          <div className="text-white text-sm font-semibold truncate">john@example.com</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center border border-blue-500/40 shrink-0 shadow-md">
                          <Phone className="w-5 h-5 text-blue-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-400 text-[10px] mb-0.5 font-medium uppercase tracking-wide">Phone</div>
                          <div className="text-white text-sm font-semibold truncate">+1 (234) 567-8900</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links - Modern Grid */}
                  <div className="mb-5">
                    <div className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-wider text-center">Connect</div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { icon: Linkedin, color: 'from-blue-600 to-blue-700', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
                        { icon: Twitter, color: 'from-sky-500 to-sky-600', bg: 'bg-sky-500/20', border: 'border-sky-500/30' },
                        { icon: Github, color: 'from-gray-700 to-gray-800', bg: 'bg-gray-700/20', border: 'border-gray-700/30' },
                        { icon: Instagram, color: 'from-pink-500 to-purple-600', bg: 'bg-pink-500/20', border: 'border-pink-500/30' },
                        { icon: Facebook, color: 'from-blue-600 to-blue-700', bg: 'bg-blue-600/20', border: 'border-blue-600/30' },
                        { icon: Globe, color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-500/20', border: 'border-purple-500/30' }
                      ].map((social, i) => {
                        const Icon = social.icon
                        return (
                          <div key={i} className={`aspect-square ${social.bg} backdrop-blur-sm border ${social.border} rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all shadow-md cursor-pointer`}>
                            <Icon className={`w-5 h-5 text-white`} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full mt-3 py-3.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 rounded-xl text-white font-bold text-sm hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2">
                    <span>Save Contact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* NFC Card - Professional Design with NFC Logo and QR Code */}
      <motion.div
        animate={cardControls}
        initial={{ x: 180, y: -20, scale: 1, rotate: 0 }}
        className="absolute left-1/2 top-0 z-20"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="relative w-72 h-44 bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Card Content - Split Layout */}
          <div className="relative h-full flex items-center gap-4 p-4 z-10">
            {/* Left Side - NFC Logo Box */}
            <div className="w-24 h-24 bg-black rounded-lg flex flex-col items-center justify-center shrink-0">
              {/* NFC Waves Icon */}
              <div className="flex flex-col items-center gap-1 mb-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              {/* NFC Text */}
              <div className="text-white text-[8px] font-semibold tracking-wide mt-1">NFC</div>
            </div>
            
            {/* Right Side - User Info */}
            <div className="flex-1 flex flex-col justify-center h-full">
              <div className="space-y-0.5">
                {/* Name */}
                <div className="text-gray-900 text-lg font-bold leading-tight">John Doe</div>
                {/* Designation */}
                <div className="text-gray-600 text-xs font-medium leading-tight">Software Engineer</div>
                {/* Email */}
                <div className="text-gray-700 text-[10px] font-normal leading-tight mt-1">john@example.com</div>
              </div>
            </div>
          </div>
          
          {/* Tap Glow Effect */}
          {isTapped && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 rounded-xl bg-purple-500/40"
            />
          )}
        </div>
      </motion.div>
      
      {/* Connection Line (appears when tapping) */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        initial={{ opacity: 0 }}
      >
        <motion.line
          x1="140"
          y1="300"
          x2="240"
          y2="300"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeDasharray="8,8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-bG min-h-screen pt-28 md:pt-24 pb-16 overflow-hidden">
      {/* Hero - Asymmetric Layout */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left mt-0"
            >
              <div className="inline-block mb-6">
                <span className="text-sm font-mono text-purple-400 tracking-wider uppercase">Since 2024</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                We build
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
                  digital bridges
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                Transforming how professionals connect through innovative NFC technology. 
                No more lost business cards, no more outdated contact info.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <NFCTapAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story - Split Layout */}
      <section className="pt-8 pb-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left - Content */}
            <div className="flex-1 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Brand Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Started with a
                  <br />
                  simple question
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  Why are we still exchanging paper cards in 2024? That question led us to build Widely—a platform 
                  that makes networking instant, digital, and permanent.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We're not just selling NFC cards. We're reimagining how professionals connect, share, and grow 
                  their networks. Every feature we build, every card we ship, is designed with one goal: make 
                  networking effortless.
                </p>
              </div>
              
              {/* Stats - Horizontal */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">10K+</div>
                  <div className="text-sm text-gray-500">Active users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-gray-500">Cards shipped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right - Visual Element */}
            <div className="lg:w-96 shrink-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Growing fast</div>
                        <div className="text-sm text-gray-500">Month over month</div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-400">
                      We're building the future of professional networking, one tap at a time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Ecosystem - Asymmetric Layout */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Product Ecosystem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Built for professionals
              <br />
              <span className="text-gray-400">who need more</span>
            </h2>
          </div>
          
          {/* Asymmetric Feature Layout */}
          <div className="space-y-8">
            {/* Row 1 - Large Left, Small Right */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">NFC Cards</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    Premium physical cards that instantly share your digital profile. Tap to connect, no apps needed.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>• Instant sharing</span>
                    <span>• No batteries</span>
                    <span>• Works with any phone</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">Multiple Profiles</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Create separate profiles for different roles, industries, or purposes.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Row 2 - Small Left, Large Right */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">Resumes & CVs</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Professional templates tailored for your industry and role.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-2 group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-2xl font-bold text-white mb-3">Share Everywhere</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    QR codes, direct links, social media—share your profile however works best for you.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>• QR codes</span>
                    <span>• Custom links</span>
                    <span>• Social integration</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Row 3 - Three Equal Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Layers, title: 'Multiple Themes', desc: 'Choose from professional themes that match your style', color: 'purple' },
                { icon: TrendingUp, title: 'Analytics', desc: 'See who viewed your profile and when', color: 'blue' },
                { icon: Sparkles, title: 'Customization', desc: 'Make it yours with colors, layouts, and branding', color: 'purple' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group"
                >
                  <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation - Feature Focus */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-900/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-blue-900/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500"></div>
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Technology & Innovation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The tech behind
              <br />
              <span className="text-gray-400">every connection</span>
            </h2>
          </div>
          
          {/* Main Feature - NFC Technology */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-[#eee0ff08] border border-white/10 rounded-3xl p-10 md:p-12 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0">
                    <Cpu className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-4">NFC Technology</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      We use industry-leading NFC chips with enhanced read/write capabilities and extended range. 
                      Our cards work with any NFC-enabled device—no apps, no setup, just tap and connect.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-sm">
                        <div className="text-white font-semibold mb-1">5cm Range</div>
                        <div className="text-gray-500">Extended tap distance</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-white font-semibold mb-1">ISO 14443</div>
                        <div className="text-gray-500">Industry standard</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-white font-semibold mb-1">10+ Years</div>
                        <div className="text-gray-500">Card lifespan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Secondary Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Server, 
                title: 'Cloud Infrastructure', 
                desc: 'Global CDN with 99.9% uptime guarantee and sub-100ms response times worldwide.',
                stats: ['99.9% Uptime', 'Global CDN', '<100ms Latency']
              },
              { 
                icon: Lock, 
                title: 'Security First', 
                desc: 'End-to-end encryption, secure authentication, and comprehensive privacy controls.',
                stats: ['E2E Encryption', 'GDPR Compliant', 'SOC 2 Ready']
              },
              { 
                icon: Code2, 
                title: 'Developer API', 
                desc: 'RESTful APIs, webhooks, and SDKs for seamless integration with your tools.',
                stats: ['REST API', 'Webhooks', 'SDKs Available']
              }
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group"
              >
                <div className="relative h-full bg-[#eee0ff08] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{tech.desc}</p>
                  <div className="space-y-2">
                    {tech.stats.map((stat, statIdx) => (
                      <div key={statIdx} className="text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></div>
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
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
                Ready to get started?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of professionals using Widely to transform their networking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white w-full sm:w-auto">
                    Explore products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto">
                    Sign up free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
