'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  X, 
  Camera, 
  Shield, 
  Lock, 
  Wallet,
  History,
  Globe,
  Volume2,
  Bell,
  HelpCircle,
  LogOut,
  Trash2,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Moon,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'
import StatusBar from '@/components/ui/StatusBar'

export default function Profile() {
  const router = useRouter()
  const [language, setLanguage] = useState('en')

  // User profile data
  const userProfile = {
    name: 'Avery Gray',
    phone: '+91 98765 43210',
    email: 'avery.gray@email.com',
    photo: null
  }

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' }
  ]

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage Your Account</p>
          </div>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
        >
          <X className="w-4 h-4 text-purple-600 dark:text-purple-300" />
        </button>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{userProfile.phone}</span>
            <button className="ml-auto text-blue-500 text-xs hover:underline">Edit</button>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{userProfile.email}</span>
            <button className="ml-auto text-blue-500 text-xs hover:underline">Edit</button>
          </div>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 scrollbar-hide">
        
        {/* Security Settings */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Security</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Login & Authentication</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Password, biometrics</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Data Privacy</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Control your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Wallet</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Payment methods</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <History className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">History</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Activity & transactions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">App Settings</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <button 
              onClick={() => router.push('/profile/language')}
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {languages.find(l => l.code === language)?.native || 'English'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => router.push('/profile/theme')}
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Light, Dark, or System</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Region</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">India</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Audio/Video Permissions</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Microphone, camera</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Help Centre</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">FAQs & support</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Account</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Logout</p>
              </div>
            </button>

            <button className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delete Account</p>
              </div>
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center py-4 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Auxillium v2.0.0</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Complete Healthcare Platform</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0">
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
