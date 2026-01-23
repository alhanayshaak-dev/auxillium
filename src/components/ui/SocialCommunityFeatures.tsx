'use client'

import { useState } from 'react'
import { Users, Trophy, Heart, MessageCircle, Star, Award, Target, Share2, ThumbsUp, Calendar } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'
import ProgressBar from './ProgressBar'

interface SupportGroup {
  id: string
  name: string
  condition: string
  members: number
  description: string
  lastActivity: Date
  isJoined: boolean
  category: 'diabetes' | 'hypertension' | 'mental_health' | 'cancer' | 'heart_disease'
}

interface HealthChallenge {
  id: string
  title: string
  description: string
  type: 'steps' | 'water' | 'meditation' | 'weight_loss' | 'medication_adherence'
  duration: string
  participants: number
  reward: string
  progress: number
  isJoined: boolean
  familyParticipants: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedDate: Date | null
  progress: number
  maxProgress: number
  category: 'health' | 'social' | 'emergency' | 'learning'
}

interface SocialCommunityFeaturesProps {
  className?: string
}

export default function SocialCommunityFeatures({ className = '' }: SocialCommunityFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'groups' | 'challenges' | 'achievements' | 'reviews'>('groups')

  const [supportGroups] = useState<SupportGroup[]>([
    {
      id: 'diabetes-support',
      name: 'Diabetes Warriors',
      condition: 'Type 2 Diabetes',
      members: 1247,
      description: 'Supporting each other through diabetes management, sharing tips and experiences',
      lastActivity: new Date('2024-01-20T14:30:00'),
      isJoined: true,
      category: 'diabetes'
    },
    {
      id: 'heart-health',
      name: 'Heart Health Heroes',
      condition: 'Cardiovascular Disease',
      members: 892,
      description: 'Heart patients sharing recovery stories and healthy lifestyle tips',
      lastActivity: new Date('2024-01-20T10:15:00'),
      isJoined: false,
      category: 'heart_disease'
    },
    {
      id: 'mental-wellness',
      name: 'Mental Wellness Circle',
      condition: 'Mental Health',
      members: 2156,
      description: 'Safe space for mental health support and mindfulness practices',
      lastActivity: new Date('2024-01-20T16:45:00'),
      isJoined: true,
      category: 'mental_health'
    }
  ])

  const [healthChallenges] = useState<HealthChallenge[]>([
    {
      id: 'family-steps',
      title: 'Family Step Challenge',
      description: '10,000 steps daily for 30 days with your family',
      type: 'steps',
      duration: '30 days',
      participants: 156,
      reward: 'Health Champion Badge + ₹500 voucher',
      progress: 65,
      isJoined: true,
      familyParticipants: ['You', 'Mom', 'Dad']
    },
    {
      id: 'hydration-hero',
      title: 'Hydration Hero',
      description: 'Drink 8 glasses of water daily for 2 weeks',
      type: 'water',
      duration: '14 days',
      participants: 89,
      reward: 'Wellness Warrior Badge',
      progress: 0,
      isJoined: false,
      familyParticipants: []
    },
    {
      id: 'med-adherence',
      title: 'Medication Mastery',
      description: '100% medication adherence for 1 month',
      type: 'medication_adherence',
      duration: '30 days',
      participants: 234,
      reward: 'Adherence Champion Badge + Health discount',
      progress: 87,
      isJoined: true,
      familyParticipants: ['You']
    }
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: 'first-emergency',
      title: 'Emergency Prepared',
      description: 'Set up emergency contacts and medical info',
      icon: '🚨',
      unlockedDate: new Date('2024-01-15'),
      progress: 1,
      maxProgress: 1,
      category: 'emergency'
    },
    {
      id: 'health-tracker',
      title: 'Health Tracker',
      description: 'Log health data for 7 consecutive days',
      icon: '📊',
      unlockedDate: new Date('2024-01-18'),
      progress: 1,
      maxProgress: 1,
      category: 'health'
    },
    {
      id: 'community-helper',
      title: 'Community Helper',
      description: 'Help 10 community members with health questions',
      icon: '🤝',
      unlockedDate: null,
      progress: 3,
      maxProgress: 10,
      category: 'social'
    },
    {
      id: 'ar-learner',
      title: 'AR Medical Student',
      description: 'Complete 5 AR/VR medical training modules',
      icon: '🥽',
      unlockedDate: null,
      progress: 2,
      maxProgress: 5,
      category: 'learning'
    }
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'diabetes': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
      case 'hypertension': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
      case 'mental_health': return 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20'
      case 'cancer': return 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/20'
      case 'heart_disease': return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
      default: return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
    }
  }

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'steps': return '👟'
      case 'water': return '💧'
      case 'meditation': return '🧘'
      case 'weight_loss': return '⚖️'
      case 'medication_adherence': return '💊'
      default: return '🎯'
    }
  }

  const getAchievementColor = (category: string) => {
    switch (category) {
      case 'health': return 'text-green-600 dark:text-green-400'
      case 'social': return 'text-blue-600 dark:text-blue-400'
      case 'emergency': return 'text-red-600 dark:text-red-400'
      case 'learning': return 'text-purple-600 dark:text-purple-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const handleJoinGroup = (groupId: string) => {
    // In real app, would join the support group
    console.log('Joining group:', groupId)
  }

  const handleJoinChallenge = (challengeId: string) => {
    // In real app, would join the health challenge
    console.log('Joining challenge:', challengeId)
  }

  const renderSupportGroups = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Patient Support Groups</h4>
        <Button variant="outline" size="sm">Find More</Button>
      </div>

      {supportGroups.map((group) => (
        <div key={group.id} className={`border rounded-lg p-4 ${getCategoryColor(group.category)}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h5 className="font-medium text-gray-900 dark:text-white">{group.name}</h5>
                {group.isJoined && (
                  <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">
                    Joined
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{group.condition}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{group.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{group.members.toLocaleString()} members</span>
                </span>
                <span>Active {Math.floor((Date.now() - group.lastActivity.getTime()) / (1000 * 60 * 60))}h ago</span>
              </div>
            </div>
            
            {!group.isJoined && (
              <Button
                onClick={() => handleJoinGroup(group.id)}
                variant="primary"
                size="sm"
              >
                Join Group
              </Button>
            )}
          </div>

          {group.isJoined && (
            <div className="flex space-x-2 pt-3 border-t border-gray-200 dark:border-gray-600">
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                View Posts
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Experience
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderHealthChallenges = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Family Health Challenges</h4>
        <Button variant="outline" size="sm">Create Challenge</Button>
      </div>

      {healthChallenges.map((challenge) => (
        <div key={challenge.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{getChallengeIcon(challenge.type)}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">{challenge.title}</h5>
                  {challenge.isJoined && (
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{challenge.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>{challenge.duration}</span>
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                  🏆 Reward: {challenge.reward}
                </div>
                
                {challenge.familyParticipants.length > 0 && (
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Family: {challenge.familyParticipants.join(', ')}
                  </div>
                )}
              </div>
            </div>
            
            {!challenge.isJoined ? (
              <Button
                onClick={() => handleJoinChallenge(challenge.id)}
                variant="primary"
                size="sm"
              >
                Join Challenge
              </Button>
            ) : (
              <div className="text-right">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {challenge.progress}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
              </div>
            )}
          </div>

          {challenge.isJoined && (
            <div className="space-y-2">
              <ProgressBar
                progress={challenge.progress}
                variant={challenge.progress >= 80 ? 'success' : 'default'}
                size="sm"
              />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Trophy className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Encourage Family
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 dark:text-white">Health Achievement Badges</h4>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`border rounded-lg p-3 ${
              achievement.unlockedDate 
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
            }`}
          >
            <div className="text-center mb-2">
              <div className={`text-3xl mb-1 ${achievement.unlockedDate ? '' : 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <h5 className={`font-medium text-sm ${
                achievement.unlockedDate 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.title}
              </h5>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
              {achievement.description}
            </p>
            
            {achievement.unlockedDate ? (
              <div className="text-xs text-green-600 dark:text-green-400 text-center">
                Unlocked {achievement.unlockedDate.toLocaleDateString()}
              </div>
            ) : (
              <div className="space-y-1">
                <ProgressBar
                  progress={(achievement.progress / achievement.maxProgress) * 100}
                  variant="default"
                  size="sm"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {achievement.progress}/{achievement.maxProgress}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderDoctorReviews = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Doctor Reviews & Ratings</h4>
        <Button variant="outline" size="sm">Write Review</Button>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: 4.8, reviews: 156, lastVisit: '2024-01-15' },
          { name: 'Dr. Rajesh Kumar', specialty: 'Endocrinologist', rating: 4.6, reviews: 89, lastVisit: '2023-12-20' },
          { name: 'Dr. Anita Patel', specialty: 'General Physician', rating: 4.9, reviews: 234, lastVisit: '2024-01-10' }
        ].map((doctor, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{doctor.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{doctor.reviews} reviews</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Last visit: {new Date(doctor.lastVisit).toLocaleDateString()}
              </span>
              <Button variant="outline" size="sm">
                Rate & Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          Community & Social
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'groups', label: 'Support Groups', icon: Users },
          { id: 'challenges', label: 'Challenges', icon: Trophy },
          { id: 'achievements', label: 'Badges', icon: Award },
          { id: 'reviews', label: 'Reviews', icon: Star }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'groups' && renderSupportGroups()}
        {activeTab === 'challenges' && renderHealthChallenges()}
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'reviews' && renderDoctorReviews()}
      </div>
    </div>
  )
}