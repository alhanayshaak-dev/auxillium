'use client'

import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { CheckCircle, Calendar, Clock, Video, Phone, MessageCircle, Download, Share2, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Screen 7: Donor Confirmation & Booking Success
export default function BookingConfirmation() {
  const router = useRouter()

  const handleEmergencyClick = () => {
    router.push('/emergency/e1')
  }

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
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Booking Confirmed</h1>
            <p className="text-sm text-blue-600">Your consultation is scheduled</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your consultation has been successfully booked
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Consultation Details</h3>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              👩‍⚕️
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Dr. Sarah Wilson</h4>
              <p className="text-sm text-gray-600">General Medicine</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">Today, December 26, 2024</p>
                <p className="text-sm text-gray-600">Available now</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">15-20 minutes</p>
                <p className="text-sm text-gray-600">Estimated duration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Video className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">Video Consultation</p>
                <p className="text-sm text-gray-600">High-quality video call</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Consultation fee</span>
              <span className="text-gray-900">₹500</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-green-600">Community support</span>
              <span className="text-green-600">-₹400</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Amount paid</span>
              <span className="font-bold text-blue-600">₹100</span>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                ✓ Payment successful via UPI
              </p>
              <p className="text-xs text-green-600 mt-1">
                Transaction ID: TXN123456789
              </p>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-4">
          <div className="text-center">
            <h3 className="font-semibold text-pink-900 mb-2">
              💝 Thank You to Our Donors!
            </h3>
            <p className="text-sm text-pink-700 mb-3">
              Your consultation was made possible by generous community members who believe healthcare should be accessible to all.
            </p>
            <div className="bg-pink-100 rounded-lg p-3">
              <p className="text-xs text-pink-800">
                <strong>3 donors</strong> contributed ₹400 to support your healthcare needs
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Join the consultation</p>
                <p className="text-sm text-gray-600">
                  Dr. Wilson is ready to see you now. Click "Start Consultation" below.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Receive prescription</p>
                <p className="text-sm text-gray-600">
                  Get your digital prescription and treatment plan after consultation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Order medicines</p>
                <p className="text-sm text-gray-600">
                  Get discounted medicines delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => router.push('/docconnect/consultation')}
          >
            <Video className="w-5 h-5 mr-2" />
            Start Consultation Now
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Details
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={() => router.push('/docconnect')}
            >
              Book Another
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500 mb-2">
            Need help? Contact our support team
          </p>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-1 text-xs text-blue-600">
              <Phone className="w-3 h-3" />
              <span>Call Support</span>
            </button>
            <button className="flex items-center space-x-1 text-xs text-blue-600">
              <MessageCircle className="w-3 h-3" />
              <span>Live Chat</span>
            </button>
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