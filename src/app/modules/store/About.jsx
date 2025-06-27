import React from 'react'
import CButton from '../custom/CButton'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/provider/AuthProvider'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

const About = () => {
  const {user} = useAuth();
  return (
    <div className='bg-[#010313] relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      <div className='max-w-7xl py-16 mx-auto md:grid grid-cols-2 px-4 md:px-8 items-center gap-12 relative z-10'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">Next Generation NFC</span>
          </div>
          
          <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent leading-tight'>
            NFC Business Card With <span className="text-purple-300">Unlimited Possibilities</span>
          </h2>
          
          <p className='text-[#EEE0FF]/80 text-base md:text-lg leading-relaxed mt-6 space-y-4'>
            <span className="block">
              Tago NFC business card system transfers your contact information from your card, sticker, mobile ring, virtual business cards, food label, pet tag, nail to any smartphone.
            </span>
            <span className="block">
              Next generation NFC business card that's always up to date. Update your info anytime, and your contacts always have the latest version!
            </span>
            <span className="block">
              All it takes is to touch someone's smartphone with your card and let them click - "Save"! Totally custom made, a personal fit for you!
            </span>
          </p>
          
          <div className='mt-8'>
          <CButton 
              href='/order-now' 
              label="Order Now"
              className="group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='mt-10 md:mt-0 relative'
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-lg z-0"></div>
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F0A31]/50 to-[#1E0B4B]/50 backdrop-blur-sm">
            <Image 
              width={900} 
              alt='NFC Business Card' 
              height={500} 
              src='/nfc.webp'
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              quality={100}
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About