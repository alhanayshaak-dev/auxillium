'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSettings } from '@/contexts/SettingsContext'
import { ImmersiveReader } from '@/components/ui/ImmersiveReader'
import { 
  Shield, X, AlertTriangle, Phone, Users, User, Mic, Video,
  Heart, Zap, Activity, Languages, Check, Camera, ChevronDown, ChevronUp, MapPin,
  Home, Stethoscope, Compass, FileText, Pill
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Emergency() {
  const router = useRouter()
  const { t, emergencyLanguages, setEmergencyLanguages } = useSettings()
  const [situation, setSituation] = useState('')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedMainSymptom, setSelectedMainSymptom] = useState<string>('')
  const [selectedSubSymptoms, setSelectedSubSymptoms] = useState<string[]>([])
  const [showServiceDistances, setShowServiceDistances] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [serviceReason, setServiceReason] = useState('')
  const [showAlertContactsPopup, setShowAlertContactsPopup] = useState(false)
  const [showAdditionalSymptoms, setShowAdditionalSymptoms] = useState(false)
  const [showCallConfirmation, setShowCallConfirmation] = useState(false)

  const [emergencyServices, setEmergencyServices] = useState<{
    [key: string]: {
      service: string; contacted: boolean; distance: string; eta: string;
      vehicleId: string; timestamp: string; reason: string;
    }
  }>({})

  const availableLanguages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' },
    { code: 'ml', name: 'Malayalam' }, { code: 'kn', name: 'Kannada' },
    { code: 'ta', name: 'Tamil' }, { code: 'te', name: 'Telugu' }
  ]

  const mainSymptoms = [
    { 
      id: 'chest-pain', title: 'Chest Pain', icon: Heart, color: 'red',
      subSymptoms: ['Chest tightness', 'Shortness of breath', 'Pain radiating to arm', 'Sweating', 'Nausea', 'Dizziness']
    },
    { 
      id: 'breathing', title: 'Difficulty Breathing', icon: Activity, color: 'blue',
      subSymptoms: ['Wheezing', 'Rapid breathing', 'Chest tightness', 'Coughing', 'Blue lips/face', 'Gasping for air']
    },
    { 
      id: 'injury', title: 'Severe Injury', icon: Zap, color: 'orange',
      subSymptoms: ['Bleeding', 'Severe pain', 'Swelling', 'Unable to move', 'Visible deformity', 'Loss of consciousness']
    },
    { 
      id: 'allergic', title: 'Allergic Reactions', icon: AlertTriangle, color: 'purple',
      subSymptoms: ['Skin rash/hives', 'Swelling', 'Difficulty breathing', 'Rapid heartbeat', 'Dizziness', 'Vomiting']
    }
  ]

  const additionalSymptoms = ['Fever', 'Headache', 'Abdominal pain', 'Back pain', 'Confusion', 'Weakness', 'Numbness', 'Vision problems']

  const medicalInfo = {
    bloodType: 'A+',
    allergies: ['Penicillin'],
    conditions: [],
    emergencyContacts: [
      { name: 'Heather Gray', relation: 'Mother', phone: '+91 98765 43210' },
      { name: 'Dr. Sarah Johnson', relation: 'Family Doctor', phone: '+91 98765 12345' }
    ]
  }

  const toggleMainSymptom = (symptomId: string) => {
    if (selectedMainSymptom === symptomId) {
      setSelectedMainSymptom('')
      setSelectedSubSymptoms([])
    } else {
      setSelectedMainSymptom(symptomId)
      setSelectedSubSymptoms([])
    }
  }

  const toggleSubSymptom = (symptom: string) => {
    setSelectedSubSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    )
  }

  const toggleAdditionalSymptom = (symptom: string) => {
    setSelectedSubSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    )
  }

  const toggleEmergencyLanguage = (langCode: string) => {
    if (emergencyLanguages.includes(langCode)) {
      if (emergencyLanguages.length > 1) {
        setEmergencyLanguages(emergencyLanguages.filter(lang => lang !== langCode))
      }
    } else {
      setEmergencyLanguages([...emergencyLanguages, langCode])
    }
  }

  const handleDirectEmergencyCall = (service: string) => {
    if (emergencyServices[service]) {
      setShowServiceDistances(true)
    } else {
      setSelectedService(service)
      setServiceReason('')
      setShowServiceDistances(true)
    }
  }

  const confirmEmergencyCall = () => {
    if (!serviceReason.trim()) return
    const serviceData = {
      service: selectedService,
      contacted: true,
      distance: selectedService === 'ambulance' ? '2.3 km' : selectedService === 'police' ? '1.8 km' : '3.1 km',
      eta: selectedService === 'ambulance' ? '8 mins' : selectedService === 'police' ? '6 mins' : '12 mins',
      vehicleId: selectedService === 'ambulance' ? 'AMB-KA-2024' : selectedService === 'police' ? 'POL-KA-1847' : 'FIRE-KA-0923',
      timestamp: new Date().toLocaleTimeString(),
      reason: serviceReason
    }
    setEmergencyServices(prev => ({ ...prev, [selectedService]: serviceData }))
    setShowServiceDistances(false)
    setSelectedService('')
    setServiceReason('')
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
      setSituation(prev => prev + (prev ? ' ' : '') + 'Voice input: I need immediate medical assistance.')
    }, 2000)
  }

  const handleAlertContacts = () => {
    setShowAlertContactsPopup(true)
  }

  const confirmAlertContacts = () => {
    setShowAlertContactsPopup(false)
    alert('Emergency contacts have been notified with your location and situation.')
  }

  const handleEmergencySubmit = () => {
    if (!situation.trim() && selectedSubSymptoms.length === 0) return
    setShowCallConfirmation(true)
  }

  const confirmCallDoctor = () => {
    setShowCallConfirmation(false)
    // Redirect to analyzing screen first, then it will redirect to call
    router.push(`/emergency/analyzing?situation=${encodeURIComponent(situation)}&symptoms=${encodeURIComponent(selectedSubSymptoms.join(','))}`)
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col relative">
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
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Emergency</h1>
            <p className="text-sm text-red-600 dark:text-red-400">24/7 Support</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ImmersiveReader 
            content="Emergency Services - 24/7 Support. Access immediate emergency assistance including ambulance services, police, fire department, and medical emergency response. Report symptoms, get connected to emergency services, and receive real-time support during critical situations."
            title="Emergency Services"
          />
          <button onClick={() => router.push('/')} className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center">
            <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide space-y-3 pb-20">
        {/* Emergency Services */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-red-500" />
            Emergency Services
          </h3>
          
          {/* Search Bar for Emergency Services */}
          <div className="mb-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search emergency services or describe situation..."
                className="w-full p-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm dark:bg-gray-700 dark:text-white"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  // Voice search functionality
                  alert('Voice search activated for emergency services')
                }}
              >
                <Mic className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleDirectEmergencyCall('ambulance')} className="p-2 rounded-xl flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-red-100 dark:border-red-800 hover:border-red-200">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/50 dark:to-pink-900/50">
                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-xs font-medium text-gray-900 dark:text-white">Ambulance</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">108</span>
              {emergencyServices.ambulance && <span className="text-xs text-green-600 font-medium">Track</span>}
            </button>
            <button onClick={() => handleDirectEmergencyCall('police')} className="p-2 rounded-xl flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-blue-100 dark:border-blue-800 hover:border-blue-200">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-gray-900 dark:text-white">Police</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">100</span>
              {emergencyServices.police && <span className="text-xs text-green-600 font-medium">Track</span>}
            </button>
            <button onClick={() => handleDirectEmergencyCall('fire')} className="p-2 rounded-xl flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-orange-100 dark:border-orange-800 hover:border-orange-200">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs font-medium text-gray-900 dark:text-white">Fire</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">101</span>
              {emergencyServices.fire && <span className="text-xs text-green-600 font-medium">Track</span>}
            </button>
          </div>
        </div>

        {/* Alert Emergency Contacts */}
        <button onClick={handleAlertContacts} className="w-full bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-800 hover:border-orange-200 font-medium py-3 rounded-xl shadow-sm flex items-center justify-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-sm text-gray-900 dark:text-white">Alert Saved Emergency Contacts</span>
        </button>

        {/* Consult Doctor Heading */}
        <div className="pt-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Consult Doctor</h2>
        </div>

        {/* Language Preference */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center text-sm">
              <Languages className="w-4 h-4 mr-2 text-blue-500" />
              Language Preference
            </h3>
            <button onClick={() => setShowLanguageSelector(true)} className="text-xs text-blue-600 dark:text-blue-400">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {emergencyLanguages.map((langCode) => {
              const lang = availableLanguages.find(l => l.code === langCode)
              return lang ? (
                <div key={langCode} className="flex items-center space-x-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                  <span>{lang.name}</span>
                  {emergencyLanguages.length > 1 && (
                    <button onClick={() => toggleEmergencyLanguage(langCode)} className="text-blue-600 dark:text-blue-400">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ) : null
            })}
          </div>
        </div>

        {/* Get Medical Help */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-red-500" />
            Get Medical Help
          </h3>

          {/* Main 4 Symptoms with Dropdowns */}
          <div className="space-y-2 mb-3">
            {mainSymptoms.map((symptom) => (
              <div key={symptom.id}>
                <button onClick={() => toggleMainSymptom(symptom.id)} className={`w-full p-2 rounded-lg border flex items-center justify-between ${selectedMainSymptom === symptom.id ? 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${symptom.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' : symptom.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : symptom.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                      <symptom.icon className={`w-4 h-4 ${symptom.color === 'red' ? 'text-red-600' : symptom.color === 'blue' ? 'text-blue-600' : symptom.color === 'orange' ? 'text-orange-600' : 'text-purple-600'}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{symptom.title}</span>
                  </div>
                  {selectedMainSymptom === symptom.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {selectedMainSymptom === symptom.id && (
                  <div className="mt-1.5 ml-9 grid grid-cols-2 gap-1.5">
                    {symptom.subSymptoms.map((subSymptom) => (
                      <label key={subSymptom} className="flex items-center space-x-1.5 text-xs p-1.5 border border-gray-200 dark:border-gray-700 rounded cursor-pointer">
                        <input type="checkbox" checked={selectedSubSymptoms.includes(subSymptom)} onChange={() => toggleSubSymptom(subSymptom)} className="w-3 h-3 text-red-600 border-gray-300 rounded" />
                        <span className="text-gray-700 dark:text-gray-300">{subSymptom}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Symptoms Dropdown */}
          <button onClick={() => setShowAdditionalSymptoms(!showAdditionalSymptoms)} className="w-full p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between mb-2">
            <span className="text-xs text-gray-700 dark:text-gray-300">Other Symptoms</span>
            {showAdditionalSymptoms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showAdditionalSymptoms && (
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {additionalSymptoms.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-1.5 text-xs p-1.5 border border-gray-200 dark:border-gray-700 rounded cursor-pointer">
                  <input type="checkbox" checked={selectedSubSymptoms.includes(symptom)} onChange={() => toggleAdditionalSymptom(symptom)} className="w-3 h-3 text-red-600 border-gray-300 rounded" />
                  <span className="text-gray-700 dark:text-gray-300">{symptom}</span>
                </label>
              ))}
            </div>
          )}

          {/* Describe Emergency */}
          <label className="text-xs font-medium text-gray-900 dark:text-white mb-1.5 block">Describe your emergency</label>
          <textarea value={situation} onChange={(e) => setSituation(e.target.value)} placeholder="Describe what happened..." className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs dark:bg-gray-700 dark:text-white mb-2" rows={3} />
          
          {/* Media Input Buttons */}
          <div className="flex items-center space-x-1.5 mb-2">
            <button onClick={handleVoiceInput} disabled={isListening} className={`flex-1 p-2 rounded-lg flex items-center justify-center space-x-1.5 ${isListening ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">Voice</span>
            </button>
            <button className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center space-x-1.5 text-gray-600 dark:text-gray-400">
              <Camera className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Photo</span>
            </button>
            <button className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center space-x-1.5 text-gray-600 dark:text-gray-400">
              <Video className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Video</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            AI will analyze your input and connect you to the most suitable doctor via video call
          </p>

          <Button onClick={handleEmergencySubmit} disabled={!situation.trim() && selectedSubSymptoms.length === 0} variant="emergency" className="w-full text-sm py-2">
            Connect to Medical Help
          </Button>
        </div>
      </div>

      {/* Reason Input Popup - INSIDE PHONE SCREEN */}
      {showServiceDistances && !Object.keys(emergencyServices).includes(selectedService) && selectedService && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Contact {selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}</h3>
                <button onClick={() => { setShowServiceDistances(false); setSelectedService(''); setServiceReason(''); }} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Briefly describe the situation:</p>
                <div className="relative">
                  <input 
                    type="text" 
                    value={serviceReason} 
                    onChange={(e) => setServiceReason(e.target.value)} 
                    placeholder="e.g., Fire, Injury, Accident" 
                    className="w-full p-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm dark:bg-gray-700 dark:text-white" 
                    autoFocus 
                  />
                  <button 
                    onClick={() => {
                      // Voice input for emergency reason
                      setIsListening(true)
                      setTimeout(() => {
                        setIsListening(false)
                        setServiceReason(prev => prev + (prev ? ' ' : '') + 'Medical emergency - chest pain')
                      }, 2000)
                    }}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 ${isListening ? 'bg-red-100 dark:bg-red-900/30' : ''}`}
                  >
                    <Mic className={`w-4 h-4 ${isListening ? 'text-red-600 animate-pulse' : 'text-gray-500 dark:text-gray-400'}`} />
                  </button>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Your Location:</strong> Sector 26, Noida, UP</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-medium">📍 Shared</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">Location will be shared with emergency services</p>
              </div>
              <button onClick={confirmEmergencyCall} disabled={!serviceReason.trim()} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2.5 rounded-lg text-sm">
                Confirm & Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Services Popup - INSIDE PHONE SCREEN */}
      {showServiceDistances && Object.keys(emergencyServices).length > 0 && !selectedService && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Track Services</h3>
                <button onClick={() => setShowServiceDistances(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">Your location shared with services:</p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Sector 26, Noida, Uttar Pradesh</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">📍 Live location shared • GPS coordinates: 28.5355° N, 77.3910° E</p>
              </div>
              <div className="space-y-2.5">
                {Object.entries(emergencyServices).map(([serviceKey, serviceData]) => (
                  <div key={serviceKey} className={`p-2.5 rounded-xl border ${serviceKey === 'ambulance' ? 'bg-red-50 dark:bg-red-900/20 border-red-200' : serviceKey === 'police' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200'}`}>
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{serviceData.vehicleId}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold ${serviceKey === 'ambulance' ? 'text-red-600' : serviceKey === 'police' ? 'text-blue-600' : 'text-orange-600'}`}>En Route</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Status: Active</p>
                      </div>
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className="text-gray-700 dark:text-gray-300"><strong>Reason:</strong> {serviceData.reason}</p>
                      <p className="text-gray-600 dark:text-gray-400">Contacted: {serviceData.timestamp}</p>
                      <p className="text-green-600 dark:text-green-400"><strong>Location:</strong> Shared with service</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300 text-center">📍 Your live location is being shared with all contacted services</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Contacts Popup - INSIDE PHONE SCREEN */}
      {showAlertContactsPopup && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Alert Emergency Contacts</h3>
                <button onClick={() => setShowAlertContactsPopup(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">Your emergency contacts will be notified with:</p>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-2.5">
                  <p className="text-xs text-gray-700 dark:text-gray-300">📍 <strong>Your location</strong> and current situation</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-2.5">
                  <p className="text-xs text-gray-700 dark:text-gray-300">🚨 <strong>Emergency alert</strong> notification</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 rounded-lg p-2.5">
                <p className="text-xs text-orange-800 dark:text-orange-200 mb-1.5"><strong>Contacts to be notified:</strong></p>
                <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-0.5">
                  {medicalInfo.emergencyContacts.map((contact, index) => (
                    <li key={index}>• {contact.name} ({contact.relation})</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowAlertContactsPopup(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg text-sm">
                  Cancel
                </button>
                <button onClick={confirmAlertContacts} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg text-sm">
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selector Popup - INSIDE PHONE SCREEN */}
      {showLanguageSelector && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Add Language</h3>
                <button onClick={() => setShowLanguageSelector(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">Select languages for emergency communication:</p>
              <div className="space-y-2">
                {availableLanguages.map((lang) => (
                  <button key={lang.code} onClick={() => toggleEmergencyLanguage(lang.code)} className={`w-full p-2.5 rounded-lg border flex items-center justify-between ${emergencyLanguages.includes(lang.code) ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200' : 'border-gray-200 dark:border-gray-600'}`}>
                    <span className={`text-xs font-medium ${emergencyLanguages.includes(lang.code) ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>{lang.name}</span>
                    {emergencyLanguages.includes(lang.code) && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowLanguageSelector(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Doctor Confirmation Popup - INSIDE PHONE SCREEN */}
      {/* Call Doctor Confirmation */}
      {showCallConfirmation && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Connect to Doctor</h3>
                <button onClick={() => setShowCallConfirmation(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Emergency Details</p>
                <div className="space-y-1.5 text-xs">
                  {selectedMainSymptom && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Main Symptom:</span>
                      <span className="ml-1 text-gray-900 dark:text-white">{mainSymptoms.find(s => s.id === selectedMainSymptom)?.title}</span>
                    </div>
                  )}
                  {selectedSubSymptoms.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Symptoms:</span>
                      <span className="ml-1 text-gray-900 dark:text-white">{selectedSubSymptoms.join(', ')}</span>
                    </div>
                  )}
                  {situation && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>
                      <p className="mt-1 text-gray-900 dark:text-white">{situation}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-2.5">
                <p className="text-xs text-blue-800 dark:text-blue-200 mb-1.5">
                  <strong>AI will analyze your symptoms</strong> and connect you to the most suitable emergency doctor via video call
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  ⏱️ Estimated wait time: <strong>20 seconds - 1 minute</strong>
                </p>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => setShowCallConfirmation(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg text-sm">
                  Cancel
                </button>
                <button onClick={confirmCallDoctor} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg text-sm">
                  Call Doctor Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
