'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  Heart, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  MapPin,
  Zap
} from 'lucide-react'

// Screen 6: Emergency Cost Support Trigger
export default function EmergencyCostSupport() {
  const router = useRouter()
  const [supportStatus, setSupportStatus] = useState<'requesting' | 'notifying' | 'partial' | 'secured'>('requesting')
  const [donorsNotified, setDonorsNotified] = useState(0)
  const [amountSecured, setAmountSecured] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(15000)

  // Simulate donor notification process
  useEffect(() => {
    if (supportStatus === 'requesting') {
      const timer1 = setTimeout(() => {
        setSupportStatus('notifying')
        setDonorsNotified(12)
      }, 2000)

      const timer2 = setTimeout(() => {
        setSupportStatus('partial')
        setAmountSecured(8500)
      }, 5000)

      const timer3 = setTimeout(() => {
        setSupportStatus('secured')
        setAmountSecured(12000)
      }, 8000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [supportStatus])

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar />
      <AppHeader title="Emergency Support" subtitle="Community Assistance For Medical Costs" showProfile={false} />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Emergency Case Info */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Emergency Medical Case</h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                Doctor has flagged this case as requiring urgent financial assistance. 
                Community donors are being notified to help cover treatment costs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-red-600 dark:text-red-400">Estimated Cost</p>
                  <p className="text-lg font-bold text-red-700 dark:text-red-300">₹{estimatedCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-red-600 dark:text-red-400">Case Priority</p>
                  <p className="text-lg font-bold text-red-700 dark:text-red-300">High</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            Community Support Status
          </h3>

          {/* Status Timeline */}
          <div className="space-y-4">
            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              supportStatus === 'requesting' 
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                supportStatus === 'requesting' 
                  ? 'bg-blue-500' 
                  : 'bg-green-500'
              }`}>
                {supportStatus === 'requesting' ? (
                  <Clock className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {supportStatus === 'requesting' ? 'Requesting Support...' : 'Support Request Sent'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Emergency case submitted to donor network
                </p>
              </div>
            </div>

            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              ['notifying', 'partial', 'secured'].includes(supportStatus)
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ['notifying', 'partial', 'secured'].includes(supportStatus)
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`}>
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Donors Notified
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {donorsNotified > 0 ? `${donorsNotified} verified donors contacted` : 'Contacting donor network...'}
                </p>
              </div>
            </div>

            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              ['partial', 'secured'].includes(supportStatus)
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ['partial', 'secured'].includes(supportStatus)
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`}>
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {supportStatus === 'secured' ? 'Funding Secured' : 'Partial Funding'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {amountSecured > 0 ? `₹${amountSecured.toLocaleString()} committed` : 'Awaiting donor responses...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Progress */}
        {amountSecured > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Funding Progress</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((amountSecured / estimatedCost) * 100)}% covered
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((amountSecured / estimatedCost) * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">
                ₹{amountSecured.toLocaleString()} secured
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ₹{estimatedCost.toLocaleString()} needed
              </span>
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Privacy Protected</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Your personal details remain confidential</li>
                <li>• Donors see only medical case summary</li>
                <li>• No direct contact between donors and patients</li>
                <li>• All transactions are handled securely</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h3>
          
          {supportStatus === 'secured' ? (
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <p className="font-medium text-green-800 dark:text-green-200 mb-2">
                  ✓ Funding Secured - Proceed with Treatment
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Community donors have covered {Math.round((amountSecured / estimatedCost) * 100)}% of your treatment costs. 
                  You can now proceed with the recommended treatment.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => router.push('/docconnect/confirmation')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Proceed to Treatment
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/docconnect')}
                >
                  Back to DocConnect
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We're working to secure funding for your treatment. This process typically takes 15-30 minutes 
                for urgent cases. You'll be notified as soon as donors respond.
              </p>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push('/emergency/e1')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Services
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/docconnect')}
                >
                  Back to DocConnect
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">Emergency Assistance</h3>
          <div className="space-y-2">
            <button className="w-full p-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-left flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Emergency Helpline</p>
                <p className="text-sm text-red-600 dark:text-red-400">24/7 medical emergency support</p>
              </div>
            </button>
            
            <button className="w-full p-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-left flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Nearest Hospital</p>
                <p className="text-sm text-red-600 dark:text-red-400">Find Emergency Care Nearby</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}