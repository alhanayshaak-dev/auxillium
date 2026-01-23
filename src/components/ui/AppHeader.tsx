'use client'

import { useRouter } from 'next/navigation'
import { Heart, User, Settings, Stethoscope, Activity, Users, Pill, X } from 'lucide-react'
import { ImmersiveReader } from './ImmersiveReader'

interface AppHeaderProps {
  title?: string
  subtitle?: string
  showProfile?: boolean
  showClose?: boolean
  onClose?: () => void
  module?: 'home' | 'docconnect' | 'lifelog' | 'carecompass' | 'medsupport' | 'emergency'
  rightButton?: React.ReactNode
  immersiveContent?: string
  showImmersiveReader?: boolean
}

export default function AppHeader({ 
  title = "Auxillium", 
  subtitle = "Where Every Heart Beats",
  showProfile = true,
  showClose = false,
  onClose,
  module = 'home',
  rightButton,
  immersiveContent,
  showImmersiveReader = true
}: AppHeaderProps) {
  const router = useRouter()

  // Module-specific configurations
  const moduleConfig = {
    home: {
      icon: Heart,
      bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30',
      iconGradient: 'from-blue-500 to-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
      profileGradient: 'from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800',
      profileIconColor: 'text-purple-600 dark:text-purple-300'
    },
    docconnect: {
      icon: Stethoscope,
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30',
      iconGradient: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600 dark:text-blue-400',
      profileGradient: 'from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800',
      profileIconColor: 'text-blue-600 dark:text-blue-300'
    },
    lifelog: {
      icon: Activity,
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30',
      iconGradient: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600 dark:text-green-400',
      profileGradient: 'from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800',
      profileIconColor: 'text-green-600 dark:text-green-300'
    },
    carecompass: {
      icon: Users,
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30',
      iconGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600 dark:text-purple-400',
      profileGradient: 'from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800',
      profileIconColor: 'text-purple-600 dark:text-purple-300'
    },
    medsupport: {
      icon: Pill,
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30',
      iconGradient: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600 dark:text-orange-400',
      profileGradient: 'from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800',
      profileIconColor: 'text-orange-600 dark:text-orange-300'
    },
    emergency: {
      icon: Heart,
      bgGradient: 'from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30',
      iconGradient: 'from-red-500 to-pink-500',
      textColor: 'text-red-600 dark:text-red-400',
      profileGradient: 'from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800',
      profileIconColor: 'text-red-600 dark:text-red-300'
    }
  }

  const config = moduleConfig[module]
  const IconComponent = config.icon

  return (
    <div className={`bg-gradient-to-r ${config.bgGradient} px-4 py-6 flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 bg-gradient-to-r ${config.iconGradient} rounded-2xl flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className={`text-sm ${config.textColor}`}>{subtitle}</p>
        </div>
      </div>
      {(showProfile || showClose || rightButton || showImmersiveReader) && (
        <div className="flex items-center space-x-2">
          {showImmersiveReader && (
            <ImmersiveReader 
              content={immersiveContent || `${title}\n\n${subtitle}\n\nWelcome to Auxillium Healthcare Platform. This page provides comprehensive healthcare services and information to help you manage your health and wellness.`}
              title={title}
              className="mr-1"
            />
          )}
          {rightButton && rightButton}
          {showClose && (
            <button 
              onClick={onClose || (() => router.back())}
              className={`w-10 h-10 bg-gradient-to-r ${config.profileGradient} rounded-full flex items-center justify-center`}
            >
              <X className={`w-5 h-5 ${config.profileIconColor}`} />
            </button>
          )}
          {showProfile && (
            <button 
              onClick={() => router.push('/profile')}
              className={`w-10 h-10 bg-gradient-to-r ${config.profileGradient} rounded-full flex items-center justify-center relative`}
            >
              <User className={`w-5 h-5 ${config.profileIconColor}`} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-600 dark:bg-gray-400 rounded-full flex items-center justify-center">
                <Settings className="w-2 h-2 text-white dark:text-gray-900" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}