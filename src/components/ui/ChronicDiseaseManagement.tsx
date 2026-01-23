'use client'

import { useState } from 'react'
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, Target } from 'lucide-react'
import { Button } from './Button'
import ProgressBar from './ProgressBar'
import StatusIndicator from './StatusIndicator'
import HealthScoreCard from './HealthScoreCard'

interface ChronicCondition {
  id: string
  name: string
  diagnosedDate: Date
  severity: 'mild' | 'moderate' | 'severe'
  controlStatus: 'well-controlled' | 'partially-controlled' | 'poorly-controlled'
  lastCheckup: Date
  nextCheckup: Date
  medications: string[]
  keyMetrics: {
    name: string
    value: number
    unit: string
    target: number
    trend: 'up' | 'down' | 'stable'
    status: 'good' | 'warning' | 'critical'
  }[]
}

interface ChronicDiseaseManagementProps {
  className?: string
}

export default function ChronicDiseaseManagement({ className = '' }: ChronicDiseaseManagementProps) {
  const [conditions] = useState<ChronicCondition[]>([
    {
      id: 'diabetes-1',
      name: 'Type 2 Diabetes',
      diagnosedDate: new Date('2020-03-15'),
      severity: 'moderate',
      controlStatus: 'well-controlled',
      lastCheckup: new Date('2024-01-10'),
      nextCheckup: new Date('2024-04-10'),
      medications: ['Metformin 500mg', 'Glipizide 5mg'],
      keyMetrics: [
        {
          name: 'HbA1c',
          value: 6.8,
          unit: '%',
          target: 7.0,
          trend: 'down',
          status: 'good'
        },
        {
          name: 'Fasting Glucose',
          value: 125,
          unit: 'mg/dL',
          target: 130,
          trend: 'stable',
          status: 'good'
        },
        {
          name: 'Blood Pressure',
          value: 135,
          unit: 'mmHg',
          target: 130,
          trend: 'up',
          status: 'warning'
        }
      ]
    },
    {
      id: 'hypertension-1',
      name: 'Hypertension',
      diagnosedDate: new Date('2019-08-22'),
      severity: 'mild',
      controlStatus: 'partially-controlled',
      lastCheckup: new Date('2024-01-05'),
      nextCheckup: new Date('2024-03-05'),
      medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
      keyMetrics: [
        {
          name: 'Systolic BP',
          value: 142,
          unit: 'mmHg',
          target: 130,
          trend: 'up',
          status: 'warning'
        },
        {
          name: 'Diastolic BP',
          value: 88,
          unit: 'mmHg',
          target: 80,
          trend: 'stable',
          status: 'warning'
        }
      ]
    }
  ])

  const [goals] = useState([
    {
      id: 'goal-1',
      title: 'Reduce HbA1c to 6.5%',
      currentValue: 6.8,
      targetValue: 6.5,
      deadline: new Date('2024-06-01'),
      progress: 75,
      status: 'on-track' as const
    },
    {
      id: 'goal-2',
      title: 'Maintain BP below 130/80',
      currentValue: 142,
      targetValue: 130,
      deadline: new Date('2024-04-01'),
      progress: 45,
      status: 'behind' as const
    },
    {
      id: 'goal-3',
      title: 'Exercise 150 min/week',
      currentValue: 120,
      targetValue: 150,
      deadline: new Date('2024-02-01'),
      progress: 80,
      status: 'on-track' as const
    }
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-yellow-600 dark:text-yellow-400'
      case 'moderate': return 'text-orange-600 dark:text-orange-400'
      case 'severe': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getControlStatusColor = (status: string) => {
    switch (status) {
      case 'well-controlled': return 'text-green-600 dark:text-green-400'
      case 'partially-controlled': return 'text-yellow-600 dark:text-yellow-400'
      case 'poorly-controlled': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getMetricStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 dark:text-green-400'
      case 'behind': return 'text-red-600 dark:text-red-400'
      case 'ahead': return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const calculateOverallScore = () => {
    const wellControlled = conditions.filter(c => c.controlStatus === 'well-controlled').length
    const total = conditions.length
    return Math.round((wellControlled / total) * 100)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-500" />
          Chronic Disease Management
        </h3>
      </div>

      {/* Overall Health Score */}
      <HealthScoreCard
        score={calculateOverallScore()}
        title="Disease Control Score"
        subtitle="Based on current management status"
        className="mb-6"
      />

      {/* Conditions Overview */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">
          Your Conditions
        </h4>
        <div className="space-y-4">
          {conditions.map((condition) => (
            <div key={condition.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {condition.name}
                  </h5>
                  <div className="flex items-center space-x-4 text-sm mt-1">
                    <span className={`font-medium ${getSeverityColor(condition.severity)}`}>
                      {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)}
                    </span>
                    <span className={`font-medium ${getControlStatusColor(condition.controlStatus)}`}>
                      {condition.controlStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  <p>Next checkup:</p>
                  <p className="font-medium">
                    {condition.nextCheckup.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                {condition.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {metric.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getMetricStatusIcon(metric.status)}
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {metric.value} {metric.unit}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Target: {metric.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Medications */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Current medications:</strong> {condition.medications.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Goals */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Health Goals
        </h4>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {goal.title}
                </h5>
                <span className={`text-sm font-medium ${getGoalStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>
                  Current: {goal.currentValue} → Target: {goal.targetValue}
                </span>
                <span>
                  Due: {goal.deadline.toLocaleDateString()}
                </span>
              </div>
              
              <ProgressBar
                progress={goal.progress}
                variant={goal.status === 'on-track' ? 'success' : goal.status === 'behind' ? 'emergency' : 'default'}
                showLabel={true}
                label={`${goal.progress}% Complete`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Recommended Actions
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Schedule blood pressure check within 2 weeks</li>
          <li>• Increase physical activity to meet exercise goal</li>
          <li>• Review medication adherence with pharmacist</li>
          <li>• Book quarterly diabetes checkup</li>
        </ul>
      </div>
    </div>
  )
}