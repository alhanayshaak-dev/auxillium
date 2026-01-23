'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { profiles, auth } from '@/lib/supabase-client'
import { demoHelpers } from '@/lib/demo-config'

interface SettingsContextType {
  language: string
  setLanguage: (lang: string) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  textSize: 'small' | 'medium' | 'large'
  setTextSize: (size: 'small' | 'medium' | 'large') => void
  emergencyLanguages: string[]
  setEmergencyLanguages: (langs: string[]) => void
  t: (key: string) => string
  loading: boolean
  error: string | null
  refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en')
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [textSize, setTextSizeState] = useState<'small' | 'medium' | 'large'>('medium')
  const [emergencyLanguages, setEmergencyLanguagesState] = useState<string[]>(['en'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { user } = await auth.getCurrentUser()
        setCurrentUser(user)
      } catch (err) {
        console.log('No authenticated user, using local settings')
      }
    }
    getCurrentUser()
  }, [])

  // Load settings from Supabase or localStorage
  const refreshSettings = async () => {
    try {
      setLoading(true)
      setError(null)

      if (currentUser?.id) {
        // Try to load from Supabase profile with timeout for demo
        try {
          const { data: profile, error: profileError } = await demoHelpers.withTimeout(
            profiles.get(currentUser.id),
            5000
          ) as any
          
          if (profileError) {
            console.error('Error loading profile:', profileError)
            loadFromLocalStorage()
          } else if (profile) {
            // Apply settings from Supabase profile
            setLanguageState(profile.preferred_language || 'en')
            setThemeState((profile.theme as 'light' | 'dark') || 'light')
            
            // Backup to localStorage
            if (typeof window !== 'undefined') {
              const settings = {
                language: profile.preferred_language || 'en',
                theme: profile.theme || 'light',
                textSize: 'medium', // Default for now
                emergencyLanguages: ['en'] // Default for now
              }
              localStorage.setItem('auxillium_settings', JSON.stringify(settings))
            }
          } else {
            // No profile found, use defaults
            loadFromLocalStorage()
          }
        } catch (timeoutError) {
          // Timeout or error, use localStorage
          loadFromLocalStorage()
        }
      } else {
        // No user, load from localStorage
        loadFromLocalStorage()
      }
    } catch (err) {
      console.error('Error loading settings:', err)
      setError('Failed to load settings')
      loadFromLocalStorage()
    } finally {
      // Fast loading for demo
      setTimeout(() => setLoading(false), 300)
    }
  }

  // Load settings from localStorage
  const loadFromLocalStorage = () => {
    if (typeof window === 'undefined') return
    
    try {
      const stored = localStorage.getItem('auxillium_settings')
      if (stored) {
        const parsedSettings = JSON.parse(stored)
        setLanguageState(parsedSettings.language || 'en')
        setThemeState(parsedSettings.theme || 'light')
        setTextSizeState(parsedSettings.textSize || 'medium')
        setEmergencyLanguagesState(parsedSettings.emergencyLanguages || ['en'])
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err)
      // Use defaults
      setLanguageState('en')
      setThemeState('light')
      setTextSizeState('medium')
      setEmergencyLanguagesState(['en'])
    }
  }

  // Load settings when user changes
  useEffect(() => {
    refreshSettings()
  }, [currentUser])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    
    // Apply text size
    root.style.fontSize = textSize === 'small' ? '14px' : 
                         textSize === 'large' ? '18px' : '16px'
  }, [theme, textSize])

  // Enhanced setLanguage with Supabase sync
  const setLanguage = async (lang: string) => {
    try {
      setLanguageState(lang)
      
      if (currentUser?.id) {
        // Update in Supabase profile
        await profiles.update(currentUser.id, { preferred_language: lang })
      }
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('auxillium_settings')
        const settings = stored ? JSON.parse(stored) : {}
        settings.language = lang
        localStorage.setItem('auxillium_settings', JSON.stringify(settings))
      }
    } catch (err) {
      console.error('Error updating language:', err)
      // Still update locally
      setLanguageState(lang)
    }
  }

  // Enhanced setTheme with Supabase sync
  const setTheme = async (newTheme: 'light' | 'dark') => {
    try {
      setThemeState(newTheme)
      
      if (currentUser?.id) {
        // Update in Supabase profile
        await profiles.update(currentUser.id, { theme: newTheme })
      }
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('auxillium_settings')
        const settings = stored ? JSON.parse(stored) : {}
        settings.theme = newTheme
        localStorage.setItem('auxillium_settings', JSON.stringify(settings))
      }
    } catch (err) {
      console.error('Error updating theme:', err)
      // Still update locally
      setThemeState(newTheme)
    }
  }

  // Enhanced setTextSize with localStorage sync
  const setTextSize = (size: 'small' | 'medium' | 'large') => {
    setTextSizeState(size)
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auxillium_settings')
      const settings = stored ? JSON.parse(stored) : {}
      settings.textSize = size
      localStorage.setItem('auxillium_settings', JSON.stringify(settings))
    }
  }

  // Enhanced setEmergencyLanguages with localStorage sync
  const setEmergencyLanguages = (langs: string[]) => {
    setEmergencyLanguagesState(langs)
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auxillium_settings')
      const settings = stored ? JSON.parse(stored) : {}
      settings.emergencyLanguages = langs
      localStorage.setItem('auxillium_settings', JSON.stringify(settings))
    }
  }

  const t = (key: string): string => {
    // Simple translation function - can be enhanced later
    return key
  }

  return (
    <SettingsContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      textSize,
      setTextSize,
      emergencyLanguages,
      setEmergencyLanguages,
      t,
      loading,
      error,
      refreshSettings
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}