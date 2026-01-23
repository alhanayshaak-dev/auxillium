'use client'

import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Search, MapPin, Clock, Star, Phone, Navigation, Filter, Shield, Pill, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Screen B: Pharmacy Locator & Services
export default function PharmacyLocator() {
  const router = useRouter()

  const handleEmergencyClick = () => {
    router.push('/emergency/e1')
  }
  const nearbyPharmacies = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      address: '123 Main Street, Downtown',
      distance: '0.5 km',
      rating: 4.8,
      isOpen: true,
      closingTime: '10:00 PM',
      services: ['Prescription', 'OTC', 'Home Delivery', 'Consultation'],
      phone: '+1 (555) 123-4567',
      estimatedTime: '15 mins'
    },
    {
      id: 2,
      name: 'MediCare Central',
      address: '456 Oak Avenue, City Center',
      distance: '1.2 km',
      rating: 4.6,
      isOpen: true,
      closingTime: '9:00 PM',
      services: ['Prescription', 'OTC', 'Health Checkup', 'Insurance'],
      phone: '+1 (555) 987-6543',
      estimatedTime: '20 mins'
    },
    {
      id: 3,
      name: '24/7 Express Pharmacy',
      address: '789 Pine Road, Medical District',
      distance: '2.1 km',
      rating: 4.4,
      isOpen: true,
      closingTime: '24 Hours',
      services: ['Prescription', 'OTC', 'Emergency', 'Home Delivery'],
      phone: '+1 (555) 246-8135',
      estimatedTime: '25 mins'
    },
    {
      id: 4,
      name: 'Community Wellness Pharmacy',
      address: '321 Elm Street, Residential Area',
      distance: '3.5 km',
      rating: 4.7,
      isOpen: false,
      closingTime: 'Closed - Opens 8:00 AM',
      services: ['Prescription', 'OTC', 'Consultation', 'Vaccination'],
      phone: '+1 (555) 369-2580',
      estimatedTime: '30 mins'
    }
  ]

  const quickServices = [
    { name: 'Prescription Refill', icon: '💊' },
    { name: 'Home Delivery', icon: '🚚' },
    { name: 'Health Checkup', icon: '🩺' },
    { name: 'Vaccination', icon: '💉' },
    { name: 'Insurance Claims', icon: '📋' },
    { name: 'Emergency Medicine', icon: '🚨' }
  ]

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-black text-sm bg-gray-50 pt-2">
        <span className="font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black rounded"></div>
            <div className="w-1 h-3 bg-black rounded"></div>
            <div className="w-1 h-3 bg-black rounded"></div>
            <div className="w-1 h-3 bg-black opacity-50 rounded"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Pharmacy Locator</h1>
            <p className="text-sm text-orange-600">Find Nearby Pharmacies</p>
          </div>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-orange-600" />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Search and Filter */}
        <div className="mb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pharmacy or medicine..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="primary" size="sm">
              <MapPin className="w-4 h-4 mr-1" />
              Nearby
            </Button>
            <Button variant="outline" size="sm">24/7 Open</Button>
            <Button variant="outline" size="sm">Home Delivery</Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Services */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Services</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, index) => (
              <Button key={index} variant="outline" className="h-20 flex-col space-y-2">
                <span className="text-2xl">{service.icon}</span>
                <span className="text-xs text-center">{service.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Nearby Pharmacies */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nearby Pharmacies</h2>
          <div className="space-y-4">
            {nearbyPharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{pharmacy.name}</h3>
                      {pharmacy.isOpen ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Open
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Closed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pharmacy.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{pharmacy.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{pharmacy.estimatedTime}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pharmacy.address}</p>
                    <p className="text-sm text-gray-500">
                      {pharmacy.isOpen ? `Closes at ${pharmacy.closingTime}` : pharmacy.closingTime}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {pharmacy.services.map((service, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Order Online
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-red-900 mb-2">Emergency Medicine</h3>
          <p className="text-sm text-red-700 mb-3">
            Need urgent medication? Call our 24/7 emergency pharmacy hotline for immediate assistance.
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
              <Phone className="w-4 h-4 mr-1" />
              Emergency Hotline
            </Button>
            <Button variant="outline" size="sm">
              Find 24/7 Pharmacy
            </Button>
          </div>
        </div>

        {/* Emergency Button */}
        <button
          onClick={handleEmergencyClick}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2 mb-1"
        >
          <Shield className="w-5 h-5" />
          <span className="text-sm">EMERGENCY</span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}