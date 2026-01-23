'use client'

import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Heart, Users, CheckCircle, Gift, Shield, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Screen 6: Cost Support & Community Funding
export default function CostSupport() {
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
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Community Support</h1>
            <p className="text-sm text-blue-600">Funding Assistance Approved</p>
          </div>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Application Status */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-900">Application Approved!</h3>
              <p className="text-sm text-green-700">
                You qualify for 80% consultation fee waiver
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Original consultation fee</span>
              <span className="font-medium text-gray-900">₹500</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-green-600">Government subsidy (60%)</span>
              <span className="font-medium text-green-600">-₹300</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-600">Community funding (20%)</span>
              <span className="font-medium text-blue-600">-₹100</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Your payment</span>
              <span className="font-bold text-blue-600 text-lg">₹100</span>
            </div>
          </div>
        </div>

        {/* Community Funding Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Funded by Community
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Kind donors from our community have contributed to make healthcare accessible for everyone.
              </p>
              
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-800">Funding Progress</span>
                  <span className="text-xs text-blue-600">₹100 / ₹100</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  ✓ Fully funded by 3 donors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donors */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Recent Supporters</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Anonymous Donor</p>
                <p className="text-xs text-gray-500">Contributed ₹50 • 2 hours ago</p>
              </div>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Priya S.</p>
                <p className="text-xs text-gray-500">Contributed ₹30 • 5 hours ago</p>
              </div>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Rajesh K.</p>
                <p className="text-xs text-gray-500">Contributed ₹20 • 1 day ago</p>
              </div>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Options</h3>
          
          <div className="space-y-3">
            <button className="w-full p-3 border-2 border-blue-200 rounded-lg bg-blue-50 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">UPI Payment</p>
                  <p className="text-sm text-blue-600">Pay ₹100 via UPI</p>
                </div>
                <span className="text-2xl">📱</span>
              </div>
            </button>
            
            <button className="w-full p-3 border border-gray-200 rounded-lg text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Card Payment</p>
                  <p className="text-sm text-gray-600">Debit/Credit card</p>
                </div>
                <span className="text-2xl">💳</span>
              </div>
            </button>
            
            <button className="w-full p-3 border border-gray-200 rounded-lg text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Net Banking</p>
                  <p className="text-sm text-gray-600">All major banks</p>
                </div>
                <span className="text-2xl">🏦</span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => router.push('/docconnect/confirmation')}
          >
            <Gift className="w-5 h-5 mr-2" />
            Pay ₹100 & Book Consultation
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Secure payment • Your consultation will be confirmed immediately
            </p>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
          <div className="text-center">
            <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
            <p className="text-sm text-pink-800 font-medium">
              Thank you for being part of our caring community
            </p>
            <p className="text-xs text-pink-600 mt-1">
              Together, we're making healthcare accessible for everyone
            </p>
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