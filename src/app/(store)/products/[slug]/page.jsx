'use client'

import useProduct from '@/app/hooks/store/useProduct'
import { forbidden, useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useAuth } from '@/provider/AuthProvider'
import Link from 'next/link'

const ProductDetailPage = () => {
  const { slug } = useParams()
  const { product, loading, error } = useProduct(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuth()
  const router = useRouter()
//   if (!user) {
//     forbidden()
//   }
  console.log(error)
  if (loading)
    return (
      <div className='bg-bG pb-12 pt-36 md:py-24 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='animate-pulse space-y-8'>
            <div className='h-8 bg-gray-300 rounded w-1/3'></div>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <div className='h-96 bg-gray-300 rounded-lg'></div>
                <div className='flex gap-2'>
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className='h-20 w-20 bg-gray-300 rounded'
                    ></div>
                  ))}
                </div>
              </div>
              <div className='space-y-4'>
                <div className='h-8 bg-gray-300 rounded w-1/2'></div>
                <div className='h-6 bg-gray-300 rounded w-1/4'></div>
                <div className='h-4 bg-gray-300 rounded w-full'></div>
                <div className='h-4 bg-gray-300 rounded w-5/6'></div>
                <div className='h-4 bg-gray-300 rounded w-4/6'></div>
                <div className='h-12 bg-gray-300 rounded w-1/3 mt-8'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className='bg-bG flex justify-center items-center min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold text-red-500'>
            Error loading product
          </h2>
          <p className='text-tX mt-2'>{error}</p>
        </div>
      </div>
    )

  if (!product)
    return (
      <div className='bg-bG py-24 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold text-tX'>Product not found</h2>
        </div>
      </div>
    )
  const handleCheckout = (id, slug) => {
    console.log(id);
    const productInfo = {
        id,
        slug
    }
    localStorage.setItem('product', JSON.stringify(productInfo));
    router.push('/checkout')
  }
  return (
    <div className='bg-bG pt-36 pb-12 md:py-24 min-h-screen '>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Breadcrumb */}
        <nav className='flex mb-6' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-2'>
            <li className='inline-flex items-center'>
              <a href='/' className='text-sm text-gray-500 hover:text-tX'>
                Home
              </a>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <a href='#' className='text-sm text-gray-500 hover:text-tX'>
                  {product.category}
                </a>
              </div>
            </li>
            <li aria-current='page'>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-sm font-medium text-tX'>
                  {product.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
          {/* Product Images */}
          <div>
            <motion.div
              className='bg-white rounded-xl overflow-hidden shadow-lg mb-4 aspect-square'
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src={
                  product.images[selectedImage]?.image ||
                  '/placeholder-product.jpg'
                }
                alt={product.title}
                width={800}
                height={800}
                className='w-full h-full object-contain'
                priority
              />
            </motion.div>

            <div className='flex gap-2 overflow-x-auto py-2'>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary border-2'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='text-tX'>
            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
              {product.title}
            </h1>
            <p className='text-gray-500 mb-4'>{product.category}</p>

            <div className='flex items-center mb-6'>
              <span className='text-2xl font-bold'>Tk {product.price}</span>
              {product.originalPrice && (
                <span className='ml-3 text-lg text-gray-400 line-through'>
                  Tk {product.originalPrice}
                </span>
              )}
            </div>

            <div className='mb-8'>
              <h3 className='font-semibold text-lg mb-2'>Description</h3>
              <p className='text-gray-300 whitespace-pre-line'>
                {product.description}
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              {/* <button className="bg-tX text-bG px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                Add to Cart
              </button> */}
              <button
                onClick={() => handleCheckout(product.id, product.slug)}
                className='border border-tX text-tX px-6 py-3 rounded-lg font-medium hover:bg-tX hover:text-bG transition text-center cursor-pointer'
              >
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className='mt-8 pt-6 border-t border-gray-700'>
              <h3 className='font-semibold text-lg mb-3'>Product Details</h3>
              <ul className='space-y-2 text-gray-300'>
                <li>
                  <span className='font-medium'>Category:</span>{' '}
                  {product.category}
                </li>
                <li>
                  <span className='font-medium'>Material:</span>{' '}
                  {product.material || 'Not specified'}
                </li>
                {/* Add more product details as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
