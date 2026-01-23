'use client'

import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  variant?: 'default' | 'page' | 'inline'
  showLogo?: boolean
  fastMode?: boolean // New prop for demo mode
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'default',
  showLogo = false,
  fastMode = true // Default to fast mode for demos
}: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Faster progress for demo mode
    const interval = fastMode ? 50 : 200
    const increment = fastMode ? 25 : 15
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * increment
      })
    }, interval)

    // Auto-complete after short time in fast mode
    if (fastMode) {
      setTimeout(() => setProgress(100), 800)
    }

    return () => clearInterval(timer)
  }, [fastMode])

  const logoSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  if (variant === 'page') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        {/* Status Bar - STANDARD FORMAT */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-white dark:bg-gray-900 pt-2">
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

        <div className="text-center max-w-sm mx-auto">
          {/* App Logo */}
          <div className={`${logoSizes[size]} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-pulse`}>
            <Heart className={`${iconSizes[size]} text-white`} />
          </div>
          
          {showLogo && (
            <>
              {/* App Name */}
              <h1 className={`${titleSizes[size]} font-bold text-gray-900 dark:text-white mb-3`}>Auxillium</h1>
              
              {/* Tagline */}
              <p className={`text-gray-600 dark:text-gray-300 mb-12 ${textSizes[size]}`}>Your Healthcare Companion</p>
            </>
          )}
          
          {!showLogo && (
            <p className={`text-gray-600 dark:text-gray-300 mb-12 ${textSizes[size]}`}>{text}</p>
          )}
          
          {/* Progress Bar */}
          <div className="w-full mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <p className="text-gray-500 dark:text-gray-400 text-sm">{showLogo ? 'Loading...' : text}</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center space-x-3 py-2">
        <div className={`${logoSizes.sm} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm`}>
          <Heart className={`${iconSizes.sm} text-white animate-pulse`} />
        </div>
        <div className="flex-1 max-w-xs">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <span className={`text-gray-600 dark:text-gray-300 ${textSizes.sm}`}>{text}</span>
        </div>
      </div>
    )
  }

  // Default variant - centered in container
  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center max-w-xs mx-auto">
        {/* App Logo */}
        <div className={`${logoSizes[size]} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse`}>
          <Heart className={`${iconSizes[size]} text-white`} />
        </div>
        
        {showLogo && (
          <>
            <h2 className={`${titleSizes[size]} font-bold text-gray-900 dark:text-white mb-2`}>Auxillium</h2>
            <p className={`text-gray-600 dark:text-gray-300 mb-4 ${textSizes[size]}`}>Your Healthcare Companion</p>
          </>
        )}
        
        {/* Progress Bar */}
        <div className="w-full mb-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <p className={`text-gray-500 dark:text-gray-400 ${textSizes[size]}`}>{text}</p>
      </div>
    </div>
  )
}