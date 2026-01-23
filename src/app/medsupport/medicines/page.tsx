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
  Pill,
  TrendingDown,
  Star,
  MapPin,
  Truck,
  ShoppingCart
} from 'lucide-react'

export default function MedicineSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('price')

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      category: 'Pain Relief',
      manufacturer: 'Cipla',
      lowestPrice: 45,
      averagePrice: 65,
      savings: 31,
      pharmacies: 12,
      prescription: false,
      inStock: true,
      rating: 4.5,
      reviews: 234,
      fastDelivery: true,
      alternatives: ['Crocin', 'Dolo 650']
    },
    {
      id: 2,
      name: 'Crocin Advance',
      genericName: 'Paracetamol',
      category: 'Pain Relief',
      manufacturer: 'GSK',
      lowestPrice: 52,
      averagePrice: 78,
      savings: 33,
      pharmacies: 8,
      prescription: false,
      inStock: true,
      rating: 4.3,
      reviews: 156,
      fastDelivery: true,
      alternatives: ['Paracetamol', 'Dolo 650']
    },
    {
      id: 3,
      name: 'Metformin 500mg',
      genericName: 'Metformin HCl',
      category: 'Diabetes',
      manufacturer: 'Sun Pharma',
      lowestPrice: 85,
      averagePrice: 120,
      savings: 29,
      pharmacies: 15,
      prescription: true,
      inStock: true,
      rating: 4.7,
      reviews: 89,
      fastDelivery: false,
      alternatives: ['Glycomet', 'Obimet']
    },
    {
      id: 4,
      name: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      category: 'Antibiotic',
      manufacturer: 'Ranbaxy',
      lowestPrice: 120,
      averagePrice: 180,
      savings: 33,
      pharmacies: 6,
      prescription: true,
      inStock: false,
      rating: 4.6,
      reviews: 67,
      fastDelivery: false,
      alternatives: ['Augmentin', 'Clavam']
    },
    {
      id: 5,
      name: 'Cetirizine 10mg',
      genericName: 'Cetirizine HCl',
      category: 'Allergy',
      manufacturer: 'Dr. Reddy\'s',
      lowestPrice: 35,
      averagePrice: 55,
      savings: 36,
      pharmacies: 10,
      prescription: false,
      inStock: true,
      rating: 4.4,
      reviews: 123,
      fastDelivery: true,
      alternatives: ['Zyrtec', 'Alerid']
    },
    {
      id: 6,
      name: 'Adol 500mg',
      genericName: 'Paracetamol',
      category: 'Pain Relief',
      manufacturer: 'Julphar',
      lowestPrice: 38,
      averagePrice: 58,
      savings: 34,
      pharmacies: 9,
      prescription: false,
      inStock: true,
      rating: 4.2,
      reviews: 98,
      fastDelivery: true,
      alternatives: ['Paracetamol', 'Crocin']
    },
    {
      id: 7,
      name: 'Aspirin 75mg',
      genericName: 'Acetylsalicylic Acid',
      category: 'Heart',
      manufacturer: 'Bayer',
      lowestPrice: 65,
      averagePrice: 95,
      savings: 32,
      pharmacies: 14,
      prescription: false,
      inStock: true,
      rating: 4.6,
      reviews: 187,
      fastDelivery: true,
      alternatives: ['Ecosprin', 'Disprin']
    },
    {
      id: 8,
      name: 'Amlodipine 5mg',
      genericName: 'Amlodipine Besylate',
      category: 'Blood Pressure',
      manufacturer: 'Pfizer',
      lowestPrice: 95,
      averagePrice: 140,
      savings: 32,
      pharmacies: 11,
      prescription: true,
      inStock: true,
      rating: 4.5,
      reviews: 145,
      fastDelivery: false,
      alternatives: ['Norvasc', 'Amlong']
    },
    {
      id: 9,
      name: 'Vitamin D3 60000 IU',
      genericName: 'Cholecalciferol',
      category: 'Vitamins',
      manufacturer: 'Sun Pharma',
      lowestPrice: 125,
      averagePrice: 180,
      savings: 31,
      pharmacies: 13,
      prescription: false,
      inStock: true,
      rating: 4.4,
      reviews: 203,
      fastDelivery: true,
      alternatives: ['Calcirol', 'Uprise D3']
    },
    {
      id: 10,
      name: 'Omeprazole 20mg',
      genericName: 'Omeprazole',
      category: 'Gastric',
      manufacturer: 'Dr. Reddy\'s',
      lowestPrice: 78,
      averagePrice: 115,
      savings: 32,
      pharmacies: 16,
      prescription: true,
      inStock: true,
      rating: 4.7,
      reviews: 167,
      fastDelivery: true,
      alternatives: ['Prilosec', 'Omez']
    }
  ]

  const categories = [
    'All',
    'Pain Relief',
    'Diabetes',
    'Antibiotic',
    'Allergy',
    'Heart',
    'Blood Pressure',
    'Vitamins',
    'Gastric'
  ]

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         selectedFilter === 'prescription' && medicine.prescription ||
                         selectedFilter === 'otc' && !medicine.prescription ||
                         selectedFilter === 'instock' && medicine.inStock ||
                         medicine.category.toLowerCase() === selectedFilter.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.lowestPrice - b.lowestPrice
      case 'savings':
        return b.savings - a.savings
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader title="Medicine Search" subtitle="Compare Prices Across Pharmacies" module="medsupport" showProfile={false} showClose={true} />

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide pb-20">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex space-x-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines by name, condition, or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button variant="primary">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {['all', 'prescription', 'otc', 'instock'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {filter === 'all' && 'All'}
                {filter === 'prescription' && 'Prescription'}
                {filter === 'otc' && 'Over Counter'}
                {filter === 'instock' && 'In Stock'}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="price">Lowest Price</option>
              <option value="savings">Highest Savings</option>
              <option value="rating">Highest Rating</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {sortedMedicines.length} medicines found
          </p>
        </div>

        {/* Medicine List */}
        <div className="space-y-4">
          {sortedMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{medicine.name}</h3>
                    {medicine.prescription && (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded">
                        Rx
                      </span>
                    )}
                    {!medicine.inStock && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {medicine.genericName} • {medicine.category} • {medicine.manufacturer}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{medicine.rating} ({medicine.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{medicine.pharmacies} pharmacies</span>
                    </div>
                    {medicine.fastDelivery && (
                      <div className="flex items-center space-x-1">
                        <Truck className="w-3 h-3 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Fast delivery</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">₹{medicine.lowestPrice}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{medicine.averagePrice}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                      {medicine.savings}% DISCOUNT
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Alternatives */}
              {medicine.alternatives.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alternatives:</p>
                  <div className="flex flex-wrap gap-1">
                    {medicine.alternatives.map((alt, index) => (
                      <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push(`/medsupport/medicines/${medicine.id}`)}
                  >
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Compare
                  </Button>
                </div>
                
                {medicine.inStock ? (
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => router.push(`/medsupport/medicines/${medicine.id}?action=order`)}
                    className="bg-green-500 hover:bg-green-600 text-white shadow-md border border-green-500"
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Order Now
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Notify When Available
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedMedicines.length === 0 && (
          <div className="text-center py-8">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No medicines found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}