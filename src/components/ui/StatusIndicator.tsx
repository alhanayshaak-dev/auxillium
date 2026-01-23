'use client'

import { CheckCircle, AlertCircle, Clock, XCircle, Info } from 'lucide-react'

interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending'
  text: string
  subtext?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export default function StatusIndicator({
  status,
  text,
  subtext,
  size = 'md',
  showIcon = true,
  className = ''
}: StatusIndicatorProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    pending: {
      icon: Clock,
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
      textColor: 'text-gray-800 dark:text-gray-200',
      iconColor: 'text-gray-600 dark:text-gray-400'
    }
  }
  
  const sizeConfig = {
    sm: {
      padding: 'p-2',
      iconSize: 'w-4 h-4',
      textSize: 'text-xs',
      subtextSize: 'text-xs'
    },
    md: {
      padding: 'p-3',
      iconSize: 'w-5 h-5',
      textSize: 'text-sm',
      subtextSize: 'text-xs'
    },
    lg: {
      padding: 'p-4',
      iconSize: 'w-6 h-6',
      textSize: 'text-base',
      subtextSize: 'text-sm'
    }
  }
  
  const config = statusConfig[status]
  const sizeStyles = sizeConfig[size]
  const IconComponent = config.icon
  
  return (
    <div className={`
      ${config.bgColor} 
      ${config.borderColor} 
      ${sizeStyles.padding}
      border rounded-lg
      ${className}
    `}>
      <div className="flex items-start space-x-3">
        {showIcon && (
          <IconComponent className={`${sizeStyles.iconSize} ${config.iconColor} flex-shrink-0 mt-0.5`} />
        )}
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${config.textColor} ${sizeStyles.textSize}`}>
            {text}
          </p>
          {subtext && (
            <p className={`mt-1 ${config.textColor} opacity-75 ${sizeStyles.subtextSize}`}>
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}