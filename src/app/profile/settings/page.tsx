'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSettings } from '@/contexts/SettingsContext'
import { 
  X,
  Bell,
  Shield,
  Globe,
  Moon,
  Volume2,
  Smartphone,
  Wifi,
  Database,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill,
  Sun,
  Eye,
  Type
} from 'lucide-react'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function ProfileSettings() {
  const router = useRouter()
  const { 
    theme, 
    setTheme, 
    language, 
    setLanguage, 
    textSize, 
    setTextSize,
    loading 
  } = useSettings()
  
  const [notifications, setNotifications] = useState(true)
  const [medicationReminders, setMedicationReminders] = useState(true)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [biometricAuth, setBiometricAuth] = useState(false)

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  const handleTextSizeChange = (newSize: 'small' | 'medium' | 'large') => {
    setTextSize(newSize)
  }

  if (loading) {
    return (
      <div className="h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      
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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-blue-600 dark:text-blue-400">App Preferences And Configuration</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide pb-20">
        
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-500" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive alerts and reminders</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Medication Reminders</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Daily medication alerts</p>
              </div>
              <button
                onClick={() => setMedicationReminders(!medicationReminders)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  medicationReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  medicationReminders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Appointment Reminders</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming appointment alerts</p>
              </div>
              <button
                onClick={() => setAppointmentReminders(!appointmentReminders)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  appointmentReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  appointmentReminders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-purple-500" />
            Appearance
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Theme</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Sun className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-sm text-gray-900 dark:text-white">Light</p>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Moon className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-sm text-gray-900 dark:text-white">Dark</p>
                </button>
              </div>
            </div>
            
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Text Size</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTextSizeChange('small')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    textSize === 'small' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Type className="w-4 h-4 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                  <p className="text-xs text-gray-900 dark:text-white">Small</p>
                </button>
                <button
                  onClick={() => handleTextSizeChange('medium')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    textSize === 'medium' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Type className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm text-gray-900 dark:text-white">Medium</p>
                </button>
                <button
                  onClick={() => handleTextSizeChange('large')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    textSize === 'large' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <Type className="w-6 h-6 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                  <p className="text-base text-gray-900 dark:text-white">Large</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-green-500" />
            Language & Region
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">App Language</p>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-500" />
            Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Biometric Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face ID</p>
              </div>
              <button
                onClick={() => setBiometricAuth(!biometricAuth)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  biometricAuth ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  biometricAuth ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-indigo-500" />
            Data & Storage
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto Sync</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatically sync data</p>
              </div>
              <button
                onClick={() => setAutoSync(!autoSync)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  autoSync ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  autoSync ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Download className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Export Data</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Upload className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">Import Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-orange-500" />
            Advanced
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Wifi className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Network Settings</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Volume2 className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">Sound Settings</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center">
                <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">Clear All Data</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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
