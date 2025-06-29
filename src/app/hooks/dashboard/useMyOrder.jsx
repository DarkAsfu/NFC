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
      const token = localStorage.getItem('accessToken')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await api.get('/order/', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      })
      console.log(response)
      if (!response.status === 200) throw new Error('Failed to fetch orders')

      setOrders(response.data)
    } catch (err) {
      setError(err.message)
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
