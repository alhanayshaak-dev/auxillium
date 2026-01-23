'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Heart,
  Gift,
  Target,
  Users,
  Calendar,
  MapPin,
  Share2,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  DollarSign,
  Phone,
  Mail,
  Globe,
  Star,
  Shield,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function DonationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const donationId = params.id
  const [donationAmount, setDonationAmount] = useState('')
  const [showDonationForm, setShowDonationForm] = useState(false)

  // Mock donation data - in real app, fetch based on ID
  const campaign = {
    id: parseInt(donationId as string),
    title: 'Free Health Camps for Rural Areas',
    description: 'Providing free medical checkups, basic treatments, and health education to underserved rural communities across Maharashtra.',
    longDescription: 'Our mission is to bridge the healthcare gap in rural Maharashtra by organizing comprehensive health camps that provide free medical services to underserved communities. These camps offer basic health screenings, consultations with qualified doctors, essential medications, and health education programs.',
    goal: 50000,
    raised: 32500,
    donors: 156,
    daysLeft: 12,
    category: 'Healthcare Access',
    organizer: 'Rural Health Foundation',
    location: 'Maharashtra, India',
    image: '🏥',
    verified: true,
    urgent: false,
    established: '2020',
    impact: {
      peopleHelped: 2500,
      campsOrganized: 45,
      medicinesDistributed: 1200,
      healthScreenings: 3500
    },
    updates: [
      {
        id: 1,
        date: 'Jan 15, 2026',
        title: 'Health Camp in Nashik District',
        description: 'Successfully organized a 3-day health camp in remote villages of Nashik district, serving 150+ patients.',
        image: '📸'
      },
      {
        id: 2,
        date: 'Jan 10, 2026',
        title: 'New Medical Equipment Purchased',
        description: 'Thanks to your donations, we were able to purchase portable ECG machines and blood pressure monitors.',
        image: '🩺'
      },
      {
        id: 3,
        date: 'Jan 5, 2026',
        title: 'Partnership with Local Hospitals',
        description: 'Formed partnerships with 3 district hospitals to provide follow-up care for patients identified during camps.',
        image: '🤝'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Sunita Devi',
        location: 'Ahmednagar',
        message: 'The health camp in our village was a blessing. My diabetes was detected early and I received free medication.',
        rating: 5
      },
      {
        id: 2,
        name: 'Ramesh Patil',
        location: 'Pune Rural',
        message: 'Excellent service by the medical team. They treated my mother with so much care and respect.',
        rating: 5
      }
    ],
    organizerInfo: {
      name: 'Rural Health Foundation',
      established: '2020',
      registration: 'NGO/2020/MH/12345',
      contact: {
        phone: '+91-9876543210',
        email: 'info@ruralhealthfoundation.org',
        website: 'www.ruralhealthfoundation.org'
      },
      achievements: [
        '50+ health camps organized',
        '5000+ people served',
        '95% patient satisfaction rate',
        'ISO 9001:2015 certified'
      ]
    }
  }

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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'healthcare access': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const handleDonate = () => {
    if (donationAmount) {
      // In real app, integrate with payment gateway
      alert(`Thank you for your donation of ₹${donationAmount}! Redirecting to payment gateway...`)
      setShowDonationForm(false)
      setDonationAmount('')
    }
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
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-pink-200 to-orange-200 dark:from-pink-800 dark:to-orange-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-pink-600 dark:text-pink-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Donation Campaign</h1>
              <p className="text-sm text-pink-600 dark:text-pink-400">Support Healthcare Initiatives</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide min-h-0">
        {/* Campaign Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          {campaign.urgent && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">URGENT</span>
            </div>
          )}

          <div className="flex items-start space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {campaign.image}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {campaign.title}
                </h2>
                {campaign.verified && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                {campaign.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatAmount(campaign.raised)} raised of {formatAmount(campaign.goal)}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
              ></div>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{campaign.donors}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Donors</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{campaign.daysLeft}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Days Left</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{campaign.impact.peopleHelped}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">People Helped</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(campaign.category)}`}>
                {campaign.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">by {campaign.organizer}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{campaign.location}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="primary" 
              className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              onClick={() => setShowDonationForm(true)}
            >
              <Gift className="w-4 h-4 mr-1" />
              Donate Now
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* About Campaign */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About This Campaign</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {campaign.longDescription}
          </p>
          
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">How Your Donation Helps:</h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>₹500 - Provides basic health screening for 5 people</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>₹1000 - Covers essential medicines for 10 patients</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>₹2500 - Funds a complete health camp for one village</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>₹5000 - Sponsors medical equipment for camps</span>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Impact So Far
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{campaign.impact.peopleHelped}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">People Helped</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{campaign.impact.campsOrganized}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Camps Organized</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{campaign.impact.medicinesDistributed}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Medicines Distributed</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{campaign.impact.healthScreenings}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Health Screenings</div>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {campaign.updates.map((update) => (
              <div key={update.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{update.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{update.title}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{update.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{update.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What People Say</h3>
          <div className="space-y-4">
            {campaign.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 italic">"{testimonial.message}"</p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  - {testimonial.name}, {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organizer Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-500" />
            About the Organizer
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{campaign.organizerInfo.name}</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Established:</span>
                  <span>{campaign.organizerInfo.established}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Registration:</span>
                  <span>{campaign.organizerInfo.registration}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Contact Information</h5>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{campaign.organizerInfo.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{campaign.organizerInfo.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{campaign.organizerInfo.contact.website}</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Achievements</h5>
              <div className="space-y-1">
                {campaign.organizerInfo.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[70vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Make a Donation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 2500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
                <p className="text-sm text-pink-700 dark:text-pink-300">
                  Your donation will directly support healthcare initiatives in rural communities.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="primary" 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500"
                  onClick={handleDonate}
                  disabled={!donationAmount}
                >
                  Donate ₹{donationAmount || '0'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDonationForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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