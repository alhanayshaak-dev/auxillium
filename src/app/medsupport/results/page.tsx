'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  TrendingDown,
  Star,
  MapPin,
  Truck,
  ShoppingCart,
  Phone,
  Shield,
  Clock,
  Check,
  Settings,
  FileText,
  Camera,
  Upload,
  X,
  CreditCard,
  Home,
  Building
} from 'lucide-react'

export default function MedSupportResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const medicineName = searchParams.get('medicine') || 'Medicine'
  const [sortBy, setSortBy] = useState<'price' | 'delivery'>('price')
  const [maxDistance, setMaxDistance] = useState<number>(5) // Default 5km
  const [showDistanceSettings, setShowDistanceSettings] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null)
  const [orderStep, setOrderStep] = useState<'prescription' | 'address' | 'payment' | 'confirmation'>('prescription')
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  // Insurance data from LifeLog Health Tracker
  const userInsurance = {
    primary: {
      provider: 'Star Health Insurance',
      policyNo: 'SH123456',
      coverage: '₹5,00,000',
      validUntil: 'Dec 31, 2025',
      copayPercentage: 20, // 20% copay
      networkPharmacies: ['Apollo Pharmacy', 'MedPlus', 'Wellness Forever']
    },
    family: {
      provider: 'ICICI Lombard',
      policyNo: 'IL789012', 
      coverage: '₹3,00,000',
      validUntil: 'Mar 15, 2026',
      copayPercentage: 25, // 25% copay
      networkPharmacies: ['Apollo Pharmacy', 'Local Medical Store']
    }
  }

  // Function to get pharmacy results based on search query
  const getPharmacyResultsForMedicine = (medicineName: string) => {
    const baseResults = [
      {
        id: 1,
        name: 'Apollo Pharmacy',
        distance: 1.2,
        deliveryAvailable: true,
        deliveryTime: '30 mins',
        price: Math.floor(Math.random() * 50) + 30,
        originalPrice: Math.floor(Math.random() * 30) + 60,
        discount: Math.floor(Math.random() * 40) + 20,
        rating: 4.8,
        reviews: 234,
        inStock: Math.random() > 0.2,
        verified: true,
        networkPharmacy: true,
        prescriptionRequired: true
      },
      {
        id: 2,
        name: 'MedPlus',
        distance: 2.1,
        deliveryAvailable: true,
        deliveryTime: '45 mins',
        price: Math.floor(Math.random() * 50) + 35,
        originalPrice: Math.floor(Math.random() * 30) + 65,
        discount: Math.floor(Math.random() * 40) + 25,
        rating: 4.6,
        reviews: 156,
        inStock: Math.random() > 0.3,
        verified: true,
        networkPharmacy: true,
        prescriptionRequired: true
      },
      {
        id: 3,
        name: 'Wellness Forever',
        distance: 0.8,
        deliveryAvailable: false,
        deliveryTime: 'Pickup only',
        price: Math.floor(Math.random() * 40) + 25,
        originalPrice: Math.floor(Math.random() * 25) + 50,
        discount: Math.floor(Math.random() * 45) + 30,
        rating: 4.7,
        reviews: 98,
        inStock: Math.random() > 0.1,
        verified: true,
        networkPharmacy: true,
        prescriptionRequired: false
      },
      {
        id: 4,
        name: 'Local Medical Store',
        distance: 3.5,
        deliveryAvailable: true,
        deliveryTime: '60 mins',
        price: Math.floor(Math.random() * 45) + 30,
        originalPrice: Math.floor(Math.random() * 25) + 55,
        discount: Math.floor(Math.random() * 35) + 15,
        rating: 4.2,
        reviews: 67,
        inStock: Math.random() > 0.4,
        verified: false,
        networkPharmacy: true,
        prescriptionRequired: true
      },
      {
        id: 5,
        name: 'HealthPlus Pharmacy',
        distance: 6.2,
        deliveryAvailable: true,
        deliveryTime: '90 mins',
        price: Math.floor(Math.random() * 40) + 28,
        originalPrice: Math.floor(Math.random() * 25) + 52,
        discount: Math.floor(Math.random() * 35) + 18,
        rating: 4.4,
        reviews: 89,
        inStock: Math.random() > 0.3,
        verified: true,
        networkPharmacy: false,
        prescriptionRequired: false
      }
    ]
    
    // Filter by distance preference
    return baseResults.filter(pharmacy => pharmacy.distance <= maxDistance)
  }

  // Get insurance coverage for a pharmacy
  const getInsuranceCoverage = (pharmacyName: string, price: number) => {
    const isPrimaryNetwork = userInsurance.primary.networkPharmacies.includes(pharmacyName)
    const isFamilyNetwork = userInsurance.family.networkPharmacies.includes(pharmacyName)
    
    if (isPrimaryNetwork) {
      const copay = Math.round(price * (userInsurance.primary.copayPercentage / 100))
      return {
        covered: true,
        provider: userInsurance.primary.provider,
        policyNo: userInsurance.primary.policyNo,
        copay: copay,
        coverageAmount: price - copay,
        claimProcess: 'Direct billing',
        networkType: 'Primary Insurance'
      }
    } else if (isFamilyNetwork) {
      const copay = Math.round(price * (userInsurance.family.copayPercentage / 100))
      return {
        covered: true,
        provider: userInsurance.family.provider,
        policyNo: userInsurance.family.policyNo,
        copay: copay,
        coverageAmount: price - copay,
        claimProcess: 'Reimbursement',
        networkType: 'Family Insurance'
      }
    } else {
      return {
        covered: false,
        provider: 'Not covered',
        policyNo: '',
        copay: price,
        coverageAmount: 0,
        claimProcess: 'Self-pay',
        networkType: 'Out of Network'
      }
    }
  }

  // Sample addresses for user selection
  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Downtown, City - 400001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Corporate District, City - 400002',
      isDefault: false
    }
  ]

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'UPI',
      details: 'Google Pay ****1234',
      icon: '📱'
    },
    {
      id: 2,
      type: 'Card',
      details: 'HDFC Bank ****5678',
      icon: '💳'
    },
    {
      id: 3,
      type: 'Cash',
      details: 'Cash on Delivery',
      icon: '💵'
    }
  ]

  const handleOrderClick = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy)
    setShowOrderModal(true)
    // Check if prescription is required and set appropriate step
    if (pharmacy.prescriptionRequired && !prescriptionUploaded) {
      setOrderStep('prescription')
    } else {
      setOrderStep('address')
    }
  }

  const handlePrescriptionUpload = () => {
    // Simulate prescription upload
    setPrescriptionUploaded(true)
    setOrderStep('address')
  }

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId)
  }

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayment(paymentId)
  }

  const proceedToNextStep = () => {
    if (orderStep === 'address' && selectedAddress) {
      setOrderStep('payment')
    } else if (orderStep === 'payment' && selectedPayment) {
      setOrderStep('confirmation')
    }
  }

  const closeOrderModal = () => {
    setShowOrderModal(false)
    setSelectedPharmacy(null)
    setOrderStep('prescription')
    setSelectedAddress('')
    setSelectedPayment('')
  }

  const confirmOrder = () => {
    // Process the order
    alert('Order placed successfully!')
    closeOrderModal()
  }

  const pharmacyResults = getPharmacyResultsForMedicine(medicineName)

  const getSortedResults = () => {
    return [...pharmacyResults].sort((a, b) => {
      // Always show in-stock items first
      if (a.inStock && !b.inStock) return -1
      if (!a.inStock && b.inStock) return 1
      
      if (sortBy === 'price') {
        return a.price - b.price
      } else {
        // Sort by delivery time - only consider pharmacies that offer delivery
        // Pharmacies without delivery go to the bottom
        if (a.deliveryAvailable && !b.deliveryAvailable) return -1
        if (!a.deliveryAvailable && b.deliveryAvailable) return 1
        
        // If both have delivery, sort by delivery time
        if (a.deliveryAvailable && b.deliveryAvailable) {
          const getDeliveryMinutes = (time: string) => {
            if (time === 'Pickup only') return 999
            return parseInt(time.replace(' mins', ''))
          }
          return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime)
        }
        
        // If neither has delivery, maintain original order
        return 0
      }
    })
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader 
        title="Medicine Results" 
        subtitle="" 
        module="medsupport" 
        showBack={false}
        showProfile={false}
      />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Go Back to Medicine Link */}
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Close results</span>
          </button>
        </div>

        {/* Sort Controls - Compact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2 mb-3 shadow-sm">
          {/* Sort by section */}
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Sort by:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setSortBy('price')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
                  sortBy === 'price'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy('delivery')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
                  sortBy === 'delivery'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Delivery Time
              </button>
            </div>
          </div>

          {/* Maximum Distance section */}
          <div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Maximum Distance:</span>
            <button
              onClick={() => setShowDistanceSettings(!showDistanceSettings)}
              className="flex items-center justify-between w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{maxDistance}km radius</span>
              </div>
              <Settings className="w-3 h-3" />
            </button>

            {/* Distance Settings Dropdown */}
            {showDistanceSettings && (
              <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Select maximum distance:</p>
                <div className="flex space-x-1">
                  {[1, 2, 5, 10, 15].map((distance) => (
                    <button
                      key={distance}
                      onClick={() => {
                        setMaxDistance(distance)
                        setShowDistanceSettings(false)
                      }}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        maxDistance === distance
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                      }`}
                    >
                      {distance}km
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header - Medicine Name */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Results for {medicineName}
          </h2>
        </div>

        {/* Global Prescription Requirement Notice - Compact */}
        {pharmacyResults.length > 0 && pharmacyResults[0].prescriptionRequired && (
          <div className="mb-4 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-800 dark:text-orange-200">
                Prescription Required for this Medicine*
              </span>
            </div>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              You will need to upload a valid prescription while placing the order from a pharmacy.
            </p>
          </div>
        )}

        {/* Pharmacy Comparison Results */}
        <div className="space-y-3">
          {getSortedResults().map((pharmacy) => {
            const insurance = getInsuranceCoverage(pharmacy.name, pharmacy.price)
            return (
              <div 
                key={pharmacy.id} 
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 ${
                  pharmacy.inStock 
                    ? 'border-green-200 dark:border-green-800' 
                    : 'border-gray-200 dark:border-gray-700 opacity-75'
                }`}
              >
                {/* First Line: Pharmacy Name (left) and In Stock status (right) */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{pharmacy.name}</h3>
                    {pharmacy.verified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div>
                    {pharmacy.inStock ? (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Second Line: Rating (left) and Discount Offer (right) */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{pharmacy.rating} ({pharmacy.reviews})</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                      {pharmacy.discount}% OFF
                    </span>
                  </div>
                </div>

                {/* Third Line: Distance & Time (left) and Price (right) */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pharmacy.distance}km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{pharmacy.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600 dark:text-green-400">₹{pharmacy.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{pharmacy.originalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Fourth Line: Pickup/Delivery Status (under distance and time) */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {pharmacy.deliveryAvailable ? (
                      <span className="text-green-600 dark:text-green-400">Pickup & Delivery Available</span>
                    ) : (
                      <span className="text-orange-600 dark:text-orange-400">Pickup Only</span>
                    )}
                  </div>
                </div>

                {/* Insurance Information - Simplified */}
                <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Insurance</span>
                    </div>
                    {insurance.covered ? (
                      <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                        Applied
                      </span>
                    ) : (
                      <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                        Not Covered
                      </span>
                    )}
                  </div>
                  {insurance.covered ? (
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>Your insurance is applied • You pay: ₹{insurance.copay}</p>
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>Your insurance does not cover this pharmacy</p>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                  </div>
                  
                  {pharmacy.inStock ? (
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleOrderClick(pharmacy)}
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
            )
          })}
        </div>

        {/* Best Option Recommendation */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mt-4">
          <div className="flex items-start space-x-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Recommended Option</h3>
              <p className="text-sm text-green-800 dark:text-green-200">
                Based on your preferences, we recommend the pharmacy with the best combination of 
                price, delivery time, and insurance coverage for this medicine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedPharmacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[60vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Order from {selectedPharmacy.name}</h3>
                <button 
                  onClick={closeOrderModal}
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(60vh - 45px)' }}>
              {/* Prescription Step */}
              {orderStep === 'prescription' && (
                <div className="space-y-3">
                  <div className="text-center">
                    <FileText className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Upload Prescription</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      This medicine requires a valid prescription. Please upload or scan your prescription to continue.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handlePrescriptionUpload}
                      className="w-full p-3 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Camera className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Scan Prescription</span>
                      </div>
                    </button>

                    <button
                      onClick={handlePrescriptionUpload}
                      className="w-full p-3 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Upload className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Upload from Gallery</span>
                      </div>
                    </button>

                    {prescriptionUploaded && (
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs text-green-800 dark:text-green-200">Prescription uploaded successfully</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Address Step */}
              {orderStep === 'address' && (
                <div className="space-y-3">
                  <div className="text-center">
                    <Home className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Delivery Address</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Select or add a delivery address for your order.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {savedAddresses.map((address) => (
                      <button
                        key={address.id}
                        onClick={() => handleAddressSelection(address.id.toString())}
                        className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                          selectedAddress === address.id.toString()
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-0.5">
                            {address.type === 'Home' ? (
                              <Home className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <Building className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1 mb-0.5">
                              <span className="text-xs font-medium text-gray-900 dark:text-white">{address.type}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{address.address}</p>
                          </div>
                        </div>
                      </button>
                    ))}

                    <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">+</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Add New Address</span>
                      </div>
                    </button>
                  </div>

                  {selectedAddress && (
                    <Button 
                      onClick={proceedToNextStep}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2"
                    >
                      Continue to Payment
                    </Button>
                  )}
                </div>
              )}

              {/* Payment Step */}
              {orderStep === 'payment' && (
                <div className="space-y-3">
                  <div className="text-center">
                    <CreditCard className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Payment Method</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Choose your preferred payment method.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelection(method.id.toString())}
                        className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                          selectedPayment === method.id.toString()
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{method.icon}</span>
                          <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white">{method.type}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{method.details}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPayment && (
                    <Button 
                      onClick={proceedToNextStep}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2"
                    >
                      Review Order
                    </Button>
                  )}
                </div>
              )}

              {/* Confirmation Step */}
              {orderStep === 'confirmation' && (
                <div className="space-y-3">
                  <div className="text-center">
                    <Check className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Order Summary</h4>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="text-xs font-medium text-gray-900 dark:text-white mb-1">Pharmacy</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{selectedPharmacy.name}</p>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="text-xs font-medium text-gray-900 dark:text-white mb-1">Delivery Address</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {savedAddresses.find(addr => addr.id.toString() === selectedAddress)?.address}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h5 className="text-xs font-medium text-gray-900 dark:text-white mb-1">Payment Method</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {paymentMethods.find(method => method.id.toString() === selectedPayment)?.details}
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-900 dark:text-white">Total Amount</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{selectedPharmacy.price}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={confirmOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2"
                  >
                    Confirm Order
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}