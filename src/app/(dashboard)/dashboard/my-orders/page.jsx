'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, ShoppingBag, CalendarDays, CreditCard, Truck, MapPin, Phone, CheckCircle, X } from 'lucide-react';
import { useMyOrder } from '@/app/hooks/dashboard/useMyOrder';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

const statusSteps = [
  { id: 'pending', label: 'Order Placed', icon: CalendarDays, color: 'bg-amber-500' },
  { id: 'processing', label: 'Processing', icon: Loader2, color: 'bg-blue-500' },
  { id: 'shipped', label: 'Shipped', icon: Truck, color: 'bg-purple-500' },
  { id: 'completed', label: 'Delivered', icon: CheckCircle, color: 'bg-green-500' }
];

const OrdersPage = () => {
  const router = useRouter();
  const { orders, loading, error } = useMyOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusProgress = (status) => {
    const currentIndex = statusSteps.findIndex(step => step.id === status.toLowerCase());
    return currentIndex >= 0 ? (currentIndex / (statusSteps.length - 1)) * 100 : 0;
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-amber-100 text-amber-800', icon: <CalendarDays className="h-4 w-4" /> },
      processing: { color: 'bg-blue-100 text-blue-800', icon: <Loader2 className="h-4 w-4 animate-spin" /> },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: <Truck className="h-4 w-4" /> },
      completed: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      cancelled: { color: 'bg-red-100 text-red-800', icon: null }
    }[status.toLowerCase()] || { color: 'bg-gray-100 text-gray-800', icon: null };

    return (
      <Badge className={`gap-2 ${config.color}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4 py-12">
        <ShoppingBag className="mx-auto h-12 w-12 text-red-600" />
        <h3 className="text-lg font-semibold text-red-600">Failed to load orders</h3>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-5 w-5" /> Back
        </Button>
        <div className="w-20"></div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
          <h3 className="text-lg font-medium">No orders found</h3>
          <p className="text-muted-foreground">Your order history will appear once you make purchases.</p>
          <Button onClick={() => router.push('/dashboard/cards')}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <div 
              key={order.id} 
              className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => {
                setSelectedOrder(order);
                setIsModalOpen(true);
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {order.product?.images?.[0]?.image && (
                    <div className="relative w-16 h-16 rounded-md border overflow-hidden">
                      <Image
                        src={order.product.images[0].image}
                        alt={order.product.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">#{order.order_number}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {order.product?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-semibold">৳{order.grand_total?.toFixed(2)}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Responsive Order Details Modal */}
      {selectedOrder && (
        <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-opacity ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-background rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-2xl transition-transform ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
            <div className="sticky top-0 bg-background border-b p-4 flex justify-between items-center z-[20]">
              <h2 className="text-sm md:text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order #{selectedOrder.order_number}
              </h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div>
                <Progress 
                  value={getStatusProgress(selectedOrder.status)} 
                  className="h-2"
                />
                <div className="grid grid-cols-4 mt-3 text-center text-sm">
                  {statusSteps.map(step => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`h-2 w-2 rounded-full mb-1 ${
                        selectedOrder.status.toLowerCase() === step.id ? step.color : 'bg-gray-200'
                      }`} />
                      <span className={`${
                        selectedOrder.status.toLowerCase() === step.id ? 'font-semibold text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Product Details</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedOrder.product?.images?.[0]?.image && (
                    <div className="relative w-full sm:w-32 h-32 rounded-md border overflow-hidden">
                      <Image
                        src={selectedOrder.product.images[0].image}
                        alt={selectedOrder.product.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedOrder.product?.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedOrder.product?.category}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Price:</span> ৳{selectedOrder.product?.price}
                    </p>
                    {selectedOrder.subscription && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">Subscription:</span> {selectedOrder.subscription.name} (৳{selectedOrder.subscription.price})
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Delivery Information</h3>
                  <div className="space-y-3">
                    {/* <div>
                      <p className="text-sm text-muted-foreground">Delivery Method</p>
                      <p className="flex items-center gap-2 mt-1">
                        <Truck className="h-4 w-4 text-blue-500" />
                        {selectedOrder.delivery_method?.method}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-sm text-muted-foreground">Shipping Area</p>
                      <p className="mt-1">
                        {selectedOrder.shipping_area?.area || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Shipping Cost</p>
                      <p className="mt-1">
                        ৳{selectedOrder.shipping_area?.cost || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Payment Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="flex items-center gap-2 mt-1">
                        <CreditCard className="h-4 w-4 text-green-500" />
                        {selectedOrder.delivery_method?.method === 'Cash On Delivery' 
                          ? 'Cash on Delivery' 
                          : 'Online Payment'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="mt-1">
                        ৳{selectedOrder.discount || '0.00'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="mt-1 font-semibold">
                        ৳{selectedOrder.grand_total?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-blue-500" />
                      {selectedOrder.phone || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="flex items-start gap-2 mt-1">
                      <MapPin className="h-6 w-6 text-blue-500 mt-1" />
                      <span>
                        {selectedOrder.street || '—'}, {selectedOrder.city || '—'}, {selectedOrder.state || '—'} {selectedOrder.postal_code || ''}
                        {selectedOrder.landmark && <>, {selectedOrder.landmark}</>}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;