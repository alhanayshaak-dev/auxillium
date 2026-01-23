'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { 
  GraduationCap, 
  MessageSquare, 
  Heart,
  Play,
  Gift,
  Award,
  Utensils,
  Brain,
  Activity,
  TrendingUp,
  Video,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill,
  ArrowLeft,
  Search,
  Mic,
  BookOpen
} from 'lucide-react'

export default function CareCompassHome() {
  const router = useRouter()
  const servicesScrollRef = useRef<HTMLDivElement>(null)
  const [currentServicePage, setCurrentServicePage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [showWorkshops, setShowWorkshops] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showDonations, setShowDonations] = useState(false)
  
  const totalServices = 6
  const servicesPerPage = 2
  const totalServicePages = Math.ceil(totalServices / servicesPerPage)

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const handleServicesScroll = () => {
    if (servicesScrollRef.current) {
      const scrollLeft = servicesScrollRef.current.scrollLeft
      const itemWidth = 140 // 128px width + 12px gap
      const page = Math.round(scrollLeft / (itemWidth * servicesPerPage))
      setCurrentServicePage(Math.min(page, totalServicePages - 1))
    }
  }

  const scrollToServicePage = (pageIndex: number) => {
    if (servicesScrollRef.current) {
      const itemWidth = 140 // 128px width + 12px gap
      const scrollLeft = pageIndex * (itemWidth * servicesPerPage)
      servicesScrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
      setCurrentServicePage(pageIndex)
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">CareCompass</h1>
              <p className="text-sm text-purple-600 dark:text-purple-400">Supplementary Health Services</p>
            </div>
          </div>
          <ImmersiveReader 
            content="CareCompass - Supplementary Health Services. Access comprehensive wellness support including dietician consultations, physiotherapy, fitness programs, yoga and meditation sessions, and wellness coaching. Join health workshops, connect with support communities, and contribute to healthcare donations. Your gateway to holistic health and wellness services."
            title="CareCompass - Health Services"
          />
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-56">
        {/* Sponsored Advertisements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Sponsored</h3>
          </div>
          <div className="overflow-hidden">
            <div className="flex space-x-3 animate-scroll">
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">HealthPlus Insurance</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Get 30% off on family health insurance plans. Comprehensive coverage for all your medical needs.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">MediCare Pharmacy</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Free home delivery on medicines. Order now and get 20% discount on your first purchase.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Order Now
                </button>
              </div>
              
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">FitLife Wellness</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Join our premium fitness program. Personal trainers and nutrition plans included.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Join Now
                </button>
              </div>
              
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">LabTest Express</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Book lab tests online with home sample collection. Fast results within 24 hours.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Book Test
                </button>
              </div>
              
              {/* Duplicate ads for seamless loop */}
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">HealthPlus Insurance</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Get 30% off on family health insurance plans. Comprehensive coverage for all your medical needs.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="flex-shrink-0 w-72 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm">MediCare Pharmacy</h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Ad</span>
                </div>
                <p className="text-xs mb-3 opacity-90">Free home delivery on medicines. Order now and get 20% discount on your first purchase.</p>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          {/* Service Categories */}
          <div 
            ref={servicesScrollRef}
            onScroll={handleServicesScroll}
            className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2 mb-4"
          >
            <button
              onClick={() => router.push('/carecompass/supplementary-services?service=dietician')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <Utensils className="w-6 h-6 text-green-600 dark:text-green-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">Dietician</p>
            </button>

            <button
              onClick={() => router.push('/carecompass/supplementary-services?service=physiotherapy')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">Physiotherapy</p>
            </button>

            <button
              onClick={() => router.push('/carecompass/supplementary-services?service=fitness')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">Physical Fitness</p>
            </button>

            <button
              onClick={() => router.push('/carecompass/supplementary-services?service=yoga')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">Yoga & Meditation</p>
            </button>

            <button
              onClick={() => router.push('/carecompass/supplementary-services?service=wellness')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">Wellness</p>
            </button>

            <button
              onClick={() => router.push('/carecompass/supplementary-services')}
              className="flex-shrink-0 p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all w-32 h-20 flex flex-col justify-center items-center"
            >
              <Award className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-1" />
              <p className="font-medium text-gray-900 dark:text-white text-sm text-center">View All</p>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: totalServicePages }, (_, index) => (
              <button
                key={index}
                onClick={() => scrollToServicePage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentServicePage === index
                    ? 'bg-purple-500 dark:bg-purple-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for services, specialists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  router.push(`/carecompass/supplementary-services?search=${encodeURIComponent(e.currentTarget.value)}`)
                }
              }}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => {
                setIsListening(!isListening)
                if (!isListening) {
                  alert('Voice search feature coming soon! Please use text search for now.')
                }
              }}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Donations Section - Updated */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <Gift className="w-5 h-5 mr-2 text-orange-500" />
              Donations
            </h3>
            <button 
              onClick={() => setShowDonations(!showDonations)}
              className="text-sm text-blue-600 dark:text-blue-400 font-medium"
            >
              {showDonations ? 'Hide' : 'View All'}
            </button>
          </div>
          
          {showDonations && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Support healthcare initiatives and help those in need access medical care
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => router.push('/carecompass/donations?type=save-life')}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <Gift className="w-5 h-5 text-red-600 dark:text-red-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Save a Life</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">₹3.25L raised</p>
                </button>
                <button
                  onClick={() => router.push('/carecompass/donations?type=disaster-relief')}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Disaster Relief</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">₹4.45L raised</p>
                </button>
              </div>

              <Button
                onClick={() => router.push('/carecompass/donations')}
                variant="primary"
                className="w-full"
              >
                Browse Donations
              </Button>
            </>
          )}
        </div>

        {/* Workshops Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
              Health Workshops
            </h3>
            <button 
              onClick={() => setShowWorkshops(!showWorkshops)}
              className="text-sm text-blue-600 dark:text-blue-400 font-medium"
            >
              {showWorkshops ? 'Hide' : 'View All'}
            </button>
          </div>
          
          {showWorkshops && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Join live and recorded educational sessions on various health topics
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push('/carecompass/workshops?type=live')}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <Video className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Live Sessions</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Interactive workshops</p>
                </button>
                <button
                  onClick={() => router.push('/carecompass/workshops?type=recorded')}
                  className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                >
                  <Play className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Recorded</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Watch anytime</p>
                </button>
              </div>

              <Button
                onClick={() => router.push('/carecompass/workshops')}
                variant="primary"
                className="w-full mt-4"
              >
                Browse Workshops
              </Button>
            </>
          )}
        </div>

        {/* Community & Donations Combined */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-500" />
              Community Support
            </h3>
            <button 
              onClick={() => setShowCommunity(!showCommunity)}
              className="text-sm text-blue-600 dark:text-blue-400 font-medium"
            >
              {showCommunity ? 'Hide' : 'View All'}
            </button>
          </div>
          
          {showCommunity && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Join support groups and connect with others facing similar health challenges
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => router.push('/carecompass/community?type=diabetes')}
                  className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <Heart className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Diabetes Support</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">245 members</p>
                </button>
                <button
                  onClick={() => router.push('/carecompass/community?type=mental')}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mental Health</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">189 members</p>
                </button>
              </div>

              <Button
                onClick={() => router.push('/carecompass/community')}
                variant="primary"
                className="w-full"
              >
                Browse Communities
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
        <div className="flex justify-around">
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => handleModuleClick('')}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => handleModuleClick('docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-purple-500 p-1"
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => handleModuleClick('health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => handleModuleClick('medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}