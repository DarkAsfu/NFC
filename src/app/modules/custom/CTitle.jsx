import React from 'react'
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const CTitle = ({ title, className = '' }) => {
  return (
    <div>
      <motion.h2
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={itemVariants}
        transition={{ duration: 0.6 }}
        className='text-4xl font-bold text-center text-white mb-4'
      >
        {title}
      </motion.h2>
      {/* <h3
        className={`text-[27px] text-[#EEE0FF] uppercase font-semibold text-center mb-4 ${className} `}
      >
        {title}
      </h3> */}
      <hr className='w-24 mx-auto border-2 border-primary' />
    </div>
  )
}

export default CTitle
