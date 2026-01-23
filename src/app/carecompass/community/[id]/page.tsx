'use client'

import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Star,
  Shield,
  UserPlus,
  Bell,
  Share2,
  Settings,
  Clock,
  Award,
  Heart,
  CheckCircle,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function CommunityDetailPage() {
  const router = useRouter()
  const params = useParams()
  const communityId = params.id

  // Mock community data - in real app, fetch based on ID
  const community = {
    id: parseInt(communityId as string),
    name: 'Diabetes Support Group',
    description: 'A supportive community for people managing diabetes. Share experiences, tips, and get motivation from others on the same journey.',
    longDescription: 'Our diabetes support group is a safe and welcoming space for individuals living with Type 1, Type 2, or gestational diabetes. We believe that managing diabetes is easier when you have a supportive community by your side. Whether you\'re newly diagnosed or have been managing diabetes for years, you\'ll find valuable resources, encouragement, and friendship here.',
    members: 245,
    category: 'Chronic Conditions',
    isPrivate: false,
    lastActivity: '2 hours ago',
    moderator: 'Dr. Sarah Johnson',
    meetingSchedule: 'Every Tuesday 7:00 PM',
    location: 'Online & Mumbai',
    rating: 4.8,
    reviews: 89,
    established: 'January 2024',
    rules: [
      'Be respectful and supportive to all members',
      'No medical advice - consult healthcare professionals',
      'Keep discussions relevant to diabetes management',
      'Respect privacy - no sharing personal information',
      'Report inappropriate content to moderators'
    ],
    recentTopics: [
      {
        id: 1,
        title: 'Best glucose monitoring apps?',
        author: 'Priya K.',
        replies: 12,
        lastReply: '2 hours ago'
      },
      {
        id: 2,
        title: 'Low-carb recipe sharing',
        author: 'Raj S.',
        replies: 8,
        lastReply: '4 hours ago'
      },
      {
        id: 3,
        title: 'Exercise routines that work',
        author: 'Priya K.',
        replies: 15,
        lastReply: '6 hours ago'
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Weekly Check-in Meeting',
        date: 'Jan 23, 2026',
        time: '7:00 PM IST',
        type: 'Online'
      },
      {
        id: 2,
        title: 'Healthy Cooking Workshop',
        date: 'Jan 25, 2026',
        time: '6:00 PM IST',
        type: 'In-person - Mumbai'
      }
    ]
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'chronic conditions': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
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
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-green-600 dark:text-green-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Support Group</h1>
              <p className="text-sm text-green-600 dark:text-green-400">Community Details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide min-h-0">
        {/* Community Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{community.name}</h2>
                {community.isPrivate && (
                  <Shield className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                {community.description}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{community.members} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{community.rating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({community.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Active {community.lastActivity}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(community.category)}`}>
                {community.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Est. {community.established}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="primary" 
              className="flex-1"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              {community.isPrivate ? 'Request to Join' : 'Join Group'}
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-1" />
              Follow
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About This Community</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {community.longDescription}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Moderator:</span>
              <span className="text-gray-900 dark:text-white font-medium">{community.moderator}</span>
            </div>
            {community.meetingSchedule && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Meetings:</span>
                <span className="text-gray-900 dark:text-white font-medium">{community.meetingSchedule}</span>
              </div>
            )}
            {community.location && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <span className="text-gray-900 dark:text-white font-medium">{community.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Community Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Community Guidelines</h3>
          <div className="space-y-3">
            {community.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {community.upcomingEvents.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {community.upcomingEvents.map((event) => (
                <div key={event.id} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">{event.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-blue-700 dark:text-blue-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Discussions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
            Recent Discussions
          </h3>
          <div className="space-y-3">
            {community.recentTopics.map((topic) => (
              <div key={topic.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{topic.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>by {topic.author}</span>
                  <div className="flex items-center space-x-3">
                    <span>{topic.replies} replies</span>
                    <span>{topic.lastReply}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Discussions
          </Button>
        </div>

        {/* Moderator Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Community Moderator</h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{community.moderator}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Experienced healthcare professional specializing in diabetes care. 
                Dr. Johnson has been moderating support groups for over 5 years and is 
                passionate about helping people manage their health conditions effectively.
              </p>
            </div>
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