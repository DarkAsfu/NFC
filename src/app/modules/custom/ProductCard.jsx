import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get the first image as default and second image as hover (if available)
  const defaultImage = product.images[0]?.image
  const hoverImage = product.images[1]?.image || defaultImage

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        className='rounded-xl shadow-md overflow-hidden border border-bG/50 hover:shadow-lg transition-all bg-[#eee0ff12]'
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative overflow-hidden'>
          <motion.img
            src={isHovered ? hoverImage : defaultImage}
            alt={product.title}
            className='w-full h-full object-cover'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={isHovered ? 'hover' : 'normal'}
          />
          {/* You can add sale tag logic here if needed */}
          {/* {product.sale && (
          <div className="absolute top-3 left-3 bg-bG text-tX border px-3 py-1 rounded-full text-xs font-semibold">
            SALE
          </div>
        )} */}
        </div>

        <div className='p-3 md:p-5 bg-[eee0ff12]'>
          <h3 className='text-[14px] font-semibold text-tX mb-1'>
            {product.title}
          </h3>
          <p className='text-[12px] text-gray-500 mb-3'>{product.category}</p>

          <div className='flex items-center justify-between'>
            <span className='text-[12px] font-bold text-tX'>
              Tk {product.price}
            </span>
            {/* You can add original price logic here if needed */}
            {/* {product.originalPrice && (
            <span className="text-[12px] text-gray-400 line-through">Tk {product.originalPrice}</span>
          )} */}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductCard
