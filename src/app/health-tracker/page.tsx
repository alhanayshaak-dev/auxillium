'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import { useFamilyMembers, type FamilyMember } from '@/contexts/FamilyMembersContext'
import { healthMetrics as healthMetricsAPI, auth } from '@/lib/supabase-client'
import { 
  ArrowLeft,
  Heart,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill,
  Users,
  ChevronRight,
  Edit3,
  Watch,
  Wifi,
  WifiOff,
  Smartphone,
  Calendar,
  Activity,
  TrendingUp,
  Plus
} from 'lucide-react'

export default function HealthTrackerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedUser, setSelectedUser] = useState<number>(1)
  const { familyMembers } = useFamilyMembers()
  const [showAppointments, setShowAppointments] = useState<boolean>(false)
  const [appointmentView, setAppointmentView] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [showMedications, setShowMedications] = useState<boolean>(false)
  const [medicationReminders, setMedicationReminders] = useState<{[key: number]: boolean}>({
    1: true,
    2: true,
    3: false
  })
  const [medicationTimes, setMedicationTimes] = useState<{[key: number]: string[]}>({
    1: ['8:00 AM', '8:00 PM'],
    2: ['9:00 AM'],
    3: []
  })
  const [showTimeSelector, setShowTimeSelector] = useState<number | null>(null)
  const [editingMedication, setEditingMedication] = useState<number | null>(null)
  const [appointmentReminders, setAppointmentReminders] = useState<{[key: string]: boolean}>({
    'dr-sarah': true,
    'diabetes-workshop': false,
    'dietician': true
  })
  const [appointmentReminderTimes, setAppointmentReminderTimes] = useState<{[key: string]: string}>({
    'dr-sarah': '1 hour before',
    'diabetes-workshop': '',
    'dietician': '30 minutes before'
  })
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null)
  const [showRemindersAlerts, setShowRemindersAlerts] = useState<boolean>(false)
  const [expandedReminderCategory, setExpandedReminderCategory] = useState<string | null>(null)
  const [showHealthMetrics, setShowHealthMetrics] = useState<boolean>(false)
  const [showHealthRecords, setShowHealthRecords] = useState<boolean>(false)
  const [showHealthInsurance, setShowHealthInsurance] = useState<boolean>(false)
  const [showEmergencyContacts, setShowEmergencyContacts] = useState<boolean>(false)
  const [showHealthConditions, setShowHealthConditions] = useState<boolean>(false)
  const [showConditionReport, setShowConditionReport] = useState<boolean>(false)
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [expandedRecordCategory, setExpandedRecordCategory] = useState<string | null>(null)

  // Health Metrics State - Supabase Integration
  const [healthMetrics, setHealthMetrics] = useState<any[]>([])
  const [healthMetricsLoading, setHealthMetricsLoading] = useState(false)
  const [authUser, setAuthUser] = useState<any>(null)

  // Get current user for health metrics
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { user } = await auth.getCurrentUser()
        setAuthUser(user)
      } catch (err) {
        console.log('No authenticated user')
      }
    }
    getCurrentUser()
  }, [])

  // Load health metrics from Supabase
  const loadHealthMetrics = async (userId: string, familyMemberId?: string) => {
    try {
      setHealthMetricsLoading(true)
      const { data, error } = await healthMetricsAPI.getByUser(userId, 20)
      
      if (error) {
        console.error('Error loading health metrics:', error)
        return
      }
      
      setHealthMetrics(data || [])
    } catch (err) {
      console.error('Failed to load health metrics:', err)
    } finally {
      setHealthMetricsLoading(false)
    }
  }

  // Save health metric to Supabase
  const saveHealthMetric = async (metricType: string, value: number, unit: string, systolic?: number, diastolic?: number) => {
    if (!authUser?.id) return

    try {
      const selectedMember = familyMembers.find(m => m.id === selectedUser)
      
      const metricData = {
        user_id: authUser.id,
        family_member_id: typeof selectedMember?.id === 'string' ? selectedMember.id : null,
        metric_type: metricType as any,
        value,
        unit,
        systolic,
        diastolic,
        source: 'manual',
        recorded_at: new Date().toISOString()
      }

      const { data, error } = await healthMetricsAPI.create(metricData)
      
      if (error) {
        console.error('Error saving health metric:', error)
        return
      }

      // Refresh metrics
      await loadHealthMetrics(authUser.id)
      
      // Update family member's health metrics display
      if (selectedMember && data) {
        const updatedHealthMetrics = {
          ...selectedMember.healthMetrics,
          [metricType === 'blood_pressure' ? 'bloodPressure' : 
            metricType === 'heart_rate' ? 'heartRate' :
            metricType === 'blood_sugar' ? 'bloodSugar' :
            metricType === 'weight' ? 'weight' :
            metricType === 'bmi' ? 'bmi' : metricType]: 
            metricType === 'blood_pressure' ? `${systolic}/${diastolic}` : `${value} ${unit}`
        }
        
        // Update family member with new health metrics
        // This will be handled by the family members context
      }
    } catch (err) {
      console.error('Failed to save health metric:', err)
    }
  }

  // Load health metrics when user or selected family member changes
  useEffect(() => {
    if (authUser?.id) {
      loadHealthMetrics(authUser.id)
    }
  }, [authUser, selectedUser])

  // Handle URL parameters to open specific sections
  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      switch (section) {
        case 'appointments':
          setShowAppointments(true)
          break
        case 'medications':
          setShowMedications(true)
          break
        case 'metrics':
          setShowHealthMetrics(true)
          break
        case 'alerts':
          setShowRemindersAlerts(true)
          break
        default:
          break
      }
    }
  }, [searchParams])

  // Reset expanded category when modal closes
  const handleCloseHealthRecords = () => {
    setShowHealthRecords(false)
    setExpandedRecordCategory(null)
  }

  const handleCloseRemindersAlerts = () => {
    setShowRemindersAlerts(false)
    setExpandedReminderCategory(null)
  }

  // Emergency contacts data
  const emergencyContacts = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      relationship: 'Family Doctor',
      phone: '+91 98765 43210',
      type: 'Medical',
      priority: 'High'
    },
    {
      id: 2,
      name: 'John Gray',
      relationship: 'Spouse',
      phone: '+91 87654 32109',
      type: 'Family',
      priority: 'High'
    }
  ]

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const toggleMedicationReminder = (medicationId: number) => {
    setMedicationReminders(prev => ({
      ...prev,
      [medicationId]: !prev[medicationId]
    }))
  }

  const addReminderTime = (medicationId: number, time: string) => {
    setMedicationTimes(prev => ({
      ...prev,
      [medicationId]: [...(prev[medicationId] || []), time]
    }))
  }

  const removeReminderTime = (medicationId: number, timeIndex: number) => {
    setMedicationTimes(prev => ({
      ...prev,
      [medicationId]: prev[medicationId].filter((_, index) => index !== timeIndex)
    }))
  }

  const toggleAppointmentReminder = (appointmentId: string) => {
    setAppointmentReminders(prev => ({
      ...prev,
      [appointmentId]: !prev[appointmentId]
    }))
  }

  const setAppointmentReminderTime = (appointmentId: string, time: string) => {
    setAppointmentReminderTimes(prev => ({
      ...prev,
      [appointmentId]: time
    }))
  }

  const currentUser = familyMembers.find(m => m.id === selectedUser) || familyMembers[0]

  // Member-specific data for Quick Actions
  const getMemberSpecificData = (memberId: number) => {
    if (memberId === 1) { // Avery Gray
      return {
        healthRecords: 9,
        healthInsurance: 2,
        appointments: 3,
        medications: 3,
        emergencyContacts: 2,
        healthMetrics: 5
      }
    } else { // Heather Gray
      return {
        healthRecords: 6,
        healthInsurance: 1,
        appointments: 2,
        medications: 5,
        emergencyContacts: 3,
        healthMetrics: 4
      }
    }
  }

  const memberData = getMemberSpecificData(selectedUser)

  // Current medications from doctor prescriptions and manual entries
  const currentMedications = [
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      source: 'DocConnect - Dr. Sarah Johnson',
      prescribedDate: 'Jan 15, 2026',
      prescribedDuration: '30 days',
      reminderSet: true,
      reminderTimes: ['8:00 AM', '8:00 PM'],
      nextDose: 'Today 8:00 PM',
      pillsRemaining: 28
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      source: 'DocConnect - Dr. Michael Chen',
      prescribedDate: 'Jan 10, 2026',
      prescribedDuration: '90 days',
      reminderSet: true,
      reminderTimes: ['9:00 AM'],
      nextDose: 'Tomorrow 9:00 AM',
      pillsRemaining: 22
    },
    {
      id: 3,
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      source: 'Manual Entry - Voice',
      prescribedDate: 'Jan 12, 2026',
      prescribedDuration: 'Ongoing',
      reminderSet: false,
      reminderTimes: [],
      nextDose: null,
      pillsRemaining: 45
    }
  ]

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-6 flex items-center space-x-3 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">LifeLog</h1>
            <p className="text-sm text-green-600 dark:text-green-400">Health Information & Daily Metrics</p>
          </div>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        
        {/* Family Members Carousel */}
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedUser(typeof member.id === 'string' ? parseInt(member.id) || 1 : member.id)}
                className={`flex-shrink-0 w-32 p-4 rounded-xl transition-all ${
                  selectedUser === member.id
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  selectedUser === member.id
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-medium text-center truncate">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-center opacity-75">{member.relation}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Member Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
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

        {/* Health Metrics Dashboard */}
        {currentUser.healthMetrics && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Health Metrics</h3>
              <div className="flex items-center space-x-2">
                {currentUser.smartwatch && currentUser.smartwatch.connected && (
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <Watch className="w-4 h-4" />
                    <span className="text-xs">Live</span>
                  </div>
                )}
                <button className="p-1 text-green-600 hover:text-green-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg h-24 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-red-600 dark:text-red-400">Blood Pressure</p>
                  {currentUser.smartwatch && currentUser.smartwatch.connected && (
                    <Watch className="w-3 h-3 text-red-400" />
                  )}
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.healthMetrics.bloodPressure}</p>
                <div className="flex items-center">
                  <TrendingUp className="w-2 h-2 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">
                    {currentUser.healthMetrics.bloodPressure === '120/80' ? 'Normal' : 'Monitor'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Jan 18 - 8:30 AM</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg h-24 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-blue-600 dark:text-blue-400">Heart Rate</p>
                  {currentUser.smartwatch && currentUser.smartwatch.connected && (
                    <Watch className="w-3 h-3 text-blue-400" />
                  )}
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.healthMetrics.heartRate}</p>
                <div className="flex items-center">
                  <Activity className="w-2 h-2 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Healthy</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Jan 18 - 8:32 AM</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg h-24 flex flex-col justify-between">
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Blood Sugar</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.healthMetrics.bloodSugar}</p>
                <div className="flex items-center">
                  <Calendar className="w-2 h-2 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Manual entry</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Jan 17 - 7:00 AM</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg h-24 flex flex-col justify-between">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">Weight</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.healthMetrics.weight}</p>
                <div className="flex items-center">
                  <Calendar className="w-2 h-2 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Manual entry</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Jan 16 - 6:45 AM</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-16 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-400">BMI</span>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Jan 16, 2026</p>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-sm">{currentUser.healthMetrics.bmi}</span>
            </div>
          </div>
        )}

        {/* Smartwatch Integration */}
        {currentUser.smartwatch && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Watch className="w-5 h-5 mr-2 text-green-500" />
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
                  <button className="text-green-600 dark:text-green-400 font-medium">
                    Reconnect
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Health Conditions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Health Conditions</h3>
            <button 
              onClick={() => setShowHealthConditions(!showHealthConditions)}
              className="p-1 text-green-600 hover:text-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {currentUser.conditions.length > 0 ? (
            <div className="space-y-2">
              {currentUser.conditions.map((condition, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCondition(condition)
                    setShowConditionReport(true)
                  }}
                  className="w-full p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">{condition}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        condition.includes('Allergy') ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        condition.includes('Intolerance') ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {condition.includes('Allergy') ? 'Allergy' :
                         condition.includes('Intolerance') ? 'Food' :
                         'Chronic'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </button>
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

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setShowHealthRecords(!showHealthRecords)}
              className="w-full p-3 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-teal-700 dark:text-teal-300 font-medium">My Health Records</span>
                <span className="text-xs text-teal-600 dark:text-teal-400">{memberData.healthRecords} total files</span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </button>
            <button 
              onClick={() => setShowHealthInsurance(!showHealthInsurance)}
              className="w-full p-3 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-cyan-700 dark:text-cyan-300 font-medium">My Health Insurance</span>
                <span className="text-xs text-cyan-600 dark:text-cyan-400">{memberData.healthInsurance} active policies</span>
              </div>
              <ChevronRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </button>
            <button 
              onClick={() => {
                setShowAppointments(!showAppointments)
                setAppointmentView('all')
              }}
              className="w-full p-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">My Appointments</span>
                <span className="text-xs text-blue-600 dark:text-blue-400">{memberData.appointments} upcoming appointments</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>
            <button 
              onClick={() => setShowMedications(!showMedications)}
              className="w-full p-3 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-orange-700 dark:text-orange-300 font-medium">Manage Medications</span>
                <span className="text-xs text-orange-600 dark:text-orange-400">{memberData.medications} active medications</span>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </button>
            <button 
              onClick={() => setShowHealthMetrics(!showHealthMetrics)}
              className="w-full p-3 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Manage My Health Metrics</span>
                <span className="text-xs text-purple-600 dark:text-purple-400">{memberData.healthMetrics} monitored metrics</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </button>
            <button 
              onClick={() => setShowRemindersAlerts(!showRemindersAlerts)}
              className="w-full p-3 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Reminders & Alerts</span>
                <span className="text-xs text-yellow-600 dark:text-yellow-400">
                  {(() => {
                    const medicationRemindersCount = currentMedications.filter(med => medicationReminders[med.id]).length;
                    const appointmentRemindersCount = Object.values(appointmentReminders).filter(Boolean).length;
                    const stockAlertsCount = currentMedications.filter(med => med.pillsRemaining <= 2).length;
                    const insuranceAlertsCount = selectedUser === 2 ? 1 : 0; // Only Heather has insurance expiry alert
                    const totalCount = medicationRemindersCount + appointmentRemindersCount + stockAlertsCount + insuranceAlertsCount;
                    return `${totalCount} active alerts & reminders`;
                  })()}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </button>
            <button 
              onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
              className="w-full p-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm text-red-700 dark:text-red-300 font-medium">My Emergency Contacts</span>
                <span className="text-xs text-red-600 dark:text-red-400">{memberData.emergencyContacts} contacts set</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>

        {/* My Appointments Popup/Modal */}
        {showAppointments && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[60vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">My Appointments</h3>
                  <button 
                    onClick={() => {
                      setShowAppointments(false)
                      setAppointmentView('all')
                    }}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(60vh - 45px)' }}>
                {/* Filter Buttons */}
                <div className="flex items-center justify-center mb-2">
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => setAppointmentView('upcoming')}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        appointmentView === 'upcoming' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Upcoming
                    </button>
                    <button 
                      onClick={() => setAppointmentView('completed')}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        appointmentView === 'completed' 
                          ? 'bg-gray-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => setAppointmentView('all')}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        appointmentView === 'all' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All
                    </button>
                  </div>
                </div>
                
                {/* Upcoming Appointments */}
                {(appointmentView === 'upcoming' || appointmentView === 'all') && (
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                      Upcoming
                    </h4>
                    <div className="space-y-1.5">
                      {/* Doctor Appointment from DocConnect */}
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">Dr. Sarah Johnson</h5>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-blue-600 dark:text-blue-400">Tomorrow</span>
                            <button 
                              onClick={() => setEditingAppointment(editingAppointment === 'dr-sarah' ? null : 'dr-sarah')}
                              className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">
                          DocConnect
                        </span>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">General Consultation</p>
                        
                        {/* Reminder Toggle */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Reminder</span>
                          <button 
                            onClick={() => toggleAppointmentReminder('dr-sarah')}
                            className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                              appointmentReminders['dr-sarah'] 
                                ? 'bg-blue-500' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span 
                              className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                                appointmentReminders['dr-sarah'] ? 'translate-x-4' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {/* Reminder Time Display */}
                        {appointmentReminders['dr-sarah'] && appointmentReminderTimes['dr-sarah'] && (
                          <div className="mt-1">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                              {appointmentReminderTimes['dr-sarah']}
                            </span>
                          </div>
                        )}

                        {/* Edit Mode */}
                        {editingAppointment === 'dr-sarah' && (
                          <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded border">
                            <h6 className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">Set Reminder Time</h6>
                            <div className="grid grid-cols-2 gap-1">
                              {['15 minutes before', '30 minutes before', '1 hour before', '2 hours before'].map((time) => (
                                <button
                                  key={time}
                                  onClick={() => {
                                    setAppointmentReminderTime('dr-sarah', time)
                                    setEditingAppointment(null)
                                  }}
                                  className="text-xs p-1 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 transition-colors"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Workshop from CareCompass */}
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-2 border-purple-500">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-purple-800 dark:text-purple-200 text-xs">Diabetes Workshop</h5>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-purple-600 dark:text-purple-400">Next Week</span>
                            <button 
                              onClick={() => setEditingAppointment(editingAppointment === 'diabetes-workshop' ? null : 'diabetes-workshop')}
                              className="p-1 text-purple-400 hover:text-purple-600 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded-full">
                          CareCompass
                        </span>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Community Workshop</p>
                        
                        {/* Reminder Toggle */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Reminder</span>
                          <button 
                            onClick={() => toggleAppointmentReminder('diabetes-workshop')}
                            className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                              appointmentReminders['diabetes-workshop'] 
                                ? 'bg-purple-500' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span 
                              className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                                appointmentReminders['diabetes-workshop'] ? 'translate-x-4' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {/* Reminder Time Display */}
                        {appointmentReminders['diabetes-workshop'] && appointmentReminderTimes['diabetes-workshop'] && (
                          <div className="mt-1">
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                              {appointmentReminderTimes['diabetes-workshop']}
                            </span>
                          </div>
                        )}

                        {/* Edit Mode */}
                        {editingAppointment === 'diabetes-workshop' && (
                          <div className="mt-2 p-2 bg-purple-100 dark:bg-purple-900/30 rounded border">
                            <h6 className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-2">Set Reminder Time</h6>
                            <div className="grid grid-cols-2 gap-1">
                              {['15 minutes before', '30 minutes before', '1 hour before', '2 hours before'].map((time) => (
                                <button
                                  key={time}
                                  onClick={() => {
                                    setAppointmentReminderTime('diabetes-workshop', time)
                                    setEditingAppointment(null)
                                  }}
                                  className="text-xs p-1 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-600 rounded hover:bg-purple-50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 transition-colors"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Dietician Appointment from Specialist */}
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">Ms. Lisa Rodriguez</h5>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 dark:text-green-400">Next Month</span>
                            <button 
                              onClick={() => setEditingAppointment(editingAppointment === 'dietician' ? null : 'dietician')}
                              className="p-1 text-green-400 hover:text-green-600 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded-full">
                          Dietician
                        </span>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">Nutrition Consultation</p>
                        
                        {/* Reminder Toggle */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">Reminder</span>
                          <button 
                            onClick={() => toggleAppointmentReminder('dietician')}
                            className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                              appointmentReminders['dietician'] 
                                ? 'bg-green-500' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span 
                              className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                                appointmentReminders['dietician'] ? 'translate-x-4' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {/* Reminder Time Display */}
                        {appointmentReminders['dietician'] && appointmentReminderTimes['dietician'] && (
                          <div className="mt-1">
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                              {appointmentReminderTimes['dietician']}
                            </span>
                          </div>
                        )}

                        {/* Edit Mode */}
                        {editingAppointment === 'dietician' && (
                          <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded border">
                            <h6 className="text-xs font-medium text-green-700 dark:text-green-300 mb-2">Set Reminder Time</h6>
                            <div className="grid grid-cols-2 gap-1">
                              {['15 minutes before', '30 minutes before', '1 hour before', '2 hours before'].map((time) => (
                                <button
                                  key={time}
                                  onClick={() => {
                                    setAppointmentReminderTime('dietician', time)
                                    setEditingAppointment(null)
                                  }}
                                  className="text-xs p-1 bg-white dark:bg-gray-700 border border-green-200 dark:border-green-600 rounded hover:bg-green-50 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 transition-colors"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Completed Appointments */}
                {(appointmentView === 'completed' || appointmentView === 'all') && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1"></span>
                      Completed
                    </h4>
                    <div className="space-y-1.5">
                      {/* Cardiology from DocConnect */}
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-2 border-gray-400">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Dr. Michael Chen</h5>
                          <span className="text-xs text-gray-600 dark:text-gray-400">3 days ago</span>
                        </div>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                          DocConnect
                        </span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">Cardiology Checkup</p>
                      </div>

                      {/* Mental Health from CareCompass */}
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-2 border-gray-400">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Dr. Emma Wilson</h5>
                          <span className="text-xs text-gray-600 dark:text-gray-400">1 week ago</span>
                        </div>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                          Mental Health
                        </span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">Therapy Session</p>
                      </div>

                      {/* Physiotherapy from Specialist */}
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-2 border-gray-400">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Mr. James Parker</h5>
                          <span className="text-xs text-gray-600 dark:text-gray-400">2 weeks ago</span>
                        </div>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                          Physiotherapy
                        </span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">Physical Therapy</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Medications Management Popup/Modal */}
        {showMedications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">My Medications</h3>
                  <button 
                    onClick={() => setShowMedications(false)}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {/* Add Medication Options */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Add New Medication</h4>
                  <div className="flex space-x-2">
                    <button className="flex-1 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-xs text-green-700 dark:text-green-300 font-medium">
                      📷 Scan
                    </button>
                    <button className="flex-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 font-medium">
                      🎤 Voice
                    </button>
                  </div>
                </div>

                {/* Current Medications */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                    Current Medications ({currentMedications.length})
                  </h4>
                  <div className="space-y-2">
                    {currentMedications.map((medication) => (
                      <div key={medication.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">{medication.name}</h5>
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{medication.dosage}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400">{medication.prescribedDuration}</span>
                            <button 
                              onClick={() => setEditingMedication(editingMedication === medication.id ? null : medication.id)}
                              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{medication.source.split(' - ')[0]}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Frequency</span>
                            <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{medication.frequency}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Pills Left</span>
                            <p className={`text-xs font-medium ${medication.pillsRemaining < 10 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                              {medication.pillsRemaining}
                            </p>
                          </div>
                        </div>

                        {medication.nextDose && (
                          <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-600">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Next dose: </span>
                            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">{medication.nextDose}</span>
                          </div>
                        )}

                        {/* Reminder Toggle */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Reminders</span>
                          <button 
                            onClick={() => toggleMedicationReminder(medication.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              medicationReminders[medication.id] 
                                ? 'bg-green-500' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span 
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                medicationReminders[medication.id] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Reminder Times */}
                        {medicationReminders[medication.id] && (
                          <div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {(medicationTimes[medication.id] || []).map((time, index) => (
                                <div key={index} className="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs">
                                  <span>{time}</span>
                                </div>
                              ))}
                            </div>

                            {/* Edit Mode - Stock Editor */}
                            {editingMedication === medication.id && (
                              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="mb-3">
                                  <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Edit Stock</h6>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Pills:</span>
                                    <input 
                                      type="number" 
                                      defaultValue={medication.pillsRemaining}
                                      className="w-16 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex justify-between">
                                  <button 
                                    onClick={() => setEditingMedication(null)}
                                    className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    onClick={() => setEditingMedication(null)}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => router.push('/medsupport')}
                      className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-xs text-orange-700 dark:text-orange-300 font-medium border border-orange-200 dark:border-orange-800"
                    >
                      📋 MedSupport
                    </button>
                    <button className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-xs text-purple-700 dark:text-purple-300 font-medium border border-purple-200 dark:border-purple-800">
                      📊 Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reminders & Alerts Popup/Modal */}
        {showRemindersAlerts && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Reminders & Alerts</h3>
                  <button 
                    onClick={() => handleCloseRemindersAlerts()}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {!expandedReminderCategory ? (
                  <>
                    {/* Reminder Categories - Only show buttons, no expanded content */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Reminder Categories
                      </h4>
                      <div className="space-y-2">
                        {/* Medication Reminders */}
                        <button 
                          onClick={() => setExpandedReminderCategory('medication')}
                          className="w-full p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 flex items-center justify-between transition-colors hover:bg-orange-100 dark:hover:bg-orange-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Medication Reminders</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-orange-600 dark:text-orange-400">
                              {currentMedications.filter(med => medicationReminders[med.id]).length} active
                            </span>
                            <ChevronRight className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          </div>
                        </button>

                        {/* Appointment Reminders */}
                        <button 
                          onClick={() => setExpandedReminderCategory('appointment')}
                          className="w-full p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Appointment Reminders</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {Object.values(appointmentReminders).filter(Boolean).length} active
                            </span>
                            <ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                        </button>

                        {/* Stock Alerts */}
                        <button 
                          onClick={() => setExpandedReminderCategory('stock')}
                          className="w-full p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-between transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-red-700 dark:text-red-300">Stock Alerts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-red-600 dark:text-red-400">
                              {currentMedications.filter(med => med.pillsRemaining <= 2).length} alerts
                            </span>
                            <ChevronRight className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </div>
                        </button>

                        {/* Insurance Alerts */}
                        <button 
                          onClick={() => setExpandedReminderCategory('insurance')}
                          className="w-full p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800 flex items-center justify-between transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Insurance Alerts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-cyan-600 dark:text-cyan-400">1 alert</span>
                            <ChevronRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          </div>
                        </button>

                        {/* Custom Reminders */}
                        <button 
                          onClick={() => setExpandedReminderCategory('custom')}
                          className="w-full p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center justify-between transition-colors hover:bg-green-100 dark:hover:bg-green-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-green-700 dark:text-green-300">Custom Reminders</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 dark:text-green-400">2 active</span>
                            <ChevronRight className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </button>

                        {/* Add New Reminder */}
                        <button 
                          onClick={() => setExpandedReminderCategory('add-new')}
                          className="w-full p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center justify-between transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Add New Reminder</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                        🔔 Notification Settings
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <div className="mb-3">
                      <button 
                        onClick={() => setExpandedReminderCategory(null)}
                        className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 mr-1 rotate-180" />
                        Back to Categories
                      </button>
                    </div>

                    {/* Expanded Category Content */}
                    {expandedReminderCategory === 'medication' && (
                      <div>
                        <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-3">Medication Reminders</h4>
                        <div className="space-y-2">
                          {currentMedications.filter(med => medicationReminders[med.id]).map((medication) => (
                            <div key={medication.id} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-2 border-orange-500">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-orange-800 dark:text-orange-200 text-xs">{medication.name}</h5>
                                <span className="text-xs text-orange-600 dark:text-orange-400">{medication.dosage}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-1">
                                {(medicationTimes[medication.id] || []).map((time, index) => (
                                  <span key={index} className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                                    {time}
                                  </span>
                                ))}
                              </div>
                              {medication.nextDose && (
                                <p className="text-xs text-orange-600 dark:text-orange-400">Next: {medication.nextDose}</p>
                              )}
                            </div>
                          ))}
                          {currentMedications.filter(med => medicationReminders[med.id]).length === 0 && (
                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">No medication reminders set</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {expandedReminderCategory === 'appointment' && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">Appointment Reminders</h4>
                        <div className="space-y-2">
                          {/* Dr. Sarah Johnson */}
                          {appointmentReminders['dr-sarah'] && (
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">Dr. Sarah Johnson</h5>
                                <span className="text-xs text-blue-600 dark:text-blue-400">Tomorrow</span>
                              </div>
                              <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">General Consultation</p>
                              {appointmentReminderTimes['dr-sarah'] && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                  {appointmentReminderTimes['dr-sarah']}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Dietician */}
                          {appointmentReminders['dietician'] && (
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">Ms. Lisa Rodriguez</h5>
                                <span className="text-xs text-green-600 dark:text-green-400">Next Month</span>
                              </div>
                              <p className="text-xs text-green-700 dark:text-green-300 mb-1">Nutrition Consultation</p>
                              {appointmentReminderTimes['dietician'] && (
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                  {appointmentReminderTimes['dietician']}
                                </span>
                              )}
                            </div>
                          )}

                          {Object.values(appointmentReminders).filter(Boolean).length === 0 && (
                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">No appointment reminders set</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {expandedReminderCategory === 'stock' && (
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3">Stock Alerts</h4>
                        <div className="space-y-2">
                          {currentMedications.filter(med => med.pillsRemaining <= 2).map((medication) => (
                            <div key={medication.id} className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-2 border-red-500">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-red-800 dark:text-red-200 text-xs">{medication.name}</h5>
                                <span className="text-xs text-red-600 dark:text-red-400 font-bold">{medication.pillsRemaining} left</span>
                              </div>
                              <p className="text-xs text-red-700 dark:text-red-300">⚠️ Low stock - Refill needed</p>
                              <button className="text-xs text-red-600 dark:text-red-400 hover:underline mt-1">
                                Order Refill
                              </button>
                            </div>
                          ))}
                          {currentMedications.filter(med => med.pillsRemaining <= 2).length === 0 && (
                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                              <p className="text-xs text-gray-600 dark:text-gray-400">No low stock alerts</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {expandedReminderCategory === 'insurance' && (
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-3">Insurance Alerts</h4>
                        <div className="space-y-2">
                          {/* ICICI Lombard Renewal Alert */}
                          <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border-l-2 border-cyan-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-cyan-800 dark:text-cyan-200 text-xs">ICICI Lombard Policy</h5>
                              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">Expires Mar 15</span>
                            </div>
                            <p className="text-xs text-cyan-700 dark:text-cyan-300 mb-1">Family Insurance - Heather Gray</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-full">
                                Policy: IL789012
                              </span>
                              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">⚠️ Renew in 2 months</span>
                            </div>
                            <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-1">
                              Set Renewal Reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedReminderCategory === 'custom' && (
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3">Custom Reminders</h4>
                        <div className="space-y-2">
                          {/* Sample Custom Reminders */}
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">Take Vitamins</h5>
                              <span className="text-xs text-green-600 dark:text-green-400">Daily</span>
                            </div>
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">Every day at 8:00 AM</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                Next: Tomorrow 8:00 AM
                              </span>
                              <button className="text-xs text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </div>

                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">Check Blood Pressure</h5>
                              <span className="text-xs text-green-600 dark:text-green-400">Weekly</span>
                            </div>
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">Every Sunday at 7:00 PM</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                Next: Sunday 7:00 PM
                              </span>
                              <button className="text-xs text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedReminderCategory === 'add-new' && (
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Create Custom Reminder</h4>
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Reminder title (e.g., Take vitamins, Exercise)"
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            
                            <textarea 
                              placeholder="Description (optional)"
                              rows={2}
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                              <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option>Select time</option>
                                <option>6:00 AM</option>
                                <option>7:00 AM</option>
                                <option>8:00 AM</option>
                                <option>9:00 AM</option>
                                <option>12:00 PM</option>
                                <option>1:00 PM</option>
                                <option>6:00 PM</option>
                                <option>7:00 PM</option>
                                <option>8:00 PM</option>
                                <option>9:00 PM</option>
                                <option>10:00 PM</option>
                                <option>11:00 PM</option>
                              </select>
                              
                              <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option>Frequency</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>One-time</option>
                                <option>Custom</option>
                              </select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option>Priority</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                              </select>
                              
                              <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option>Category</option>
                                <option>Health</option>
                                <option>Medication</option>
                                <option>Exercise</option>
                                <option>Diet</option>
                                <option>Checkup</option>
                                <option>Personal</option>
                                <option>Other</option>
                              </select>
                            </div>
                            
                            <div className="flex space-x-2 mt-3">
                              <button 
                                onClick={() => setExpandedReminderCategory(null)}
                                className="flex-1 p-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors"
                              >
                                Cancel
                              </button>
                              <button className="flex-1 p-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors">
                                Create Reminder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* My Health Metrics Popup/Modal */}
        {showHealthMetrics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Manage My Health Metrics</h3>
                  <button 
                    onClick={() => setShowHealthMetrics(false)}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {/* Current Data Sources */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
                    Active Data Sources
                  </h4>
                  <div className="space-y-2">
                    {/* Smartwatch Source */}
                    {currentUser.smartwatch?.connected && (
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">{currentUser.smartwatch.device}</h5>
                            <p className="text-xs text-blue-600 dark:text-blue-400">Heart Rate, Blood Pressure, Activity</p>
                          </div>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                            Connected
                          </span>
                        </div>
                      </div>
                    )}

                    {/* DocConnect Source */}
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">DocConnect Records</h5>
                          <p className="text-xs text-blue-600 dark:text-blue-400">Doctor consultations, prescriptions</p>
                        </div>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Lab Reports Source */}
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-2 border-red-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-red-800 dark:text-red-200 text-xs">Lab Reports</h5>
                          <p className="text-xs text-red-600 dark:text-red-400">Blood tests, diagnostic reports</p>
                        </div>
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Personal Records Source */}
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">Personal Records</h5>
                          <p className="text-xs text-green-600 dark:text-green-400">Manual entry, self-monitoring</p>
                        </div>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Condition-Based Readings */}
                {currentUser.conditions.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Condition Monitoring
                    </h4>
                    <div className="space-y-2">
                      {/* Diabetes - HbA1c */}
                      {currentUser.conditions.includes('Type 2 Diabetes') && (
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-2 border-orange-500">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-orange-800 dark:text-orange-200 text-xs">HbA1c Level</h5>
                            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">6.8%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-orange-600 dark:text-orange-400">Last updated: Jan 10, 2026</span>
                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                              Lab Report
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hypertension - Creatinine */}
                      {currentUser.conditions.includes('Hypertension') && (
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-2 border-red-500">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-red-800 dark:text-red-200 text-xs">Creatinine</h5>
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">1.1 mg/dL</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-red-600 dark:text-red-400">Last updated: Jan 8, 2026</span>
                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                              Lab Report
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Add New Source */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1"></span>
                    Add Data Source
                  </h4>
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <div className="space-y-2">
                      <select className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>Select source type</option>
                        <option>DocConnect Records</option>
                        <option>Lab Reports</option>
                        <option>CareCompass Records</option>
                        <option>Personal Records</option>
                        <option>Fitness Tracker</option>
                        <option>Blood Pressure Monitor</option>
                        <option>Glucometer</option>
                        <option>Smart Scale</option>
                        <option>Others</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="Source name (e.g., Omron BP Monitor)"
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <button className="w-full p-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors">
                        Add Source
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    📊 View History
                  </button>
                  <button className="w-full p-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-xs text-purple-700 dark:text-purple-300 font-medium transition-colors">
                    📈 Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Health Records Popup/Modal */}
        {showHealthRecords && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">My Health Records</h3>
                  <button 
                    onClick={() => handleCloseHealthRecords()}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {!expandedRecordCategory ? (
                  <>
                    {/* Record Categories - Only show buttons, no expanded content */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Health Record Categories
                      </h4>
                      <div className="space-y-2">
                        {/* DocConnect Records */}
                        <button 
                          onClick={() => setExpandedRecordCategory('docconnect')}
                          className="w-full p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">DocConnect Records</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-blue-600 dark:text-blue-400">2 files</span>
                            <ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          </div>
                        </button>

                        {/* Lab Reports */}
                        <button 
                          onClick={() => setExpandedRecordCategory('lab')}
                          className="w-full p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-between transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-red-700 dark:text-red-300">Lab Reports</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-red-600 dark:text-red-400">2 files</span>
                            <ChevronRight className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </div>
                        </button>

                        {/* CareCompass Records */}
                        <button 
                          onClick={() => setExpandedRecordCategory('carecompass')}
                          className="w-full p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 flex items-center justify-between transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">CareCompass Records</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-purple-600 dark:text-purple-400">2 files</span>
                            <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                        </button>

                        {/* Personal Records */}
                        <button 
                          onClick={() => setExpandedRecordCategory('personal')}
                          className="w-full p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center justify-between transition-colors hover:bg-green-100 dark:hover:bg-green-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-green-700 dark:text-green-300">Personal Records</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 dark:text-green-400">1 file</span>
                            <ChevronRight className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </button>

                        {/* Health Conditions */}
                        <button 
                          onClick={() => setExpandedRecordCategory('conditions')}
                          className="w-full p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 flex items-center justify-between transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Health Conditions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-purple-600 dark:text-purple-400">1 file</span>
                            <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          </div>
                        </button>

                        {/* Others */}
                        <button 
                          onClick={() => setExpandedRecordCategory('others')}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Others</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400">1 file</span>
                            <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          </div>
                        </button>

                        {/* Add New Record - Aligned with other categories */}
                        <button 
                          onClick={() => setExpandedRecordCategory('add-new')}
                          className="w-full p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center justify-between transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Add New Record</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                        🔍 Search All Records
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <div className="mb-3">
                      <button 
                        onClick={() => setExpandedRecordCategory(null)}
                        className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 mr-1 rotate-180" />
                        Back to Categories
                      </button>
                    </div>

                    {/* Expanded Category Content */}
                    {expandedRecordCategory === 'docconnect' && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">DocConnect Records</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">Consultation Report</h5>
                              <span className="text-xs text-blue-600 dark:text-blue-400">Jan 15, 2026</span>
                            </div>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Dr. Sarah Johnson - General Medicine</p>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                              PDF Report
                            </span>
                          </div>
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-2 border-blue-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">Digital Prescription</h5>
                              <span className="text-xs text-blue-600 dark:text-blue-400">Jan 10, 2026</span>
                            </div>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Dr. Michael Chen - Cardiology</p>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                              Digital Rx
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'lab' && (
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3">Lab Reports</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-2 border-red-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-red-800 dark:text-red-200 text-xs">Complete Blood Count</h5>
                              <span className="text-xs text-red-600 dark:text-red-400">Jan 8, 2026</span>
                            </div>
                            <p className="text-xs text-red-700 dark:text-red-300 mb-1">PathLab Diagnostics</p>
                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                              Lab Report
                            </span>
                          </div>
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-2 border-red-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-red-800 dark:text-red-200 text-xs">HbA1c Test</h5>
                              <span className="text-xs text-red-600 dark:text-red-400">Dec 28, 2025</span>
                            </div>
                            <p className="text-xs text-red-700 dark:text-red-300 mb-1">MedTest Laboratory</p>
                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                              Lab Report
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'carecompass' && (
                      <div>
                        <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3">CareCompass Records</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-2 border-purple-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-purple-800 dark:text-purple-200 text-xs">Workshop Certificate</h5>
                              <span className="text-xs text-purple-600 dark:text-purple-400">Jan 5, 2026</span>
                            </div>
                            <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">Diabetes Management Workshop</p>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                              Certificate
                            </span>
                          </div>
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-2 border-purple-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-purple-800 dark:text-purple-200 text-xs">Therapy Session Notes</h5>
                              <span className="text-xs text-purple-600 dark:text-purple-400">Dec 20, 2025</span>
                            </div>
                            <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">Dr. Emma Wilson - Mental Health</p>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                              Session Notes
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'conditions' && (
                      <div>
                        <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3">Health Conditions</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-2 border-purple-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-purple-800 dark:text-purple-200 text-xs">Lactose Intolerance Report</h5>
                              <span className="text-xs text-purple-600 dark:text-purple-400">Dec 20, 2025</span>
                            </div>
                            <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">Food Assessment - Self Diagnosed</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                                Health Condition Report
                              </span>
                              <button 
                                onClick={() => {
                                  setExpandedRecordCategory(null)
                                  setSelectedCondition('Lactose Intolerance')
                                  setShowConditionReport(true)
                                }}
                                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'personal' && (
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3">Personal Records</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-2 border-green-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-green-800 dark:text-green-200 text-xs">X-Ray Report</h5>
                              <span className="text-xs text-green-600 dark:text-green-400">Jan 3, 2026</span>
                            </div>
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">Chest X-Ray - City Hospital</p>
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                              Scanned Document
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'others' && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Others</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-2 border-gray-500">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Insurance Document</h5>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Dec 15, 2025</span>
                            </div>
                            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Health Insurance Policy</p>
                            <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                              PDF Document
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedRecordCategory === 'add-new' && (
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Add New Record</h4>
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <div className="space-y-2">
                            <select className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                              <option>Select record type</option>
                              <option>Lab Report</option>
                              <option>X-Ray/Scan</option>
                              <option>Prescription</option>
                              <option>Doctor's Note</option>
                              <option>Insurance Document</option>
                              <option>Vaccination Record</option>
                              <option>Medical Certificate</option>
                              <option>Other</option>
                            </select>
                            
                            <select 
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              onChange={(e) => {
                                if (e.target.value === 'create-new') {
                                  // Show custom category input
                                  const input = e.target.parentElement?.querySelector('#custom-category-input') as HTMLInputElement;
                                  if (input) {
                                    input.style.display = 'block';
                                    input.focus();
                                  }
                                }
                              }}
                            >
                              <option>Select category</option>
                              <option value="docconnect">DocConnect Records</option>
                              <option value="lab">Lab Reports</option>
                              <option value="carecompass">CareCompass Records</option>
                              <option value="personal">Personal Records</option>
                              <option value="others">Others</option>
                              <option value="create-new">+ Create New Category</option>
                            </select>
                            
                            <input 
                              id="custom-category-input"
                              type="text" 
                              placeholder="Enter new category name (e.g., Dental Records)"
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hidden"
                              style={{ display: 'none' }}
                            />
                            
                            <input 
                              type="text" 
                              placeholder="Record title (e.g., Blood Test Report)"
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            
                            <div className="flex space-x-2">
                              <button className="flex-1 p-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors">
                                📷 Scan Document
                              </button>
                              <button className="flex-1 p-2 bg-indigo-400 hover:bg-indigo-500 text-white text-xs font-medium rounded transition-colors">
                                📸 Take Photo
                              </button>
                            </div>
                            
                            <button className="w-full p-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors mt-2">
                              Save Record
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* My Health Insurance Popup/Modal */}
        {showHealthInsurance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">My Health Insurance</h3>
                  <button 
                    onClick={() => setShowHealthInsurance(false)}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {/* Primary Insurance */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Primary Insurance
                  </h4>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Star Health Insurance</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          Active
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Policy No:</span>
                          <p className="font-medium text-gray-900 dark:text-white">SH123456</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Coverage:</span>
                          <p className="font-medium text-gray-900 dark:text-white">₹5,00,000</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                          <p className="font-medium text-gray-900 dark:text-white">Dec 31, 2025</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Premium:</span>
                          <p className="font-medium text-gray-900 dark:text-white">₹12,000/year</p>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Covered Members:</span>
                        <p className="font-medium text-gray-900 dark:text-white">Avery Gray (Self)</p>
                      </div>
                      
                      {/* Renewal Reminder */}
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-700 dark:text-yellow-300">Renewal Reminder</span>
                          <button className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline">
                            Set Reminder
                          </button>
                        </div>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Expires in 11 months</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Family Insurance */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Family Insurance
                  </h4>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-purple-800 dark:text-purple-200">ICICI Lombard</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          Active
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Policy No:</span>
                          <p className="font-medium text-gray-900 dark:text-white">IL789012</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Coverage:</span>
                          <p className="font-medium text-gray-900 dark:text-white">₹3,00,000</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                          <p className="font-medium text-gray-900 dark:text-white">Mar 15, 2026</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Premium:</span>
                          <p className="font-medium text-gray-900 dark:text-white">₹8,500/year</p>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Covered Members:</span>
                        <p className="font-medium text-gray-900 dark:text-white">Heather Gray (Mother)</p>
                      </div>
                      
                      {/* Renewal Reminder */}
                      <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-orange-700 dark:text-orange-300">Renewal Due Soon</span>
                          <button className="text-xs text-orange-600 dark:text-orange-400 hover:underline">
                            Set Reminder
                          </button>
                        </div>
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Expires in 2 months</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add New Insurance */}
                <div className="mb-3">
                  <button className="w-full p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center justify-center transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
                    <Plus className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Add Insurance Policy</span>
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    📄 View Policy Documents
                  </button>
                  <button className="w-full p-2 bg-cyan-100 dark:bg-cyan-900/30 hover:bg-cyan-200 dark:hover:bg-cyan-900/50 rounded-lg text-xs text-cyan-700 dark:text-cyan-300 font-medium transition-colors">
                    📞 Contact Insurance Provider
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Emergency Contacts Popup/Modal */}
        {showEmergencyContacts && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">My Emergency Contacts</h3>
                  <button 
                    onClick={() => setShowEmergencyContacts(false)}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {/* Emergency Contacts List */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Emergency Contacts ({emergencyContacts.length})
                  </h4>
                  <div className="space-y-2">
                    {emergencyContacts.map((contact) => (
                      <div key={contact.id} className={`p-2 rounded-lg border-l-2 ${
                        contact.priority === 'Critical' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                        contact.priority === 'High' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' :
                        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <h5 className={`font-semibold text-xs ${
                            contact.priority === 'Critical' ? 'text-red-800 dark:text-red-200' :
                            contact.priority === 'High' ? 'text-orange-800 dark:text-orange-200' :
                            'text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {contact.name}
                          </h5>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              contact.priority === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                              contact.priority === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {contact.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Relationship:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{contact.relationship}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Type:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{contact.type}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs">
                            <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                            <p className="font-medium text-blue-600 dark:text-blue-400">{contact.phone}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-xs text-green-600 dark:text-green-400 hover:underline">
                              📞 Call
                            </button>
                            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                              ✏️ Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Contact */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Add New Emergency Contact
                  </h4>
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Contact name (e.g., Dr. Smith, Mom)"
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          placeholder="Relationship"
                          className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <input 
                          type="tel" 
                          placeholder="Phone number"
                          className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Contact Type</option>
                          <option>Family</option>
                          <option>Medical</option>
                          <option>Friend</option>
                          <option>Colleague</option>
                          <option>Emergency</option>
                          <option>Other</option>
                        </select>
                        
                        <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Priority</option>
                          <option>Critical</option>
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                      
                      <textarea 
                        placeholder="Additional notes (optional)"
                        rows={2}
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      />
                      
                      <button className="w-full p-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors">
                        Add Emergency Contact
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button 
                    onClick={() => router.push('/emergency/e1')}
                    className="w-full p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-xs text-red-700 dark:text-red-300 font-medium transition-colors"
                  >
                    🚨 Emergency Services
                  </button>
                  <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    📋 Export Contact List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Conditions Popup/Modal */}
        {showHealthConditions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Manage Health Conditions</h3>
                  <button 
                    onClick={() => setShowHealthConditions(false)}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {/* Current Conditions */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Current Conditions ({currentUser.conditions.length})
                  </h4>
                  <div className="space-y-2">
                    {currentUser.conditions.map((condition, index) => (
                      <div key={index} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 text-xs">{condition}</h5>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                              {condition.includes('Allergy') ? '⚠️ Allergy - Avoid exposure' :
                               condition.includes('Intolerance') ? '🥛 Dietary restriction' :
                               '📋 Chronic Condition - Ongoing management'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              condition.includes('Allergy') ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                              condition.includes('Intolerance') ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                              'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}>
                              {condition.includes('Allergy') ? 'Allergy' :
                               condition.includes('Intolerance') ? 'Intolerance' :
                               'Chronic'}
                            </span>
                            <button className="text-xs text-red-500 hover:text-red-700 transition-colors">
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {currentUser.conditions.length === 0 && (
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">No health conditions recorded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add New Condition */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Add Health Condition
                  </h4>
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <div className="space-y-2">
                      <select className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>Select condition type</option>
                        <option>Allergy</option>
                        <option>Food Intolerance</option>
                        <option>Chronic Disease</option>
                        <option>Mental Health</option>
                        <option>Genetic Condition</option>
                        <option>Other</option>
                      </select>
                      
                      <input 
                        type="text" 
                        placeholder="Condition name (e.g., Peanut Allergy, Asthma)"
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <select className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Severity</option>
                          <option>Mild</option>
                          <option>Moderate</option>
                          <option>Severe</option>
                          <option>Life-threatening</option>
                        </select>
                        
                        <input 
                          type="date" 
                          placeholder="Diagnosed date"
                          className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <textarea 
                        placeholder="Notes, triggers, or management details (optional)"
                        rows={2}
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      />
                      
                      <button className="w-full p-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors">
                        Add Condition
                      </button>
                    </div>
                  </div>
                </div>

                {/* Common Conditions Quick Add */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Common Conditions (Quick Add)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Dust Allergy',
                      'Peanut Allergy',
                      'Lactose Intolerance',
                      'Gluten Intolerance',
                      'Hypertension',
                      'Diabetes Type 2',
                      'Asthma',
                      'Migraine'
                    ].map((condition) => (
                      <button
                        key={condition}
                        className="p-2 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        + {condition}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium transition-colors">
                    📋 Export Conditions List
                  </button>
                  <button className="w-full p-2 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 rounded-lg text-xs text-yellow-700 dark:text-yellow-300 font-medium transition-colors">
                    🏥 Share with Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Condition Report Modal */}
        {showConditionReport && selectedCondition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xs max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{selectedCondition} Report</h3>
                  <button 
                    onClick={() => {
                      setShowConditionReport(false)
                      setSelectedCondition(null)
                    }}
                    className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(70vh - 45px)' }}>
                {selectedCondition === 'Lactose Intolerance' && (
                  <>
                    {/* Condition Overview */}
                    <div className="mb-3">
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold text-orange-800 dark:text-orange-200">Overview</h4>
                          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                            Food Intolerance
                          </span>
                        </div>
                        <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                          Inability to digest lactose in milk and dairy products.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Severity:</span>
                            <p className="font-medium text-orange-800 dark:text-orange-200">Moderate</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Diagnosed:</span>
                            <p className="font-medium text-orange-800 dark:text-orange-200">Dec 20, 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Symptoms</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {[
                          'Bloating',
                          'Gas',
                          'Cramps',
                          'Nausea'
                        ].map((symptom, index) => (
                          <div key={index} className="p-1 bg-red-50 dark:bg-red-900/20 rounded text-center">
                            <p className="text-xs text-red-700 dark:text-red-300">{symptom}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Foods to Avoid */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Avoid</h4>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          'Milk',
                          'Cheese',
                          'Yogurt',
                          'Ice cream',
                          'Butter',
                          'Cream'
                        ].map((food, index) => (
                          <div key={index} className="p-1 bg-yellow-50 dark:bg-yellow-900/20 rounded text-center">
                            <p className="text-xs text-yellow-700 dark:text-yellow-300">{food}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Medications */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Medications</h4>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-xs">Lactase Supplements</h5>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded">
                            As needed
                          </span>
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Take before dairy consumption</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Lactaid: 1-2 tablets</p>
                      </div>
                    </div>

                    {/* Alternatives */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Alternatives</h4>
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                          <p>• Lactose-free dairy products</p>
                          <p>• Plant-based milk (almond, soy, oat)</p>
                          <p>• Calcium-rich foods (leafy greens)</p>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Info */}
                    <div className="mb-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                          <strong>Not life-threatening</strong> - Symptoms are uncomfortable but not dangerous.
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <button className="w-full p-2 bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 rounded-lg text-xs text-orange-700 dark:text-orange-300 font-medium transition-colors">
                        📋 Add to Records
                      </button>
                      <button className="w-full p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg text-xs text-blue-700 dark:text-blue-300 font-medium transition-colors">
                        🏥 Share with Doctor
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
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
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
            onClick={() => handleModuleClick('carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-green-500 p-1"
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