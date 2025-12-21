'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Palette, 
  Package, 
  Share2, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Eye,
  ArrowRight,
  CheckCircle,
  Clock,
  Loader2,
  CalendarDays,
  Truck
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { resolveMediaUrl } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    hasCard: false,
    hasTheme: false
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    if (!user?.username) return
    fetchDashboardStats()
    fetchRecentOrders()
  }, [user])

  const fetchDashboardStats = async () => {
    if (!user?.username) return
    setLoading(true)
    try {
      const [profileRes, themeRes] = await Promise.allSettled([
        api.get(`/profile/${user.username}/`).catch(() => ({ data: null })),
        api.get(`/theme/${user.username}/`).catch(() => ({ data: null }))
      ])

      const profile = profileRes.status === 'fulfilled' ? profileRes.value.data : null
      const theme = themeRes.status === 'fulfilled' ? themeRes.value.data : null

      setStats({
        hasCard: !!profile,
        hasTheme: !!theme?.theme
      })
    } catch (err) {
      console.error('Error fetching dashboard stats:', err)
    } finally {
      setLoading(false)
    }
  }


  const fetchRecentOrders = async () => {
    setOrdersLoading(true)
    try {
      const response = await api.get('/order/')
      const orders = response.data || []
      // Get the 3 most recent orders
      setRecentOrders(orders.slice(0, 3))
    } catch (err) {
      console.error('Error fetching recent orders:', err)
      setRecentOrders([])
    } finally {
      setOrdersLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-amber-100 text-amber-800', icon: CalendarDays },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Loader2 },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: null }
    }[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-800', icon: null }

    const Icon = config.icon
    return (
      <Badge className={`gap-1 ${config.color}`}>
        {Icon && <Icon className="h-3 w-3" />}
        <span className="text-xs">{status}</span>
      </Badge>
    )
  }

  const quickActions = [
    {
      title: 'My Card',
      description: 'Manage your digital business card',
      icon: CreditCard,
      href: '/dashboard/cards'
    },
    {
      title: 'Landing Page Design',
      description: 'Customize your profile theme',
      icon: Palette,
      href: '/dashboard/themes'
    },
    {
      title: 'My Orders',
      description: 'View your order history',
      icon: Package,
      href: '/dashboard/my-orders'
    },
    {
      title: 'Share Profile',
      description: 'Share your profile link',
      icon: Share2,
      href: '/dashboard/share'
    }
  ]

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8 min-h-screen">
        {/* Welcome Message */}
        <div className="mb-4">
          <p className="text-lg text-muted-foreground">
            Welcome back, <span className="font-bold text-foreground text-xl">{user?.first_name || user?.username || 'User'}</span>! 👋
          </p>
          <p className="text-sm text-muted-foreground mt-1">Here's an overview of your account.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Card Status</CardTitle>
              {stats.hasCard ? (
                <CheckCircle className="h-5 w-5 text-gray-700" />
              ) : (
                <Clock className="h-5 w-5 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.hasCard ? (
                  <span className="text-foreground">Active</span>
                ) : (
                  <span className="text-muted-foreground">Setup</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.hasCard ? 'Card is live' : 'Complete setup'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Card 
                  key={action.href}
                  className="group border hover:shadow-md transition-all cursor-pointer"
                >
                  <Link href={action.href} className="block h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mb-3 transition-colors">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:text-primary transition-colors"
                        asChild
                      >
                        <span className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>

        {/* My Orders Section - Mobile View */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/my-orders">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          {ordersLoading ? (
            <Card className="border-2">
              <CardContent className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ) : recentOrders.length === 0 ? (
            <Card className="border-2">
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-4">No orders yet</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link key={order.id} href="/dashboard/my-orders">
                  <Card className="border-2 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {order.product?.images?.[0]?.image && (
                          <div className="relative w-16 h-16 rounded-md border overflow-hidden shrink-0">
                            <Image
                              src={resolveMediaUrl(order.product.images[0].image)}
                              alt={order.product?.title || 'Product'}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {order.product?.title || `Order #${order.order_number}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                #{order.order_number}
                              </p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm font-semibold">
                              ৳{order.grand_total?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Setup Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-700" />
                Card Setup
              </CardTitle>
              <CardDescription>Complete your digital business card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Information</span>
                {stats.hasCard ? (
                  <Badge className="bg-gray-100 text-gray-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme Selection</span>
                {stats.hasTheme ? (
                  <Badge className="bg-gray-100 text-gray-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
              {(!stats.hasCard || !stats.hasTheme) && (
                <Button className="w-full mt-4" asChild>
                  <Link href="/dashboard/cards">
                    Complete Setup
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gray-700" />
                Shop Now
              </CardTitle>
              <CardDescription>Browse our collection of products</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Discover our latest products and services to enhance your digital presence.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
