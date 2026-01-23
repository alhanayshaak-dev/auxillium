'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { Button } from '@/components/ui/Button'
import { 
  Video,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Activity,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  MapPin,
  Mic
} from 'lucide-react'

export default function Consultation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const consultationType = searchParams.get('type') || 'online'
  
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0)
  const [expandedMethod, setExpandedMethod] = useState<'symptoms' | 'field' | 'hospital' | ''>('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [conditionDescription, setConditionDescription] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')
  const [fieldSearch, setFieldSearch] = useState('')
  const [hospitalSearch, setHospitalSearch] = useState('')
  const [selectedDistance, setSelectedDistance] = useState('5')
  const [showEligibility, setShowEligibility] = useState(false)
  const [isEligible, setIsEligible] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)

  const familyMembers = [
    { 
      id: 'self', 
      name: 'Avery Gray', 
      relation: 'Self', 
      age: 35, 
      bloodType: 'A+', 
      insurance: {
        provider: 'Star Health Insurance',
        policyNumber: 'SH123456',
        validUntil: 'Dec 2025',
        coverage: '₹5,00,000'
      }
    },
    { 
      id: 'heather', 
      name: 'Heather Gray', 
      relation: 'Mother', 
      age: 62, 
      bloodType: 'O+', 
      insurance: {
        provider: 'ICICI Lombard',
        policyNumber: 'IL789012',
        validUntil: 'Mar 2026',
        coverage: '₹3,00,000'
      }
    }
  ]

  const symptomCategories = [
    {
      category: 'Common Cold & Flu',
      symptoms: ['Runny nose', 'Sneezing', 'Cough', 'Sore throat', 'Mild fever', 'Body aches']
    },
    {
      category: 'Fever & Infections',
      symptoms: ['High fever', 'Chills', 'Sweating', 'Headache', 'Fatigue', 'Loss of appetite']
    },
    {
      category: 'Digestive Issues',
      symptoms: ['Stomach pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating']
    },
    {
      category: 'Headache & Migraine',
      symptoms: ['Severe headache', 'Light sensitivity', 'Nausea', 'Dizziness', 'Neck stiffness']
    },
    {
      category: 'Respiratory Problems',
      symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Persistent cough', 'Chest pain']
    },
    {
      category: 'Skin Conditions',
      symptoms: ['Rash', 'Itching', 'Redness', 'Swelling', 'Dry skin', 'Bumps or spots']
    },
    {
      category: 'Joint & Muscle Pain',
      symptoms: ['Joint pain', 'Muscle aches', 'Stiffness', 'Swelling', 'Limited movement']
    },
    {
      category: 'Allergic Reactions',
      symptoms: ['Skin rash', 'Itchy eyes', 'Sneezing', 'Runny nose', 'Swelling', 'Difficulty breathing']
    }
  ]

  const medicalFields = [
    'General Medicine',
    'Pediatrics',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Psychiatry/Psychology',
    'Gynecology',
    'ENT (Ear, Nose, Throat)',
    'Ophthalmology',
    'Dentistry',
    'Neurology',
    'Gastroenterology'
  ]

  const hospitals = [
    'Apollo Hospital',
    'Fortis Hospital',
    'Max Healthcare',
    'Manipal Hospital',
    'AIIMS',
    'Medanta',
    'Kokilaben Hospital',
    'Lilavati Hospital',
    'Narayana Health',
    'Columbia Asia'
  ]

  const distanceOptions = [
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '20', label: 'Within 20 km' },
    { value: '50', label: 'Within 50 km' },
    { value: 'any', label: 'Any distance' }
  ]

  const selectedMember = familyMembers[selectedMemberIndex]

  const filteredFields = medicalFields.filter(field => 
    field.toLowerCase().includes(fieldSearch.toLowerCase())
  )

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.toLowerCase().includes(hospitalSearch.toLowerCase())
  )

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const checkEligibility = () => {
    if (consultationType === 'in-person') {
      // For in-person, directly go to matching page
      router.push(`/docconnect/matching?member=${selectedMember.id}&method=${expandedMethod}&type=in-person&distance=${selectedDistance}`)
    } else {
      // Simulate AI eligibility check for online
      const emergencyKeywords = ['chest pain', 'severe', 'bleeding']
      const hasEmergency = emergencyKeywords.some(keyword => 
        conditionDescription.toLowerCase().includes(keyword) || 
        selectedSymptoms.some(s => s.toLowerCase().includes(keyword))
      )
      
      setIsEligible(!hasEmergency)
      setShowEligibility(true)
      
      if (!hasEmergency) {
        // Auto-proceed to doctors list after 2 seconds
        setTimeout(() => {
          router.push(`/docconnect/matching?member=${selectedMember.id}&method=${expandedMethod}&type=online`)
        }, 2000)
      }
    }
  }

  const canProceed = () => {
    if (expandedMethod === 'symptoms') {
      return selectedSymptoms.length > 0 || conditionDescription.trim()
    } else if (expandedMethod === 'field') {
      return selectedField !== ''
    } else if (expandedMethod === 'hospitals') {
      return selectedHospital !== ''
    } else if (searchQuery.trim()) {
      return true
    }
    return false
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${
            consultationType === 'online' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
              : 'bg-gradient-to-r from-purple-500 to-violet-500'
          } rounded-2xl flex items-center justify-center`}>
            {consultationType === 'online' ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <Stethoscope className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {consultationType === 'online' ? 'Online Consultation' : 'In-Person Consultation'}
            </h1>
            <p className="text-sm text-blue-600 dark:text-blue-400">Book Your Appointment</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/docconnect')}
          className="w-10 h-10 bg-white/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide space-y-4">
        {!showEligibility ? (
          <>
            {/* Family Members Carousel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Who is this consultation for?</h3>
              
              {/* Carousel */}
              <div className="relative">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <button
                    onClick={() => setSelectedMemberIndex(Math.max(0, selectedMemberIndex - 1))}
                    disabled={selectedMemberIndex === 0}
                    className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  
                  <div className="flex-1 overflow-hidden">
                    <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${selectedMemberIndex * 100}%)` }}>
                      {familyMembers.map((member, index) => (
                        <div key={member.id} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {member.relation} • {member.age} years • {member.bloodType}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedMemberIndex(Math.min(familyMembers.length - 1, selectedMemberIndex + 1))}
                    disabled={selectedMemberIndex === familyMembers.length - 1}
                    className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-30"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insurance Card */}
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-1">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Health Insurance</h4>
                </div>
                {selectedMember.insurance ? (
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2 text-white">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-xs opacity-90">Insurance Provider</p>
                        <p className="font-bold text-sm">{selectedMember.insurance.provider}</p>
                      </div>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="opacity-75">Policy</p>
                        <p className="font-medium">{selectedMember.insurance.policyNumber}</p>
                      </div>
                      <div>
                        <p className="opacity-75">Valid Until</p>
                        <p className="font-medium">{selectedMember.insurance.validUntil}</p>
                      </div>
                      <div>
                        <p className="opacity-75">Coverage</p>
                        <p className="font-bold">{selectedMember.insurance.coverage}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2">
                    <p className="text-sm text-orange-800 dark:text-orange-200">No insurance added</p>
                    <button className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
                      + Add Insurance
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Selection Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">How would you like to find a doctor?</h3>
              
              {/* Select by Symptoms */}
              <div className="mb-2">
                <button
                  onClick={() => setExpandedMethod(expandedMethod === 'symptoms' ? '' : 'symptoms')}
                  className={`w-full p-2 rounded-lg border-2 flex items-center justify-between transition-all ${
                    expandedMethod === 'symptoms'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Select by Symptoms</p>
                    </div>
                  </div>
                  {expandedMethod === 'symptoms' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedMethod === 'symptoms' && (
                  <div className="mt-3 space-y-3 pl-2">
                    {/* Symptom Categories */}
                    <div className="space-y-2">
                      {symptomCategories.map((category) => (
                        <details key={category.category} className="group">
                          <summary className="cursor-pointer p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white list-none flex items-center justify-between">
                            {category.category}
                            <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="grid grid-cols-2 gap-2 mt-2 ml-2">
                            {category.symptoms.map((symptom) => (
                              <label key={symptom} className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer text-xs">
                                <input
                                  type="checkbox"
                                  checked={selectedSymptoms.includes(symptom)}
                                  onChange={() => toggleSymptom(symptom)}
                                  className="w-3 h-3 text-green-600 border-gray-300 rounded"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{symptom}</span>
                              </label>
                            ))}
                          </div>
                        </details>
                      ))}
                    </div>

                    {/* Describe Condition */}
                    <div>
                      <label className="text-xs font-medium text-gray-900 dark:text-white mb-1 block">Describe your condition</label>
                      <textarea
                        value={conditionDescription}
                        onChange={(e) => setConditionDescription(e.target.value)}
                        placeholder="Describe your symptoms, when they started..."
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xs dark:bg-gray-700 dark:text-white"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Select by Field */}
              <div className="mb-2">
                <button
                  onClick={() => setExpandedMethod(expandedMethod === 'field' ? '' : 'field')}
                  className={`w-full p-2 rounded-lg border-2 flex items-center justify-between transition-all ${
                    expandedMethod === 'field'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Select by Category</p>
                    </div>
                  </div>
                  {expandedMethod === 'field' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedMethod === 'field' && (
                  <div className="mt-3 space-y-3 pl-2">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={fieldSearch}
                        onChange={(e) => setFieldSearch(e.target.value)}
                        placeholder="Search medical category..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Field Grid */}
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
                      {filteredFields.map((field) => (
                        <button
                          key={field}
                          onClick={() => setSelectedField(field)}
                          className={`p-2 rounded-lg border-2 text-xs transition-all text-left ${
                            selectedField === field
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Select by Hospitals */}
              <div className="mb-2">
                <button
                  onClick={() => setExpandedMethod(expandedMethod === 'hospitals' ? '' : 'hospitals')}
                  className={`w-full p-2 rounded-lg border-2 flex items-center justify-between transition-all ${
                    expandedMethod === 'hospitals'
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Select by Hospitals</p>
                    </div>
                  </div>
                  {expandedMethod === 'hospitals' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedMethod === 'hospitals' && (
                  <div className="mt-3 space-y-3 pl-2">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={hospitalSearch}
                        onChange={(e) => setHospitalSearch(e.target.value)}
                        placeholder="Search hospital..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Hospital Grid */}
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
                      {filteredHospitals.map((hospital) => (
                        <button
                          key={hospital}
                          onClick={() => setSelectedHospital(hospital)}
                          className={`p-2 rounded-lg border-2 text-xs transition-all text-left ${
                            selectedHospital === hospital
                              ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                              : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {hospital}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Distance Selector (In-Person Only) */}
              {consultationType === 'in-person' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Maximum Distance</span>
                  </div>
                  <select
                    value={selectedDistance}
                    onChange={(e) => setSelectedDistance(e.target.value)}
                    className="w-full p-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white"
                  >
                    {distanceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search Bar with Text and Voice */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Quick search"
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      setIsListening(!isListening)
                      if (!isListening) {
                        alert('Voice search feature coming soon! Please use text search for now.')
                      }
                    }}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                {searchQuery && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        // Handle search functionality
                        router.push(`/docconnect/matching?search=${encodeURIComponent(searchQuery)}&type=${consultationType}`)
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Search "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Eligibility Result */
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <div className={`w-16 h-16 ${
                isEligible ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
              } rounded-full flex items-center justify-center mx-auto mb-4`}>
                {isEligible ? (
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                )}
              </div>
              <h2 className={`text-lg font-bold mb-2 ${
                isEligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isEligible ? 'Eligible for Online Consultation' : 'In-Person Visit Recommended'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isEligible 
                  ? 'AI has analyzed your symptoms. Connecting you to available doctors...'
                  : 'Based on your symptoms, we recommend an in-person consultation or emergency care.'
                }
              </p>
              {!isEligible && (
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push('/emergency/e1')}
                    variant="emergency"
                    className="w-full"
                  >
                    Go to Emergency
                  </Button>
                  <Button
                    onClick={() => router.push('/docconnect/consultation?type=in-person')}
                    variant="secondary"
                    className="w-full"
                  >
                    Find Nearby Hospitals
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      {!showEligibility && (
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={checkEligibility}
            disabled={!canProceed()}
            variant="primary"
            className="w-full"
          >
            {consultationType === 'online' ? 'Check Eligibility & Find Doctors' : 'Find Doctors'}
          </Button>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
