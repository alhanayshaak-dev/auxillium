'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { 
  MessageSquare, 
  Heart, 
  FileText, 
  Compass, 
  Pill, 
  Shield, 
  User,
  Home,
  Settings,
  Calendar,
  Clock,
  Activity,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Check,
  X,
  MapPin,
  Phone
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [showBloodRequestPopup, setShowBloodRequestPopup] = useState(false)
  const [showBloodAcceptedScreen, setShowBloodAcceptedScreen] = useState(false)
  const [showFundRaisingPopup, setShowFundRaisingPopup] = useState(false)

  // Initialize emergency blood requests in localStorage
  useEffect(() => {
    const initializeEmergencyRequests = () => {
      if (typeof window === 'undefined') return
      
      const existingRequests = localStorage.getItem('emergencyBloodRequests')
      if (!existingRequests) {
        // Initialize with default emergency request
        const defaultRequest = [{
          id: 1,
          bloodType: 'A+',
          units: 2,
          hospital: 'City General Hospital Medical Center',
          address: '123 Medical Center, Downtown',
          distance: '2.3 km',
          urgency: 'Critical',
          timePosted: '50 mins ago',
          phone: '+91 98765 43210',
          condition: 'Emergency Surgery',
          requestedBy: 'Dr. Sarah Johnson'
        }]
        localStorage.setItem('emergencyBloodRequests', JSON.stringify(defaultRequest))
      }
    }
    
    initializeEmergencyRequests()
  }, [])

  const carouselItems = [
    {
      icon: Heart,
      title: "Blood Donation Request",
      description: "A+ Blood needed - City Hospital (2.3 km away)",
      color: "from-red-100 to-pink-200",
      iconColor: "text-red-600",
      isBloodRequest: true,
      isUrgent: true
    },
    {
      icon: Heart,
      title: "Emergency Fund Raising",
      description: "Apollo Hospital - Critical surgery verified",
      color: "from-orange-100 to-red-200",
      iconColor: "text-orange-600",
      isFundRaising: true,
      isUrgent: true,
      hospital: "Apollo Hospital",
      condition: "Critical surgery for accident victim",
      verified: true
    },
    {
      icon: Calendar,
      title: "Upcoming Appointments",
      description: "Dr. Smith - Tomorrow 2:00 PM",
      color: "from-blue-100 to-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Medication Reminder",
      description: "Take Vitamin D - 8:00 AM",
      color: "from-green-100 to-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Activity,
      title: "Health Summary",
      description: "Blood pressure logged today",
      color: "from-purple-100 to-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Health Alert",
      description: "Dengue Prevention - Monsoon season awareness",
      color: "from-blue-100 to-cyan-200",
      iconColor: "text-blue-600"
    }
  ]

  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const handleEmergencyClick = () => {
    router.push('/emergency/e1')
  }

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const openLezChat = () => {
    router.push('/ask-lez')
  }

  const handleBloodRequestClick = () => {
    setShowBloodRequestPopup(true)
  }

  const handleFundRaisingClick = () => {
    setShowFundRaisingPopup(true)
  }

  const handleBloodDonationAccept = () => {
    setShowBloodRequestPopup(false)
    setShowBloodAcceptedScreen(true)
    
    // Create donation history entry
    const donationEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      hospital: 'City General Hospital',
      bloodType: 'A+',
      units: 2,
      type: 'Emergency Response',
      status: 'Accepted',
      timestamp: new Date().toISOString()
    }
    
    // Store in localStorage for MedSupport history
    if (typeof window !== 'undefined') {
      const existingHistory = JSON.parse(localStorage.getItem('bloodDonationHistory') || '[]')
      existingHistory.unshift(donationEntry)
      localStorage.setItem('bloodDonationHistory', JSON.stringify(existingHistory))
      
      // Remove the accepted request from emergency requests to sync with MedSupport donate page
      const existingRequests = JSON.parse(localStorage.getItem('emergencyBloodRequests') || '[]')
      const updatedRequests = existingRequests.filter((req: any) => req.id !== 1) // Remove the accepted request
      localStorage.setItem('emergencyBloodRequests', JSON.stringify(updatedRequests))
    }
  }

  const handleBloodDonationReject = () => {
    setShowBloodRequestPopup(false)
    
    // Remove the rejected request from emergency requests to sync with MedSupport donate page
    if (typeof window !== 'undefined') {
      const existingRequests = JSON.parse(localStorage.getItem('emergencyBloodRequests') || '[]')
      const updatedRequests = existingRequests.filter((req: any) => req.id !== 1) // Remove the rejected request
      localStorage.setItem('emergencyBloodRequests', JSON.stringify(updatedRequests))
    }
    
    // In a real app, this would send the rejection to the backend
    alert('Blood donation request declined. Thank you for your response.')
  }

  const handleShareLocation = () => {
    // In a real app, this would share the user's location
    alert('Location shared with City General Hospital. They will contact you shortly.')
    setShowBloodAcceptedScreen(false)
  }

  const handleCallHospital = () => {
    // In a real app, this would initiate a phone call
    window.open('tel:+919876543210')
  }

  const handleCloseAcceptedScreen = () => {
    setShowBloodAcceptedScreen(false)
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 pt-2 flex-shrink-0">
        <span className="font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white opacity-50 rounded"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Auxillium</h1>
              <p className="text-sm text-purple-600 dark:text-purple-400">Where Every Heart Beats</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ImmersiveReader 
              content="Welcome to Auxillium Healthcare Platform. Your comprehensive health management solution featuring DocConnect for medical consultations, LifeLog for health tracking, CareCompass for wellness support, and MedSupport for medication and blood services. Access emergency care, manage family health records, and connect with healthcare professionals all in one place."
              title="Auxillium Healthcare Platform"
            />
            <button 
              onClick={() => router.push('/profile')}
              className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center relative"
            >
              <User className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-600 dark:bg-gray-400 rounded-full flex items-center justify-center">
                <Settings className="w-2 h-2 text-white dark:text-gray-900" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-20">
        {/* Welcome Message */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome, Avery Gray</p>
          <button 
            onClick={() => router.push('/family-members')}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Members
          </button>
        </div>

        {/* Ask Lez Section */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl p-3 mb-3">
          <button
            onClick={openLezChat}
            className="w-full bg-white dark:bg-gray-800 rounded-xl px-3 py-2 flex items-center justify-between shadow-sm border border-pink-100 dark:border-pink-800"
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-white" />
              </div>
              <div className="text-left">
                <span className="text-gray-900 dark:text-white font-medium block text-sm">Lez</span>
                <span className="text-pink-600 dark:text-pink-400 text-xs">Your AI health assistant</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
              Ask Lez
            </div>
          </button>
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={() => handleModuleClick('docconnect')}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-sm border border-blue-100 dark:border-blue-800"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-2xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-sm">DocConnect</span>
          </button>

          <button
            onClick={() => handleModuleClick('health-tracker')}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-sm border border-green-100 dark:border-green-800"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-sm">LifeLog</span>
          </button>

          <button
            onClick={() => handleModuleClick('carecompass')}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-sm border border-purple-100 dark:border-purple-800"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 rounded-2xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-sm">CareCompass</span>
          </button>

          <button
            onClick={() => handleModuleClick('medsupport')}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-sm border border-orange-100 dark:border-orange-800"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-2xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-sm">MedSupport</span>
          </button>
        </div>

        {/* Attention Carousel */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl p-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Attention</h3>
            <div className="flex space-x-2">
              <button 
                onClick={prevCarousel}
                className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={nextCarousel}
                className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm"
              >
                <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
            >
              {carouselItems.map((item, index) => {
                const IconComponent = item.icon
                const isDengueAlert = item.title === "Health Alert"
                const isBloodRequest = item.isBloodRequest
                const isFundRaising = item.isFundRaising
                const isUrgent = item.isUrgent
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <button 
                      onClick={() => {
                        if (isBloodRequest) {
                          handleBloodRequestClick()
                        } else if (isFundRaising) {
                          handleFundRaisingClick()
                        } else if (item.title === "Upcoming Appointments") {
                          // Direct to appointments section in LifeLog
                          router.push('/health-tracker?section=appointments')
                        } else if (item.title === "Medication Reminder") {
                          // Direct to medications section in LifeLog
                          router.push('/health-tracker?section=medications')
                        } else if (item.title === "Health Summary") {
                          // Direct to health metrics section in LifeLog
                          router.push('/health-tracker?section=metrics')
                        } else if (item.title === "Health Alert") {
                          // Direct to reminders/alerts section in LifeLog
                          router.push('/health-tracker?section=alerts')
                        } else {
                          // Fallback to general LifeLog page
                          router.push('/health-tracker')
                        }
                      }}
                      className={`w-full ${isUrgent ? 'bg-gradient-to-r from-red-200 to-pink-300 dark:from-red-800 dark:to-pink-900 animate-pulse shadow-lg shadow-red-200 dark:shadow-red-900/50' : `bg-gradient-to-r ${item.color} dark:from-gray-700 dark:to-gray-600`} rounded-xl p-2 flex items-center space-x-3 cursor-pointer hover:scale-[1.02] transition-transform ${isUrgent ? 'ring-2 ring-red-400 ring-opacity-75 border-2 border-red-300' : ''}`}
                    >
                      <div className={`w-8 h-8 ${isUrgent ? 'bg-white dark:bg-red-100 shadow-md' : 'bg-white dark:bg-gray-800'} rounded-lg flex items-center justify-center ${isUrgent ? 'relative' : ''}`}>
                        <IconComponent className={`w-4 h-4 ${isUrgent ? 'text-red-600 dark:text-red-700' : `${item.iconColor} dark:text-gray-300`} ${isUrgent ? 'animate-pulse' : ''}`} />
                        {isUrgent && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className={`text-sm font-medium ${isUrgent ? 'text-red-900 dark:text-red-100 font-bold' : 'text-gray-900 dark:text-white'} ${isUrgent ? 'flex items-center' : ''}`}>
                          {item.title}
                          {isUrgent && (
                            <span className="ml-2 text-red-600 animate-pulse text-base">❤️</span>
                          )}
                        </h4>
                        <p className={`text-xs ${isUrgent ? 'text-red-800 dark:text-red-200 font-medium' : 'text-gray-600 dark:text-gray-300'}`}>{item.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-1 mt-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCarouselIndex ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Emergency Button */}
        <button
          onClick={handleEmergencyClick}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          <Shield className="w-5 h-5" />
          <div className="flex flex-col items-center">
            <span className="text-sm">EMERGENCY</span>
            <span className="text-xs font-normal opacity-90">Casualty Care</span>
          </div>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
        <div className="flex justify-around">
          <button className="flex items-center justify-center text-blue-500 p-1">
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => handleModuleClick('docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
            onClick={() => handleModuleClick('carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => handleModuleClick('health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => handleModuleClick('medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Blood Donation Request Popup */}
      {showBloodRequestPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-xs w-full shadow-2xl max-h-[95vh] min-h-[400px] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Blood Donation</h3>
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                    URGENT
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowBloodRequestPopup(false)}
                className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="flex-1 space-y-3 mb-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Blood Type:</span>
                    <p className="font-semibold text-red-700 dark:text-red-300">A+</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Units:</span>
                    <p className="font-semibold text-red-700 dark:text-red-300">2 Units</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <p className="font-semibold text-red-700 dark:text-red-300">City Hospital</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                    <p className="font-semibold text-red-700 dark:text-red-300">2.3 km</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Contact</h4>
                <div className="text-xs space-y-1">
                  <p><span className="text-gray-600 dark:text-gray-400">Hospital:</span> <span className="font-medium">City General Hospital</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Phone:</span> <span className="font-medium">+91 98765 43210</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Address:</span> <span className="font-medium">123 Medical Center</span></p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-auto">
              <button
                onClick={handleBloodDonationReject}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <X className="w-3 h-3" />
                <span>Decline</span>
              </button>
              <button
                onClick={handleBloodDonationAccept}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <Check className="w-3 h-3" />
                <span>Accept</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blood Donation Accepted Screen */}
      {showBloodAcceptedScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-xs w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Request Accepted</h3>
                  <span className="text-xs text-green-600 dark:text-green-400">Thank you for helping!</span>
                </div>
              </div>
              <button
                onClick={handleCloseAcceptedScreen}
                className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="mb-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Next Steps</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Help the hospital locate you quickly by sharing your location or calling them directly.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Hospital Details</h4>
                <div className="text-xs space-y-1">
                  <p><span className="text-gray-600 dark:text-gray-400">Name:</span> <span className="font-medium">City General Hospital</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Address:</span> <span className="font-medium">123 Medical Center</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Distance:</span> <span className="font-medium">2.3 km away</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleShareLocation}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Share My Location</span>
              </button>
              
              <button
                onClick={handleCallHospital}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hospital</span>
              </button>

              <button
                onClick={handleCloseAcceptedScreen}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fund Raising Popup */}
      {showFundRaisingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-xs w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-orange-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Emergency Fund Raising</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">
                      URGENT
                    </span>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded flex items-center">
                      <Check className="w-2 h-2 mr-1" />
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowFundRaisingPopup(false)}
                className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <X className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Patient Information</h4>
                <div className="text-xs space-y-1">
                  <p><span className="text-gray-600 dark:text-gray-400">Hospital:</span> <span className="font-medium text-orange-700 dark:text-orange-300">Apollo Hospital</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Condition:</span> <span className="font-medium">Critical surgery for accident victim</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Status:</span> <span className="font-medium text-green-600">Patient condition verified by hospital</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Required Amount:</span> <span className="font-medium text-red-600">₹2,50,000</span></p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Hospital Details</h4>
                <div className="text-xs space-y-1">
                  <p><span className="text-gray-600 dark:text-gray-400">Name:</span> <span className="font-medium">Apollo Hospital</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Department:</span> <span className="font-medium">Emergency & Trauma Care</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Contact:</span> <span className="font-medium">+91 98765 12345</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Location:</span> <span className="font-medium">Sector 26, Noida</span></p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Verification Status</h4>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✓ Patient condition verified by Apollo Hospital medical team<br/>
                  ✓ Emergency surgery requirement confirmed<br/>
                  ✓ Financial assistance request authenticated
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowFundRaisingPopup(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Navigate to donations page with hospital info
                  router.push('/carecompass/donations?hospital=apollo&emergency=true')
                  setShowFundRaisingPopup(false)
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <Heart className="w-3 h-3" />
                <span>Donate Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}