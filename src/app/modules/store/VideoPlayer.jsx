import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import CTitle from '../custom/CTitle';
import { CreditCard, Scan, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="mr-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

export function VideoPlayer() {
  const features = [
    {
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
      title: "Get Your Digital Card",
      description: "Create your professional digital card in minutes with our platform."
    },
    {
      icon: <Scan className="w-5 h-5" strokeWidth={1.5} />,
      title: "Tap or Scan to Connect",
      description: "Share contacts instantly via QR code or NFC tap technology."
    },
    {
      icon: <Settings className="w-5 h-5" strokeWidth={1.5} />,
      title: "Update Anytime",
      description: "Keep your information current with real-time updates."
    }
  ];

  return (
    <div className='max-w-7xl mx-auto py-24 px-4 md:px-0 rounded-lg'>
      <CTitle title={'How It Works'} className='' />
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12'>  
        <div className='relative'>
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
        <div className='space-y-6'>
          {/* <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Smart Digital Business Cards
          </h3>
          <p className='text-gray-600 dark:text-gray-400'>
            Transform your networking with our modern, eco-friendly digital solution that works anywhere.
          </p> */}
          
          <div className='space-y-4'>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}