'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  Pill, 
  Search, 
  Droplets, 
  TrendingDown,
  Star,
  MapPin,
  Truck,
  ShoppingCart,
  Phone,
  Heart,
  Shield,
  AlertCircle,
  Mic,
  Camera,
  Clock,
  X,
  Check,
  QrCode,
  Image,
  FolderOpen,
  List,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

export default function MedSupportHome() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('medicines')
  const [isListening, setIsListening] = useState(false)
  const [showBloodRequest, setShowBloodRequest] = useState(false)
  const [selectedBloodType, setSelectedBloodType] = useState('')
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>([])
  const [requiredUnits, setRequiredUnits] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [showLocationResults, setShowLocationResults] = useState(false)
  const [notifyNGOsHospitals, setNotifyNGOsHospitals] = useState(true)
  const [notifyIndividualDonors, setNotifyIndividualDonors] = useState(false)
  const [activeBloodRequest, setActiveBloodRequest] = useState<any>(null)
  const [showRequestTracker, setShowRequestTracker] = useState(false)
  const [requestAcceptors, setRequestAcceptors] = useState<any[]>([])
  const [showAcceptorsList, setShowAcceptorsList] = useState(false)
  const [userMode, setUserMode] = useState<'receiver' | 'donor'>('receiver')
  const [incomingRequests, setIncomingRequests] = useState<any[]>([])
  const [showRequestCompletion, setShowRequestCompletion] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showBloodHistory, setShowBloodHistory] = useState(false)
  const [historyTab, setHistoryTab] = useState<'receiver' | 'donor'>('receiver')
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'delivery'>('price')
  const [showCameraOptions, setShowCameraOptions] = useState(false)
  const [showMedicineList, setShowMedicineList] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [authenticationInfo, setAuthenticationInfo] = useState('')
  const [isListeningAuth, setIsListeningAuth] = useState(false)
  const [donationHistory, setDonationHistory] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const lifelogInputRef = useRef<HTMLInputElement>(null)
  const cameraOptionsRef = useRef<HTMLDivElement>(null)
  const medicineListRef = useRef<HTMLDivElement>(null)

  // Close camera options and medicine list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cameraOptionsRef.current && !cameraOptionsRef.current.contains(event.target as Node)) {
        setShowCameraOptions(false)
      }
      if (medicineListRef.current && !medicineListRef.current.contains(event.target as Node)) {
        setShowMedicineList(false)
        setSelectedCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Load donation history from localStorage
  useEffect(() => {
    const loadDonationHistory = () => {
      if (typeof window === 'undefined') return
      
      const history = JSON.parse(localStorage.getItem('bloodDonationHistory') || '[]')
      setDonationHistory(history)
    }
    
    loadDonationHistory()
    
    // Listen for storage changes to update history in real-time
    const handleStorageChange = () => {
      loadDonationHistory()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', loadDonationHistory) // Reload when window gets focus
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', loadDonationHistory)
    }
  }, [])

  // Pharmacy comparison results for a searched medicine
  const pharmacyResults = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      distance: '1.2 km',
      deliveryAvailable: true,
      deliveryTime: '30 mins',
      price: 45,
      originalPrice: 65,
      discount: 31,
      rating: 4.8,
      reviews: 234,
      inStock: true,
      verified: true,
      services: ['Home Delivery', '24/7 Support', 'Prescription Upload'],
      insurance: {
        covered: true,
        copay: 15,
        provider: 'Star Health',
        claimProcess: 'Direct billing'
      }
    },
    {
      id: 2,
      name: 'MedPlus',
      distance: '2.1 km',
      deliveryAvailable: true,
      deliveryTime: '45 mins',
      price: 52,
      originalPrice: 78,
      discount: 33,
      rating: 4.6,
      reviews: 156,
      inStock: true,
      verified: true,
      services: ['Express Delivery', 'Medicine Reminder'],
      insurance: {
        covered: true,
        copay: 20,
        provider: 'HDFC ERGO',
        claimProcess: 'Reimbursement'
      }
    },
    {
      id: 3,
      name: 'Wellness Forever',
      distance: '0.8 km',
      deliveryAvailable: false,
      deliveryTime: 'Pickup only',
      price: 38,
      originalPrice: 58,
      discount: 34,
      rating: 4.7,
      reviews: 98,
      inStock: true,
      verified: true,
      services: ['In-store Pickup', 'Consultation'],
      insurance: {
        covered: false,
        copay: 0,
        provider: 'Not covered',
        claimProcess: 'Self-pay'
      }
    },
    {
      id: 4,
      name: 'Local Medical Store',
      distance: '3.5 km',
      deliveryAvailable: true,
      deliveryTime: '60 mins',
      price: 48,
      originalPrice: 65,
      discount: 26,
      rating: 4.2,
      reviews: 67,
      inStock: false,
      verified: false,
      services: ['Home Delivery'],
      insurance: {
        covered: true,
        copay: 25,
        provider: 'ICICI Lombard',
        claimProcess: 'Manual claim'
      }
    }
  ]

  // Medicine categories and commonly used medicines
  const medicineCategories = {
    'Pain Relief': [
      'Paracetamol 500mg',
      'Ibuprofen 400mg',
      'Aspirin 75mg',
      'Diclofenac 50mg',
      'Crocin Advance'
    ],
    'Antibiotics': [
      'Amoxicillin 500mg',
      'Azithromycin 250mg',
      'Ciprofloxacin 500mg',
      'Cephalexin 250mg',
      'Doxycycline 100mg'
    ],
    'Diabetes': [
      'Metformin 500mg',
      'Glimepiride 2mg',
      'Insulin Glargine',
      'Sitagliptin 100mg',
      'Gliclazide 80mg'
    ],
    'Blood Pressure': [
      'Amlodipine 5mg',
      'Telmisartan 40mg',
      'Atenolol 50mg',
      'Ramipril 2.5mg',
      'Losartan 50mg'
    ],
    'Vitamins & Supplements': [
      'Vitamin D3 60000 IU',
      'Vitamin B12 1500mcg',
      'Calcium + Vitamin D',
      'Iron + Folic Acid',
      'Multivitamin Tablets'
    ],
    'Cold & Cough': [
      'Cetirizine 10mg',
      'Dextromethorphan Syrup',
      'Loratadine 10mg',
      'Phenylephrine + Paracetamol',
      'Ambroxol 30mg'
    ],
    'Digestive Health': [
      'Omeprazole 20mg',
      'Pantoprazole 40mg',
      'Domperidone 10mg',
      'Ranitidine 150mg',
      'Probiotics Capsules'
    ],
    'Heart & Cholesterol': [
      'Atorvastatin 20mg',
      'Clopidogrel 75mg',
      'Rosuvastatin 10mg',
      'Aspirin 75mg (Cardio)',
      'Metoprolol 50mg'
    ]
  }

  // Advertisement data
  const advertisements = [
    {
      id: 1,
      pharmacy: "Apollo Pharmacy",
      title: "Free Home Delivery",
      subtitle: "On orders above ₹500 • 24/7 Service",
      image: "🚚",
      bgColor: "from-blue-500 to-blue-700",
      textColor: "text-white",
      logo: "A"
    },
    {
      id: 2,
      pharmacy: "MedPlus",
      title: "Upto 50% OFF",
      subtitle: "On all vitamins & supplements • Best Prices",
      image: "💊",
      bgColor: "from-green-500 to-green-700",
      textColor: "text-white",
      logo: "M+"
    },
    {
      id: 3,
      pharmacy: "Wellness Forever",
      title: "24/7 Emergency",
      subtitle: "Urgent medicines available anytime",
      image: "🏥",
      bgColor: "from-red-500 to-red-700",
      textColor: "text-white",
      logo: "W"
    },
    {
      id: 4,
      pharmacy: "Netmeds",
      title: "Health Checkup",
      subtitle: "Book lab tests at home • Quick Reports",
      image: "🩺",
      bgColor: "from-purple-500 to-purple-700",
      textColor: "text-white",
      logo: "N"
    },
    {
      id: 5,
      pharmacy: "1mg",
      title: "Upload Prescription",
      subtitle: "Get medicines delivered in 30 mins",
      image: "📋",
      bgColor: "from-orange-500 to-orange-700",
      textColor: "text-white",
      logo: "1mg"
    },
    {
      id: 6,
      pharmacy: "PharmEasy",
      title: "Chronic Care",
      subtitle: "Monthly medicine subscription • Save 20%",
      image: "💉",
      bgColor: "from-teal-500 to-teal-700",
      textColor: "text-white",
      logo: "PE"
    }
  ]

  // Blood bank data
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
      }
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
      }
    }
  ]

  // Blood types available for selection
  const bloodTypes = [
    { type: 'A+' },
    { type: 'A-' },
    { type: 'B+' },
    { type: 'B-' },
    { type: 'AB+' },
    { type: 'AB-' },
    { type: 'O+' },
    { type: 'O-' }
  ]

  // Blood availability locations (hospitals, blood banks)
  const bloodLocations = [
    {
      id: 1,
      name: 'City General Hospital',
      type: 'Hospital',
      distance: '1.2 km',
      availableTime: '15 mins',
      address: '123 Medical Center, Downtown',
      phone: '+91 98765 43210',
      available24x7: true
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank',
      type: 'Blood Bank',
      distance: '2.1 km',
      availableTime: '25 mins',
      address: '456 Health Street, Central',
      phone: '+91 98765 43211',
      available24x7: false
    },
    {
      id: 3,
      name: 'Apollo Hospital',
      type: 'Hospital',
      distance: '3.5 km',
      availableTime: '30 mins',
      address: '789 Apollo Road, Medical District',
      phone: '+91 98765 43212',
      available24x7: true
    },
    {
      id: 4,
      name: 'Government Blood Bank',
      type: 'Blood Bank',
      distance: '0.8 km',
      availableTime: '10 mins',
      address: '321 Government Hospital, City Center',
      phone: '+91 98765 43213',
      available24x7: true
    }
  ]

  // Mock data for request acceptors
  const mockAcceptors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      type: 'Hospital',
      organization: 'City General Hospital',
      distance: '1.2 km',
      phone: '+91 98765 43210',
      availableTime: '15 mins',
      bloodType: 'A+',
      acceptedAt: '2 mins ago'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      type: 'Individual Donor',
      organization: 'Volunteer Donor',
      distance: '2.8 km',
      phone: '+91 98765 43211',
      availableTime: '25 mins',
      bloodType: 'A+',
      acceptedAt: '5 mins ago'
    },
    {
      id: 3,
      name: 'Red Cross Blood Bank',
      type: 'NGO',
      organization: 'Red Cross Society',
      distance: '3.1 km',
      phone: '+91 98765 43212',
      availableTime: '30 mins',
      bloodType: 'A+',
      acceptedAt: '8 mins ago'
    }
  ]

  // Mock data for regular donation centers
  const donationCenters = [
    {
      id: 1,
      name: 'Red Cross Blood Bank',
      type: 'NGO',
      address: '456 Health Street, Central',
      distance: '2.1 km',
      hours: '9:00 AM - 6:00 PM',
      phone: '+91 98765 43211',
      rating: 4.8,
      acceptsWalkIn: true
    },
    {
      id: 2,
      name: 'City Blood Bank',
      type: 'Government',
      address: '123 Medical Center, Downtown',
      distance: '2.3 km',
      hours: '24/7',
      phone: '+91 98765 43210',
      rating: 4.5,
      acceptsWalkIn: true
    },
    {
      id: 3,
      name: 'Apollo Blood Center',
      type: 'Private Hospital',
      address: '789 Apollo Road, Medical District',
      distance: '3.5 km',
      hours: '8:00 AM - 8:00 PM',
      phone: '+91 98765 43212',
      rating: 4.7,
      acceptsWalkIn: false
    }
  ]

  // Initialize incoming requests when in donor mode
  useEffect(() => {
    if (userMode === 'donor') {
      // Only show one example request
      setIncomingRequests([
        {
          id: 1,
          bloodType: 'A+',
          units: 2,
          location: 'Apollo Hospital, Sector 15',
          distance: '2.3 km',
          requestedAt: '5 mins ago',
          urgency: 'Critical'
        }
      ])
    } else {
      setIncomingRequests([])
    }
  }, [userMode])

  const handleBloodTypeClick = (bloodType: string) => {
    if (selectedBloodTypes.includes(bloodType)) {
      // Remove if already selected
      setSelectedBloodTypes(prev => prev.filter(type => type !== bloodType))
    } else {
      // Add if not selected
      setSelectedBloodTypes(prev => [...prev, bloodType])
    }
  }

  const handleMultipleBloodTypeRequest = () => {
    if (selectedBloodTypes.length > 0) {
      setSelectedBloodType(selectedBloodTypes.join(', '))
      setShowBloodRequest(true)
    }
  }

  const handleLocationSearch = () => {
    if (requiredUnits && (selectedLocation || useCurrentLocation) && (notifyNGOsHospitals || notifyIndividualDonors)) {
      // Simulate placing a blood request
      const newRequest = {
        id: Date.now(),
        bloodType: selectedBloodType,
        units: requiredUnits,
        location: useCurrentLocation ? 'Current Location' : selectedLocation,
        notifyNGOs: notifyNGOsHospitals,
        notifyIndividuals: notifyIndividualDonors,
        requestedAt: new Date().toISOString(),
        status: 'active'
      }
      
      setActiveBloodRequest(newRequest)
      setShowRequestTracker(true)
      
      // Simulate acceptors responding after a delay
      setTimeout(() => {
        setRequestAcceptors(mockAcceptors)
      }, 2000)
      
      setShowLocationResults(true)
    }
  }

  const closeBloodRequest = () => {
    setShowBloodRequest(false)
    setShowLocationResults(false)
    setSelectedBloodType('')
    setSelectedBloodTypes([])
    setRequiredUnits('')
    setSelectedLocation('')
    setUseCurrentLocation(false)
    setNotifyNGOsHospitals(true)
    setNotifyIndividualDonors(false)
  }

  const completeBloodRequest = () => {
    setShowRequestCompletion(true)
  }

  const closeActiveRequest = () => {
    setActiveBloodRequest(null)
    setShowRequestTracker(false)
    setRequestAcceptors([])
    setShowRequestCompletion(false)
  }

  const acceptBloodRequest = (requestId: number) => {
    setIncomingRequests(prev => prev.filter(req => req.id !== requestId))
    // In a real app, this would send acceptance to the requester
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (activeTab === 'medicines') {
        // Navigate to results page instead of showing inline results
        router.push(`/medsupport/results?medicine=${encodeURIComponent(searchQuery.trim())}`)
      } else {
        router.push(`/medsupport/blood?q=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      const medicine = 'Paracetamol 500mg'
      setSearchQuery(medicine)
      setIsListening(false)
      // Navigate to results page
      router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
    }, 2000)
  }

  const handleMedicineListClick = () => {
    setShowMedicineList(!showMedicineList)
    setSelectedCategory(null)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const handleMedicineSelect = (medicine: string) => {
    setSearchQuery(medicine)
    setShowMedicineList(false)
    setSelectedCategory(null)
    // Navigate to results page
    router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
  }

  const handleCameraClick = () => {
    setShowCameraOptions(!showCameraOptions)
  }

  const handleCameraCapture = () => {
    // Simulate camera capture
    setShowCameraOptions(false)
    setTimeout(() => {
      const medicine = 'Captured: Paracetamol 500mg'
      setSearchQuery(medicine)
      // Navigate to results page
      router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
    }, 1500)
  }

  const handleBarcodeScanning = () => {
    // Simulate barcode scanning
    setShowCameraOptions(false)
    setTimeout(() => {
      const medicine = 'Scanned: Crocin Advance 650mg'
      setSearchQuery(medicine)
      // Navigate to results page
      router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
    }, 2000)
  }

  const handleGalleryUpload = () => {
    fileInputRef.current?.click()
    setShowCameraOptions(false)
  }

  const handleLifeLogUpload = () => {
    lifelogInputRef.current?.click()
    setShowCameraOptions(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate file processing
      setTimeout(() => {
        const medicine = 'Crocin Advance, Vitamin D3'
        setSearchQuery(medicine)
        // Navigate to results page
        router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
      }, 1000)
    }
  }

  const handleLifeLogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate LifeLog file processing
      setTimeout(() => {
        const medicine = 'Paracetamol 500mg (from Dr. Sarah Johnson - Jan 15)'
        setSearchQuery(medicine)
        // Navigate to results page
        router.push(`/medsupport/results?medicine=${encodeURIComponent(medicine)}`)
      }, 1000)
    }
  }

  const clearResults = () => {
    setShowResults(false)
    setSelectedMedicine('')
    setSearchQuery('')
  }

  const handleVoiceAuthentication = () => {
    setIsListeningAuth(true)
    // Simulate voice recognition for authentication
    setTimeout(() => {
      const authInfo = 'Dr. Sarah Johnson, City General Hospital Medical Center, Emergency Department'
      setAuthenticationInfo(authInfo)
      setIsListeningAuth(false)
    }, 2000)
  }

  const getSortedResults = () => {
    return [...pharmacyResults].sort((a, b) => {
      // Always show in-stock items first
      if (a.inStock && !b.inStock) return -1
      if (!a.inStock && b.inStock) return 1
      
      if (sortBy === 'price') {
        return a.price - b.price
      } else {
        // Sort by delivery time (convert to minutes for comparison)
        const getDeliveryMinutes = (time: string) => {
          if (time === 'Pickup only') return 999
          return parseInt(time.replace(' mins', ''))
        }
        return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime)
      }
    })
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
      <AppHeader title="MedSupport" subtitle="Pharmacy & Blood Services" module="medsupport" showProfile={false} />

      {/* Medicine/Blood Toggle Section - Above Content */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
              activeTab === 'medicines'
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Pill className="w-4 h-4 mr-2" />
            Medicines
          </button>
          <button
            onClick={() => setActiveTab('blood')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
              activeTab === 'blood'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Droplets className="w-4 h-4 mr-2" />
            Blood
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-40">
        {/* Sort Bar - Only show when results are displayed */}
        {showResults && activeTab === 'medicines' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 mb-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setSortBy('price')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1 ${
                    sortBy === 'price'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Price
                </button>
                <button
                  onClick={() => setSortBy('delivery')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1 ${
                    sortBy === 'delivery'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Delivery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Medicines Content */}
        {activeTab === 'medicines' && (
          <div className="space-y-4">
            {showResults ? (
              <div>
                {/* Search Results Header */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                        Results for "{selectedMedicine}"
                      </h3>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {pharmacyResults.filter(p => p.inStock).length} pharmacies have this medicine in stock
                      </p>
                    </div>
                    <button
                      onClick={clearResults}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                    >
                      <X className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                </div>

                {/* Pharmacy Comparison Results */}
                <div className="space-y-3">
                  {getSortedResults().map((pharmacy) => (
                    <div 
                      key={pharmacy.id} 
                      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 ${
                        pharmacy.inStock 
                          ? 'border-green-200 dark:border-green-800' 
                          : 'border-gray-200 dark:border-gray-700 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{pharmacy.name}</h3>
                            {pharmacy.verified && (
                              <Shield className="w-4 h-4 text-blue-500" />
                            )}
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
                          
                          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{pharmacy.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{pharmacy.deliveryTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{pharmacy.rating} ({pharmacy.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mb-2">
                            {pharmacy.deliveryAvailable ? (
                              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                <Truck className="w-3 h-3" />
                                <span className="text-xs">Delivery Available</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                                <MapPin className="w-3 h-3" />
                                <span className="text-xs">Pickup Only</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {pharmacy.services.map((service, index) => (
                              <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                                {service}
                              </span>
                            ))}
                          </div>

                          {/* Insurance Information */}
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Shield className="w-3 h-3 text-blue-500" />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Insurance</span>
                              </div>
                              {pharmacy.insurance.covered ? (
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                                  Covered
                                </span>
                              ) : (
                                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                                  Not Covered
                                </span>
                              )}
                            </div>
                            {pharmacy.insurance.covered ? (
                              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between">
                                  <span>Copay: ₹{pharmacy.insurance.copay}</span>
                                  <span>{pharmacy.insurance.provider}</span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                  {pharmacy.insurance.claimProcess}
                                </div>
                              </div>
                            ) : (
                              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                Full payment required
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">₹{pharmacy.price}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{pharmacy.originalPrice}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            <TrendingDown className="w-3 h-3 text-green-500" />
                            <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                              {pharmacy.discount}% OFF
                            </span>
                          </div>
                        </div>
                      </div>
                      
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

                {/* Best Option Recommendation */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Recommended Option</h3>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>Wellness Forever</strong> offers the best price (₹38) and is closest to you (0.8 km), 
                        though pickup is required. For delivery, <strong>Apollo Pharmacy</strong> is your best option 
                        with fast 30-minute delivery at ₹45.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Advertisement Carousel */
              <div className="h-full flex items-center justify-center">
                <div className="w-full">
                  <div className="overflow-hidden rounded-xl">
                    <div className="flex animate-scroll-slow space-x-4 w-max">
                      {/* Duplicate advertisements for seamless loop */}
                      {[...advertisements, ...advertisements].map((ad, index) => (
                        <div 
                          key={`${ad.id}-${index}`}
                          className={`bg-gradient-to-r ${ad.bgColor} rounded-xl p-8 min-w-[320px] h-48 ${ad.textColor} shadow-lg flex flex-col justify-between relative overflow-hidden`}
                        >
                          {/* Pharmacy Logo/Brand */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold">{ad.logo}</span>
                              </div>
                              <span className="text-sm font-medium opacity-90">{ad.pharmacy}</span>
                            </div>
                            <div className="text-3xl opacity-80">{ad.image}</div>
                          </div>
                          
                          {/* Main Content */}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                            <p className="text-base opacity-90 leading-relaxed">{ad.subtitle}</p>
                          </div>
                          
                          {/* Action Button */}
                          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 self-start">
                            Shop Now
                          </button>
                          
                          {/* Decorative Elements */}
                          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
                          <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                      Search for medicines using the search box below
                    </p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Blood Content */}
        {activeTab === 'blood' && (
          <div className="space-y-4">
            {/* Blood Donation Importance Banner */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-3 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-4">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <div className="absolute top-8 right-8">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-4 left-12">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
                <div className="absolute bottom-2 right-4">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-4 right-20">
                  <Heart className="w-2 h-2 text-white fill-current" />
                </div>
              </div>
              
              {/* Main Content */}
              <div className="relative z-10 text-center">
                {/* Heart Symbol - Top Left */}
                <div className="absolute top-0 left-0">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-current animate-pulse" />
                  </div>
                </div>
                
                {/* Top Section - Title Only (Centered) */}
                <div className="mb-3 pt-2">
                  <h3 className="text-sm font-bold text-white">Every drop saves lives</h3>
                </div>
                
                {/* Visual Section - Brotherhood/Community Picture */}
                <div className="flex items-center justify-center mb-3">
                  {/* Three connected people representing community */}
                  <div className="flex items-center -space-x-1">
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-50">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="w-8 h-8 bg-red-400 bg-opacity-80 rounded-full flex items-center justify-center border-2 border-white border-opacity-50 z-10">
                      <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-50">
                      <span className="text-sm">👤</span>
                    </div>
                  </div>
                  {/* Arrow showing flow */}
                  <div className="text-white opacity-80 mx-3">
                    <span className="text-lg">→</span>
                  </div>
                  {/* Lives saved representation */}
                  <div className="flex space-x-1">
                    <Heart className="w-4 h-4 text-yellow-300 fill-current" />
                    <Heart className="w-4 h-4 text-yellow-300 fill-current" />
                    <Heart className="w-4 h-4 text-yellow-300 fill-current" />
                  </div>
                </div>
                
                {/* Middle Section - Donation Impact */}
                <div className="text-white mb-3">
                  <p className="text-xs opacity-90 text-center leading-relaxed">
                    One donation saves three lives.<br/>
                    Be a hero.<br/>
                    Make a life-changing difference today.
                  </p>
                </div>
                
                {/* Bottom Section - Emergency Number with Blood Drop Animation */}
                <div className="text-center relative">
                  {/* Animated blood drops */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 flex space-x-1">
                    <div className="w-1 h-1 bg-red-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-1 h-1 bg-red-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-1 bg-red-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <Phone className="w-3 h-3 text-white" />
                    <span className="text-white font-medium text-xs">Emergency: 1800-BLOOD</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
            </div>

            {/* Blood Request Tracker */}
            {showRequestTracker && activeBloodRequest && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border-2 border-blue-200 dark:border-blue-800 relative">
                {/* Close X button */}
                <button
                  onClick={closeActiveRequest}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                <div className="flex items-center mb-2 pr-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">Active Blood Request</h3>
                  </div>
                </div>
                
                <div className="space-y-2 mb-2">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span className="ml-1 font-medium text-red-600 dark:text-red-400">{activeBloodRequest.bloodType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Units:</span>
                      <span className="ml-1 font-medium">{activeBloodRequest.units}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <MapPin className="w-3 h-3 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{activeBloodRequest.location}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {requestAcceptors.length > 0 ? `${requestAcceptors.length} Responses` : 'Waiting for responses...'}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowAcceptorsList(true)}
                    disabled={requestAcceptors.length === 0}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                  >
                    {requestAcceptors.length === 0 ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                        Waiting...
                      </>
                    ) : (
                      'View'
                    )}
                  </button>
                  <button
                    onClick={completeBloodRequest}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Complete
                  </button>
                </div>
              </div>
            )}

            {/* Donate Button - Integrated directly with Banner */}
            <div className="-mt-6">
              <button
                onClick={() => router.push('/medsupport/donate')}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40 shadow-sm"
              >
                <Droplets className="w-4 h-4 mr-2" />
                Donate Blood
              </button>
            </div>

            {/* Blood Type Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Select required blood types</h3>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {bloodTypes.map((blood) => (
                  <button
                    key={blood.type}
                    onClick={() => handleBloodTypeClick(blood.type)}
                    className={`p-2 rounded-lg border-2 text-center transition-colors flex flex-col items-center justify-center min-h-[45px] relative ${
                      selectedBloodTypes.includes(blood.type)
                        ? 'border-red-500 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                        : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:border-red-400 dark:hover:border-red-600 text-red-800 dark:text-red-200'
                    }`}
                  >
                    <div className="font-bold text-lg">{blood.type}</div>
                    {selectedBloodTypes.includes(blood.type) && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={handleMultipleBloodTypeRequest}
                disabled={selectedBloodTypes.length === 0}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedBloodTypes.length > 0
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Request Blood
              </button>
            </div>

            {/* Blood Donation History Link */}
            <div className="text-center py-2">
              <button 
                onClick={() => setShowBloodHistory(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium underline transition-colors"
              >
                Blood donation history
              </button>
            </div>

            {/* Donor Mode Content */}
            {userMode === 'donor' && (
              <>
                {/* Urgent Blood Requests */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      Blood Requests ({incomingRequests.length})
                    </h3>
                    <button
                      onClick={() => setUserMode('receiver')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  {incomingRequests.length === 0 ? (
                    <div className="text-center py-6">
                      <Droplets className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No urgent requests in your area</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {incomingRequests.map((request) => (
                        <div key={request.id} className="p-3 border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs px-2 py-1 rounded font-medium bg-red-500 text-white">
                                {request.urgency}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{request.requestedAt}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{request.distance}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600 dark:text-red-400">{request.bloodType}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Blood Type</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{request.units}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Units</div>
                            </div>
                            <div className="text-center">
                              <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400 mx-auto mb-1" />
                              <div className="text-xs text-gray-600 dark:text-gray-400">Location</div>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 font-medium">
                            📍 {request.location}
                          </p>
                          
                          <button
                            onClick={() => acceptBloodRequest(request.id)}
                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Accept & Help Save Life
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Regular Donation Centers */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                    Regular Donation Centers
                  </h3>
                  
                  <div className="space-y-3">
                    {donationCenters.map((center) => (
                      <div key={center.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{center.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                center.type === 'Government' 
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                  : center.type === 'NGO'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                              }`}>
                                {center.type}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{center.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{center.distance}</p>
                            {center.acceptsWalkIn && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1 py-0.5 rounded">
                                Walk-in
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          📍 {center.address}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                          🕒 {center.hours}
                        </p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`tel:${center.phone}`)}
                            className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </button>
                          <button className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Search Bar - Fixed at bottom above navigation - Only for medicines */}
      {activeTab === 'medicines' && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-5/6 max-w-xs bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Medicine List Button */}
          <div className="mb-3 relative" ref={medicineListRef}>
            <button
              onClick={handleMedicineListClick}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                showMedicineList
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">Browse Medicines</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMedicineList ? 'rotate-180' : ''}`} />
            </button>

            {/* Medicine Categories Dropdown */}
            {showMedicineList && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {Object.entries(medicineCategories).map(([category, medicines]) => (
                  <div key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600"
                    >
                      <span className="font-medium">{category}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === category ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {/* Medicines in Category */}
                    {selectedCategory === category && (
                      <div className="bg-gray-50 dark:bg-gray-700">
                        {medicines.map((medicine) => (
                          <button
                            key={medicine}
                            onClick={() => handleMedicineSelect(medicine)}
                            className="w-full px-6 py-2 text-left text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
                          >
                            {medicine}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Input Section */}
          <div className="mb-2">
            <div className="flex space-x-1">
              {/* Input Method Icons */}
              <div className="flex space-x-1">
                {/* Voice Input */}
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center min-w-[44px] min-h-[44px] ${
                    isListening
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Mic className={`w-5 h-5 flex-shrink-0 ${isListening ? 'animate-pulse' : ''}`} />
                </button>
                
                {/* Camera with Options */}
                <div className="relative" ref={cameraOptionsRef}>
                  <button
                    onClick={handleCameraClick}
                    className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center min-w-[44px] min-h-[44px] ${
                      showCameraOptions
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Camera className="w-5 h-5 flex-shrink-0" />
                  </button>
                  
                  {showCameraOptions && (
                    <div className="absolute left-0 bottom-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 w-48">
                      <button
                        onClick={handleCameraCapture}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg flex items-center"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Camera
                      </button>
                      <button
                        onClick={handleBarcodeScanning}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Barcode Scanning
                      </button>
                      <button
                        onClick={handleGalleryUpload}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center"
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Upload from Gallery
                      </button>
                      <button
                        onClick={handleLifeLogUpload}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg border-t border-gray-200 dark:border-gray-700 flex items-center"
                      >
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Upload from LifeLog
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Search Input - Elongated */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={isListening ? 'Listening...' : 'Medicine name...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm placeholder:text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  disabled={isListening}
                />
                {showResults && (
                  <button
                    onClick={clearResults}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Enter/Search Button */}
              <button
                onClick={handleSearch}
                className="px-3 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                disabled={!searchQuery.trim() || isListening}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={lifelogInputRef}
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleLifeLogChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Blood Request Modal */}
      {showBloodRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[85vh] min-h-[500px] overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Blood Request - {selectedBloodType}</h3>
                <button 
                  onClick={closeBloodRequest}
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(85vh - 45px)' }}>
              {!showLocationResults ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      How many units required?
                    </label>
                    <input
                      type="number"
                      value={requiredUnits}
                      onChange={(e) => setRequiredUnits(e.target.value)}
                      placeholder="Enter number of units"
                      className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                      min="1"
                      max="10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Where do you need the blood?
                    </label>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setUseCurrentLocation(true)
                          setSelectedLocation('')
                        }}
                        className={`w-full p-2 border-2 rounded-lg text-left transition-colors ${
                          useCurrentLocation
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-red-600 dark:text-red-400" />
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Use My Current Location</span>
                        </div>
                      </button>

                      <div className="text-center text-xs text-gray-500 dark:text-gray-400">OR</div>

                      <div>
                        <input
                          type="text"
                          value={selectedLocation}
                          onChange={(e) => {
                            setSelectedLocation(e.target.value)
                            setUseCurrentLocation(false)
                          }}
                          placeholder="Enter specific location"
                          className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Who all need to be notified?
                    </label>
                    
                    <div className="space-y-2">
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyNGOsHospitals}
                          onChange={(e) => setNotifyNGOsHospitals(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-gray-900 dark:text-white">NGOs and Hospitals</span>
                          <p className="text-gray-600 dark:text-gray-400">Notify registered blood banks and medical institutions</p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyIndividualDonors}
                          onChange={(e) => setNotifyIndividualDonors(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-gray-900 dark:text-white">Individual Donors</span>
                          <p className="text-gray-600 dark:text-gray-400">Notify people around 10km who can donate individually</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Authentication Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Request Authentication (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={authenticationInfo}
                        onChange={(e) => setAuthenticationInfo(e.target.value)}
                        placeholder="Hospital name, doctor name, or requester details for verification"
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <button
                        onClick={handleVoiceAuthentication}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                          isListeningAuth 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        <Mic className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Providing hospital or requester details helps verify the authenticity of the request
                    </p>
                  </div>

                  <button
                    onClick={handleLocationSearch}
                    disabled={!requiredUnits || (!selectedLocation && !useCurrentLocation) || (!notifyNGOsHospitals && !notifyIndividualDonors)}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Find Nearest Blood Sources
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Nearest locations for {selectedBloodType} ({requiredUnits} units)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Sorted by fastest availability</p>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {bloodLocations
                      .sort((a, b) => parseInt(a.availableTime) - parseInt(b.availableTime))
                      .map((location) => (
                      <div key={location.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h5 className="text-xs font-medium text-gray-900 dark:text-white">{location.name}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{location.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-green-600 dark:text-green-400">{location.availableTime}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{location.distance}</p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{location.address}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {location.available24x7 && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1 py-0.5 rounded">
                                24/7
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors">
                              Call
                            </button>
                            <button className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors">
                              Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blood Request Acceptors Modal */}
      {showAcceptorsList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Blood Request Responses ({requestAcceptors.length})
                </h3>
                <button 
                  onClick={() => setShowAcceptorsList(false)}
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {activeBloodRequest?.bloodType} • {activeBloodRequest?.units} units
              </p>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(70vh - 80px)' }}>
              <div className="space-y-3">
                {requestAcceptors.map((acceptor) => (
                  <div key={acceptor.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{acceptor.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{acceptor.organization}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            acceptor.type === 'Hospital' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : acceptor.type === 'NGO'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          }`}>
                            {acceptor.type}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {acceptor.distance} • {acceptor.availableTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">Available</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{acceptor.acceptedAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => window.open(`tel:${acceptor.phone}`)}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call Now
                      </button>
                      <button className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {requestAcceptors.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Waiting for responses...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Request Completion Modal */}
      {showRequestCompletion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Complete Blood Request</h3>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Did you successfully receive the blood you requested?
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={closeActiveRequest}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Yes, Completed
                </button>
                <button
                  onClick={() => setShowRequestCompletion(false)}
                  className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blood Donation History Modal */}
      {showBloodHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[60vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Blood Donation History</h3>
                <button 
                  onClick={() => setShowBloodHistory(false)}
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(60vh - 65px)' }}>
              {/* Category Tabs */}
              <div className="flex space-x-1 mb-4">
                <button 
                  onClick={() => setHistoryTab('receiver')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    historyTab === 'receiver'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  As Receiver (2)
                </button>
                <button 
                  onClick={() => setHistoryTab('donor')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    historyTab === 'donor'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  As Donor (5)
                </button>
              </div>

              {/* History Items - Receiver */}
              {historyTab === 'receiver' && (
                <div className="space-y-3">
                  {/* Recent Request */}
                  <div className="p-3 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A+</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Emergency Request</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">2 units received</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jan 15, 2026</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 Apollo Hospital, Sector 15
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Donors:</strong> Dr. Sarah Johnson, Red Cross Blood Bank
                    </div>
                  </div>

                  {/* Previous Request */}
                  <div className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A+</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Planned Surgery</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit received</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dec 8, 2025</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 City General Hospital
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Donor:</strong> City Blood Bank
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Receiver Summary</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">3</div>
                        <div className="text-blue-800 dark:text-blue-200">Units Received</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">2</div>
                        <div className="text-green-800 dark:text-green-200">Requests Made</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Items - Donor */}
              {historyTab === 'donor' && (
                <div className="space-y-3">
                  {/* Dynamic Donation History */}
                  {donationHistory.length > 0 ? (
                    donationHistory.map((donation, index) => (
                      <div key={donation.id} className={`p-3 border rounded-lg ${
                        index === 0 
                          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{donation.bloodType}</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-900 dark:text-white">{donation.type}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{donation.units} unit{donation.units > 1 ? 's' : ''} donated ({donation.bloodType})</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              donation.status === 'Accepted' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}>
                              {donation.status}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{donation.date}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          📍 {donation.hospital}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Type:</strong> {donation.type}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No donation history yet</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Your donation activities will appear here</p>
                    </div>
                  )}

                  {/* Summary Stats */}
                  {donationHistory.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <h4 className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">Donor Summary</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {donationHistory.reduce((total, donation) => total + donation.units, 0)}
                          </div>
                          <div className="text-green-800 dark:text-green-200">Units Donated</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600 dark:text-red-400">
                            {donationHistory.length}
                          </div>
                          <div className="text-red-800 dark:text-red-200">Donations Made</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
                <div className="space-y-3">
                  {/* Recent Donation */}
                  <div className="p-3 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Blood Donation</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit donated (A+)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jan 10, 2026</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 Red Cross Blood Bank
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Recipient:</strong> Emergency patient at City Hospital
                    </div>
                  </div>

                  {/* Previous Donations */}
                  <div className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Regular Donation</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit donated (A+)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nov 15, 2025</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 City Blood Bank
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Type:</strong> Voluntary donation
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Emergency Response</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit donated (A+)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sep 22, 2025</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 Apollo Hospital
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Recipient:</strong> Accident victim
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">Blood Drive</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit donated (A+)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jul 8, 2025</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 Community Center
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Event:</strong> Annual blood donation camp
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-900 dark:text-white">First Donation</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">1 unit donated (A+)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                          Completed
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">May 3, 2025</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      📍 Red Cross Blood Bank
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Milestone:</strong> First time donor
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">Donor Summary</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">5</div>
                        <div className="text-green-800 dark:text-green-200">Units Donated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600 dark:text-red-400">15</div>
                        <div className="text-red-800 dark:text-red-200">Lives Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">8</div>
                        <div className="text-blue-800 dark:text-blue-200">Months Active</div>
                      </div>
                    </div>
                  </div>
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