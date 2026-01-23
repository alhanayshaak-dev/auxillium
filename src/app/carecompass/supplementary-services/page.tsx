'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  Mic,
  MicOff,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Star,
  Award,
  Languages,
  User,
  CheckCircle,
  X,
  FileText,
  ChevronDown,
  MessageCircle,
  Video,
  Phone,
  Home,
  Stethoscope,
  Compass,
  Pill
} from 'lucide-react'

// Structured Requirements Form Component
function StructuredRequirementsForm({ 
  service, 
  isOpen, 
  onClose, 
  onSubmit,
  onSeeAllPackages
}: { 
  service: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  onSeeAllPackages: () => void
}) {
  const [formData, setFormData] = useState({
    duration: '',
    sessionsPerWeek: '',
    preferredDays: [] as string[],
    genderPreference: '',
    budgetRange: '',
    specificRequirements: '',
    healthGoals: ''
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    // Don't call onClose() here - let the parent handle closing
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[320px] max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white">{service} Requirements</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fill your preferences</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 transition-colors shadow-md"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="space-y-2">
            {/* Duration */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-xs"
              >
                <option value="">Select duration</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </select>
            </div>

            {/* Sessions per week */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sessions per week
              </label>
              <select
                value={formData.sessionsPerWeek}
                onChange={(e) => setFormData(prev => ({ ...prev, sessionsPerWeek: e.target.value }))}
                className="w-full p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-xs"
              >
                <option value="">Select frequency</option>
                <option value="1">1 session per week</option>
                <option value="2">2 sessions per week</option>
                <option value="3">3 sessions per week</option>
                <option value="4">4 sessions per week</option>
                <option value="5">5 sessions per week</option>
              </select>
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preferred Days
              </label>
              <div className="grid grid-cols-4 gap-1">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`p-1 rounded text-xs transition-all ${
                      formData.preferredDays.includes(day)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Preference */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender Preference
              </label>
              <select
                value={formData.genderPreference}
                onChange={(e) => setFormData(prev => ({ ...prev, genderPreference: e.target.value }))}
                className="w-full p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-xs"
              >
                <option value="">No preference</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget Range (per month)
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                className="w-full p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-xs"
              >
                <option value="">Select budget range</option>
                <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                <option value="₹15,000+">₹15,000+</option>
              </select>
            </div>

            {/* Health Goals */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Health Goals
              </label>
              <textarea
                value={formData.healthGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, healthGoals: e.target.value }))}
                placeholder="What are your main health goals?"
                className="w-full h-10 p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none text-xs"
              />
            </div>

            {/* Specific Requirements */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Requirements
              </label>
              <textarea
                value={formData.specificRequirements}
                onChange={(e) => setFormData(prev => ({ ...prev, specificRequirements: e.target.value }))}
                placeholder="Any specific requirements or preferences?"
                className="w-full h-10 p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none text-xs"
              />
            </div>

            <div className="space-y-2">
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                disabled={!formData.duration || !formData.sessionsPerWeek}
                className="w-full text-xs py-1.5"
              >
                Get Personalized Quotes
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onSeeAllPackages}
                className="w-full text-xs py-1.5"
              >
                See All Packages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Free-form Requirements Popup Component
function ServiceRequirementsPopup({ 
  service, 
  isOpen, 
  onClose, 
  onSubmit,
  onOpenStructuredForm,
  onSeeAllPackages
}: { 
  service: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (requirements: string) => void
  onOpenStructuredForm: () => void
  onSeeAllPackages: () => void
}) {
  const [requirements, setRequirements] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      // Simulate voice input
      setTimeout(() => {
        setRequirements(prev => prev + " I need a female dietitian for 3 months with sessions on Monday, Wednesday, and Thursday for weight management.")
        setIsListening(false)
      }, 3000)
    }
  }

  const handleSubmit = () => {
    if (requirements.trim()) {
      onSubmit(requirements)
      // Don't call onClose() here - let the parent handle closing
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[320px] max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white">{service} Requirements</h1>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 transition-colors shadow-md"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-2 overflow-y-auto">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Describe your specific needs for {service.toLowerCase()} services.
          </p>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Requirements
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder={`Example: "I need a female dietitian for 3 months with sessions on Monday, Wednesday, and Thursday. I want to lose 10kg and need help with meal planning."`}
              className="w-full h-16 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={handleVoiceInput}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg border transition-all text-xs ${
                isListening 
                  ? 'bg-red-50 border-red-300 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400'
                  : 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400'
              }`}
            >
              {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
              <span>{isListening ? 'Stop' : 'Voice'}</span>
            </button>
            {isListening && (
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-600 dark:text-red-400">Listening...</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <button
              onClick={onOpenStructuredForm}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center space-x-1 transition-colors border border-gray-200 dark:border-gray-600"
            >
              <FileText className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Use Form Instead</span>
            </button>
          </div>

          <div className="space-y-2">
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!requirements.trim()}
              className="w-full text-xs py-2"
            >
              Get Personalized Quotes
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onSeeAllPackages}
              className="w-full text-xs py-2"
            >
              See All Packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// AI Summary Component
function AISummary({ 
  requirements, 
  service, 
  formData 
}: { 
  requirements: string
  service: string
  formData?: any
}) {
  // Simply display user's original requirements without AI processing
  const formatUserRequirements = () => {
    if (formData) {
      // For structured form data, show only the user's inputs
      const items = []
      if (formData.duration) items.push(`Duration: ${formData.duration}`)
      if (formData.sessionsPerWeek) items.push(`Sessions: ${formData.sessionsPerWeek} per week`)
      if (formData.preferredDays?.length) items.push(`Days: ${formData.preferredDays.join(', ')}`)
      if (formData.genderPreference) items.push(`Gender: ${formData.genderPreference}`)
      if (formData.budgetRange) items.push(`Budget: ${formData.budgetRange}`)
      if (formData.healthGoals) items.push(`Goals: ${formData.healthGoals}`)
      if (formData.specificRequirements) items.push(`Notes: ${formData.specificRequirements}`)
      
      return {
        title: 'Requirements Summary',
        items: items.length > 0 ? items : ['No specific requirements provided']
      }
    } else {
      // For free-form requirements, show exactly what user typed
      return {
        title: 'Requirements Summary',
        items: requirements.trim() ? [requirements.trim()] : ['No requirements provided']
      }
    }
  }

  const userRequirements = formatUserRequirements()

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">{userRequirements.title}</h3>
          <div className="space-y-2">
            {userRequirements.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-800 dark:text-blue-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Quote Card Component
function QuoteCard({ 
  specialist, 
  isRecommended = false, 
  aiReason = '',
  onSelect 
}: { 
  specialist: any
  isRecommended?: boolean
  aiReason?: string
  onSelect: () => void
}) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border-2 ${
      isRecommended 
        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
        : 'border-gray-200 dark:border-gray-700'
    }`}>
      {isRecommended && (
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI Recommended</span>
        </div>
      )}

      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white">{specialist.name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{specialist.rating}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">({specialist.reviews} reviews)</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {specialist.experience} exp</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{specialist.location}</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">• {specialist.gender}</span>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="flex flex-wrap gap-2 mb-4">
        {specialist.qualifications.map((qual: string, index: number) => (
          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {qual}
          </span>
        ))}
      </div>

      {/* Languages */}
      <div className="flex items-center space-x-2 mb-4">
        <Languages className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {specialist.languages.join(', ')}
        </span>
      </div>

      {/* Package Details */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Package Details</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
            <span className="text-gray-900 dark:text-white">{specialist.package.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Sessions:</span>
            <span className="text-gray-900 dark:text-white">{specialist.package.sessions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
            <span className="text-gray-900 dark:text-white">{specialist.package.frequency}</span>
          </div>
          {specialist.package.schedule && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Schedule:</span>
              <span className="text-gray-900 dark:text-white text-xs">{specialist.package.schedule}</span>
            </div>
          )}
        </div>
        {specialist.package.description && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-200">{specialist.package.description}</p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{specialist.package.price}</span>
            {specialist.package.originalPrice && (
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹{specialist.package.originalPrice}</span>
            )}
          </div>
          {specialist.package.savings && (
            <span className="text-sm text-green-600 dark:text-green-400">Save ₹{specialist.package.savings}</span>
          )}
        </div>
        <Button variant="primary" onClick={onSelect}>
          Connect
        </Button>
      </div>

      {isRecommended && aiReason && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Why recommended:</strong> {aiReason}
          </p>
        </div>
      )}
    </div>
  )
}

// Connection Popup Component
function ConnectionPopup({ 
  specialist, 
  service,
  isOpen, 
  onClose, 
  onConnect
}: { 
  specialist: any
  service: string
  isOpen: boolean
  onClose: () => void
  onConnect: (method: string) => void
}) {
  const [message, setMessage] = useState('')
  const [urgency, setUrgency] = useState('normal')

  if (!isOpen || !specialist) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[320px] max-h-[75vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-3 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white">Connect with {specialist.name}</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">{service} Specialist</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 transition-colors shadow-md"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-3 overflow-y-auto">
          {/* Option 1: Negotiation Platform */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Negotiation Platform</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Send a message to discuss your requirements and negotiate terms with the specialist.
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mb-3 italic">
              Note: Negotiation is under the discretion of the doctors.
            </p>
            
            {specialist.negotiationEnabled ? (
              <>
                {/* Message */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your requirements, budget, schedule preferences, or any questions you have..."
                    className="w-full h-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none text-xs"
                  />
                </div>

                {/* Urgency Level */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: 'low', label: 'Low', color: 'green' },
                      { id: 'normal', label: 'Normal', color: 'blue' },
                      { id: 'high', label: 'High', color: 'orange' },
                      { id: 'urgent', label: 'Urgent', color: 'red' }
                    ].map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setUrgency(level.id)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          urgency === level.id
                            ? `bg-${level.color}-500 text-white`
                            : `bg-${level.color}-50 dark:bg-${level.color}-900/20 text-${level.color}-700 dark:text-${level.color}-300 hover:bg-${level.color}-100 dark:hover:bg-${level.color}-900/30`
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send Message Button */}
                <button 
                  onClick={() => {
                    window.location.href = `/carecompass/chat?specialist=${specialist.id}&service=${service}&message=${encodeURIComponent(message)}&urgency=${urgency}`
                  }}
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg text-sm transition-all mb-4"
                >
                  Send Message & Start Negotiation
                </button>
              </>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">Negotiation Disabled</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400">
                  This service provider has disabled the negotiation option. You can only proceed with direct booking at the listed price.
                </p>
              </div>
            )}
          </div>

          {/* Divider - Only show if negotiation is enabled */}
          {specialist.negotiationEnabled && (
            <div className="flex items-center mb-4">
              <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
              <span className="px-3 text-xs text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
            </div>
          )}

          {/* Option 2: Direct Booking */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
              {specialist.negotiationEnabled ? 'Book Service Directly' : 'Book Service'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {specialist.negotiationEnabled 
                ? 'Proceed with the recommended package and book the service immediately.'
                : 'Proceed with the recommended package at the listed price.'
              }
            </p>
            
            <button 
              onClick={() => {
                window.location.href = `/carecompass/book-service?specialist=${specialist.id}&service=${service}`
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-2 rounded-lg text-sm transition-all mb-3"
            >
              Book Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
function SupplementaryServicesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || 'all'
  
  const [showRequirementsPopup, setShowRequirementsPopup] = useState(service !== 'all')
  const [showStructuredForm, setShowStructuredForm] = useState(false)
  const [requirements, setRequirements] = useState('')
  const [formData, setFormData] = useState<any>(null)
  const [showQuotes, setShowQuotes] = useState(false)
  const [selectedService, setSelectedService] = useState(service)
  const [aiRecommendation, setAiRecommendation] = useState<{ recommendedId: number; reason: string } | null>(null)
  const [specialists, setSpecialists] = useState<any[]>([])
  const [showConnectionPopup, setShowConnectionPopup] = useState(false)
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null)

  // Generate dynamic specialists based on requirements
  const generateSpecialists = (requirements: string, formData: any, service: string) => {
    const baseSpecialists = [
      {
        id: 1,
        name: 'Dr. Priya Sharma',
        rating: 4.9,
        reviews: 156,
        experience: '8 years',
        location: 'Mumbai, Maharashtra',
        gender: 'Female',
        qualifications: ['MSc Nutrition', 'RD', 'CDE'],
        languages: ['English', 'Hindi', 'Marathi'],
        specialties: ['Weight Management', 'Diabetes Care', 'Sports Nutrition'],
        negotiationEnabled: true
      },
      {
        id: 2,
        name: 'Dr. Rajesh Kumar',
        rating: 4.7,
        reviews: 203,
        experience: '12 years',
        location: 'Delhi, NCR',
        gender: 'Male',
        qualifications: ['PhD Nutrition', 'RD'],
        languages: ['English', 'Hindi', 'Punjabi'],
        specialties: ['Clinical Nutrition', 'Heart Health', 'Geriatric Nutrition'],
        negotiationEnabled: true
      },
      {
        id: 3,
        name: 'Dr. Anita Desai',
        rating: 4.8,
        reviews: 89,
        experience: '6 years',
        location: 'Bangalore, Karnataka',
        gender: 'Female',
        qualifications: ['MSc Clinical Nutrition', 'RD'],
        languages: ['English', 'Hindi', 'Kannada'],
        specialties: ['Weight Loss', 'PCOS Management', 'Pregnancy Nutrition'],
        negotiationEnabled: true
      },
      {
        id: 4,
        name: 'Dr. Suresh Patel',
        rating: 4.6,
        reviews: 124,
        experience: '10 years',
        location: 'Pune, Maharashtra',
        gender: 'Male',
        qualifications: ['MSc Sports Nutrition', 'RD'],
        languages: ['English', 'Hindi', 'Gujarati'],
        specialties: ['Sports Nutrition', 'Weight Management', 'Fitness Coaching'],
        negotiationEnabled: false
      }
    ]

    // Filter specialists based on gender preference
    let filteredSpecialists = baseSpecialists
    if (formData?.genderPreference) {
      filteredSpecialists = baseSpecialists.filter(s => 
        s.gender.toLowerCase() === formData.genderPreference.toLowerCase()
      )
      // If no matches, keep all specialists
      if (filteredSpecialists.length === 0) {
        filteredSpecialists = baseSpecialists
      }
    }

    // Generate packages based on user requirements
    return filteredSpecialists.map(specialist => {
      const duration = formData?.duration || '3 months'
      const sessionsPerWeek = formData?.sessionsPerWeek || '2'
      const totalSessions = parseInt(sessionsPerWeek) * (duration.includes('month') ? parseInt(duration) * 4 : 52)
      
      // Calculate pricing based on duration and frequency
      const basePrice = 500 // per session
      const totalPrice = totalSessions * basePrice
      const discountedPrice = Math.round(totalPrice * 0.8) // 20% discount
      
      // Adjust pricing based on specialist experience and rating
      const experienceMultiplier = parseInt(specialist.experience) > 10 ? 1.2 : 1.0
      const ratingMultiplier = specialist.rating > 4.8 ? 1.1 : 1.0
      
      const finalPrice = Math.round(discountedPrice * experienceMultiplier * ratingMultiplier)
      const originalPrice = Math.round(totalPrice * experienceMultiplier * ratingMultiplier)

      return {
        ...specialist,
        package: {
          duration: duration,
          sessions: `${totalSessions} sessions`,
          frequency: `${sessionsPerWeek} sessions/week`,
          price: finalPrice.toString(),
          originalPrice: originalPrice.toString(),
          savings: (originalPrice - finalPrice).toString(),
          // Match user's preferred days if specified
          schedule: formData?.preferredDays?.length > 0 
            ? `Available on ${formData.preferredDays.join(', ')}`
            : 'Flexible scheduling available',
          // Include user's health goals in package description
          description: formData?.healthGoals 
            ? `Specialized program for: ${formData.healthGoals}`
            : `Comprehensive ${service.toLowerCase()} program tailored to your needs`
        }
      }
    })
  }

  // Service name mapping
  const getServiceDisplayName = (serviceName: string) => {
    const serviceMap: { [key: string]: string } = {
      'dietician': 'Dietician',
      'physiotherapy': 'Physiotherapy', 
      'fitness': 'Physical Fitness',
      'yoga': 'Yoga & Meditation',
      'wellness': 'Wellness'
    }
    return serviceMap[serviceName] || serviceName
  }

  // Initialize specialists when component mounts or requirements change
  useEffect(() => {
    if (showQuotes) {
      const newSpecialists = generateSpecialists(requirements, formData, selectedService)
      setSpecialists(newSpecialists)
    }
  }, [showQuotes, requirements, formData, selectedService])

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName)
    setShowRequirementsPopup(true)
  }

  const handleRequirementsSubmit = async (reqs: string) => {
    setRequirements(reqs)
    setShowRequirementsPopup(false) // Close popup first
    setShowQuotes(true) // Then show quotes
    
    // Generate specialists based on requirements
    const newSpecialists = generateSpecialists(reqs, null, selectedService)
    setSpecialists(newSpecialists)
    
    // Simple AI logic to recommend based on requirements
    let recommendedId = 1 // Default
    let reason = "Best overall match for your requirements"
    
    // Check for gender preference in requirements
    if (reqs.toLowerCase().includes('female')) {
      const femaleSpecialists = newSpecialists.filter(s => s.gender === 'Female')
      if (femaleSpecialists.length > 0) {
        recommendedId = femaleSpecialists[0].id
        reason = "Matches your preference for a female specialist"
      }
    } else if (reqs.toLowerCase().includes('male')) {
      const maleSpecialists = newSpecialists.filter(s => s.gender === 'Male')
      if (maleSpecialists.length > 0) {
        recommendedId = maleSpecialists[0].id
        reason = "Matches your preference for a male specialist"
      }
    }
    
    // Check for experience preference
    if (reqs.toLowerCase().includes('experienced') || reqs.toLowerCase().includes('senior')) {
      const experiencedSpecialist = newSpecialists.reduce((prev, current) => 
        parseInt(current.experience) > parseInt(prev.experience) ? current : prev
      )
      recommendedId = experiencedSpecialist.id
      reason = "Most experienced specialist matching your requirements"
    }
    
    // Check for location preference
    if (reqs.toLowerCase().includes('mumbai')) {
      const mumbaiSpecialist = newSpecialists.find(s => s.location.includes('Mumbai'))
      if (mumbaiSpecialist) {
        recommendedId = mumbaiSpecialist.id
        reason = "Located in Mumbai as preferred"
      }
    } else if (reqs.toLowerCase().includes('delhi')) {
      const delhiSpecialist = newSpecialists.find(s => s.location.includes('Delhi'))
      if (delhiSpecialist) {
        recommendedId = delhiSpecialist.id
        reason = "Located in Delhi as preferred"
      }
    } else if (reqs.toLowerCase().includes('bangalore')) {
      const bangaloreSpecialist = newSpecialists.find(s => s.location.includes('Bangalore'))
      if (bangaloreSpecialist) {
        recommendedId = bangaloreSpecialist.id
        reason = "Located in Bangalore as preferred"
      }
    }
    
    // Check for rating preference
    if (reqs.toLowerCase().includes('best rated') || reqs.toLowerCase().includes('highest rated')) {
      const bestRatedSpecialist = newSpecialists.reduce((prev, current) => 
        current.rating > prev.rating ? current : prev
      )
      recommendedId = bestRatedSpecialist.id
      reason = "Highest rated specialist for your needs"
    }
    
    setAiRecommendation({ recommendedId, reason })
  }

  const handleFormSubmit = async (data: any) => {
    setFormData(data)
    setShowStructuredForm(false) // Close form first
    setShowQuotes(true) // Then show quotes
    
    // Create requirements string from form data
    const formRequirements = `Duration: ${data.duration}, Sessions: ${data.sessionsPerWeek}/week, Days: ${data.preferredDays.join(', ')}, Gender: ${data.genderPreference || 'No preference'}, Budget: ${data.budgetRange}, Goals: ${data.healthGoals}, Requirements: ${data.specificRequirements}`
    setRequirements(formRequirements)
    
    // Generate specialists based on form data
    const newSpecialists = generateSpecialists(formRequirements, data, selectedService)
    setSpecialists(newSpecialists)
    
    let recommendedId = 1 // Default
    let reason = "Best match for your structured requirements"
    
    // Recommend based on gender preference
    if (data.genderPreference) {
      const genderMatches = newSpecialists.filter(s => s.gender === data.genderPreference)
      if (genderMatches.length > 0) {
        recommendedId = genderMatches[0].id
        reason = `Matches your preference for a ${data.genderPreference.toLowerCase()} specialist`
      }
    }
    
    // Consider budget range
    if (data.budgetRange) {
      const budgetRange = data.budgetRange
      let targetPrice = 10000 // default
      
      if (budgetRange.includes('2,000 - 5,000')) targetPrice = 3500
      else if (budgetRange.includes('5,000 - 10,000')) targetPrice = 7500
      else if (budgetRange.includes('10,000 - 15,000')) targetPrice = 12500
      else if (budgetRange.includes('15,000+')) targetPrice = 20000
      
      // Find specialist with price closest to budget
      const budgetMatch = newSpecialists.reduce((prev, current) => {
        const prevDiff = Math.abs(parseInt(prev.package.price) - targetPrice)
        const currentDiff = Math.abs(parseInt(current.package.price) - targetPrice)
        return currentDiff < prevDiff ? current : prev
      })
      
      recommendedId = budgetMatch.id
      reason = `Best value within your budget range of ${budgetRange}`
    }
    
    // Consider health goals
    if (data.healthGoals) {
      const goals = data.healthGoals.toLowerCase()
      if (goals.includes('weight') || goals.includes('lose')) {
        const weightSpecialist = newSpecialists.find(s => 
          s.specialties.some(spec => spec.toLowerCase().includes('weight'))
        )
        if (weightSpecialist) {
          recommendedId = weightSpecialist.id
          reason = "Specializes in weight management as per your goals"
        }
      } else if (goals.includes('diabetes')) {
        const diabetesSpecialist = newSpecialists.find(s => 
          s.specialties.some(spec => spec.toLowerCase().includes('diabetes'))
        )
        if (diabetesSpecialist) {
          recommendedId = diabetesSpecialist.id
          reason = "Specializes in diabetes care as per your goals"
        }
      }
    }
    
    setAiRecommendation({ recommendedId, reason })
  }

  const handleSelectPackage = (specialistId: number) => {
    const specialist = specialists.find(s => s.id === specialistId)
    if (specialist) {
      setSelectedSpecialist(specialist)
      setShowConnectionPopup(true)
    }
  }

  const handleConnect = (method: string) => {
    // Simple alert for now - working functionality
    alert(`Connecting via ${method} with ${selectedSpecialist?.name}...`)
    setShowConnectionPopup(false)
    setSelectedSpecialist(null)
  }

  const handleSeeAllPackages = () => {
    // Navigate to all packages view without requirements
    setShowRequirementsPopup(false)
    setShowStructuredForm(false)
    setShowQuotes(true)
    setRequirements('Browse all available packages')
  }

  const services = [
    { name: 'dietician', label: 'Dietician', icon: '🥗' },
    { name: 'physiotherapy', label: 'Physiotherapy', icon: '🏃‍♂️' },
    { name: 'fitness', label: 'Physical Fitness', icon: '💪' },
    { name: 'yoga', label: 'Yoga & Meditation', icon: '🧘‍♀️' },
    { name: 'wellness', label: 'Wellness', icon: '💚' }
  ]

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Status Bar */}
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 pt-2 flex-shrink-0">
        <span className="font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white opacity-50 rounded"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {service !== 'all' ? `${getServiceDisplayName(service)} Services` : 'Supplementary Services'}
              </h1>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 min-h-0">
        {!showQuotes ? (
          <>
            {/* Service Selection - Only show if no specific service selected */}
            {service === 'all' && (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select a Service</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((svc) => (
                      <button
                        key={svc.name}
                        onClick={() => handleServiceClick(svc.name)}
                        className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                      >
                        <div className="text-3xl mb-2">{svc.icon}</div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{svc.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Services */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Popular This Week</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🥗</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">Weight Management</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Personalized diet plans</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleServiceClick('dietician')}>
                        Get Quote
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🏃‍♂️</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">Pain Management</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Physical therapy sessions</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleServiceClick('physiotherapy')}>
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* AI Summary */}
            <AISummary requirements={requirements} service={selectedService} formData={formData} />

            {/* Quotes */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Specialist Quotes</h2>
              
              {/* Show quotes with AI recommendation first */}
              <div className="space-y-4">
                {specialists.map((specialist, index) => {
                  const isRecommended = aiRecommendation?.recommendedId === specialist.id
                  return (
                    <QuoteCard 
                      key={specialist.id}
                      specialist={specialist} 
                      isRecommended={isRecommended}
                      aiReason={isRecommended ? aiRecommendation?.reason : ''}
                      onSelect={() => handleSelectPackage(specialist.id)}
                    />
                  )
                })}
              </div>
            </div>
          </>
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
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-purple-500 p-1"
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

      {/* Free-form Requirements Popup */}
      <ServiceRequirementsPopup
        service={getServiceDisplayName(selectedService)}
        isOpen={showRequirementsPopup}
        onClose={() => {
          setShowRequirementsPopup(false)
          // Only go back if user cancels and came from a specific service
          if (service !== 'all' && !showQuotes) {
            router.back()
          }
        }}
        onSubmit={handleRequirementsSubmit}
        onOpenStructuredForm={() => {
          setShowRequirementsPopup(false)
          setShowStructuredForm(true)
        }}
        onSeeAllPackages={handleSeeAllPackages}
      />

      {/* Structured Requirements Form */}
      <StructuredRequirementsForm
        service={getServiceDisplayName(selectedService)}
        isOpen={showStructuredForm}
        onClose={() => {
          setShowStructuredForm(false)
          // Only go back if user cancels and came from a specific service
          if (service !== 'all' && !showQuotes) {
            router.back()
          } else {
            setShowRequirementsPopup(true)
          }
        }}
        onSubmit={handleFormSubmit}
        onSeeAllPackages={handleSeeAllPackages}
      />

      {/* Connection Popup */}
      <ConnectionPopup
        specialist={selectedSpecialist}
        service={getServiceDisplayName(selectedService)}
        isOpen={showConnectionPopup}
        onClose={() => {
          setShowConnectionPopup(false)
          setSelectedSpecialist(null)
        }}
        onConnect={handleConnect}
      />
    </div>
  )
}

// Main export with Suspense wrapper
export default function SupplementaryServices() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupplementaryServicesContent />
    </Suspense>
  )
}