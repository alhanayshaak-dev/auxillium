'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
  Languages,
  Award,
  Video,
  Calendar,
  Shield,
  IndianRupee,
  Filter,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function DoctorMatching() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const memberId = searchParams.get('member') || 'self'
  const method = searchParams.get('method') || 'symptoms'
  const consultationType = searchParams.get('type') || 'online'
  const distance = searchParams.get('distance') || '5'
  
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showCalendar, setShowCalendar] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const familyMembers = [
    { 
      id: 'self', 
      name: 'Avery Gray',
      insurance: { provider: 'Star Health Insurance' } as { provider: string } | null
    },
    { 
      id: 'heather', 
      name: 'Heather Gray',
      insurance: { provider: 'ICICI Lombard' } as { provider: string } | null
    }
  ]

  const selectedMember = familyMembers.find(m => m.id === memberId) || familyMembers[0]

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      experience: '15 years',
      rating: 4.8,
      reviews: 342,
      languages: ['English', 'Hindi', 'Tamil'],
      qualifications: ['MBBS', 'MD (Internal Medicine)', 'FICP'],
      consultationFee: 500,
      insuranceCoverage: ['Star Health Insurance', 'ICICI Lombard', 'Max Bupa'],
      image: '👩‍⚕️',
      nationality: 'American',
      gender: 'Female',
      location: 'Mumbai, India',
      hospital: 'Apollo Hospital',
      hospitalAddress: '123 Marine Drive, Mumbai - 400001',
      distance: '3.2 km',
      availableSlots: {
        // January 2026 - More realistic availability
        '2026-01-16': ['10:00 AM', '11:30 AM', '2:30 PM', '4:00 PM'],
        '2026-01-17': ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'],
        '2026-01-20': ['9:30 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
        '2026-01-23': ['9:00 AM', '11:00 AM', '2:30 PM', '4:30 PM'],
        '2026-01-27': ['9:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
        '2026-01-30': ['9:30 AM', '11:00 AM', '2:30 PM', '4:30 PM'],
        // February 2026
        '2026-02-03': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '5:30 PM'],
        '2026-02-06': ['10:00 AM', '12:00 PM', '3:30 PM'],
        '2026-02-10': ['10:30 AM', '1:30 PM', '3:00 PM', '5:00 PM'],
        '2026-02-13': ['9:30 AM', '11:30 AM', '2:30 PM', '4:00 PM', '5:30 PM'],
        '2026-02-17': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        '2026-02-20': ['10:00 AM', '12:00 PM', '3:00 PM'],
        '2026-02-24': ['10:00 AM', '1:30 PM', '3:30 PM'],
        '2026-02-27': ['9:00 AM', '11:30 AM', '2:30 PM', '4:30 PM'],
        // March 2026
        '2026-03-03': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        '2026-03-06': ['10:00 AM', '1:30 PM', '3:30 PM'],
        '2026-03-10': ['9:30 AM', '11:30 AM', '2:30 PM'],
        '2026-03-13': ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
        '2026-03-17': ['9:00 AM', '11:00 AM', '2:00 PM'],
        '2026-03-20': ['10:30 AM', '1:00 PM', '3:30 PM'],
        '2026-03-24': ['9:00 AM', '11:30 AM', '2:30 PM', '4:30 PM'],
        '2026-03-27': ['10:00 AM', '12:30 PM', '3:00 PM']
      }
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      experience: '12 years',
      rating: 4.7,
      reviews: 289,
      languages: ['English', 'Hindi', 'Bengali'],
      qualifications: ['MBBS', 'MD (General Medicine)'],
      consultationFee: 400,
      insuranceCoverage: ['Star Health Insurance', 'Care Health'],
      image: '👨‍⚕️',
      nationality: 'Indian',
      gender: 'Male',
      location: 'Delhi, India',
      hospital: 'Fortis Hospital',
      hospitalAddress: '456 Nehru Place, Delhi - 110019',
      distance: '7.5 km',
      availableSlots: {
        // January 2026
        '2026-01-16': ['9:00 AM', '11:00 AM', '3:00 PM'],
        '2026-01-17': ['10:00 AM', '12:00 PM', '2:30 PM', '4:30 PM'],
        '2026-01-19': ['9:30 AM', '1:00 PM', '3:00 PM'],
        '2026-01-20': ['10:00 AM', '2:00 PM', '4:00 PM'],
        '2026-01-21': ['10:00 AM', '2:00 PM', '4:00 PM'],
        '2026-01-22': ['9:00 AM', '11:30 AM', '3:30 PM', '5:00 PM'],
        '2026-01-23': ['10:00 AM', '1:30 PM', '4:00 PM'],
        '2026-01-24': ['10:00 AM', '1:30 PM', '4:00 PM'],
        '2026-01-26': ['9:30 AM', '11:00 AM', '2:30 PM'],
        '2026-01-27': ['9:30 AM', '11:00 AM', '2:30 PM'],
        '2026-01-28': ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
        '2026-01-29': ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
        '2026-01-30': ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
        '2026-01-31': ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
        // February 2026
        '2026-02-02': ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
        '2026-02-03': ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'],
        '2026-02-04': ['9:00 AM', '11:00 AM', '2:30 PM', '4:00 PM'],
        '2026-02-05': ['10:30 AM', '1:00 PM', '3:30 PM'],
        '2026-02-06': ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '5:30 PM'],
        '2026-02-07': ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '5:30 PM'],
        '2026-02-09': ['10:00 AM', '12:30 PM', '3:00 PM'],
        '2026-02-10': ['10:00 AM', '12:30 PM', '3:00 PM'],
        '2026-02-11': ['9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM'],
        '2026-02-12': ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-13': ['9:00 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-14': ['9:00 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-16': ['10:30 AM', '1:30 PM', '3:00 PM'],
        '2026-02-17': ['10:30 AM', '1:30 PM', '3:00 PM'],
        '2026-02-18': ['9:00 AM', '11:30 AM', '2:30 PM', '4:00 PM', '5:30 PM'],
        '2026-02-19': ['10:00 AM', '12:00 PM', '3:00 PM'],
        '2026-02-20': ['9:30 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-21': ['9:30 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-23': ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-24': ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-25': ['9:00 AM', '11:30 AM', '2:30 PM'],
        '2026-02-26': ['10:30 AM', '12:30 PM', '3:00 PM', '4:30 PM'],
        '2026-02-27': ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
        '2026-02-28': ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM']
      }
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Internal Medicine',
      experience: '10 years',
      rating: 4.9,
      reviews: 421,
      languages: ['English', 'Hindi', 'Marathi'],
      qualifications: ['MBBS', 'MD (Internal Medicine)', 'DNB'],
      consultationFee: 600,
      insuranceCoverage: ['ICICI Lombard', 'Max Bupa', 'Bajaj Allianz'],
      image: '👩‍⚕️',
      nationality: 'Indian',
      gender: 'Female',
      location: 'Pune, India',
      hospital: 'Manipal Hospital',
      hospitalAddress: '789 MG Road, Pune - 411001',
      distance: '4.8 km',
      availableSlots: {
        // January 2026
        '2026-01-17': ['10:00 AM', '1:30 PM', '3:00 PM', '5:00 PM'],
        '2026-01-19': ['9:00 AM', '11:30 AM', '2:30 PM'],
        '2026-01-20': ['10:30 AM', '1:00 PM', '3:30 PM'],
        '2026-01-21': ['9:00 AM', '12:00 PM', '3:00 PM', '5:30 PM'],
        '2026-01-22': ['9:00 AM', '12:00 PM', '3:00 PM', '5:30 PM'],
        '2026-01-23': ['10:00 AM', '2:00 PM', '4:00 PM'],
        '2026-01-24': ['9:30 AM', '11:00 AM', '1:30 PM', '4:30 PM'],
        '2026-01-26': ['10:00 AM', '12:30 PM', '3:00 PM'],
        '2026-01-27': ['9:00 AM', '11:30 AM', '2:30 PM', '5:00 PM'],
        '2026-01-28': ['9:00 AM', '11:30 AM', '2:30 PM', '5:00 PM'],
        '2026-01-29': ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-01-30': ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        // February 2026
        '2026-02-02': ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-03': ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-04': ['9:00 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-05': ['10:00 AM', '12:30 PM', '3:00 PM'],
        '2026-02-06': ['10:00 AM', '12:30 PM', '3:00 PM'],
        '2026-02-07': ['9:30 AM', '11:30 AM', '2:30 PM', '4:00 PM', '5:30 PM'],
        '2026-02-09': ['10:00 AM', '1:30 PM', '3:00 PM'],
        '2026-02-10': ['10:00 AM', '1:30 PM', '3:00 PM'],
        '2026-02-11': ['9:00 AM', '11:00 AM', '2:00 PM', '4:30 PM'],
        '2026-02-12': ['10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-13': ['10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM'],
        '2026-02-14': ['9:00 AM', '11:30 AM', '2:30 PM'],
        '2026-02-16': ['10:00 AM', '1:00 PM', '3:00 PM', '4:30 PM'],
        '2026-02-17': ['10:00 AM', '1:00 PM', '3:00 PM', '4:30 PM'],
        '2026-02-18': ['9:30 AM', '11:00 AM', '2:00 PM', '5:30 PM'],
        '2026-02-19': ['10:00 AM', '12:30 PM', '3:30 PM'],
        '2026-02-20': ['10:00 AM', '12:30 PM', '3:30 PM'],
        '2026-02-21': ['9:00 AM', '11:30 AM', '2:30 PM', '4:00 PM'],
        '2026-02-23': ['10:30 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
        '2026-02-24': ['10:30 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
        '2026-02-25': ['9:00 AM', '11:00 AM', '2:00 PM'],
        '2026-02-26': ['10:00 AM', '12:00 PM', '3:30 PM', '4:30 PM'],
        '2026-02-27': ['10:00 AM', '12:00 PM', '3:30 PM', '4:30 PM'],
        '2026-02-28': ['9:30 AM', '11:30 AM', '2:30 PM', '5:00 PM']
      }
    },
    {
      id: '4',
      name: 'Dr. Amit Patel',
      specialty: 'Family Medicine',
      experience: '8 years',
      rating: 4.6,
      reviews: 198,
      languages: ['English', 'Hindi', 'Gujarati'],
      qualifications: ['MBBS', 'DNB (Family Medicine)'],
      consultationFee: 350,
      insuranceCoverage: [],
      image: '👨‍⚕️',
      nationality: 'Indian',
      gender: 'Male',
      location: 'Ahmedabad, India',
      hospital: 'Max Healthcare',
      hospitalAddress: '321 SG Highway, Ahmedabad - 380015',
      distance: '12.3 km',
      availableSlots: {
        // January 2026
        '2026-01-17': ['10:00 AM', '12:00 PM', '2:00 PM'],
        '2026-01-19': ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
        '2026-01-20': ['9:00 AM', '11:00 AM', '2:30 PM', '4:00 PM'],
        '2026-01-21': ['10:00 AM', '12:30 PM', '3:30 PM'],
        '2026-01-22': ['9:30 AM', '1:00 PM', '4:30 PM'],
        '2026-01-23': ['9:30 AM', '1:00 PM', '4:30 PM'],
        '2026-01-24': ['10:30 AM', '2:00 PM', '5:00 PM'],
        '2026-01-26': ['9:00 AM', '11:30 AM', '3:00 PM'],
        '2026-01-27': ['9:00 AM', '11:30 AM', '3:00 PM'],
        '2026-01-28': ['10:00 AM', '12:00 PM', '2:30 PM', '4:30 PM'],
        '2026-01-29': ['10:00 AM', '12:00 PM', '2:30 PM', '4:30 PM'],
        '2026-01-30': ['9:30 AM', '11:00 AM', '3:30 PM'],
        '2026-01-31': ['9:30 AM', '11:00 AM', '3:30 PM'],
        // February 2026
        '2026-02-02': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        '2026-02-03': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        '2026-02-04': ['10:30 AM', '1:00 PM', '3:30 PM'],
        '2026-02-05': ['9:00 AM', '11:30 AM', '2:30 PM', '5:00 PM'],
        '2026-02-06': ['10:00 AM', '12:00 PM', '3:00 PM', '4:30 PM'],
        '2026-02-07': ['10:00 AM', '12:00 PM', '3:00 PM', '4:30 PM'],
        '2026-02-09': ['9:30 AM', '11:00 AM', '2:00 PM'],
        '2026-02-10': ['9:30 AM', '11:00 AM', '2:00 PM'],
        '2026-02-11': ['10:00 AM', '1:30 PM', '3:30 PM', '5:00 PM'],
        '2026-02-12': ['9:00 AM', '11:30 AM', '2:30 PM'],
        '2026-02-13': ['10:30 AM', '12:30 PM', '3:00 PM', '4:30 PM'],
        '2026-02-14': ['10:30 AM', '12:30 PM', '3:00 PM', '4:30 PM'],
        '2026-02-16': ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
        '2026-02-17': ['9:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'],
        '2026-02-18': ['10:00 AM', '1:00 PM', '3:30 PM'],
        '2026-02-19': ['9:30 AM', '11:30 AM', '2:30 PM', '4:00 PM'],
        '2026-02-20': ['10:00 AM', '12:00 PM', '3:00 PM'],
        '2026-02-21': ['10:00 AM', '12:00 PM', '3:00 PM'],
        '2026-02-23': ['9:00 AM', '11:00 AM', '2:30 PM', '4:30 PM', '5:30 PM'],
        '2026-02-24': ['9:00 AM', '11:00 AM', '2:30 PM', '4:30 PM', '5:30 PM'],
        '2026-02-25': ['10:30 AM', '1:30 PM', '3:00 PM'],
        '2026-02-26': ['9:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
        '2026-02-27': ['10:00 AM', '12:30 PM', '3:30 PM', '5:00 PM'],
        '2026-02-28': ['10:00 AM', '12:30 PM', '3:30 PM', '5:00 PM']
      }
    }
  ]

  const hasInsuranceCoverage = (doctor: typeof doctors[0]) => {
    if (!selectedMember.insurance) return false
    return doctor.insuranceCoverage.some((coverage: string) => coverage === selectedMember.insurance?.provider)
  }

  const getEffectiveCost = (doctor: typeof doctors[0]) => {
    if (hasInsuranceCoverage(doctor)) {
      return {
        original: doctor.consultationFee,
        covered: Math.floor(doctor.consultationFee * 0.8),
        youPay: Math.floor(doctor.consultationFee * 0.2)
      }
    }
    return {
      original: doctor.consultationFee,
      covered: 0,
      youPay: doctor.consultationFee
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isDateAvailable = (doctor: typeof doctors[0], date: Date) => {
    const dateStr = formatDate(date)
    const slots = doctor.availableSlots[dateStr as keyof typeof doctor.availableSlots]
    return slots && Array.isArray(slots) && slots.length > 0
  }

  const isMonthAvailable = (doctor: typeof doctors[0], month: number, year: number) => {
    // Check if any day in this month has availability
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      if (isDateAvailable(doctor, date)) {
        return true
      }
    }
    return false
  }

  const isDayAvailable = (doctor: typeof doctors[0], day: number, month: number, year: number) => {
    // Skip invalid dates (e.g., Feb 30)
    const date = new Date(year, month, day)
    if (date.getMonth() !== month) return false
    return isDateAvailable(doctor, date)
  }

  const getAvailableTimesForDate = (doctor: typeof doctors[0], date: Date): string[] => {
    const dateStr = formatDate(date)
    const slots = doctor.availableSlots[dateStr as keyof typeof doctor.availableSlots]
    return Array.isArray(slots) ? slots : []
  }

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const doctor = doctors.find(d => d.id === selectedDoctor)
      if (doctor) {
        router.push(`/docconnect/book-appointment?doctor=${selectedDoctor}&member=${memberId}&date=${formatDate(selectedDate)}&time=${encodeURIComponent(selectedTime)}&type=${consultationType}`)
      }
    }
  }

  // Reset selections when changing doctors
  const handleSelectDoctor = (doctorId: string) => {
    setShowCalendar(doctorId)
    setSelectedDoctor(doctorId)
    setSelectedDate(null)
    setSelectedTime(null)
    setCurrentMonth(new Date())
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {consultationType === 'in-person' ? 'Nearby Doctors' : 'Available Doctors'}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">For {selectedMember.name}</p>
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
        >
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide space-y-3 pb-20">
        {/* Insurance Info Banner */}
        {selectedMember.insurance && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900 dark:text-green-100">Insurance Active</p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {selectedMember.insurance.provider} • Doctors with coverage shown first
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Cards */}
        {doctors.map((doctor) => {
          const cost = getEffectiveCost(doctor)
          const isCovered = hasInsuranceCoverage(doctor)
          const isCalendarOpen = showCalendar === doctor.id
          const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
          const availableTimes = selectedDate ? getAvailableTimesForDate(doctor, selectedDate) : []
          
          return (
            <div
              key={doctor.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 transition-all ${
                selectedDoctor === doctor.id
                  ? 'border-blue-500'
                  : isCovered
                  ? 'border-green-200 dark:border-green-800'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Doctor Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-4xl">{doctor.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                    </div>
                    {isCovered && (
                      <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">Covered</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({doctor.reviews} reviews)</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{doctor.gender}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nationality</p>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{doctor.nationality}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-1">
                  <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {consultationType === 'in-person' ? 'Hospital Location' : 'Location'}
                  </span>
                </div>
                {consultationType === 'in-person' ? (
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{doctor.hospital}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{doctor.hospitalAddress}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">{doctor.distance} away</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 dark:text-gray-400">{doctor.location}</p>
                )}
              </div>

              {/* Qualifications */}
              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Award className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Qualifications</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {doctor.qualifications.map((qual) => (
                    <span
                      key={qual}
                      className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Languages className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Languages</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{doctor.languages.join(', ')}</p>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-1 mb-2">
                  <IndianRupee className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Consultation Fee</span>
                </div>
                
                {isCovered ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Original Fee</span>
                      <span className="line-through text-gray-500">₹{cost.original}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 dark:text-green-400">Insurance Coverage (80%)</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">-₹{cost.covered}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-bold border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span className="text-gray-900 dark:text-white">You Pay</span>
                      <span className="text-blue-600 dark:text-blue-400">₹{cost.youPay}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{cost.youPay}</span>
                    {selectedMember.insurance && (
                      <span className="text-xs text-orange-600 dark:text-orange-400">Not covered by insurance</span>
                    )}
                  </div>
                )}
              </div>

              {/* Date & Time Selection - Dropdown Version */}
              {!isCalendarOpen ? (
                <Button
                  onClick={() => handleSelectDoctor(doctor.id)}
                  variant="primary"
                  className="w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Select Appointment Time
                </Button>
              ) : (
                <div className="border-2 border-blue-500 rounded-lg p-3 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Select Date & Time</h4>
                    <button
                      onClick={() => {
                        setShowCalendar(null)
                        setSelectedDate(null)
                        setSelectedTime(null)
                        setSelectedDoctor(null)
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Date Dropdowns */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Year</label>
                      <select
                        value={selectedDate ? selectedDate.getFullYear() : ''}
                        onChange={(e) => {
                          const year = parseInt(e.target.value)
                          const newDate = new Date(
                            year,
                            selectedDate?.getMonth() || new Date().getMonth(),
                            selectedDate?.getDate() || 1
                          )
                          setSelectedDate(newDate)
                          setSelectedTime(null)
                        }}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Year</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Month</label>
                      <select
                        value={selectedDate ? selectedDate.getMonth() : ''}
                        onChange={(e) => {
                          const month = parseInt(e.target.value)
                          const newDate = new Date(
                            selectedDate?.getFullYear() || new Date().getFullYear(),
                            month,
                            selectedDate?.getDate() || 1
                          )
                          setSelectedDate(newDate)
                          setSelectedTime(null)
                        }}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Month</option>
                        {[
                          { value: 0, name: 'January' },
                          { value: 1, name: 'February' },
                          { value: 2, name: 'March' },
                          { value: 3, name: 'April' },
                          { value: 4, name: 'May' },
                          { value: 5, name: 'June' },
                          { value: 6, name: 'July' },
                          { value: 7, name: 'August' },
                          { value: 8, name: 'September' },
                          { value: 9, name: 'October' },
                          { value: 10, name: 'November' },
                          { value: 11, name: 'December' }
                        ].map((month) => {
                          const year = selectedDate?.getFullYear() ?? new Date().getFullYear()
                          const available = isMonthAvailable(doctor, month.value, year)
                          return (
                            <option 
                              key={month.value} 
                              value={month.value}
                              style={{ 
                                color: available ? 'inherit' : '#999',
                                fontWeight: available ? 'normal' : '300'
                              }}
                            >
                              {month.name}{!available ? ' (Full)' : ''}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Day</label>
                      <select
                        value={selectedDate ? selectedDate.getDate() : ''}
                        onChange={(e) => {
                          const day = parseInt(e.target.value)
                          const newDate = new Date(
                            selectedDate?.getFullYear() || new Date().getFullYear(),
                            selectedDate?.getMonth() || new Date().getMonth(),
                            day
                          )
                          setSelectedDate(newDate)
                          setSelectedTime(null)
                        }}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                          const month = selectedDate?.getMonth() ?? new Date().getMonth()
                          const year = selectedDate?.getFullYear() ?? new Date().getFullYear()
                          const available = isDayAvailable(doctor, day, month, year)
                          return (
                            <option 
                              key={day} 
                              value={day}
                              style={{ 
                                color: available ? 'inherit' : '#999',
                                fontWeight: available ? 'normal' : '300'
                              }}
                            >
                              {day}{!available ? ' (Full)' : ''}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && availableTimes.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Available Times on {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </label>
                      <select
                        value={selectedTime || ''}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select time</option>
                        {availableTimes.map((time: string) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedDate && availableTimes.length === 0 && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                      <p className="text-xs text-orange-800 dark:text-orange-200">
                        No available slots for this date. Please select another date.
                      </p>
                    </div>
                  )}

                  {/* Selection Summary */}
                  {selectedDate && selectedTime && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                      <p className="text-xs text-blue-900 dark:text-blue-100">
                        <span className="font-semibold">Selected:</span> {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {selectedTime}
                      </p>
                    </div>
                  )}

                  {/* Book Button */}
                  <Button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime}
                    variant="primary"
                    className="w-full"
                  >
                    {consultationType === 'in-person' ? (
                      <Calendar className="w-4 h-4 mr-2" />
                    ) : (
                      <Video className="w-4 h-4 mr-2" />
                    )}
                    {selectedDate && selectedTime ? 'Book Appointment' : 'Select Date & Time'}
                  </Button>
                </div>
              )}
            </div>
          )
        })}
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
            className="flex items-center justify-center text-blue-500 p-1"
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
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
