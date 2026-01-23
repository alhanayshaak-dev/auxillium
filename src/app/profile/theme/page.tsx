'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sun, Moon, Monitor, Check, Home, Stethoscope, Compass, FileText, Pill, X } from 'lucide-react'

export default function ThemePage() {
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>('system')

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  useEffect(() => {
    // Check current theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
      if (savedTheme) {
        setSelectedTheme(savedTheme)
      }
    }
  }, [])

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const themes = [
    {
      id: 'light' as const,
      name: 'Light',
      description: 'Bright and clear',
      icon: Sun,
      preview: 'bg-white border-gray-200'
    },
    {
      id: 'dark' as const,
      name: 'Dark',
      description: 'Easy on the eyes',
      icon: Moon,
      preview: 'bg-gray-900 border-gray-700'
    },
    {
      id: 'system' as const,
      name: 'System',
      description: 'Match device settings',
      icon: Monitor,
      preview: 'bg-gradient-to-r from-white to-gray-900 border-gray-400'
    }
  ]

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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Theme</h1>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Choose how Auxillium looks to you
        </p>

        <div className="space-y-3">
          {themes.map((theme) => {
            const Icon = theme.icon
            return (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme.id)}
                className={`w-full p-4 rounded-xl flex items-center space-x-4 transition-all ${
                  selectedTheme === theme.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400'
                    : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${theme.preview} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {theme.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{theme.description}</p>
                </div>
                {selectedTheme === theme.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Tip:</strong> System theme automatically switches between light and dark based on your device settings.
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
