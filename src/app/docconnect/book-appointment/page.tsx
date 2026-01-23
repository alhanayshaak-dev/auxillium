'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircle,
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Languages,
  IndianRupee,
  AlertCircle,
  Info,
  Home,
  Building2,
  X,
  FileText,
  Share2,
  Upload,
  Eye
} from 'lucide-react'

export default function BookAppointment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const doctorId = searchParams.get('doctor')
  const memberId = searchParams.get('member')
  const date = searchParams.get('date')
  const time = searchParams.get('time')
  const consultationType = searchParams.get('type') || 'online'

  const [appointmentStatus, setAppointmentStatus] = useState<'scheduled' | 'delayed' | 'ready'>('scheduled')
  const [canConnect, setCanConnect] = useState(false)
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [showRecordsModal, setShowRecordsModal] = useState(false)

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      image: '👩‍⚕️',
      languages: ['English', 'Hindi', 'Tamil'],
      location: 'Mumbai, India',
      hospital: 'Apollo Hospital',
      hospitalAddress: '123 Marine Drive, Mumbai - 400001',
      fee: 500,
      insuranceCovered: 400
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      image: '👨‍⚕️',
      languages: ['English', 'Hindi', 'Bengali'],
      location: 'Delhi, India',
      hospital: 'Fortis Hospital',
      hospitalAddress: '456 Nehru Place, Delhi - 110019',
      fee: 400,
      insuranceCovered: 320
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Internal Medicine',
      image: '👩‍⚕️',
      languages: ['English', 'Hindi', 'Marathi'],
      location: 'Pune, India',
      hospital: 'Manipal Hospital',
      hospitalAddress: '789 MG Road, Pune - 411001',
      fee: 600,
      insuranceCovered: 0
    },
    {
      id: '4',
      name: 'Dr. Amit Patel',
      specialty: 'Family Medicine',
      image: '👨‍⚕️',
      languages: ['English', 'Hindi', 'Gujarati'],
      location: 'Ahmedabad, India',
      hospital: 'Max Healthcare',
      hospitalAddress: '321 SG Highway, Ahmedabad - 380015',
      fee: 350,
      insuranceCovered: 0
    }
  ]

  const familyMembers = [
    { id: 'self', name: 'Avery Gray', relation: 'Self' },
    { id: 'heather', name: 'Heather Gray', relation: 'Mother' }
  ]

  // Sample medical records from health tracker
  const medicalRecords = [
    {
      id: '1',
      title: 'Blood Test Results',
      date: '2024-01-15',
      type: 'Lab Report',
      description: 'Complete Blood Count, Lipid Profile'
    },
    {
      id: '2',
      title: 'Chest X-Ray',
      date: '2024-01-10',
      type: 'Imaging',
      description: 'Routine chest examination'
    },
    {
      id: '3',
      title: 'Prescription History',
      date: '2024-01-08',
      type: 'Medication',
      description: 'Current medications and dosages'
    },
    {
      id: '4',
      title: 'Vaccination Records',
      date: '2023-12-20',
      type: 'Immunization',
      description: 'COVID-19, Flu shot records'
    },
    {
      id: '5',
      title: 'Allergy Information',
      date: '2023-11-15',
      type: 'Medical History',
      description: 'Known allergies and reactions'
    }
  ]

  const doctor = doctors.find(d => d.id === doctorId) || doctors[0]
  const member = familyMembers.find(m => m.id === memberId) || familyMembers[0]
  const appointmentDate = date ? new Date(date) : new Date()
  const appointmentTime = time || '2:30 PM'

  // Check if appointment time is now (for demo purposes, check if it's within 5 minutes)
  useEffect(() => {
    const checkAppointmentTime = () => {
      const now = new Date()
      const appointmentDateTime = new Date(appointmentDate)
      const [timeStr, period] = appointmentTime.split(' ')
      const [hours, minutes] = timeStr.split(':').map(Number)
      const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours
      appointmentDateTime.setHours(adjustedHours, minutes, 0, 0)

      const timeDiff = appointmentDateTime.getTime() - now.getTime()
      const minutesDiff = Math.floor(timeDiff / (1000 * 60))

      // Enable connect button if within 5 minutes of appointment time
      if (minutesDiff <= 5 && minutesDiff >= -30) {
        setCanConnect(true)
        setAppointmentStatus('ready')
      }
    }

    checkAppointmentTime()
    const interval = setInterval(checkAppointmentTime, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [appointmentDate, appointmentTime])

  const getStatusInfo = () => {
    switch (appointmentStatus) {
      case 'scheduled':
        return {
          icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          message: 'Appointment is on schedule. No delays expected.'
        }
      case 'delayed':
        return {
          icon: <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-200 dark:border-orange-800',
          text: 'text-orange-800 dark:text-orange-200',
          message: 'Doctor is running 15 minutes late. You will be notified when ready.'
        }
      case 'ready':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          message: 'Doctor is ready! You can now connect to your consultation.'
        }
    }
  }

  const statusInfo = getStatusInfo()

  const toggleRecordSelection = (recordId: string) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId))
    } else {
      setSelectedRecords([...selectedRecords, recordId])
    }
  }

  const shareRecords = () => {
    if (selectedRecords.length > 0) {
      // In a real app, this would send the records to the doctor
      alert(`Shared ${selectedRecords.length} medical record(s) with ${doctor.name}`)
      setShowRecordsModal(false)
      setSelectedRecords([])
    }
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />

      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Appointment Scheduled!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your {consultationType === 'online' ? 'online consultation' : 'in-person consultation'} has been confirmed
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide space-y-4">
        {/* Appointment Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Appointment Details</h3>
          
          {/* Doctor Info */}
          <div className="flex items-start space-x-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-4xl">{doctor.image}</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">{doctor.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Languages className="w-3 h-3 text-gray-500" />
                <p className="text-xs text-gray-600 dark:text-gray-400">{doctor.languages.join(', ')}</p>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {consultationType === 'in-person' ? doctor.hospitalAddress : doctor.location}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Patient</span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white font-medium">{member.name}</p>
            {member.relation !== 'Self' && (
              <p className="text-xs text-gray-600 dark:text-gray-400">{member.relation}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                {appointmentDate.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{appointmentTime}</p>
            </div>
          </div>

          {/* Cost */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <IndianRupee className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Consultation Fee</span>
            </div>
            {doctor.insuranceCovered > 0 ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Original Fee</span>
                  <span className="line-through text-gray-500">₹{doctor.fee}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600 dark:text-green-400">Insurance Coverage</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">-₹{doctor.insuranceCovered}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-gray-900 dark:text-white">You Paid</span>
                  <span className="text-blue-600 dark:text-blue-400">₹{doctor.fee - doctor.insuranceCovered}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm font-bold text-gray-900 dark:text-white">₹{doctor.fee}</p>
            )}
          </div>
        </div>

        {/* Appointment Status */}
        <div className={`${statusInfo.bg} border ${statusInfo.border} rounded-xl p-4`}>
          <div className="flex items-start space-x-3">
            {statusInfo.icon}
            <div className="flex-1">
              <h4 className={`text-sm font-semibold ${statusInfo.text} mb-1`}>Appointment Status</h4>
              <p className={`text-xs ${statusInfo.text}`}>{statusInfo.message}</p>
            </div>
          </div>
        </div>

        {/* Medical Records Sharing */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">Share Medical Records</h3>
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Share your medical records from Health Tracker with {doctor.name} for better consultation
          </p>
          
          <div className="space-y-2">
            <Button
              onClick={() => setShowRecordsModal(true)}
              variant="secondary"
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share my medical info with doctor
            </Button>
          </div>

          {selectedRecords.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                {selectedRecords.length} record(s) selected for sharing
              </p>
              <div className="flex space-x-2 mt-2">
                <Button
                  onClick={shareRecords}
                  variant="primary"
                  size="sm"
                >
                  Share Now
                </Button>
                <Button
                  onClick={() => setSelectedRecords([])}
                  variant="outline"
                  size="sm"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Connect Button */}
        <Button
          onClick={() => router.push('/docconnect/call')}
          disabled={!canConnect || consultationType === 'in-person'}
          variant={canConnect && consultationType === 'online' ? 'primary' : 'secondary'}
          className="w-full"
        >
          <Video className="w-4 h-4 mr-2" />
          {consultationType === 'in-person' 
            ? 'In-Person Visit - Go to Hospital' 
            : canConnect 
            ? 'Connect with Doctor' 
            : 'Connect Available at Appointment Time'}
        </Button>

        {/* Action Button */}
        <Button
          onClick={() => router.push('/docconnect')}
          variant="secondary"
          className="w-full"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Medical Records Selection Modal */}
      {showRecordsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Select Medical Records</h3>
              <button
                onClick={() => setShowRecordsModal(false)}
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-96 scrollbar-hide">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select records from your Health Tracker to share with {doctor.name}
              </p>
              
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <label
                    key={record.id}
                    className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => toggleRecordSelection(record.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {record.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {record.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <Button
                onClick={shareRecords}
                disabled={selectedRecords.length === 0}
                variant="primary"
                className="w-full"
              >
                Share {selectedRecords.length > 0 ? `${selectedRecords.length} ` : ''}Record{selectedRecords.length !== 1 ? 's' : ''}
              </Button>
              <Button
                onClick={() => setShowRecordsModal(false)}
                variant="secondary"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}