'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export const useMyOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  const fetchOrders = async () => {
    try {
      const response = await api.get('/order/')
      console.log(response)
      if (!response.status === 200) throw new Error('Failed to fetch orders')

      setOrders(response.data)
    } catch (err) {
      // If unauthenticated/expired, send user to login.
      if (err?.response?.status === 401) {
        router.push('/login?redirect=/dashboard/my-orders')
        return
      }
      setError(err?.response?.data?.detail || err.message)
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const refetch = () => {
    setLoading(true)
    fetchOrders()
  }

  return { orders, loading, error, refetch }
}
