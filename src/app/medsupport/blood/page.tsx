'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  Search,
  Filter,
  Droplets,
  MapPin,
  Phone,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Users,
  Heart,
  Shield,
  Truck,
  Calendar
} from 'lucide-react'

export default function BloodServices() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState('all')

  const bloodBanks = [
    {
      id: 1,
      name: 'City Blood Bank',
      type: 'Government',
      address: '123 Medical Center, Downtown',
      distance: '2.3 km',
      rating: 4.5,
      reviews: 89,
      phone: '+91 98765 43210',
      hours: '24/7',
      verified: true,
      availability: {
        'A+': { status: 'Available', units: 45 },
        'A-': { status: 'Low Stock', units: 8 },
        'B+': { status: 'Low Stock', units: 12 },
        'B-': { status: 'Not Available', units: 0 },
        'O+': { status: 'Available', units: 67 },
        'O-': { status: 'Available', units: 23 },
        'AB+': { status: 'Not Available', units: 0 },
        'AB-': { status: 'Low Stock', units: 5 }
      },
      services: ['Blood Collection', 'Blood Testing', 'Emergency Supply', 'Platelet Donation']
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank',
      type: 'NGO',
      address: '456 Health Street, Central',
      distance: '3.1 km',
      rating: 4.8,
      reviews: 156,
      phone: '+91 98765 43211',
      hours: '6:00 AM - 10:00 PM',
      verified: true,
      availability: {
        'A+': { status: 'Available', units: 32 },
        'A-': { status: 'Available', units: 15 },
        'B+': { status: 'Available', units: 28 },
        'B-': { status: 'Low Stock', units: 7 },
        'O+': { status: 'Low Stock', units: 18 },
        'O-': { status: 'Available', units: 34 },
        'AB+': { status: 'Available', units: 12 },
        'AB-': { status: 'Available', units: 9 }
      },
      services: ['Blood Collection', 'Plasma Donation', 'Mobile Blood Drive', 'Health Screening']
    },
    {
      id: 3,
      name: 'Apollo Blood Bank',
      type: 'Private',
      address: '789 Apollo Hospital, North',
      distance: '4.5 km',
      rating: 4.6,
      reviews: 234,
      phone: '+91 98765 43212',
      hours: '24/7',
      verified: true,
      availability: {
        'A+': { status: 'Available', units: 56 },
        'A-': { status: 'Available', units: 22 },
        'B+': { status: 'Available', units: 41 },
        'B-': { status: 'Available', units: 18 },
        'O+': { status: 'Available', units: 78 },
        'O-': { status: 'Available', units: 45 },
        'AB+': { status: 'Available', units: 25 },
        'AB-': { status: 'Available', units: 16 }
      },
      services: ['Blood Collection', 'Component Separation', 'Cross Matching', 'Emergency Supply']
    }
  ]

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  const bankTypes = ['Government', 'NGO', 'Private']

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'all' || bank.type === selectedType
    
    const matchesBloodType = selectedBloodTypes.length === 0 || 
                            selectedBloodTypes.some(type => 
                              bank.availability[type as keyof typeof bank.availability]?.status === 'Available'
                            )
    
    return matchesSearch && matchesType && matchesBloodType
  })

  const toggleBloodType = (type: string) => {
    setSelectedBloodTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'Low Stock':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Not Available':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
    }
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader title="Blood Services" subtitle="Find Blood Banks & Request Supply" module="medsupport" showProfile={false} showClose={true} />

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide pb-20">
        {/* Emergency Banner */}
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Emergency Blood Request</h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                Need blood urgently? Call our 24/7 emergency hotline for immediate assistance.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
              >
                <Phone className="w-3 h-3 mr-1" />
                Emergency Hotline: 1800-BLOOD
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blood banks by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button variant="primary">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Blood Type Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blood Type (select multiple):</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBloodTypes([])}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedBloodTypes.length === 0
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                All Types
              </button>
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleBloodType(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedBloodTypes.includes(type)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {type}
                  {selectedBloodTypes.includes(type) && <span className="ml-1">✓</span>}
                </button>
              ))}
            </div>
            {selectedBloodTypes.length > 0 && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {selectedBloodTypes.length} blood type(s) selected: {selectedBloodTypes.join(', ')}
              </p>
            )}
          </div>
          
          {/* Bank Type Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank Type:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedType === 'all'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                All
              </button>
              {bankTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedType === type
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {filteredBloodBanks.length} blood banks found
          </p>
        </div>

        {/* Blood Banks List */}
        <div className="space-y-4">
          {filteredBloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{bank.name}</h3>
                    {bank.verified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      bank.type === 'Government' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : bank.type === 'NGO'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {bank.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{bank.address}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{bank.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{bank.rating} ({bank.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{bank.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Blood Availability Grid */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blood Availability:</p>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(bank.availability).map(([type, info]) => (
                    <div key={type} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{type}</p>
                      <p className={`text-xs px-1 py-0.5 rounded ${getStatusColor(info.status)}`}>
                        {info.status}
                      </p>
                      {info.units > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{info.units} units</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Services */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {bank.services.map((service, index) => (
                    <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  Directions
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  <Heart className="w-3 h-3 mr-1" />
                  Request Blood
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBloodBanks.length === 0 && (
          <div className="text-center py-8">
            <Droplets className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blood banks found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Donation Information */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400 mt-1" />
            <div>
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Become a Blood Donor</h3>
              <p className="text-sm text-pink-800 dark:text-pink-200 mb-3">
                Your blood donation can save up to 3 lives. Join our community of heroes 
                and help ensure blood is available when needed most.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-pink-300 text-pink-700 hover:bg-pink-100 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/30"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Register as Donor
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-pink-300 text-pink-700 hover:bg-pink-100 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/30"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule Donation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}