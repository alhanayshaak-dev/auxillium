'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  Droplets,
  MapPin,
  Phone,
  Clock,
  Star,
  AlertCircle,
  Heart,
  Shield,
  Calendar,
  Users,
  Navigation,
  CheckCircle,
  X,
  Check
} from 'lucide-react'

export default function DonatePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'emergency' | 'regular'>('emergency')
  const [showAcceptedPopup, setShowAcceptedPopup] = useState(false)
  const [acceptedRequest, setAcceptedRequest] = useState<any>(null)

  // Emergency donation requests within 10km - synchronized with Auxillium page
  const [emergencyRequests, setEmergencyRequests] = useState([
    {
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
    }
  ])

  // Load emergency requests from localStorage and sync with Auxillium page
  useEffect(() => {
    const loadEmergencyRequests = () => {
      if (typeof window === 'undefined') return
      
      // Check if there are any emergency blood requests from Auxillium page
      const auxilliumRequests = JSON.parse(localStorage.getItem('emergencyBloodRequests') || '[]')
      if (auxilliumRequests.length > 0) {
        setEmergencyRequests(auxilliumRequests)
      }
    }
    
    loadEmergencyRequests()
    
    // Listen for storage changes to sync in real-time
    const handleStorageChange = () => {
      loadEmergencyRequests()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', loadEmergencyRequests) // Reload when window gets focus
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', loadEmergencyRequests)
    }
  }, [])

  // Regular donation centers
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
      reviews: 156,
      acceptsWalkIn: true,
      services: ['Blood Collection', 'Plasma Donation', 'Mobile Blood Drive', 'Health Screening'],
      nextAvailableSlot: 'Today 3:00 PM'
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
      reviews: 89,
      acceptsWalkIn: true,
      services: ['Blood Collection', 'Blood Testing', 'Emergency Supply', 'Platelet Donation'],
      nextAvailableSlot: 'Available Now'
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
      reviews: 203,
      acceptsWalkIn: false,
      services: ['Blood Collection', 'Component Separation', 'Donor Health Check', 'Appointment Only'],
      nextAvailableSlot: 'Tomorrow 10:00 AM'
    },
    {
      id: 4,
      name: 'Lions Club Blood Bank',
      type: 'NGO',
      address: '321 Community Center, Westside',
      distance: '5.2 km',
      hours: '10:00 AM - 5:00 PM',
      phone: '+91 98765 43213',
      rating: 4.6,
      reviews: 78,
      acceptsWalkIn: true,
      services: ['Blood Collection', 'Community Drives', 'Donor Recognition', 'Health Education'],
      nextAvailableSlot: 'Today 4:30 PM'
    }
  ]

  const handleEmergencyDonate = (requestId: number) => {
    const request = emergencyRequests.find(r => r.id === requestId)
    if (request) {
      // Create donation history entry
      const donationEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        hospital: request.hospital,
        bloodType: request.bloodType,
        units: request.units,
        type: 'Emergency Response',
        status: 'Accepted',
        timestamp: new Date().toISOString()
      }
      
      // Store in localStorage for MedSupport history
      if (typeof window !== 'undefined') {
        const existingHistory = JSON.parse(localStorage.getItem('bloodDonationHistory') || '[]')
        existingHistory.unshift(donationEntry)
        localStorage.setItem('bloodDonationHistory', JSON.stringify(existingHistory))
        
        // Remove from emergency requests and sync with Auxillium page
        const updatedRequests = emergencyRequests.filter(r => r.id !== requestId)
        setEmergencyRequests(updatedRequests)
        localStorage.setItem('emergencyBloodRequests', JSON.stringify(updatedRequests))
      }
      
      // Show accepted popup with call and location options
      setAcceptedRequest(request)
      setShowAcceptedPopup(true)
    }
  }

  const handleRejectRequest = (requestId: number) => {
    // Remove from emergency requests and sync with Auxillium page
    const updatedRequests = emergencyRequests.filter(r => r.id !== requestId)
    setEmergencyRequests(updatedRequests)
    if (typeof window !== 'undefined') {
      localStorage.setItem('emergencyBloodRequests', JSON.stringify(updatedRequests))
    }
    
    alert('Blood donation request declined. Thank you for your response.')
  }

  const handleCallHospital = () => {
    if (acceptedRequest) {
      window.open(`tel:${acceptedRequest.phone}`)
    }
  }

  const handleShareLocation = () => {
    if (acceptedRequest) {
      alert(`Location shared with ${acceptedRequest.hospital}. They will contact you shortly.`)
      setShowAcceptedPopup(false)
    }
  }

  const closeAcceptedPopup = () => {
    setShowAcceptedPopup(false)
    setAcceptedRequest(null)
  }

  const handleRegularDonate = (centerId: number) => {
    const center = donationCenters.find(c => c.id === centerId)
    if (center) {
      if (center.acceptsWalkIn) {
        alert(`You can visit ${center.name} for walk-in donation. Next available: ${center.nextAvailableSlot}`)
      } else {
        alert(`Please call ${center.phone} to schedule an appointment at ${center.name}`)
      }
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      case 'Urgent':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
      case 'High':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader 
        title="Blood Donation" 
        subtitle="Help Save Lives Today" 
        module="medsupport" 
        showProfile={false}
        showBack={false}
        showClose={true}
        onClose={() => router.push('/medsupport')}
      />

      {/* Tab Navigation */}
      <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center ${
              activeTab === 'emergency'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            Emergency
          </button>
          <button
            onClick={() => setActiveTab('regular')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center ${
              activeTab === 'regular'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Regular
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide pb-32">
        {activeTab === 'emergency' && (
          <div className="space-y-4">
            {/* Emergency Info Banner */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 text-sm mb-1">Emergency Requests</h3>
                  <p className="text-xs text-red-800 dark:text-red-200">
                    Emergency requests within 10 km around you
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Requests */}
            <div className="space-y-3">
              {emergencyRequests.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No emergency requests at the moment</p>
                </div>
              ) : (
                emergencyRequests.map((request) => (
                  <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm relative border border-gray-200 dark:border-gray-700">
                    
                    {/* Top row: Blood type, units, Critical badge, and Close button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">{request.bloodType}</span>
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{request.units} units</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                          {request.urgency}
                        </span>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>

                    {/* Hospital section with icon */}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Droplets className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {request.hospital}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{request.distance}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{request.timePosted}</p>
                      </div>
                    </div>

                    {/* Details section */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{request.condition} - {request.requestedBy}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{request.phone}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 text-sm font-medium rounded-lg"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleEmergencyDonate(request.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 text-sm font-medium rounded-lg"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'regular' && (
          <div className="space-y-4">
            {/* Regular Donation Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Regular Donation Centers</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Schedule regular donations at hospitals and NGOs. Help maintain blood supply for routine medical needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Donation Centers */}
            <div className="space-y-3">
              {donationCenters.map((center) => (
                <div key={center.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{center.name}</h3>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          {center.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{center.rating} ({center.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{center.distance}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{center.address}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{center.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 dark:text-green-400 font-medium">{center.nextAvailableSlot}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {center.acceptsWalkIn ? 'Walk-in accepted' : 'Appointment required'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {center.services.map((service, index) => (
                      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleRegularDonate(center.id)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 text-sm"
                    >
                      <Droplets className="w-4 h-4 mr-2" />
                      {center.acceptsWalkIn ? 'Visit Now' : 'Schedule'}
                    </Button>
                    <Button
                      onClick={() => window.open(`tel:${center.phone}`)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />

      {/* Blood Donation Accepted Popup */}
      {showAcceptedPopup && acceptedRequest && (
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
                onClick={closeAcceptedPopup}
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
                  <p><span className="text-gray-600 dark:text-gray-400">Name:</span> <span className="font-medium">{acceptedRequest.hospital}</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Address:</span> <span className="font-medium">{acceptedRequest.address}</span></p>
                  <p><span className="text-gray-600 dark:text-gray-400">Distance:</span> <span className="font-medium">{acceptedRequest.distance} away</span></p>
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
                onClick={closeAcceptedPopup}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2.5 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}