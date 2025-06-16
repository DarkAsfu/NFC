import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CTitle from '../custom/CTitle'

const NFCSection = () => {
  const products = [
    {
      id: 1,
      name: 'NFC Nail Chip',
      tagline: 'Digital identity at your fingertips',
      description:
        'Seamlessly share your contact details, social profiles, and more with a simple tap of your finger on any smartphone.',
      features: [
        'Instant contact sharing',
        'Customizable profiles',
        'Works with all NFC-enabled devices',
        'Water-resistant design'
      ],
      cta: 'Get Connected',
      bgGradient: 'bg-gradient-to-br from-indigo-50 to-blue-100',
      accentColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      image: '/nfc-nail.jpg', // Replace with your actual image path
      imageAlt: 'NFC Nail Chip on a finger'
    },
    {
      id: 2,
      name: 'NFC Pet Tag',
      tagline: 'Smart protection for your pet',
      description:
        'A modern solution for pet safety. When scanned, displays your contact information and important pet details instantly.',
      features: [
        'Instant pet identification',
        'Medical info storage',
        'Works without app installation',
        'Durable & lightweight'
      ],
      cta: 'Protect Your Pet',
      bgGradient: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      accentColor: 'text-teal-600',
      buttonColor: 'bg-teal-600 hover:bg-teal-700',
      image: '/pet-tag-nfc.avif', // Replace with your actual image path
      imageAlt: 'NFC Pet Tag on a dog collar'
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <CTitle title={'Unique Collection'} />
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={containerVariants}
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {products.map(product => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className={`${product.bgGradient} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}
            >
              <div className='flex-1'>
                {/* Image Container */}
                <div className='relative h-48 w-full mb-6 rounded-xl overflow-hidden'>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>

                <h3 className='text-[20px] md:text-2xl font-bold text-gray-900 mb-2'>
                  {product.name}
                </h3>
                <p
                  className={`text-[14px] md:text-lg font-medium ${product.accentColor} mb-4`}
                >
                  {product.tagline}
                </p>
                <p className='text-[14px] md:text-[16px] text-gray-700 mb-6'>{product.description}</p>

                <ul className='space-y-3 mb-8'>
                  {product.features.map((feature, index) => (
                    <li key={index} className='flex items-center'>
                      <svg
                        className={`flex-shrink-0 h-4 w-4 md:h-5 md:w-5 ${product.accentColor} mr-2 mt-0.5`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      <span className='text-[14px] md:text-[14=6px] text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${product.buttonColor} text-white font-semibold px-2 py-2 md:py-3 md:px-6 rounded-lg transition-colors duration-300 self-start text-[14px] md:text-[16px]`}
              >
                {product.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default NFCSection
