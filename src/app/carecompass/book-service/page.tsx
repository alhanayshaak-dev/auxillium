'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft,
  User,
  Star,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  MessageCircle,
  Phone,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

// Booking Form Component
function BookingForm({ 
  specialist, 
  service, 
  packageDetails,
  onConfirm,
  onBack
}: {
  specialist: any
  service: string
  packageDetails: any
  onConfirm: (bookingData: any) => void
  onBack: () => void
}) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [notes, setNotes] = useState('')

  const availableDates = [
    '2026-01-20',
    '2026-01-21', 
    '2026-01-22',
    '2026-01-24',
    '2026-01-25',
    '2026-01-27',
    '2026-01-28'
  ]

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI Payment', icon: Phone },
    { id: 'wallet', name: 'Digital Wallet', icon: CreditCard }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }

  const canConfirm = selectedDate && selectedTime && paymentMethod

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm({
        date: selectedDate,
        time: selectedTime,
        paymentMethod,
        notes,
        amount: packageDetails.price
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Package Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Service Package</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Service:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{packageDetails.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sessions:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{packageDetails.sessions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Frequency:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{packageDetails.frequency}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{packageDetails.price}</span>
                {packageDetails.originalPrice && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{packageDetails.originalPrice}</span>
                    <span className="text-sm text-green-600 dark:text-green-400 ml-2">Save ₹{parseInt(packageDetails.originalPrice) - parseInt(packageDetails.price)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Session Scheduling */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Schedule First Session</h3>
        
        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Date
          </label>
          <div className="grid grid-cols-4 gap-2">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-2 rounded-lg border text-xs transition-all ${
                  selectedDate === date
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-lg border text-xs transition-all ${
                  selectedTime === time
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  paymentMethod === method.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  paymentMethod === method.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                {paymentMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-purple-500 ml-auto" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Additional Notes (Optional)</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any specific requirements or questions for your specialist..."
          className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
        >
          Confirm Booking & Pay ₹{packageDetails.price}
        </button>
        
        <button 
          onClick={onBack}
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 rounded-xl transition-all"
        >
          Back to Quotes
        </button>
      </div>
    </div>
  )
}

// Success Component
function BookingSuccess({ 
  specialist, 
  service, 
  bookingDetails,
  onContinueChat,
  onGoHome
}: {
  specialist: any
  service: string
  bookingDetails: any
  onContinueChat: () => void
  onGoHome: () => void
}) {
  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your {service.toLowerCase()} service has been successfully booked with {specialist.name}
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-green-600 dark:text-green-400">Booking ID:</span>
            <span className="font-medium text-green-800 dark:text-green-200">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600 dark:text-green-400">First Session:</span>
            <span className="font-medium text-green-800 dark:text-green-200">{new Date(bookingDetails.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {bookingDetails.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600 dark:text-green-400">Amount Paid:</span>
            <span className="font-medium text-green-800 dark:text-green-200">₹{bookingDetails.amount}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What's Next?</h3>
        <div className="space-y-3 text-sm text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{specialist.name} will contact you 24 hours before your first session</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">You'll receive session reminders and preparation guidelines</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Continue chatting with your specialist anytime for questions</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={onContinueChat}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Continue Chat with {specialist.name}</span>
        </button>
        
        <button 
          onClick={onGoHome}
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 rounded-xl transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}

// Main Booking Content Component
function BookingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const specialistId = searchParams.get('specialist')
  const service = searchParams.get('service') || 'Dietician'
  
  const [specialist, setSpecialist] = useState<any>(null)
  const [packageDetails, setPackageDetails] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  // Mock specialist data (same as chat page)
  const specialists = {
    '1': {
      id: 1,
      name: 'Dr. Priya Sharma',
      rating: 4.9,
      experience: '8 years',
      specialization: 'Clinical Nutritionist',
      location: 'Mumbai, Maharashtra',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '9600',
        originalPrice: '12000'
      }
    },
    '2': {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      rating: 4.7,
      experience: '12 years',
      specialization: 'Senior Nutritionist',
      location: 'Delhi, NCR',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '11520',
        originalPrice: '14400'
      }
    },
    '3': {
      id: 3,
      name: 'Dr. Anita Desai',
      rating: 4.8,
      experience: '6 years',
      specialization: 'Weight Management Specialist',
      location: 'Bangalore, Karnataka',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '8640',
        originalPrice: '10800'
      }
    }
  }

  // Initialize specialist data
  useEffect(() => {
    if (specialistId && specialists[specialistId as keyof typeof specialists]) {
      const spec = specialists[specialistId as keyof typeof specialists]
      setSpecialist(spec)
      setPackageDetails(spec.package)
    }
  }, [specialistId])

  const handleConfirmBooking = (bookingData: any) => {
    setBookingDetails(bookingData)
    setShowSuccess(true)
  }

  const handleContinueChat = () => {
    router.push(`/carecompass/chat?specialist=${specialistId}&service=${service}`)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleBack = () => {
    router.back()
  }

  if (!specialist || !packageDetails) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
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
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleBack}
              className="w-10 h-10 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-green-600 dark:text-green-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {showSuccess ? 'Booking Confirmed' : 'Book Service'}
              </h1>
              <p className="text-sm text-green-600 dark:text-green-400">
                {showSuccess ? 'Your service is booked' : `${service} with ${specialist.name}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialist Info */}
      {!showSuccess && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{specialist.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.rating}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.experience}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 min-h-0">
        
        {showSuccess ? (
          <BookingSuccess
            specialist={specialist}
            service={service}
            bookingDetails={bookingDetails}
            onContinueChat={handleContinueChat}
            onGoHome={handleGoHome}
          />
        ) : (
          <BookingForm
            specialist={specialist}
            service={service}
            packageDetails={packageDetails}
            onConfirm={handleConfirmBooking}
            onBack={handleBack}
          />
        )}
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
        <div className="flex justify-around">
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-purple-500 p-1"
            onClick={() => router.push('/carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => router.push('/health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => router.push('/medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Main export with Suspense wrapper
export default function BookService() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading booking...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  )
}