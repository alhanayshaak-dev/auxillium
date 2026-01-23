'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import AppHeader from '@/components/ui/AppHeader'
import { 
  Video,
  Building2,
  Clock,
  Star,
  CheckCircle,
  User,
  Calendar,
  FileText,
  Home,
  Stethoscope,
  Compass,
  Pill
} from 'lucide-react'

export default function DocConnectHome() {
  const router = useRouter()

  const recentConsultations = [
    { 
      id: 1, 
      doctor: 'Dr. Sarah Johnson', 
      date: '2024-01-15', 
      type: 'Cardiology Checkup',
      status: 'Completed',
      rating: 4.8,
      consultationType: 'Online',
      patientName: 'Avery Gray (Self)'
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Chen', 
      date: '2024-01-10', 
      type: 'General Consultation',
      status: 'Completed',
      rating: 4.9,
      consultationType: 'In-Person',
      patientName: 'Heather Gray (Mother)'
    },
    { 
      id: 3, 
      doctor: 'Dr. Priya Sharma', 
      date: '2024-01-05', 
      type: 'Diabetes Follow-up',
      status: 'Completed',
      rating: 5.0,
      consultationType: 'Online',
      patientName: 'Heather Gray (Mother)'
    }
  ]

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-16',
      time: '2:30 PM',
      type: 'General Medicine Consultation',
      consultationType: 'Online',
      patientName: 'Avery Gray (Self)',
      status: 'scheduled'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2025-01-20',
      time: '10:00 AM',
      type: 'Diabetes Follow-up',
      consultationType: 'In-Person',
      patientName: 'Heather Gray (Mother)',
      status: 'scheduled'
    }
  ]

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <AppHeader title="DocConnect" subtitle="Connect With Qualified Doctors" module="docconnect" showProfile={false} />

      <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide pb-20">
        {/* Consultation Type Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Choose Consultation Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Online Consultation */}
            <button
              onClick={() => router.push('/docconnect/consultation?type=online')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-xl flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Online Consultation</h3>
              <div className="flex items-center space-x-1 mb-2">
                <Clock className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-xs text-green-600 dark:text-green-400">Available 24/7</span>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 italic mt-auto">
                *If symptoms require in-person care, you'll be redirected
              </p>
            </button>

            {/* In-Person Consultation */}
            <button
              onClick={() => router.push('/docconnect/consultation?type=in-person')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-md transition-all hover:border-purple-300 dark:hover:border-purple-600 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 rounded-xl flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2">In-Person Consultation</h3>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-purple-500 flex-shrink-0" />
                <span className="text-xs text-purple-600 dark:text-purple-400">Book Appointments</span>
              </div>
            </button>
          </div>
        </div>

        {/* Consultation History */}
        {recentConsultations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Consultation History</h3>
              <button 
                onClick={() => router.push('/docconnect/history')}
                className="text-xs text-blue-600 dark:text-blue-400 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {recentConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{consultation.doctor}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{consultation.type} • {consultation.date}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">Patient: {consultation.patientName}</p>
                    <div className="flex items-center flex-wrap gap-2 mt-1.5">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded whitespace-nowrap">
                        {consultation.consultationType}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">{consultation.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 text-xs font-medium flex-shrink-0 self-start">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h3>
              <button 
                onClick={() => router.push('/health-tracker')}
                className="text-xs text-blue-600 dark:text-blue-400 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{appointment.doctor}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{appointment.type}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">Patient: {appointment.patientName}</p>
                    <div className="flex items-center flex-wrap gap-2 mt-1.5">
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded whitespace-nowrap">
                        {appointment.date} • {appointment.time}
                      </span>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded whitespace-nowrap">
                        {appointment.consultationType}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/docconnect/book-appointment?doctor=${appointment.id}&member=self&date=${appointment.date}&time=${encodeURIComponent(appointment.time)}`)}
                    className="text-purple-600 dark:text-purple-400 text-xs font-medium flex-shrink-0 self-start"
                  >
                    Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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