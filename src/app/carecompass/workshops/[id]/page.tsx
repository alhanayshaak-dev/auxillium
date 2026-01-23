'use client'

import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Video,
  Play,
  Calendar,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle,
  Share2,
  Bookmark,
  Download,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function WorkshopDetailPage() {
  const router = useRouter()
  const params = useParams()
  const workshopId = params.id

  // Mock workshop data - in real app, fetch based on ID
  const workshop = {
    id: parseInt(workshopId as string),
    title: 'Diabetes Management Workshop',
    instructor: 'Dr. Sarah Johnson',
    duration: '90 mins',
    participants: 45,
    rating: 4.8,
    reviews: 156,
    category: 'Chronic Care',
    description: 'Learn effective strategies for managing diabetes through diet, exercise, and medication.',
    longDescription: 'This comprehensive workshop covers everything you need to know about managing diabetes effectively. You\'ll learn about proper nutrition, exercise routines, medication management, and lifestyle modifications that can help you live a healthy life with diabetes.',
    date: 'Jan 20, 2026',
    time: '3:00 PM IST',
    isLive: true,
    thumbnail: '🩺',
    price: 299,
    originalPrice: 399,
    features: [
      'Live interactive session with Q&A',
      'Downloadable meal planning guide',
      'Exercise routine recommendations',
      'Medication tracking templates',
      'Lifetime access to recording',
      'Certificate of completion'
    ],
    prerequisites: 'No prior knowledge required',
    language: 'English, Hindi',
    materials: 'All materials provided digitally'
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
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Workshop Details</h1>
              <p className="text-sm text-blue-600 dark:text-blue-400">Learn From Healthcare Experts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide min-h-0">
        {/* Workshop Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {workshop.thumbnail}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {workshop.title}
                </h2>
                {workshop.isLive && (
                  <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">LIVE</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                by {workshop.instructor}
              </p>
              
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{workshop.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({workshop.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{workshop.participants} enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{workshop.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{workshop.price}</span>
                {workshop.originalPrice && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹{workshop.originalPrice}</span>
                )}
              </div>
              {workshop.originalPrice && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  Save ₹{workshop.originalPrice - workshop.price}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule (for live workshops) */}
        {workshop.isLive && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Live Session Schedule
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 dark:text-blue-300">Date:</span>
                <span className="font-medium text-blue-900 dark:text-blue-100">{workshop.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700 dark:text-blue-300">Time:</span>
                <span className="font-medium text-blue-900 dark:text-blue-100">{workshop.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700 dark:text-blue-300">Duration:</span>
                <span className="font-medium text-blue-900 dark:text-blue-100">{workshop.duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About This Workshop</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {workshop.longDescription}
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {workshop.description}
          </p>
        </div>

        {/* What's Included */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What's Included</h3>
          <div className="space-y-3">
            {workshop.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Workshop Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Prerequisites:</span>
              <span className="text-gray-900 dark:text-white font-medium">{workshop.prerequisites}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Language:</span>
              <span className="text-gray-900 dark:text-white font-medium">{workshop.language}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Materials:</span>
              <span className="text-gray-900 dark:text-white font-medium">{workshop.materials}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Category:</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                {workshop.category}
              </span>
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About the Instructor</h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{workshop.instructor}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Experienced healthcare professional specializing in {workshop.category.toLowerCase()}. 
                With over 10 years of clinical experience, Dr. Johnson has helped thousands of patients 
                manage their health conditions effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Button 
            variant="primary" 
            className="w-full mb-3"
            onClick={() => router.push(`/carecompass/workshops/${workshopId}/enroll`)}
          >
            {workshop.isLive ? 'Join Live Workshop' : 'Enroll Now'}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            30-day money-back guarantee • Secure payment
          </p>
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