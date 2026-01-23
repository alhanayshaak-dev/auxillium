'use client'

import { useRouter } from 'next/navigation'
import { Shield, AlertTriangle, CheckCircle, Info, Heart, Home, Stethoscope, Compass, FileText, Pill, X } from 'lucide-react'

export default function DengueAlert() {
  const router = useRouter()

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Health Alert</h1>
            <p className="text-sm text-blue-600 dark:text-blue-400">Dengue Prevention</p>
          </div>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Alert Banner */}
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-red-900 dark:text-red-200 mb-1">Monsoon Season Alert</h2>
              <p className="text-sm text-red-800 dark:text-red-300">
                Dengue cases are rising across India. Take immediate preventive measures to protect yourself and your family.
              </p>
            </div>
          </div>
        </div>

        {/* What is Dengue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">What is Dengue?</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Dengue is a mosquito-borne viral infection transmitted by the Aedes aegypti mosquito. It's prevalent during and after monsoon season when stagnant water provides breeding grounds for mosquitoes.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Peak Season:</strong> June to November in India, with highest cases reported in September-October.
          </p>
        </div>

        {/* Symptoms */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Common Symptoms</h3>
          </div>
          <div className="space-y-2">
            {[
              'High fever (104°F/40°C)',
              'Severe headache',
              'Pain behind the eyes',
              'Severe joint and muscle pain',
              'Nausea and vomiting',
              'Skin rash (appears 2-5 days after fever)',
              'Mild bleeding (nose, gums)',
              'Fatigue and weakness'
            ].map((symptom, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{symptom}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300 font-medium">
              ⚠️ Seek immediate medical attention if you experience these symptoms, especially during monsoon season.
            </p>
          </div>
        </div>

        {/* Prevention */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Prevention Measures</h3>
          </div>
          
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Eliminate Mosquito Breeding Sites:</h4>
          <div className="space-y-2 mb-4">
            {[
              'Empty water from flower pots, buckets, and containers weekly',
              'Cover water storage containers tightly',
              'Clean and scrub water storage containers regularly',
              'Remove stagnant water from coolers, tires, and drains',
              'Keep surroundings clean and dry'
            ].map((measure, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{measure}</p>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Personal Protection:</h4>
          <div className="space-y-2">
            {[
              'Use mosquito repellent creams and sprays',
              'Wear long-sleeved clothes and full pants',
              'Use mosquito nets while sleeping',
              'Install window screens to prevent mosquito entry',
              'Use mosquito coils or electric repellents indoors'
            ].map((measure, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{measure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* When to See a Doctor */}
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 mb-4 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-bold text-orange-900 dark:text-orange-200 mb-3">When to See a Doctor Immediately</h3>
          <div className="space-y-2">
            {[
              'Severe abdominal pain or persistent vomiting',
              'Bleeding from nose or gums',
              'Blood in vomit or stool',
              'Difficulty breathing or rapid breathing',
              'Cold or clammy skin',
              'Extreme fatigue or restlessness',
              'Severe drop in platelet count'
            ].map((warning, index) => (
              <div key={index} className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-orange-900 dark:text-orange-200">{warning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Current Situation in India</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2.5L+</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Cases reported in 2024</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">High Risk</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">During monsoon months</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            Source: National Vector Borne Disease Control Programme (NVBDCP)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <button 
            onClick={() => router.push('/docconnect')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-sm transition-all"
          >
            Consult a Doctor
          </button>
          <button 
            onClick={() => router.push('/emergency/e1')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-sm transition-all"
          >
            Emergency Services
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            This information is for awareness purposes only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.
          </p>
        </div>
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
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
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
