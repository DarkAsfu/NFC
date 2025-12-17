'use client'

import useProduct from '@/app/hooks/store/useProduct'
import { forbidden, useParams, useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useAuth } from '@/provider/AuthProvider'
import Link from 'next/link'
import { resolveMediaUrl } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import useShippingAreaCosts from '@/app/hooks/store/useShippingAreaCosts'
import { Sparkles, Truck } from 'lucide-react'

const ProductDetailPage = () => {
  const { slug } = useParams()
  const { product, loading, error } = useProduct(slug)
  const { shippingCosts } = useShippingAreaCosts()
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuth()
  const router = useRouter()
  const shippingRange = useMemo(() => {
    if (!shippingCosts?.length) return null
    const values = shippingCosts
      .map(s => Number.parseFloat(s?.cost))
      .filter(n => Number.isFinite(n))
    if (!values.length) return null
    const min = Math.min(...values)
    const max = Math.max(...values)
    return { min, max }
  }, [shippingCosts])
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

        {/* Top section */}
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-12'>
          {/* Gallery */}
          <div className='lg:col-span-7'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4'>
              <motion.div
                className='bg-black/30 rounded-xl overflow-hidden aspect-square md:aspect-[4/3]'
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <Image
                  src={
                    resolveMediaUrl(product.images[selectedImage]?.image) ||
                    '/placeholder-product.jpg'
                  }
                  alt={product.title}
                  width={1200}
                  height={900}
                  className='w-full h-full object-contain'
                  priority
                  unoptimized
                />
              </motion.div>

              <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border transition ${
                      selectedImage === index
                        ? 'border-purple-400'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Image
                      src={resolveMediaUrl(img.image)}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      width={128}
                      height={128}
                      className='w-full h-full object-cover'
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase panel */}
          <div className='lg:col-span-5 text-tX'>
            <div className='lg:sticky lg:top-24'>
              <div className='flex flex-wrap items-center gap-2 mb-3'>
                <Badge className='bg-white/10 text-white border border-white/15'>
                  {product.category}
                </Badge>
                <Badge className='bg-purple-500/15 text-purple-200 border border-purple-400/20'>
                  <Sparkles className='h-3.5 w-3.5 mr-1' />
                  NFC Ready
                </Badge>
              </div>

              <h1 className='text-2xl md:text-4xl font-extrabold leading-tight'>
                {product.title}
              </h1>

              <div className='mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6'>
                <div className='flex items-end justify-between gap-4'>
                  <div>
                    <div className='text-sm text-white/60'>Price</div>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl font-bold'>Tk {product.price}</span>
                      {product.originalPrice && (
                        <span className='text-sm text-white/40 line-through'>
                          Tk {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className='text-xs text-white/40'>VAT may apply</span>
                </div>

                <div className='mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <span className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10'>
                      <Truck className='h-4 w-4 text-blue-200' />
                    </span>
                    <div>
                      <div className='text-xs text-white/50'>Shipping</div>
                      <div className='text-sm text-white/85 font-medium leading-tight'>
                        {shippingRange
                          ? `৳${shippingRange.min.toFixed(2)} – ৳${shippingRange.max.toFixed(2)}`
                          : 'Calculated at checkout'}
                      </div>
                    </div>
                  </div>
                  <span className='text-xs text-white/35 whitespace-nowrap'>
                    based on area
                  </span>
                </div>

                <button
                  onClick={() => handleCheckout(product.id, product.slug)}
                  className='mt-5 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 font-semibold transition'
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width description */}
        <div className='mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8'>
          <h2 className='text-xl md:text-2xl font-bold text-white'>Description</h2>
          <p className='mt-3 text-gray-200/90 whitespace-pre-line leading-relaxed'>
            {product.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
