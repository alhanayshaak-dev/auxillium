'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { useFamilyMembers } from '@/contexts/FamilyMembersContext'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { 
  User, 
  X,
  Users,
  ChevronRight,
  Edit3,
  Plus,
  Trash2,
  Mail,
  Phone,
  Activity,
  FileText,
  Heart,
  Home,
  Stethoscope,
  Compass,
  Pill
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function FamilyMembers() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<number>(1)
  const [currentMemberIndex, setCurrentMemberIndex] = useState<number>(0)
  const { familyMembers, removeFamilyMember } = useFamilyMembers()

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const handleRemoveMember = async (memberId: number | string) => {
    if (confirm('Are you sure you want to remove this family member?')) {
      try {
        await removeFamilyMember(memberId)
      } catch (error) {
        console.error('Failed to remove family member:', error)
      }
    }
  }

  // Calculate pagination based on actual member count
  const totalMembers = familyMembers.length + 1 // +1 for Add Members button
  const membersPerView = 2 // Show 2 members per page for better navigation
  const totalPages = Math.max(1, Math.ceil(totalMembers / membersPerView))
  
  const handleDotClick = (pageIndex: number) => {
    setCurrentMemberIndex(pageIndex)
    const memberContainer = document.querySelector('.members-scroll-container') as HTMLElement
    if (memberContainer) {
      // Calculate scroll position based on member width (132px + 12px gap = 144px per member)
      const memberWidth = 144
      const scrollPosition = pageIndex * membersPerView * memberWidth
      memberContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    }
  }

  // Update current index based on scroll position
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const memberWidth = 144 // 132px width + 12px gap
    const newIndex = Math.round(scrollLeft / (membersPerView * memberWidth))
    setCurrentMemberIndex(Math.max(0, Math.min(newIndex, totalPages - 1)))
  }

  const currentUser = familyMembers.find(m => m.id === selectedUser) || familyMembers[0]

  if (!currentUser) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
        <StatusBar />
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Family Members</h1>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Loading family members...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Family Members</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ImmersiveReader 
            content="Family Members Management"
            title="Family Members"
          />
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="mb-6">
          {/* Members Carousel Container */}
          <div className="relative">
            <div 
              className="flex space-x-3 overflow-x-auto overflow-y-hidden pb-2 members-scroll-container"
              onScroll={handleScroll}
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory'
              }}
            >
              <style jsx>{`
                .members-scroll-container::-webkit-scrollbar {
                  display: none;
                }
                .members-scroll-container {
                  -webkit-overflow-scrolling: touch;
                  scroll-snap-type: x mandatory;
                }
                .member-card {
                  scroll-snap-align: start;
                }
              `}</style>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedUser(typeof member.id === 'string' ? parseInt(member.id) || 1 : member.id)}
                  className={`member-card flex-shrink-0 w-32 p-4 rounded-xl transition-all ${
                    selectedUser === member.id
                      ? 'bg-gradient-to-br ' + member.color + ' text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    selectedUser === member.id
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br ' + member.color
                  }`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-center truncate">{member.name.split(' ')[0]}</p>
                  <p className="text-xs text-center opacity-75">{member.relation}</p>
                </button>
              ))}
              
              {/* Add Members Button */}
              <button
                onClick={() => router.push('/family-members/add')}
                className="member-card flex-shrink-0 w-32 p-4 rounded-xl transition-all bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-dashed border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md"
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center bg-green-200 dark:bg-green-800">
                  <Plus className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <p className="text-sm font-medium text-center text-green-700 dark:text-green-300">Add Members</p>
              </button>
            </div>
            
            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentMemberIndex
                        ? 'bg-blue-500 dark:bg-blue-400 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Member Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              {/* Show remove button only for non-primary members */}
              {currentUser.relation !== 'Primary Member' && (
                <button 
                  onClick={() => handleRemoveMember(currentUser.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Relation</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.relation}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Date of Birth</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.dateOfBirth}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Gender</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.gender}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Blood Group</span>
              <span className="text-sm font-medium text-red-600">{currentUser.bloodGroup}</span>
            </div>
            
            {/* Phone Number */}
            {currentUser.phone && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  Phone
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.phone}</span>
              </div>
            )}
            
            {/* Email ID */}
            {currentUser.email && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Health Information Reference */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">Health Details</h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  View detailed health information for {currentUser.name.split(' ')[0]}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/health-tracker')}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Go to LifeLog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Health Summary */}
          {currentUser.healthMetrics && (
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
              <p className="text-xs text-green-600 dark:text-green-400 mb-2">Quick Health Summary:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span className="text-green-700 dark:text-green-300">BP: {currentUser.healthMetrics.bloodPressure}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-blue-500" />
                  <span className="text-green-700 dark:text-green-300">HR: {currentUser.healthMetrics.heartRate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
            onClick={() => handleModuleClick('carecompass')}
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
