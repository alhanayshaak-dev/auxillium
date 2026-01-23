'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  CheckCircle, 
  DollarSign, 
  Shield, 
  Pill,
  Receipt,
  Clock,
  AlertCircle,
  Download,
  Share2,
  Heart,
  TrendingDown,
  FileText,
  Calendar
} from 'lucide-react'

// Screen F1: Subsidy Confirmation Screen
export default function SubsidyConfirmation() {
  const router = useRouter()

  const subsidyDetails = {
    originalAmount: 850,
    subsidyAmount: 425,
    userPayment: 425,
    subsidyPercentage: 50,
    eligibilityType: 'Income-based',
    validUntil: '2024-12-31',
    caseId: 'SUB-2024-001234'
  }

  const medicineBreakdown = [
    {
      name: 'Metformin 500mg',
      quantity: '30 tablets',
      originalPrice: 320,
      subsidizedPrice: 160,
      savings: 160
    },
    {
      name: 'Omeprazole 20mg',
      quantity: '14 capsules',
      originalPrice: 280,
      subsidizedPrice: 140,
      savings: 140
    },
    {
      name: 'Amlodipine 5mg',
      quantity: '30 tablets',
      originalPrice: 250,
      subsidizedPrice: 125,
      savings: 125
    }
  ]

  const subsidyProgram = {
    name: 'Essential Medicines Subsidy Program',
    description: 'Government-supported program to make essential medicines affordable',
    coverage: 'Up to 50% discount on essential medicines',
    eligibility: 'Households with annual income below ₹3,00,000'
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar />
      <AppHeader title="Subsidy Confirmed" subtitle="Medicine Cost Assistance Approved" showProfile={false} />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 dark:text-green-100 text-lg mb-2">
                Subsidy Approved!
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                You qualify for {subsidyDetails.subsidyPercentage}% subsidy on essential medicines. 
                Your total savings: ₹{subsidyDetails.subsidyAmount}
              </p>
              <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      ₹{subsidyDetails.userPayment}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">You Pay</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      ₹{subsidyDetails.subsidyAmount}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Subsidy Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-blue-500" />
            Cost Breakdown
          </h3>
          
          <div className="space-y-4">
            {medicineBreakdown.map((medicine, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{medicine.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{medicine.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ₹{medicine.subsidizedPrice}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ₹{medicine.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingDown className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Save ₹{medicine.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Total Summary */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Original Total:</span>
                <span className="text-gray-500 dark:text-gray-400 line-through">₹{subsidyDetails.originalAmount}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Subsidy Applied:</span>
                <span className="text-green-600 dark:text-green-400">-₹{subsidyDetails.subsidyAmount}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">You Pay:</span>
                <span className="text-green-600 dark:text-green-400">₹{subsidyDetails.userPayment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subsidy Program Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Subsidy Program Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Program Name</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{subsidyProgram.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Eligibility Type</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{subsidyDetails.eligibilityType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Coverage</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{subsidyProgram.coverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Case ID</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{subsidyDetails.caseId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Valid Until</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{subsidyDetails.validUntil}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This subsidy is valid for essential medicines only. 
              Eligibility is reviewed annually based on income verification.
            </p>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Usage Guidelines</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Pill className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Essential Medicines Only</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Subsidy applies to government-approved essential medicine list
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Monthly Limit</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Maximum subsidy of ₹2,000 per month per family
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Prescription Required</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Valid prescription from registered doctor required
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Annual Review</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Eligibility reviewed annually based on income status
                </p>
              </div>
            </div>
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
                  <p className="font-medium text-gray-900 dark:text-white">Subsidy Approval Certificate</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Official subsidy confirmation document</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-left flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Receipt className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Cost Breakdown Receipt</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Detailed cost and savings breakdown</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Visit any partner pharmacy with your prescription</li>
                <li>• Show your subsidy approval certificate</li>
                <li>• Pay only the subsidized amount at checkout</li>
                <li>• Keep receipts for your records</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gratitude Message */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mb-6">
          <div className="text-center">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
              Healthcare for Everyone
            </h3>
            <p className="text-sm text-pink-800 dark:text-pink-200">
              This subsidy is made possible through government support and community contributions. 
              Together, we're making healthcare accessible to all.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/medsupport/pharmacy')}
          >
            <Pill className="w-5 h-5 mr-2" />
            Find Partner Pharmacy
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/health-tracker')}
            >
              <FileText className="w-4 h-4 mr-1" />
              Save to Records
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share Details
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.push('/medsupport')}
          >
            Back to MedSupport
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}