'use client'

import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Plus, Package, Clock, CheckCircle, Truck, MapPin, Phone, Shield, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Screen C: Medicine Orders & Delivery
export default function MedicineOrders() {
  const router = useRouter()

  const handleEmergencyClick = () => {
    router.push('/emergency/e1')
  }
  const activeOrders = [
    {
      id: 'ORD-2024-001',
      status: 'out_for_delivery',
      estimatedDelivery: '2024-12-26 6:00 PM',
      items: [
        { name: 'Lisinopril 10mg', quantity: 30, price: 250 },
        { name: 'Metformin 500mg', quantity: 60, price: 180 }
      ],
      total: 430,
      pharmacy: 'HealthPlus Pharmacy',
      deliveryAddress: '123 Main St, Apt 4B',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      status: 'processing',
      estimatedDelivery: '2024-12-27 2:00 PM',
      items: [
        { name: 'Vitamin D3 1000 IU', quantity: 30, price: 320 },
        { name: 'Omega-3 Fish Oil', quantity: 60, price: 450 }
      ],
      total: 770,
      pharmacy: 'MediCare Central',
      deliveryAddress: '123 Main St, Apt 4B',
      trackingNumber: 'TRK987654321'
    }
  ]

  const orderHistory = [
    {
      id: 'ORD-2024-003',
      status: 'delivered',
      deliveredDate: '2024-12-20',
      items: [
        { name: 'Amoxicillin 250mg', quantity: 21, price: 180 }
      ],
      total: 180,
      pharmacy: '24/7 Express Pharmacy'
    },
    {
      id: 'ORD-2024-004',
      status: 'delivered',
      deliveredDate: '2024-12-15',
      items: [
        { name: 'Ibuprofen 400mg', quantity: 20, price: 120 },
        { name: 'Paracetamol 500mg', quantity: 20, price: 80 }
      ],
      total: 200,
      pharmacy: 'Community Wellness Pharmacy'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
      case 'out_for_delivery':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      default:
        return <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/medsupport">
                <Button variant="ghost" size="sm">←</Button>
              </Link>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Orders</h1>
            </div>
            <Link href="/medsupport/pharmacy">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Order
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Active Orders */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      {getStatusIcon(order.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Order {order.id}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{order.pharmacy}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{item.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">₹{order.total}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{order.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Expected: {order.estimatedDelivery}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  {order.status === 'processing' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order History</h2>
          <div className="space-y-3">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Order {order.id}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{order.pharmacy}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Delivered on {order.deliveredDate}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{order.total}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Download Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/medsupport/pharmacy">
              <Button variant="outline" className="w-full h-16 flex-col">
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-sm">New Order</span>
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full h-16 flex-col">
              <Package className="w-6 h-6 mb-1" />
              <span className="text-sm">Track Package</span>
            </Button>
            
            <Link href="/lifelog">
              <Button variant="outline" className="w-full h-16 flex-col">
                <Clock className="w-6 h-6 mb-1" />
                <span className="text-sm">Refill Reminder</span>
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full h-16 flex-col">
              <Phone className="w-6 h-6 mb-1" />
              <span className="text-sm">Customer Support</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}