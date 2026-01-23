'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import { useFamilyMembers, type FamilyMember } from '@/contexts/FamilyMembersContext'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { 
  User, 
  ArrowLeft,
  Users,
  ChevronRight,
  Edit3,
  Watch,
  Wifi,
  WifiOff,
  Smartphone,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function FamilyMembers() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<number>(1)
  const [showAddMemberForm, setShowAddMemberForm] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  const { familyMembers, addFamilyMember } = useFamilyMembers()

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const memberData = {
      name: formData.get('name') as string,
      relation: formData.get('relationship') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      gender: formData.get('gender') as string,
      bloodGroup: formData.get('bloodGroup') as string || '',
      phone: formData.get('phone') as string || undefined,
      email: formData.get('email') as string || undefined,
    }

    if (memberData.name && memberData.relation && memberData.dateOfBirth && memberData.gender) {
      addFamilyMember(memberData)
      setShowAddMemberForm(false)
      setShowSuccessMessage(true)
      event.currentTarget.reset()
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const currentUser = familyMembers.find(m => m.id === selectedUser) || familyMembers[0]

  if (!currentUser) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
        <StatusBar />
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center mr-1"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Family Members</h1>
            </div>
          </div>
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
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center mr-1"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Family Members</h1>
          </div>
        </div>
        <ImmersiveReader 
          content="Family Members Management"
          title="Family Members"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="mb-6">
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300 text-center font-medium">
                ✓ Family member added successfully!
              </p>
            </div>
          )}
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedUser(member.id)}
                className={`flex-shrink-0 w-32 p-4 rounded-xl transition-all ${
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
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
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
          </div>
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