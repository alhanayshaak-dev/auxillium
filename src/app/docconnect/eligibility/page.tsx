'use client'

import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Shield, FileText, Camera, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Screen 5: Income Verification for Subsidized Care
export default function EligibilityVerification() {
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
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Financial Assistance</h1>
            <p className="text-sm text-blue-600">Income verification for subsidies</p>
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
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Healthcare for Everyone
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                We believe healthcare should be accessible to all. If you're facing financial difficulties, 
                you may qualify for subsidized or free consultations.
              </p>
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-800 font-medium">
                  ✓ Up to 100% consultation fee waiver<br/>
                  ✓ Discounted medicine costs<br/>
                  ✓ Priority emergency care access
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">
                Annual household income below ₹3,00,000
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">
                Valid government-issued income certificate
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">
                BPL card holders automatically qualify
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-600">
                Students with valid ID cards
              </p>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Required Documents</h3>
          
          <div className="space-y-4">
            {/* Income Certificate */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 mb-1">Income Certificate</p>
                <p className="text-sm text-gray-500 mb-3">
                  Government issued income certificate or BPL card
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </div>

            {/* Identity Proof */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 mb-1">Identity Proof</p>
                <p className="text-sm text-gray-500 mb-3">
                  Aadhaar card, voter ID, or passport
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </div>

            {/* Address Proof */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 mb-1">Address Proof</p>
                <p className="text-sm text-gray-500 mb-3">
                  Utility bill or bank statement (last 3 months)
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-600">
            🔒 <strong>Privacy Protected:</strong> Your documents are encrypted and used only for 
            eligibility verification. They will be permanently deleted after verification is complete.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => router.push('/docconnect/support')}
          >
            Submit Application
          </Button>
          
          <Button variant="outline" size="lg" className="w-full">
            I'll Pay Full Amount
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Verification typically takes 2-4 hours during business hours
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