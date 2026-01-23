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

// Disable static generation for this page
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
      // Reset form
      event.currentTarget.reset()
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const currentUser = familyMembers.find(m => m.id === selectedUser) || familyMembers[0]

  // Handle SSR case where currentUser might be undefined
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
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
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
          content="Family Members Management. Add and manage family members in your healthcare network. View health information, smartwatch connections, and medical details for each family member. Add new members with their personal information, health conditions, and emergency contacts."
          title="Family Members"
        />
      </div>

      {/* Content - Scrollable with hidden scrollbar */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Family Members Carousel */}
        <div className="mb-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300 text-center font-medium">
                ✓ Family member added successfully! Changes are synced with LifeLog.
              </p>
            </div>
          )}
          
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
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
            
            {/* Add Member Button */}
            <button
              onClick={() => setShowAddMemberForm(true)}
              className="flex-shrink-0 w-32 p-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <span className="text-3xl text-gray-400 dark:text-gray-500">+</span>
              </div>
              <p className="text-sm font-medium text-center text-gray-600 dark:text-gray-400">Add Member</p>
            </button>
          </div>
        </div>

        {/* Selected Member Info */}
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

        {/* Insurance Card */}
        {currentUser.insurance ? (
          <div className={`bg-gradient-to-r ${currentUser.color} rounded-lg p-3 mb-4 text-white shadow-md`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold">Insurance Coverage</h3>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">✓</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-white/80">Provider:</span>
                <span className="text-xs font-semibold">{currentUser.insurance.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/80">Policy:</span>
                <span className="text-xs font-semibold">{currentUser.insurance.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/80">Valid Until:</span>
                <span className="text-xs font-semibold">{currentUser.insurance.validUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/80">Coverage:</span>
                <span className="text-xs font-semibold">{currentUser.insurance.coverage}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">No Insurance Coverage</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">Add insurance for better healthcare access</p>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                + Add Insurance
              </Button>
            </div>
          </div>
        )}

        {/* Health Metrics Dashboard */}
        {currentUser.healthMetrics && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Health Metrics</h3>
              {currentUser.smartwatch && currentUser.smartwatch.connected && (
                <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <Watch className="w-4 h-4" />
                  <span className="text-xs">From {currentUser.smartwatch.device.split(' ')[0]}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-red-600 dark:text-red-400">Blood Pressure</p>
                  {currentUser.smartwatch && currentUser.smartwatch.connected && (
                    <Watch className="w-3 h-3 text-red-400" />
                  )}
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{currentUser.healthMetrics.bloodPressure}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Heart Rate</p>
                  {currentUser.smartwatch && currentUser.smartwatch.connected && (
                    <Watch className="w-3 h-3 text-blue-400" />
                  )}
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{currentUser.healthMetrics.heartRate}</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Blood Sugar</p>
                <p className="font-bold text-gray-900 dark:text-white">{currentUser.healthMetrics.bloodSugar}</p>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">Manual entry</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Weight</p>
                <p className="font-bold text-gray-900 dark:text-white">{currentUser.healthMetrics.weight}</p>
                <p className="text-xs text-green-500 dark:text-green-400 mt-1">Manual entry</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">BMI</span>
                <span className="font-bold text-gray-900 dark:text-white">{currentUser.healthMetrics.bmi}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Calculated from weight & height</p>
            </div>
          </div>
        )}

        {/* Smartwatch Integration */}
        {currentUser.smartwatch ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Watch className="w-5 h-5 mr-2 text-blue-500" />
                Smartwatch
              </h3>
              {currentUser.smartwatch.connected ? (
                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Disconnected</span>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentUser.smartwatch.device}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    currentUser.smartwatch.batteryLevel > 50 ? 'bg-green-500' :
                    currentUser.smartwatch.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {currentUser.smartwatch.batteryLevel}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
                <span>Last sync: {currentUser.smartwatch.lastSync}</span>
                {!currentUser.smartwatch.connected && (
                  <button className="text-blue-600 dark:text-blue-400 font-medium">
                    Reconnect
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Watch className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">No Smartwatch Connected</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Link a smartwatch for health tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                + Link Device
              </Button>
            </div>
          </div>
        )}

        {/* Health Conditions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Health Conditions</h3>
          {currentUser.conditions.length > 0 ? (
            <div className="space-y-2">
              {currentUser.conditions.map((condition, index) => (
                <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">{condition}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">No health conditions recorded</p>
              </div>
            </div>
          )}
        </div>

        {/* Complete Health Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                  Complete Health Information
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                  To manage complete health information go to LifeLog.
                </p>
                <button 
                  onClick={() => router.push(`/health-tracker?member=${currentUser.id}`)}
                  className="inline-flex items-center text-sm text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 font-medium transition-colors"
                >
                  LifeLog
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Member - Only show for non-primary members */}
        {currentUser.relation !== 'Primary Member' && (
          <button className="w-full bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium py-3 rounded-xl border-2 border-red-200 dark:border-red-800 transition-all mb-4">
            Remove Member
          </button>
        )}
      </div>

      {/* Add Member Form Modal */}
      {showAddMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[75vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Add Family Member</h3>
                <button 
                  onClick={() => setShowAddMemberForm(false)}
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  <span className="text-gray-600 dark:text-gray-300 text-xs">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(75vh - 80px)' }}>
              <form onSubmit={handleAddMember} className="space-y-3">
                {/* Essential Information Only */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Enter full name"
                      className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Relationship *
                      </label>
                      <select 
                        name="relationship"
                        className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gender *
                      </label>
                      <select 
                        name="gender"
                        className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date of Birth *
                    </label>
                    <input 
                      name="dateOfBirth"
                      type="date" 
                      className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Blood Group
                    </label>
                    <select 
                      name="bloodGroup"
                      className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input 
                      name="phone"
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input 
                      name="email"
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Compact Note */}
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-600 dark:text-green-400 text-center">
                    To manage complete health information go to <span className="font-medium">LifeLog</span>
                  </p>
                </div>

                {/* Form Actions - Compact */}
                <div className="flex space-x-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddMemberForm(false)}
                    className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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