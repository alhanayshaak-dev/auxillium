'use client'

import { useState } from 'react'
import { Brain, Heart, MessageCircle, Phone, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from './Button'
import ProgressBar from './ProgressBar'
import StatusIndicator from './StatusIndicator'

interface MoodEntry {
  date: Date
  mood: number // 1-10 scale
  energy: number // 1-10 scale
  anxiety: number // 1-10 scale
  notes?: string
}

interface MentalHealthSupportProps {
  className?: string
}

export default function MentalHealthSupport({ className = '' }: MentalHealthSupportProps) {
  const [currentMood, setCurrentMood] = useState<number>(7)
  const [currentEnergy, setCurrentEnergy] = useState<number>(6)
  const [currentAnxiety, setCurrentAnxiety] = useState<number>(3)
  const [notes, setNotes] = useState('')

  const [recentEntries] = useState<MoodEntry[]>([
    { date: new Date('2024-01-19'), mood: 6, energy: 5, anxiety: 4 },
    { date: new Date('2024-01-18'), mood: 8, energy: 7, anxiety: 2 },
    { date: new Date('2024-01-17'), mood: 5, energy: 4, anxiety: 6 },
    { date: new Date('2024-01-16'), mood: 7, energy: 6, anxiety: 3 },
    { date: new Date('2024-01-15'), mood: 9, energy: 8, anxiety: 1 }
  ])

  const [resources] = useState([
    {
      title: 'Crisis Helpline',
      description: '24/7 mental health crisis support',
      phone: '1-800-273-8255',
      type: 'emergency'
    },
    {
      title: 'Anxiety Support Group',
      description: 'Weekly virtual support group meetings',
      schedule: 'Tuesdays 7:00 PM',
      type: 'support'
    },
    {
      title: 'Mindfulness Meditation',
      description: 'Guided meditation sessions',
      duration: '10-30 minutes',
      type: 'self-care'
    }
  ])

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600 dark:text-green-400'
    if (mood >= 6) return 'text-yellow-600 dark:text-yellow-400'
    if (mood >= 4) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 9) return 'Excellent'
    if (mood >= 7) return 'Good'
    if (mood >= 5) return 'Okay'
    if (mood >= 3) return 'Low'
    return 'Very Low'
  }

  const getAnxietyColor = (anxiety: number) => {
    if (anxiety <= 2) return 'text-green-600 dark:text-green-400'
    if (anxiety <= 4) return 'text-yellow-600 dark:text-yellow-400'
    if (anxiety <= 6) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getAnxietyLabel = (anxiety: number) => {
    if (anxiety <= 2) return 'Minimal'
    if (anxiety <= 4) return 'Mild'
    if (anxiety <= 6) return 'Moderate'
    if (anxiety <= 8) return 'High'
    return 'Severe'
  }

  const calculateTrend = (entries: MoodEntry[], metric: 'mood' | 'energy' | 'anxiety') => {
    if (entries.length < 2) return 0
    const recent = entries.slice(0, 3).reduce((sum, entry) => sum + entry[metric], 0) / 3
    const older = entries.slice(3, 6).reduce((sum, entry) => sum + entry[metric], 0) / 3
    return recent - older
  }

  const moodTrend = calculateTrend(recentEntries, 'mood')
  const energyTrend = calculateTrend(recentEntries, 'energy')
  const anxietyTrend = calculateTrend(recentEntries, 'anxiety')

  const handleSaveEntry = () => {
    // In a real app, this would save to the backend
    console.log('Saving mental health entry:', {
      mood: currentMood,
      energy: currentEnergy,
      anxiety: currentAnxiety,
      notes,
      date: new Date()
    })
    
    // Reset form
    setNotes('')
    // Show success message
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          Mental Health Check-in
        </h3>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mood</span>
            <div className="flex items-center space-x-1">
              {moodTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : moodTrend < 0 ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${getMoodColor(currentMood)}`}>
              {currentMood}/10
            </span>
            <span className={`text-sm ${getMoodColor(currentMood)}`}>
              {getMoodLabel(currentMood)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={currentMood}
            onChange={(e) => setCurrentMood(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy</span>
            <div className="flex items-center space-x-1">
              {energyTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : energyTrend < 0 ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {currentEnergy}/10
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {currentEnergy >= 7 ? 'High' : currentEnergy >= 4 ? 'Moderate' : 'Low'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={currentEnergy}
            onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Anxiety</span>
            <div className="flex items-center space-x-1">
              {anxietyTrend < 0 ? (
                <TrendingDown className="w-4 h-4 text-green-500" />
              ) : anxietyTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${getAnxietyColor(currentAnxiety)}`}>
              {currentAnxiety}/10
            </span>
            <span className={`text-sm ${getAnxietyColor(currentAnxiety)}`}>
              {getAnxietyLabel(currentAnxiety)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={currentAnxiety}
            onChange={(e) => setCurrentAnxiety(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How are you feeling today? (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share any thoughts, feelings, or experiences from today..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          rows={3}
        />
      </div>

      <Button
        onClick={handleSaveEntry}
        variant="primary"
        className="w-full mb-6"
      >
        Save Today's Check-in
      </Button>

      {/* Crisis Alert */}
      {(currentMood <= 3 || currentAnxiety >= 8) && (
        <StatusIndicator
          status="error"
          text="We're concerned about your wellbeing"
          subtext="Please consider reaching out to a mental health professional or crisis helpline"
          className="mb-6"
        />
      )}

      {/* Resources */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Mental Health Resources
        </h4>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {resource.title}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {resource.description}
                  </p>
                  {resource.phone && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      📞 {resource.phone}
                    </p>
                  )}
                  {resource.schedule && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      📅 {resource.schedule}
                    </p>
                  )}
                  {resource.duration && (
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      ⏱️ {resource.duration}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {resource.type === 'emergency' && (
                    <Button variant="primary" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  )}
                  {resource.type === 'support' && (
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  )}
                  {resource.type === 'self-care' && (
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}