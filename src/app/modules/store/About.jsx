import React from 'react'
import CButton from '../custom/CButton'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })
const About = () => {
  return (
    <div className='max-w-7xl py-10 mx-auto md:grid grid-cols-2 px-4 md:px-0 items-center gap-8'>
      <div>
        <h2 className='text-[24px] md:text-[35px] font-bold'>
          NFC BUSINESS CARD WITH UNLIMITED POSSIBILITIES
        </h2>
        <p className='text-[#363c45] text-[14px] md:text-[18px] leading-[31px] mt-3'>
          Tago NFC business card system transfers your contact information from
          your card, sticker, mobile ring, virtual business cards, food label,
          pet tag, nail to any smartphone. Next generation NFC business card
          that’s always up to date.
          <br />
          Update your info anytime, and your contacts always have the latest
          version!. All it takes is to touch someone's smartphone with your card
          and let them click - “Save”! Totally custom made, a personal fit for
          you!
        </p>
        <div className='mt-4'>
          <CButton className='' href='/order-now' label='Order Now' />
        </div>
      </div>
      {/* <div className='hidden md:block border'>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div> */}
      <div className='mt-4 md:mt-0'>
        <Image width={900} alt='about-img' height={500} src="/nfc.webp" />
      </div>
    </div>
  )
}

export default About
