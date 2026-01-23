'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  CheckCircle, 
  Heart, 
  DollarSign, 
  Clock, 
  MapPin,
  Phone,
  FileText,
  Download,
  Share2,
  Calendar,
  Users
} from 'lucide-react'

// Screen 7: Donor Contribution Confirmation
export default function DonorConfirmation() {
  const router = useRouter()

  const donationDetails = {
    totalAmount: 12000,
    donorCount: 8,
    coveragePercentage: 80,
    remainingAmount: 3000,
    caseId: 'EMG-2024-001234',
    approvedAt: '2024-12-26 14:30',
    validUntil: '2024-12-28 23:59'
  }

  const nextSteps = [
    {
      title: 'Visit Recommended Hospital',
      description: 'City Medical Center - Pre-approved for treatment',
      icon: MapPin,
      action: 'Get Directions'
    },
    {
      title: 'Contact Pharmacy',
      description: 'Apollo Pharmacy - Medicines covered under donation',
      icon: Phone,
      action: 'Call Now'
    },
    {
      title: 'Follow-up Care',
      description: 'Schedule follow-up consultation in 1 week',
      icon: Calendar,
      action: 'Schedule'
    }
  ]

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar />
      <AppHeader title="Funding Confirmed" subtitle="Community Support Secured" showProfile={false} />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 dark:text-green-100 text-lg mb-2">
                Treatment Funding Secured!
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                The community has come together to support your medical treatment. 
                You can now proceed with confidence knowing your costs are covered.
              </p>
              <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      ₹{donationDetails.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">Amount Secured</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {donationDetails.coveragePercentage}%
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            Community Support Summary
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Community Donors</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Anonymous contributors</p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {donationDetails.donorCount}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Total Contribution</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Covers {donationDetails.coveragePercentage}% of treatment</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                ₹{donationDetails.totalAmount.toLocaleString()}
              </span>
            </div>

            {donationDetails.remainingAmount > 0 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Remaining Amount</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">To be paid by patient/insurance</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                  ₹{donationDetails.remainingAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Case Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Case Information</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Case ID</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{donationDetails.caseId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Approved At</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{donationDetails.approvedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Valid Until</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{donationDetails.validUntil}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> This funding approval is valid for 48 hours. 
              Please proceed with treatment within this timeframe.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h3>
          
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{step.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  {step.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Documentation</h3>
          
          <div className="space-y-3">
            <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-left flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Funding Approval Letter</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Official confirmation document</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-left flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Hospital Pre-Authorization</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Treatment approval form</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Gratitude Message */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mb-6">
          <div className="text-center">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
              Thank You to Our Community
            </h3>
            <p className="text-sm text-pink-800 dark:text-pink-200 mb-4">
              Your treatment is possible because of the generosity of {donationDetails.donorCount} community members 
              who believe in supporting healthcare for everyone. Their kindness makes a real difference.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-pink-300 text-pink-700 hover:bg-pink-100 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/30"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/docconnect/confirmation')}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Proceed to Treatment
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Show success message instead of navigating
                alert('Donor information saved to your LifeLog records successfully!')
              }}
            >
              Save to Records
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/docconnect')}
            >
              Back to DocConnect
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}