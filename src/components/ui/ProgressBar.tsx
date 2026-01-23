'use client'

import { UI_CONFIG } from '@/lib/constants'

interface ProgressBarProps {
  progress: number
  variant?: 'default' | 'health' | 'emergency' | 'success'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  animated?: boolean
  className?: string
}

export default function ProgressBar({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className = ''
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  const variants = {
    default: 'bg-gradient-to-r from-blue-500 to-purple-500',
    health: getHealthGradient(progress),
    emergency: 'bg-gradient-to-r from-red-500 to-pink-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500'
  }
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }
  
  function getHealthGradient(score: number) {
    if (score >= 85) return 'bg-gradient-to-r from-green-500 to-blue-500'
    if (score >= 70) return 'bg-gradient-to-r from-yellow-500 to-orange-500'
    return 'bg-gradient-to-r from-red-500 to-pink-500'
  }
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizes[size]}`}>
        <div 
          className={`${variants[variant]} ${sizes[size]} rounded-full transition-all duration-300 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}