'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { Heart, User, Mail, Phone, Lock, Calendar, MapPin } from 'lucide-react'
import { showToast, languages, Language } from '@/lib/utils'

export default function SignUpPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Essential Fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    
    // Health Info
    bloodGroup: '',
    medicalConditions: '',
    allergies: '',
    currentMedications: '',
    primaryDoctor: '',
    
    // Location & Emergency
    address: '',
    emergencyContact1Name: '',
    emergencyContact1Phone: '',
    emergencyContact1Relation: '',
    
    // Financial & Eligibility
    incomeLevel: '',
    insuranceInfo: '',
    
    // Preferences
    preferredLanguage: 'english' as Language,
    notificationsConsent: true,
    recordingConsent: false,
    dataStorageConsent: true,
    locationSharingConsent: false
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000))
      showToast('Account created successfully! Welcome to Auxillium!', 'success')
      router.push('/')
    } catch (error) {
      showToast('Registration failed. Please try again.', 'error')
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Basic Information
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            placeholder="Email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            placeholder="Phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password *
        </label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="Create a strong password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password *
        </label>
        <input
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="Confirm your password"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Health Information
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Blood Group
          </label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
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
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Doctor
          </label>
          <input
            type="text"
            value={formData.primaryDoctor}
            onChange={(e) => setFormData({ ...formData, primaryDoctor: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            placeholder="Dr. Name (optional)"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Medical Conditions
        </label>
        <textarea
          value={formData.medicalConditions}
          onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="List any existing medical conditions (optional)"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Allergies
        </label>
        <textarea
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="List any allergies (optional)"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Medications
        </label>
        <textarea
          value={formData.currentMedications}
          onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="List current medications (optional)"
          rows={2}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Location & Emergency Contacts
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your full address"
          rows={3}
        />
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h3 className="font-medium text-red-900 dark:text-red-100 mb-3">
          Emergency Contact
        </h3>
        
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={formData.emergencyContact1Name}
              onChange={(e) => setFormData({ ...formData, emergencyContact1Name: e.target.value })}
              className="w-full px-4 py-2 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/10 dark:text-white"
              placeholder="Emergency contact name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="tel"
              value={formData.emergencyContact1Phone}
              onChange={(e) => setFormData({ ...formData, emergencyContact1Phone: e.target.value })}
              className="w-full px-4 py-2 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/10 dark:text-white"
              placeholder="Phone number"
            />
            <input
              type="text"
              value={formData.emergencyContact1Relation}
              onChange={(e) => setFormData({ ...formData, emergencyContact1Relation: e.target.value })}
              className="w-full px-4 py-2 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/10 dark:text-white"
              placeholder="Relationship"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Income Level (for subsidized services)
        </label>
        <select
          value={formData.incomeLevel}
          onChange={(e) => setFormData({ ...formData, incomeLevel: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select income level</option>
          <option value="below-poverty">Below Poverty Line</option>
          <option value="low-income">Low Income</option>
          <option value="middle-income">Middle Income</option>
          <option value="high-income">High Income</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Insurance Information
        </label>
        <input
          type="text"
          value={formData.insuranceInfo}
          onChange={(e) => setFormData({ ...formData, insuranceInfo: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          placeholder="Insurance provider and policy number (optional)"
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Preferences & Consent
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred Language
        </label>
        <select
          value={formData.preferredLanguage}
          onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        >
          {Object.entries(languages).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="notifications"
            checked={formData.notificationsConsent}
            onChange={(e) => setFormData({ ...formData, notificationsConsent: e.target.checked })}
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700 dark:text-gray-300">
            I consent to receive notifications and alerts
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="recording"
            checked={formData.recordingConsent}
            onChange={(e) => setFormData({ ...formData, recordingConsent: e.target.checked })}
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="recording" className="text-sm text-gray-700 dark:text-gray-300">
            I consent to recording consultations for my records
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="dataStorage"
            checked={formData.dataStorageConsent}
            onChange={(e) => setFormData({ ...formData, dataStorageConsent: e.target.checked })}
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="dataStorage" className="text-sm text-gray-700 dark:text-gray-300">
            I agree to data storage and privacy policy *
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="locationSharing"
            checked={formData.locationSharingConsent}
            onChange={(e) => setFormData({ ...formData, locationSharingConsent: e.target.checked })}
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="locationSharing" className="text-sm text-gray-700 dark:text-gray-300">
            I consent to share location during emergencies
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Join Auxillium
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create your healthcare account
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-8 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === 4 ? 'Create Account' : 'Next'}
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}