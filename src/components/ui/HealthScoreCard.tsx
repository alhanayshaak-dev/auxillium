'use client'

import { APP_CONFIG } from '@/lib/constants'
import ProgressBar from './ProgressBar'
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface HealthScoreCardProps {
  score: number
  previousScore?: number
  title?: string
  subtitle?: string
  showTrend?: boolean
  className?: string
}

export default function HealthScoreCard({
  score,
  previousScore,
  title = "Health Score",
  subtitle,
  showTrend = true,
  className = ''
}: HealthScoreCardProps) {
  const getScoreLevel = (score: number) => {
    if (score >= APP_CONFIG.HEALTH_SCORE_THRESHOLDS.EXCELLENT) return 'excellent'
    if (score >= APP_CONFIG.HEALTH_SCORE_THRESHOLDS.GOOD) return 'good'
    if (score >= APP_CONFIG.HEALTH_SCORE_THRESHOLDS.FAIR) return 'fair'
    return 'poor'
  }
  
  const getScoreColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 dark:text-green-400'
      case 'good': return 'text-blue-600 dark:text-blue-400'
      case 'fair': return 'text-yellow-600 dark:text-yellow-400'
      case 'poor': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }
  
  const getScoreText = (level: string) => {
    switch (level) {
      case 'excellent': return 'Excellent Health'
      case 'good': return 'Good Health'
      case 'fair': return 'Fair Health'
      case 'poor': return 'Needs Attention'
      default: return 'Unknown'
    }
  }
  
  const getTrendIcon = () => {
    if (!previousScore) return <Minus className="w-4 h-4" />
    if (score > previousScore) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (score < previousScore) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }
  
  const getTrendText = () => {
    if (!previousScore) return 'No previous data'
    const diff = score - previousScore
    if (diff > 0) return `+${diff} from last check`
    if (diff < 0) return `${diff} from last check`
    return 'No change from last check'
  }
  
  const level = getScoreLevel(score)
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(level)}`}>
          {score}
        </div>
      </div>
      
      <ProgressBar 
        progress={score} 
        variant="health" 
        size="md"
        animated={false}
      />
      
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${getScoreColor(level)}`}>
            {getScoreText(level)}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {showTrend && previousScore && (
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            {getTrendIcon()}
            <span>{getTrendText()}</span>
          </div>
        )}
      </div>
    </div>
  )
}