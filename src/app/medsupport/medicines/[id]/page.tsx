'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  Pill,
  Star,
  MapPin,
  Truck,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Heart,
  Info,
  TrendingDown,
  Phone,
  MessageSquare
} from 'lucide-react'

export default function MedicineDetails() {
  const router = useRouter()
  const params = useParams()
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null)

  // Mock data - in real app, fetch based on params.id
  const medicine = {
    id: 1,
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    manufacturer: 'Cipla',
    description: 'Paracetamol is a pain reliever and fever reducer. It is used to treat mild to moderate pain and to reduce fever.',
    activeIngredient: 'Paracetamol 500mg',
    dosageForm: 'Tablet',
    packSize: '10 tablets',
    prescription: false,
    rating: 4.5,
    reviews: 234,
    uses: [
      'Headache relief',
      'Fever reduction',
      'Muscle pain',
      'Toothache',
      'Cold and flu symptoms'
    ],
    sideEffects: [
      'Nausea (rare)',
      'Skin rash (rare)',
      'Liver damage (with overdose)'
    ],
    precautions: [
      'Do not exceed recommended dose',
      'Avoid alcohol while taking this medication',
      'Consult doctor if symptoms persist',
      'Not recommended for children under 6 years'
    ],
    alternatives: [
      { name: 'Crocin Advance', price: 52 },
      { name: 'Dolo 650', price: 48 },
      { name: 'Metacin', price: 42 }
    ]
  }

  const pharmacyPrices = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      price: 45,
      originalPrice: 65,
      discount: 31,
      deliveryTime: '30 mins',
      deliveryFee: 0,
      rating: 4.8,
      distance: '1.2 km',
      inStock: true,
      verified: true,
      offers: ['Free delivery on orders above ₹500', '15% off on first order']
    },
    {
      id: 2,
      name: 'MedPlus',
      price: 48,
      originalPrice: 68,
      discount: 29,
      deliveryTime: '45 mins',
      deliveryFee: 25,
      rating: 4.6,
      distance: '2.1 km',
      inStock: true,
      verified: true,
      offers: ['10% cashback with MedPlus card']
    },
    {
      id: 3,
      name: 'Wellness Forever',
      price: 42,
      originalPrice: 62,
      discount: 32,
      deliveryTime: '25 mins',
      deliveryFee: 0,
      rating: 4.7,
      distance: '0.8 km',
      inStock: true,
      verified: true,
      offers: ['Same day delivery', '20% off on orders above ₹300']
    },
    {
      id: 4,
      name: 'Local Pharmacy',
      price: 55,
      originalPrice: 65,
      discount: 15,
      deliveryTime: '60 mins',
      deliveryFee: 30,
      rating: 4.2,
      distance: '3.5 km',
      inStock: false,
      verified: false,
      offers: []
    }
  ]

  const sortedPharmacies = [...pharmacyPrices].sort((a, b) => a.price - b.price)

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader title={medicine.name} subtitle="Medicine Details" module="medsupport" showProfile={false} showClose={true} />

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide pb-20">
        {/* Medicine Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 rounded-xl flex items-center justify-center">
              <Pill className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{medicine.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{medicine.genericName}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{medicine.category}</span>
                <span>•</span>
                <span>{medicine.manufacturer}</span>
                <span>•</span>
                <span>{medicine.packSize}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{medicine.rating} ({medicine.reviews} reviews)</span>
                </div>
                {!medicine.prescription && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded">
                    No Prescription Required
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm">{medicine.description}</p>
        </div>

        {/* Price Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-green-500" />
            Price Comparison
          </h3>
          
          <div className="space-y-3">
            {sortedPharmacies.map((pharmacy, index) => (
              <div 
                key={pharmacy.id} 
                className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedPharmacy === pharmacy.id
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : pharmacy.inStock
                    ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    : 'border-gray-200 dark:border-gray-700 opacity-50'
                }`}
                onClick={() => pharmacy.inStock && setSelectedPharmacy(pharmacy.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{pharmacy.name}</h4>
                    {index === 0 && pharmacy.inStock && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded">
                        Best Price
                      </span>
                    )}
                    {pharmacy.verified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">₹{pharmacy.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{pharmacy.originalPrice}</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">{pharmacy.discount}% off</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{pharmacy.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{pharmacy.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{pharmacy.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pharmacy.deliveryFee === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free delivery</span>
                    ) : (
                      <span>₹{pharmacy.deliveryFee} delivery</span>
                    )}
                    {pharmacy.inStock ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                {pharmacy.offers.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {pharmacy.offers.map((offer, index) => (
                      <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                        {offer}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Information Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="space-y-4">
            {/* Uses */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Uses
              </h4>
              <ul className="space-y-1">
                {medicine.uses.map((use, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Side Effects */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                Side Effects
              </h4>
              <ul className="space-y-1">
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Precautions */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                Precautions
              </h4>
              <ul className="space-y-1">
                {medicine.precautions.map((precaution, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-blue-500" />
            Alternative Medicines
          </h3>
          
          <div className="space-y-2">
            {medicine.alternatives.map((alt, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-900 dark:text-white">{alt.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">₹{alt.price}</span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Medical Advice?</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Consult with our certified pharmacists for personalized medication guidance 
                and dosage recommendations.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/medsupport/pharmacy')}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Chat with Pharmacist
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call for Advice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      {selectedPharmacy && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Selected Pharmacy:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {sortedPharmacies.find(p => p.id === selectedPharmacy)?.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                ₹{sortedPharmacies.find(p => p.id === selectedPharmacy)?.price}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                + ₹{sortedPharmacies.find(p => p.id === selectedPharmacy)?.deliveryFee || 0} delivery
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push(`/medsupport/pharmacy?medicine=${medicine.id}&pharmacy=${selectedPharmacy}`)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Order Now
          </Button>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}