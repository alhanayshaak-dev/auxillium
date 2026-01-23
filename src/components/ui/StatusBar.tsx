'use client'

import { useState, useEffect } from 'react'

interface StatusBarProps {
  className?: string
}

export default function StatusBar({ className = '' }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState('9:41')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 flex-shrink-0 ${className}`}>
      <span className="font-medium">{currentTime}</span>
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
  )
}