'use client'

import { ReactLenis } from 'lenis/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import CTitle from '../custom/CTitle'

const ourServices = [
  {
    id: 1,
    title: 'No Language Barrier',
    description:
      "Select any language and transfer your contact information to foreign business contacts' phones in their language. Tago Card translates into any alphabet!",
    image: '/Multiple_Languages_720x.webp',
    color: '#010313' // You can adjust these colors per service
  },
  {
    id: 2,
    title: 'Forever Updates',
    description:
      'Your contacts automatically receive your latest details even years later. When you update your information, all previous connections get access to your new details.',
    image: '/Forever_Updates_720x.webp',
    color: '#010313'
  },
  {
    id: 3,
    title: 'Two-Way Contact Share',
    description:
      'Obtain contact details from others while sharing yours. Receive their information directly to your email for easy import to your phone or email client.',
    image: '/Two_Way_Contact_Share_720x.webp',
    color: '#010313'
  },
  {
    id: 4,
    title: 'Admin Panel',
    description:
      'Manage multiple profiles, update contact information, and switch between different business roles easily through our convenient admin system.',
    image: '/Tago_Admin_Panel_720x.webp',
    color: '#010313'
  }
]

const WhatsWeProvide = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <ReactLenis root>
      <main className='bg-bG text-white' ref={containerRef}>
        <section className='grid place-content-center relative'>
          {/* <h1 className="text-3xl font-bold text-center px-4 leading-tight">
            What We Provide 👇
          </h1> */}
          <CTitle title={'What We Provide 👇'} className='' />
        </section>

        <section className='relative '>
          {ourServices.map((service, index) => {
            const targetScale = 1 - (ourServices.length - index) * 0.05

            return (
              <ServiceCard
                key={service.id}
                i={index}
                title={service.title}
                description={service.description}
                image={service.image}
                color={service.color}
                progress={scrollYProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
              />
            )
          })}
        </section>
      </main>
    </ReactLenis>
  )
}

const ServiceCard = ({
  i,
  title,
  description,
  image,
  color,
  progress,
  range,
  targetScale
}) => {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={cardRef}
      className='h-screen flex items-center justify-center sticky -top-10'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`
        }}
        className='flex flex-col relative -top-[35%] h-[500px] md:h-[550px] max-w-7xl mx-4 md:mx-auto rounded-md p-4 md:p-8 origin-top shadow-lg border border-2 border-[#eee0ff12]'
      >
        {/* <h2 className='text-2xl font-bold text-center'>{title}</h2> */}

        <div className='md:flex h-full mt-4 gap-6'>
          <div className='md:w-[40%] flex flex-col justify-center gap-10'>
            <h2 className='text-2xl font-bold text-center md:text-left'>{title}</h2>
            <p className='text-sm md:text-[18px] text-center md:text-left'>{description}</p>
          </div>

          <div className='md:w-[60%] mt-2 h-full rounded-md overflow-hidden relative'>
            <motion.div className='w-full h-full' style={{ scale: imageScale }}>
              <Image fill src={image} alt={title} className='object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default WhatsWeProvide
