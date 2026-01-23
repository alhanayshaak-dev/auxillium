'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  Shield, 
  DollarSign, 
  Award, 
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  FileText,
  Eye,
  Scale,
  Heart,
  Info
} from 'lucide-react'

// Screen K: Vendor Transparency Screen
export default function VendorTransparency() {
  const router = useRouter()

  const pricingPolicy = {
    listingFee: 'Monthly subscription model',
    commissionRate: '2-5% per transaction',
    subsidyContribution: 'Vendors contribute 10% to subsidy fund',
    priceVerification: 'Regular market price audits'
  }

  const fairnessMeasures = [
    {
      title: 'Price Monitoring',
      description: 'Automated systems monitor prices across all vendors to prevent overcharging',
      icon: TrendingUp,
      status: 'active'
    },
    {
      title: 'Quality Verification',
      description: 'All medicines verified for authenticity and proper storage conditions',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'Vendor Audits',
      description: 'Regular audits ensure compliance with pricing and quality standards',
      icon: FileText,
      status: 'active'
    },
    {
      title: 'Customer Protection',
      description: 'Money-back guarantee and dispute resolution for all transactions',
      icon: Users,
      status: 'active'
    }
  ]

  const vendorRequirements = [
    'Valid pharmacy license from state drug controller',
    'GST registration and tax compliance',
    'Proper storage facilities with temperature control',
    'Qualified pharmacist on staff',
    'Insurance coverage for medicine quality',
    'Commitment to fair pricing practices'
  ]

  const subsidyContributions = {
    totalContributed: 2450000,
    beneficiaries: 12500,
    averageDiscount: 35,
    topContributors: [
      { name: 'Apollo Pharmacy', contribution: 450000, rank: 1 },
      { name: 'MedPlus', contribution: 380000, rank: 2 },
      { name: 'Wellness Forever', contribution: 320000, rank: 3 }
    ]
  }

  const transparencyMetrics = [
    { metric: 'Price Accuracy', value: '99.2%', description: 'Prices match actual pharmacy rates' },
    { metric: 'Delivery Success', value: '97.8%', description: 'Orders delivered on time' },
    { metric: 'Quality Compliance', value: '99.7%', description: 'Medicines meet quality standards' },
    { metric: 'Customer Satisfaction', value: '4.6/5', description: 'Average customer rating' }
  ]

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      <AppHeader title="Vendor Transparency" subtitle="Fair Pricing & Quality Assurance" showProfile={false} />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Transparency Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg mb-2">
                Complete Transparency
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                We believe in complete transparency about how our platform works, 
                how vendors are selected, and how pricing is determined. 
                Your trust is our priority.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            Pricing Policy
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">How Vendors Pay</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Listing Fee:</span>
                  <span className="text-gray-900 dark:text-white">{pricingPolicy.listingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transaction Fee:</span>
                  <span className="text-gray-900 dark:text-white">{pricingPolicy.commissionRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subsidy Contribution:</span>
                  <span className="text-green-600 dark:text-green-400">{pricingPolicy.subsidyContribution}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> Vendors cannot charge patients more than their listed prices. 
                    All prices are verified against market rates and audited regularly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fairness Measures */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Scale className="w-5 h-5 mr-2 text-purple-500" />
            Fairness Measures
          </h3>
          
          <div className="space-y-3">
            {fairnessMeasures.map((measure, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <measure.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{measure.title}</h4>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{measure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Requirements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Vendor Requirements
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            All vendors must meet strict requirements to ensure quality and reliability:
          </p>
          
          <div className="space-y-2">
            {vendorRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{requirement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {transparencyMetrics.map((metric, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metric.value}</p>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{metric.metric}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subsidy Contributions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            Community Subsidy Fund
          </h3>
          
          <div className="mb-4 p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-pink-700 dark:text-pink-300">
                  ₹{(subsidyContributions.totalContributed / 100000).toFixed(1)}L
                </p>
                <p className="text-xs text-pink-600 dark:text-pink-400">Total Contributed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {subsidyContributions.beneficiaries.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Beneficiaries</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                  {subsidyContributions.averageDiscount}%
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Avg. Discount</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Top Contributing Vendors</h4>
            <div className="space-y-2">
              {subsidyContributions.topContributors.map((contributor) => (
                <div key={contributor.rank} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">#{contributor.rank}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{contributor.name}</span>
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    ₹{(contributor.contribution / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complaint Resolution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Complaint Resolution</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Average Resolution Time</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">For pricing or quality issues</p>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">24 hours</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Resolution Rate</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Successfully resolved complaints</p>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">98.5%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Refund Processing</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Average refund processing time</p>
              </div>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">3-5 days</span>
            </div>
          </div>
        </div>

        {/* Regulatory Compliance */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Regulatory Compliance</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Licensed under Drugs and Cosmetics Act, 1940</li>
                <li>• Compliant with Central Drugs Standard Control Organization (CDSCO)</li>
                <li>• Regular inspections by state drug controllers</li>
                <li>• Adherence to Good Distribution Practices (GDP)</li>
                <li>• Data protection under IT Act, 2000</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Questions or Concerns?</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            If you have questions about our vendor policies or want to report pricing issues, 
            we're here to help.
          </p>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Report Pricing Issue
            </Button>
            
            <Button variant="outline" className="w-full">
              <AlertCircle className="w-4 h-4 mr-2" />
              File Complaint
            </Button>
            
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}