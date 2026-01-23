'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  Heart,
  Gift,
  Target,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Star,
  Share2,
  Shield,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill,
  X
} from 'lucide-react'

type DonationCampaign = {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  donors: number
  daysLeft: number
  category: string
  organizer: string
  location: string
  image: string
  verified: boolean
  urgent: boolean
}

export default function DonationsPage() {
  const router = useRouter()

  const donationPlatforms = [
    {
      id: 1,
      title: 'Emergency Fund Raising to Save a Life',
      description: 'Contribute to critical medical emergencies, life-saving surgeries, and urgent treatments for patients in immediate need of financial assistance.',
      goal: 500000,
      raised: 325000,
      donors: 1247,
      urgency: 'Critical',
      category: 'Medical Emergency',
      icon: '❤️',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      cases: [
        'Critical surgeries for accident victims',
        'Emergency cardiac procedures',
        'Life-saving cancer treatments',
        'Organ transplant funding',
        'Pediatric emergency care'
      ],
      currentCase: {
        patientName: 'Rajesh Kumar',
        condition: 'Emergency cardiac surgery required due to severe heart attack',
        hospital: 'Apollo Hospital',
        location: 'Sector 26, Noida',
        amountNeeded: 350000,
        amountCollected: 185000,
        doctorTestimony: 'Patient condition is critical and requires immediate cardiac bypass surgery. Without this procedure within 48 hours, the patient\'s life is at severe risk. - Dr. Sarah Johnson, Chief Cardiologist',
        caseType: 'Emergency Surgery Request'
      }
    },
    {
      id: 2,
      title: 'Disaster Relief Healthcare Support',
      description: 'Support healthcare infrastructure and medical aid during natural disasters, providing emergency medical supplies, temporary hospitals, and healthcare worker deployment.',
      goal: 750000,
      raised: 445000,
      donors: 892,
      urgency: 'High',
      category: 'Disaster Relief',
      icon: '🏥',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      cases: [
        'Mobile medical units for disaster zones',
        'Emergency medical supplies',
        'Temporary healthcare facilities',
        'Medical evacuation services',
        'Healthcare worker deployment'
      ],
      currentCase: {
        disasterType: 'Cyclone Biparjoy Relief',
        location: 'Kutch District, Gujarat',
        affectedArea: '15 villages, 25,000 people affected',
        medicalNeeds: 'Emergency medical supplies, mobile health units, and temporary medical facilities for flood-affected areas',
        amountNeeded: 500000,
        amountCollected: 285000,
        organizationName: 'Gujarat State Disaster Management Authority',
        verificationStatus: 'Verified by National Disaster Response Force (NDRF)',
        urgentRequirements: [
          'Mobile medical units for remote villages',
          'Emergency medicines and first aid supplies',
          'Temporary dialysis units for kidney patients',
          'Medical evacuation helicopters',
          'Clean water purification systems'
        ],
        caseType: 'Disaster Relief Request'
      }
    }
  ]

  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    }
    return `₹${amount}`
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const handleDonate = (platform: any) => {
    // Show donation success message
    alert(`Thank you for your contribution to ${platform.title}! Your donation will help save lives.`)
    // In a real app, this would open payment gateway
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
      <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/30 dark:to-orange-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Donate to Save Lives</h1>
              <p className="text-sm text-pink-600 dark:text-pink-400">Every Life Matters</p>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-pink-200 to-orange-200 dark:from-pink-800 dark:to-orange-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-pink-600 dark:text-pink-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 pb-20 overflow-y-auto scrollbar-hide min-h-0">
        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6 border border-pink-200 dark:border-pink-800">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            <h3 className="font-semibold text-pink-900 dark:text-pink-100">Community Impact</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-pink-600 dark:text-pink-400">₹77L</div>
              <div className="text-xs text-pink-700 dark:text-pink-300">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">2,139</div>
              <div className="text-xs text-orange-700 dark:text-orange-300">Donors</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600 dark:text-red-400">156</div>
              <div className="text-xs text-red-700 dark:text-red-300">Lives Saved</div>
            </div>
          </div>
        </div>

        {/* Donation Platforms */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Choose Your Impact</h2>
          
          {donationPlatforms.map((platform) => (
            <div key={platform.id} className={`bg-gradient-to-r ${platform.bgColor} rounded-xl p-6 shadow-sm border ${platform.borderColor}`}>
              {/* Urgency Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{platform.icon}</span>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      platform.urgency === 'Critical' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {platform.urgency} Need
                    </span>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>

              {/* Platform Title and Description - Only show if no current case */}
              {!platform.currentCase && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {platform.title}
                  </h3>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {platform.description}
                  </p>
                </>
              )}

              {/* Current Case Details - For both Emergency Fund Raising and Disaster Relief */}
              {platform.currentCase && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold text-sm ${
                      platform.category === 'Medical Emergency' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {platform.currentCase.caseType}
                    </span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  
                  {/* Medical Emergency Case Layout */}
                  {platform.category === 'Medical Emergency' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Patient Name</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.patientName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Hospital</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.hospital}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Patient Condition</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{platform.currentCase.condition}</p>
                      </div>
                    </>
                  )}

                  {/* Disaster Relief Case Layout */}
                  {platform.category === 'Disaster Relief' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Disaster Type</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.disasterType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Organization</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.organizationName}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Affected Area</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{platform.currentCase.location}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{platform.currentCase.affectedArea}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Medical Needs</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{platform.currentCase.medicalNeeds}</p>
                      </div>

                      {/* Urgent Requirements for Disaster Relief */}
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Urgent Requirements</p>
                        <div className="grid grid-cols-1 gap-1">
                          {platform.currentCase.urgentRequirements?.slice(0, 3).map((requirement, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Amount Needed</p>
                      <p className={`font-bold text-sm ${
                        platform.category === 'Medical Emergency' 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        ₹{formatAmount(platform.currentCase.amountNeeded)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Amount Collected</p>
                      <p className="font-bold text-green-600 dark:text-green-400 text-sm">₹{formatAmount(platform.currentCase.amountCollected)}</p>
                    </div>
                  </div>
                  
                  {/* Case Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Funding Progress</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((platform.currentCase.amountCollected / platform.currentCase.amountNeeded) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          platform.category === 'Medical Emergency' 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}
                        style={{ width: `${Math.min((platform.currentCase.amountCollected / platform.currentCase.amountNeeded) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Verification/Testimony Box */}
                  <div className={`rounded-lg p-3 border ${
                    platform.category === 'Medical Emergency' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                      : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  }`}>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {platform.category === 'Medical Emergency' ? "Doctor's Testimony" : "Official Verification"}
                    </p>
                    <p className={`text-xs italic ${
                      platform.category === 'Medical Emergency' 
                        ? 'text-blue-800 dark:text-blue-200' 
                        : 'text-green-800 dark:text-green-200'
                    }`}>
                      "{platform.category === 'Medical Emergency' 
                        ? platform.currentCase.doctorTestimony 
                        : platform.currentCase.verificationStatus}"
                    </p>
                  </div>
                  
                  {/* Donate Now Button for Current Case */}
                  <Button 
                    variant="primary" 
                    size="sm"
                    className={`w-full hover:opacity-90 ${
                      platform.category === 'Medical Emergency' 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}
                    onClick={() => {
                      const donationTarget = platform.category === 'Medical Emergency' 
                        ? `help ${platform.currentCase.patientName}` 
                        : `support ${platform.currentCase.disasterType} relief efforts`
                      alert(`Thank you for your donation to ${donationTarget}! Your contribution will make a direct impact.`)
                    }}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    {platform.category === 'Medical Emergency' 
                      ? `Donate Now for ${platform.currentCase.patientName}` 
                      : `Donate for ${platform.currentCase.disasterType}`}
                  </Button>
                </div>
              )}

              {/* Use Cases - Only show if no current case */}
              {!platform.currentCase && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Your donation helps with:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {platform.cases.slice(0, 3).map((useCase, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overall Platform Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatAmount(platform.raised)} raised of {formatAmount(platform.goal)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(getProgressPercentage(platform.raised, platform.goal))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${platform.color} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${getProgressPercentage(platform.raised, platform.goal)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{platform.donors} donors</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    platform.category === 'Medical Emergency' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {platform.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Only show general donate if no current case */}
              {!platform.currentCase && (
                <div className="flex space-x-3">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className={`flex-1 bg-gradient-to-r ${platform.color} hover:opacity-90`}
                    onClick={() => handleDonate(platform)}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: platform.title,
                          text: platform.description,
                          url: window.location.href
                        })
                      } else {
                        alert('Platform link copied to clipboard!')
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Start Campaign CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Start Your Own Campaign</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              Have a healthcare cause you're passionate about? Create a donation campaign and make a difference.
            </p>

            {/* Legal Declaration */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700 text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                Legal Declaration & Terms of Service
              </h4>
              
              <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Documentation Requirements:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Medical campaigns require valid hospital certificates, doctor's recommendations, and patient consent forms</li>
                    <li>Disaster relief campaigns must provide official verification from recognized disaster management authorities</li>
                    <li>All financial requirements must be substantiated with official cost estimates and quotations</li>
                    <li>Identity verification of campaign host through government-issued identification documents</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Legal Responsibilities:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>The campaign host assumes full legal responsibility for the authenticity and accuracy of all information provided</li>
                    <li>Campaign hosts are solely liable for proper utilization of donated funds as per stated campaign objectives</li>
                    <li>Any misrepresentation, fraud, or misuse of funds may result in legal action under applicable laws</li>
                    <li>Campaign hosts must provide regular updates and financial transparency to donors</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">Platform Obligations:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>All campaigns undergo mandatory verification process before publication</li>
                    <li>Platform reserves the right to suspend or terminate campaigns that fail verification standards</li>
                    <li>Donated funds are held in escrow until proper documentation and verification is completed</li>
                    <li>Platform compliance with applicable financial regulations and tax reporting requirements</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-3">
                  <p className="text-red-800 dark:text-red-200 font-medium text-xs">
                    <strong>Legal Disclaimer:</strong> By creating a campaign, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                    You certify that all information provided is true and accurate to the best of your knowledge. 
                    Any violation of these terms may result in immediate campaign suspension, fund forfeiture, and potential legal prosecution.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                alert('Campaign Creation Portal: Please ensure you have all required documentation ready before proceeding. You will need to provide medical certificates, identity verification, and detailed financial requirements. By continuing, you agree to our Terms of Service and Legal Declaration.')
              }}
            >
              I Agree - Create Campaign
            </Button>
          </div>
        </div>


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