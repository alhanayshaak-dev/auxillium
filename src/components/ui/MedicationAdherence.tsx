'use client'

import { useState, useEffect } from 'react'
import { Pill, Clock, CheckCircle, AlertTriangle, Calendar, Bell } from 'lucide-react'
import { Button } from './Button'
import ProgressBar from './ProgressBar'
import StatusIndicator from './StatusIndicator'

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  times: string[]
  startDate: Date
  endDate?: Date
  taken: boolean[]
  adherenceRate: number
  sideEffects?: string[]
  instructions: string
}

interface MedicationAdherenceProps {
  className?: string
}

export default function MedicationAdherence({ className = '' }: MedicationAdherenceProps) {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 'med-1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      times: ['08:00'],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      taken: [true, true, false, true, true, true, false], // Last 7 days
      adherenceRate: 85,
      instructions: 'Take with food, avoid potassium supplements'
    },
    {
      id: 'med-2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      times: ['08:00', '20:00'],
      startDate: new Date('2024-01-15'),
      taken: [true, true, true, false, true, true, true], // Last 7 days
      adherenceRate: 92,
      sideEffects: ['Nausea', 'Stomach upset'],
      instructions: 'Take with meals to reduce stomach upset'
    }
  ])

  const [todaysDoses, setTodaysDoses] = useState([
    {
      medicationId: 'med-1',
      medicationName: 'Lisinopril 10mg',
      time: '08:00',
      taken: true,
      takenAt: new Date('2024-01-20T08:15:00')
    },
    {
      medicationId: 'med-2',
      medicationName: 'Metformin 500mg',
      time: '08:00',
      taken: true,
      takenAt: new Date('2024-01-20T08:30:00')
    },
    {
      medicationId: 'med-2',
      medicationName: 'Metformin 500mg',
      time: '20:00',
      taken: false,
      takenAt: null
    }
  ])

  const [upcomingReminders, setUpcomingReminders] = useState([
    {
      medicationName: 'Metformin 500mg',
      time: '20:00',
      timeUntil: '2h 30m'
    }
  ])

  const getAdherenceStatus = (rate: number) => {
    if (rate >= 90) return { status: 'success' as const, text: 'Excellent adherence' }
    if (rate >= 80) return { status: 'warning' as const, text: 'Good adherence' }
    if (rate >= 70) return { status: 'warning' as const, text: 'Fair adherence' }
    return { status: 'error' as const, text: 'Poor adherence' }
  }

  const handleMarkTaken = (medicationId: string, time: string) => {
    setTodaysDoses(prev => prev.map(dose => 
      dose.medicationId === medicationId && dose.time === time
        ? { ...dose, taken: true, takenAt: new Date() }
        : dose
    ))
  }

  const handleMarkMissed = (medicationId: string, time: string) => {
    setTodaysDoses(prev => prev.map(dose => 
      dose.medicationId === medicationId && dose.time === time
        ? { ...dose, taken: false, takenAt: null }
        : dose
    ))
  }

  const calculateOverallAdherence = () => {
    const totalRate = medications.reduce((sum, med) => sum + med.adherenceRate, 0)
    return Math.round(totalRate / medications.length)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Medication Adherence
        </h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {calculateOverallAdherence()}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Overall</p>
        </div>
      </div>

      {/* Today's Doses */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Today's Doses
        </h4>
        <div className="space-y-2">
          {todaysDoses.map((dose, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${dose.taken ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-600'}`}>
                  {dose.taken ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Pill className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {dose.medicationName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {dose.time} {dose.taken && dose.takenAt && `• Taken at ${dose.takenAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </p>
                </div>
              </div>
              
              {!dose.taken && (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleMarkTaken(dose.medicationId, dose.time)}
                    variant="primary"
                    size="sm"
                  >
                    Mark Taken
                  </Button>
                  <Button
                    onClick={() => handleMarkMissed(dose.medicationId, dose.time)}
                    variant="outline"
                    size="sm"
                  >
                    Mark Missed
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Upcoming Reminders
          </h4>
          <div className="space-y-2">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {reminder.medicationName}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Due at {reminder.time} • {reminder.timeUntil}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medication List with Adherence */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Medication Adherence Rates
        </h4>
        <div className="space-y-4">
          {medications.map((medication) => {
            const adherenceStatus = getAdherenceStatus(medication.adherenceRate)
            
            return (
              <div key={medication.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {medication.name} {medication.dosage}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {medication.frequency} • {medication.times.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {medication.adherenceRate}%
                    </p>
                  </div>
                </div>
                
                <ProgressBar 
                  progress={medication.adherenceRate}
                  variant={medication.adherenceRate >= 80 ? 'success' : 'emergency'}
                  size="sm"
                  className="mb-2"
                />
                
                <StatusIndicator
                  status={adherenceStatus.status}
                  text={adherenceStatus.text}
                  size="sm"
                />
                
                {medication.sideEffects && medication.sideEffects.length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Reported Side Effects:
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          {medication.sideEffects.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <strong>Instructions:</strong> {medication.instructions}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}