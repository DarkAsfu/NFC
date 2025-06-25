import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import CTitle from '../custom/CTitle'
import { CreditCard, Scan, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    className='flex items-start p-6 rounded-xl bg-gradient-to-b from-[#0F0A31]/50 to-[#1E0B4B]/30 border border-white/10 backdrop-blur-sm relative overflow-hidden'
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-xl'></div>
    <div className='mr-4 p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg text-white'>
      {icon}
    </div>
    <div>
      <h3 className='text-lg font-semibold text-white mb-2'>{title}</h3>
      <p className='text-[#EEE0FF]/80 text-sm'>{description}</p>
    </div>
    <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500'></div>
  </motion.div>
)

export function VideoPlayer () {
  const features = [
    {
      icon: <CreditCard className='w-5 h-5' strokeWidth={1.5} />,
      title: 'Get Your Digital Card',
      description:
        'Create your professional digital card in minutes with our platform.'
    },
    {
      icon: <Scan className='w-5 h-5' strokeWidth={1.5} />,
      title: 'Tap or Scan to Connect',
      description: 'Share contacts instantly via QR code or NFC tap technology.'
    },
    {
      icon: <Settings className='w-5 h-5' strokeWidth={1.5} />,
      title: 'Update Anytime',
      description: 'Keep your information current with real-time updates.'
    }
  ]

  return (
    <div className='bg-[#010313]'>
      <div className='max-w-7xl mx-auto py-24 px-4 md:px-0 rounded-lg relative'>
        {/* Background elements */}
        <div className='absolute inset-0 overflow-hidden -z-10'>
          <div className='absolute top-1/4 left-1/4 h-[200px] w-[200px] rounded-full bg-purple-900/20 blur-3xl'></div>
          <div className='absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-900/20 blur-3xl'></div>
        </div>

        <CTitle title={'How It Works'} className='' />

        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 mt-10'>
          <div className='relative'>
            <div className='absolute -inset-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-lg z-0'></div>
            <div className='relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F0A31]/50 to-[#1E0B4B]/50 backdrop-blur-sm'>
              <HeroVideoDialog
                className='block dark:hidden'
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb'
                thumbnailSrc='https://startup-template-sage.vercel.app/hero-light.png'
                thumbnailAlt='Hero Video'
              />
              <HeroVideoDialog
                className='hidden dark:block'
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb'
                thumbnailSrc='https://startup-template-sage.vercel.app/hero-dark.png'
                thumbnailAlt='Hero Video'
              />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-4'>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  index={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
