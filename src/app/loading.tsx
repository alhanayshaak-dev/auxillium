'use client'

import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Fast loading for demo - completes in ~800ms
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 30 // Faster increment
      })
    }, 50) // Faster interval

    // Auto-complete after short time
    setTimeout(() => setProgress(100), 800)

    return () => clearInterval(timer)
  }, [])

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
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-pulse">
          <Heart className="w-12 h-12 text-white" />
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Auxillium</h1>
        
        {/* Tagline */}
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">Your Healthcare Companion</p>
        
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
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}