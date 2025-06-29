'use client'

import useDeliveryMethods from '@/app/hooks/store/useDeliveryMethods'
import useShippingAreaCosts from '@/app/hooks/store/useShippingAreaCosts'
import useSubscriptionPlans from '@/app/hooks/store/useSubscriptionPlans'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useProduct from '@/app/hooks/store/useProduct'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Package,
  User,
  CreditCard,
  Crown
} from 'lucide-react'

const CheckoutPage = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('product'))
    console.log(product)
    setProductInfo(product)
  }, [])

  const { product } = useProduct(productInfo?.slug)

  const [formData, setFormData] = useState({
    product_id: 0,
    subscription_id: 0,
    delivery_method_id: 0,
    shipping_area_id: 0,
    coupon: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    landmark: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [stepErrors, setStepErrors] = useState({})

  // Update product_id when product data is available
  useEffect(() => {
    if (product?.id) {
      setFormData(prev => ({
        ...prev,
        product_id: product.id
      }))
    }
  }, [product?.id])

  // Fetch all necessary data
  const {
    deliveryMethods,
    loading: deliveryLoading,
    error: deliveryError
  } = useDeliveryMethods()
  const { shippingCosts, loading: shippingLoading } = useShippingAreaCosts()
  const { plans, loading: plansLoading } = useSubscriptionPlans()

  const steps = [
    {
      id: 1,
      title: 'Subscription',
      icon: Crown,
      description: 'Select your plan'
    },
    {
      id: 2,
      title: 'Shipping',
      icon: Package,
      description: 'Choose delivery options'
    },
    { id: 3, title: 'Contact', icon: User, description: 'Enter your details' },
    {
      id: 4,
      title: 'Review',
      icon: CreditCard,
      description: 'Confirm your order'
    }
  ]

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('_id') ? Number.parseInt(value) || 0 : value
    }))

    // Clear step errors when user starts typing
    if (stepErrors[currentStep]) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: null
      }))
    }
  }

  const handleSubscriptionChange = subscriptionId => {
    setFormData(prev => ({
      ...prev,
      subscription_id: subscriptionId
    }))

    // Clear step errors
    if (stepErrors[currentStep]) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: null
      }))
    }
  }

  const calculateTotal = () => {
    const productPrice = Number.parseFloat(product?.price || 0)
    const shippingCost = Number.parseFloat(
      shippingCosts.find(s => s.id === formData.shipping_area_id)?.cost || 0
    )
    const subscriptionPrice = Number.parseFloat(
      plans.find(p => p.id === formData.subscription_id)?.price || 0
    )
    return (productPrice + shippingCost + subscriptionPrice).toFixed(2)
  }

  const validateStep = step => {
    const errors = []

    switch (step) {
      case 1:
        // subscription is optional
        break
      case 2:
        if (!formData.shipping_area_id)
          errors.push('Please select a shipping area')
        if (!formData.delivery_method_id)
          errors.push('Please select a delivery method')
        break
      case 3:
        if (!formData.phone) errors.push('Phone number is required')
        if (!formData.street) errors.push('Street address is required')
        if (!formData.city) errors.push('City is required')
        if (!formData.state) errors.push('State/Division is required')
        if (!formData.postal_code) errors.push('Postal code is required')
        break
      case 4:
        if (!formData.product_id) errors.push('Product information is missing')
        break
    }

    return errors
  }

  const handleNext = () => {
    const errors = validateStep(currentStep)
    if (errors.length > 0) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: errors
      }))
      return
    }

    setStepErrors(prev => ({
      ...prev,
      [currentStep]: null
    }))

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

//   const handleSubmit = async e => {
//     e.preventDefault()

//     // Validate all steps
//     const allErrors = {}
//     for (let i = 1; i <= 4; i++) {
//       const errors = validateStep(i)
//       if (errors.length > 0) {
//         allErrors[i] = errors
//       }
//     }

//     if (Object.keys(allErrors).length > 0) {
//       setStepErrors(allErrors)
//       setCurrentStep(1) // Go back to first step with errors
//       return
//     }

//     setIsSubmitting(true)
//     setSubmitError('')

//     try {
//       // Get tokens from localStorage
//       const accessToken = localStorage.getItem('accessToken')
//       const refreshToken = localStorage.getItem('refreshToken')

//       // Create headers with tokens
//       const headers = {}
//       if (accessToken) {
//         headers.Authorization = `Bearer ${accessToken}`
//       }
//       if (refreshToken) {
//         headers['X-Refresh-Token'] = refreshToken
//       }

//       const response = await api.post('/order/', formData, {
//         headers: headers
//       })

//       console.log('Order created:', response.data)
//       localStorage.removeItem('product')
//       router.push('/order-success')
//     } catch (err) {
//       console.error('Error creating order:', err)
//       setSubmitError(
//         err.response?.data?.message ||
//           'Failed to place order. Please try again.'
//       )
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

// ✅ Helper function to get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const handleSubmit = async e => {
  e.preventDefault()

  // ✅ Step validation
  const allErrors = {}
  for (let i = 1; i <= 4; i++) {
    const errors = validateStep(i)
    if (errors.length > 0) {
      allErrors[i] = errors
    }
  }

  if (Object.keys(allErrors).length > 0) {
    setStepErrors(allErrors)
    setCurrentStep(1) // Return to first step with errors
    return
  }

  setIsSubmitting(true)
  setSubmitError('')

  try {
    // ✅ Get access token from localStorage
    const accessToken = localStorage.getItem('accessToken')

    // ✅ Get CSRF token from cookies
    const csrftoken = getCookie('csrftoken')

    // ✅ Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': csrftoken
    }

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    // ✅ Submit the form
    const response = await api.post('/order/', formData, {
      headers: headers,
      withCredentials: true // Ensure cookies (like csrftoken) are included
    })

    console.log('Order created:', response.data)
    localStorage.removeItem('product')
    router.push('/order-success')
  } catch (err) {
    console.error('Error creating order:', err)
    setSubmitError(
      err.response?.data?.message ||
      'Failed to place order. Please try again.'
    )
  } finally {
    setIsSubmitting(false)
  }
}


  if (deliveryLoading || shippingLoading || plansLoading) {
    return (
      <ProtectedRoute>
        <div className='bg-bG min-h-screen pt-36 pb-12 md:py-32'>
          <div className='max-w-4xl mx-auto px-4 md:px-0'>
            <div className='flex items-center justify-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-tX'></div>
              <span className='ml-4 text-tX text-lg'>Loading checkout...</span>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!productInfo) {
    return (
      <ProtectedRoute>
        <div className='bg-bG min-h-screen pt-36 pb-12 md:py-32'>
          <div className='max-w-4xl mx-auto px-4 md:px-0 text-center'>
            <div className='bg-bG border border-gray-700 rounded-lg p-8'>
              <h1 className='text-tX text-2xl font-bold mb-4'>
                No Product Selected
              </h1>
              <p className='text-tX/70 mb-6'>
                Please select a product before proceeding to checkout.
              </p>
              <button
                onClick={() => router.push('/products')}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-tX mb-4'>
                Choose Your Subscription Plan
              </h3>
              <p className='text-tX/70 mb-6'>
                Select a subscription plan to get regular deliveries and
                exclusive benefits, or continue without a subscription.
              </p>

              <div className='space-y-4'>
                {/* No Subscription Option */}
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.subscription_id === 0
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => handleSubscriptionChange(0)}
                >
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='subscription'
                      value='0'
                      checked={formData.subscription_id === 0}
                      onChange={() => handleSubscriptionChange(0)}
                      className='w-4 h-4 text-blue-600 bg-bG border-gray-600 focus:ring-blue-500'
                    />
                    <div className='ml-3 flex-1'>
                      <div className='flex items-center justify-between'>
                        <h4 className='text-tX font-medium'>No Subscription</h4>
                        <span className='text-tX font-bold'>Free</span>
                      </div>
                      <p className='text-tX/70 text-sm mt-1'>
                        One-time purchase without recurring deliveries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subscription Plans */}
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.subscription_id === plan.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => handleSubscriptionChange(plan.id)}
                  >
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='subscription'
                        value={plan.id}
                        checked={formData.subscription_id === plan.id}
                        onChange={() => handleSubscriptionChange(plan.id)}
                        className='w-4 h-4 text-blue-600 bg-bG border-gray-600 focus:ring-blue-500'
                      />
                      <div className='ml-3 flex-1'>
                        <div className='flex items-center justify-between'>
                          <h4 className='text-tX font-medium flex items-center'>
                            <Crown className='w-4 h-4 mr-2 text-yellow-500' />
                            {plan.name}
                          </h4>
                          <span className='text-tX font-bold'>
                            ৳{plan.price}/month
                          </span>
                        </div>
                        {plan.description && (
                          <p className='text-tX/70 text-sm mt-1'>
                            {plan.description}
                          </p>
                        )}
                        <div className='mt-2'>
                          <div className='flex flex-wrap gap-2'>
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400'>
                              Regular Delivery
                            </span>
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400'>
                              Priority Support
                            </span>
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400'>
                              Exclusive Offers
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-tX mb-4'>
                Shipping Options
              </h3>

              {/* Shipping Area */}
              <div className='mb-6'>
                <label className='block mb-2 text-tX font-medium'>
                  Shipping Area *
                </label>
                <select
                  name='shipping_area_id'
                  value={formData.shipping_area_id}
                  onChange={handleInputChange}
                  className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                  required
                >
                  <option value=''>Select shipping area</option>
                  {shippingCosts.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.area} (৳{area.cost})
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Method */}
              <div className='mb-6'>
                <label className='block mb-2 text-tX font-medium'>
                  Delivery Method *
                </label>
                <select
                  name='delivery_method_id'
                  value={formData.delivery_method_id}
                  onChange={handleInputChange}
                  className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                  required
                >
                  <option value=''>Select delivery method</option>
                  {deliveryMethods.map(method => (
                    <option key={method.id} value={method.id}>
                      {method.method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Coupon Code */}
              <div>
                <label className='block mb-2 text-tX font-medium'>
                  Coupon Code (Optional)
                </label>
                <input
                  type='text'
                  name='coupon'
                  value={formData.coupon}
                  onChange={handleInputChange}
                  className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                  placeholder='Enter coupon code'
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-tX mb-4'>
                Contact Information
              </h3>

              <div className='space-y-4'>
                <div>
                  <label className='block mb-2 text-tX font-medium'>
                    Phone Number *
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                    required
                    placeholder='01XXXXXXXXX'
                  />
                </div>

                <div>
                  <label className='block mb-2 text-tX font-medium'>
                    Street Address *
                  </label>
                  <input
                    type='text'
                    name='street'
                    value={formData.street}
                    onChange={handleInputChange}
                    className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                    required
                    placeholder='House/Flat number, Street name'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block mb-2 text-tX font-medium'>
                      City *
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                      required
                      placeholder='City name'
                    />
                  </div>

                  <div>
                    <label className='block mb-2 text-tX font-medium'>
                      State/Division *
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                      required
                      placeholder='State or Division'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block mb-2 text-tX font-medium'>
                      Postal Code *
                    </label>
                    <input
                      type='text'
                      name='postal_code'
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                      required
                      placeholder='Postal code'
                    />
                  </div>

                  <div>
                    <label className='block mb-2 text-tX font-medium'>
                      Landmark (Optional)
                    </label>
                    <input
                      type='text'
                      name='landmark'
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className='w-full p-3 bg-bG border border-gray-600 rounded-lg text-tX focus:border-blue-500 focus:outline-none'
                      placeholder='Nearby notable location'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-tX mb-4'>
                Order Review
              </h3>

              {/* Order Summary */}
              <div className='bg-bG border border-gray-600 rounded-lg p-4 mb-6'>
                <h4 className='font-medium text-tX mb-3'>Order Details</h4>

                {product && (
                  <div className='flex items-start gap-4 mb-4 pb-4 border-b border-gray-700'>
                    {product.images?.length > 0 && (
                      <div className='w-16 h-16 relative flex-shrink-0'>
                        <Image
                          src={product.images[0].image || '/placeholder.svg'}
                          alt={product.title}
                          fill
                          className='object-cover rounded'
                        />
                      </div>
                    )}
                    <div className='flex-1'>
                      <h5 className='font-medium text-tX'>{product.title}</h5>
                      <p className='text-tX/70 text-sm'>{product.category}</p>
                      <p className='font-bold text-tX'>৳{product.price}</p>
                    </div>
                  </div>
                )}

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between text-tX'>
                    <span>Subtotal</span>
                    <span>৳{product?.price || '0.00'}</span>
                  </div>

                  {formData.shipping_area_id > 0 && (
                    <div className='flex justify-between text-tX'>
                      <span>
                        Shipping (
                        {
                          shippingCosts.find(
                            s => s.id === formData.shipping_area_id
                          )?.area
                        }
                        )
                      </span>
                      <span>
                        ৳
                        {shippingCosts.find(
                          s => s.id === formData.shipping_area_id
                        )?.cost || '0.00'}
                      </span>
                    </div>
                  )}

                  {formData.subscription_id > 0 && (
                    <div className='flex justify-between text-tX'>
                      <span>
                        Subscription (
                        {
                          plans.find(p => p.id === formData.subscription_id)
                            ?.name
                        }
                        )
                      </span>
                      <span>
                        ৳
                        {plans.find(p => p.id === formData.subscription_id)
                          ?.price || '0.00'}
                      </span>
                    </div>
                  )}

                  <div className='border-t border-gray-700 pt-2 flex justify-between font-bold text-tX'>
                    <span>Total</span>
                    <span>৳{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              {formData.subscription_id > 0 && (
                <div className='bg-bG border border-gray-600 rounded-lg p-4 mb-4'>
                  <h4 className='font-medium text-tX mb-3 flex items-center'>
                    <Crown className='w-4 h-4 mr-2 text-yellow-500' />
                    Subscription Details
                  </h4>
                  <div className='text-sm text-tX/80'>
                    <p>
                      <span className='font-medium'>Plan:</span>{' '}
                      {plans.find(p => p.id === formData.subscription_id)?.name}
                    </p>
                    <p>
                      <span className='font-medium'>Monthly Cost:</span> ৳
                      {
                        plans.find(p => p.id === formData.subscription_id)
                          ?.price
                      }
                    </p>
                    <p className='text-xs text-tX/60 mt-2'>
                      * Subscription will start after your first order is
                      delivered
                    </p>
                  </div>
                </div>
              )}

              {/* Shipping Details */}
              <div className='bg-bG border border-gray-600 rounded-lg p-4'>
                <h4 className='font-medium text-tX mb-3'>Shipping Details</h4>
                <div className='text-sm text-tX/80 space-y-1'>
                  <p>
                    <span className='font-medium'>Phone:</span> {formData.phone}
                  </p>
                  <p>
                    <span className='font-medium'>Address:</span>{' '}
                    {formData.street}, {formData.city}, {formData.state}{' '}
                    {formData.postal_code}
                  </p>
                  {formData.landmark && (
                    <p>
                      <span className='font-medium'>Landmark:</span>{' '}
                      {formData.landmark}
                    </p>
                  )}
                  <p>
                    <span className='font-medium'>Delivery:</span>{' '}
                    {
                      deliveryMethods.find(
                        m => m.id === formData.delivery_method_id
                      )?.method
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className='bg-bG min-h-screen pt-36 pb-12 md:py-32'>
        <div className='max-w-4xl mx-auto px-4 md:px-0'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-tX mb-2'>Checkout</h1>
            <p className='text-tX/70'>
              Complete your order in {steps.length} simple steps
            </p>
          </div>

          {/* Step Indicator */}
          <div className='flex items-center justify-center mb-8 w-full px-4'>
            <div className='flex items-center md:justify-center w-full overflow-x-auto pb-2'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex items-center flex-shrink-0'>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        currentStep > step.id
                          ? 'bg-green-600 border-green-600 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                      ) : (
                        <step.icon className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                      )}
                    </div>
                    <div className='mt-2 text-center max-w-[80px] sm:max-w-none'>
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          currentStep >= step.id
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p
                        className={`text-[10px] sm:text-xs ${
                          currentStep >= step.id
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-4 sm:w-8 md:w-16 h-0.5 mx-1 sm:mx-2 md:mx-4 mt-[-1.5rem] sm:mt-[-2rem] transition-colors ${
                        currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className='border bg-white/10 border-gray-700 rounded-lg shadow-lg'>
            <div className='p-6'>
              {/* Step Content */}
              {renderStepContent()}

              {/* Step Errors */}
              {stepErrors[currentStep] && (
                <div className='mt-4 bg-red-900/20 border border-red-500 text-red-400 p-3 rounded-lg'>
                  <ul className='list-disc list-inside space-y-1'>
                    {stepErrors[currentStep].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Error */}
              {submitError && (
                <div className='mt-4 bg-red-900/20 border border-red-500 text-red-400 p-3 rounded-lg'>
                  {submitError}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className='border-t border-gray-700 p-6'>
              <div className='flex justify-between items-center'>
                <button
                  type='button'
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className='flex items-center px-4 py-2 text-tX/70 hover:text-tX disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  <ChevronLeft className='w-4 h-4 mr-1' />
                  Previous
                </button>

                <div className='text-tX/50 text-sm'>
                  Step {currentStep} of {steps.length}
                </div>

                {currentStep < steps.length ? (
                  <button
                    type='button'
                    onClick={handleNext}
                    className='flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
                  >
                    Next
                    <ChevronRight className='w-4 h-4 ml-1' />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={isSubmitting || !product?.id}
                    className='flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order - ৳{calculateTotal()}
                        <Check className='w-4 h-4 ml-1' />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default CheckoutPage
