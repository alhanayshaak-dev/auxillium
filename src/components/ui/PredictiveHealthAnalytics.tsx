'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain, Activity, Calendar, Info } from 'lucide-react'
import { Button } from './Button'
import ProgressBar from './ProgressBar'
import StatusIndicator from './StatusIndicator'

interface HealthPrediction {
  id: string
  condition: string
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  probability: number
  timeframe: string
  confidence: number
  factors: string[]
  recommendations: string[]
  trend: 'increasing' | 'decreasing' | 'stable'
}

interface HealthMetricTrend {
  metric: string
  current: number
  predicted: number
  unit: string
  timeframe: string
  trend: 'up' | 'down' | 'stable'
  confidence: number
}

interface PredictiveHealthAnalyticsProps {
  className?: string
}

export default function PredictiveHealthAnalytics({ className = '' }: PredictiveHealthAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'predictions' | 'trends' | 'recommendations'>('predictions')

  const [predictions] = useState<HealthPrediction[]>([
    {
      id: 'pred-1',
      condition: 'Hypertension',
      riskLevel: 'moderate',
      probability: 35,
      timeframe: '2-3 years',
      confidence: 78,
      factors: ['Family history', 'Current BP trends', 'Lifestyle factors', 'Age'],
      recommendations: [
        'Reduce sodium intake to <2300mg/day',
        'Increase physical activity to 150min/week',
        'Monitor blood pressure weekly',
        'Consider stress management techniques'
      ],
      trend: 'increasing'
    },
    {
      id: 'pred-2',
      condition: 'Type 2 Diabetes',
      riskLevel: 'low',
      probability: 12,
      timeframe: '5+ years',
      confidence: 82,
      factors: ['BMI within normal range', 'Good glucose control', 'Active lifestyle'],
      recommendations: [
        'Maintain current diet and exercise routine',
        'Annual glucose screening',
        'Continue weight management'
      ],
      trend: 'stable'
    },
    {
      id: 'pred-3',
      condition: 'Cardiovascular Disease',
      riskLevel: 'moderate',
      probability: 28,
      timeframe: '3-5 years',
      confidence: 75,
      factors: ['Cholesterol levels', 'Blood pressure', 'Exercise habits', 'Diet quality'],
      recommendations: [
        'Improve cholesterol profile through diet',
        'Regular cardio exercise 3-4x/week',
        'Consider statin therapy consultation',
        'Quit smoking if applicable'
      ],
      trend: 'decreasing'
    },
    {
      id: 'pred-4',
      condition: 'Osteoporosis',
      riskLevel: 'high',
      probability: 65,
      timeframe: '1-2 years',
      confidence: 88,
      factors: ['Age', 'Gender', 'Calcium intake', 'Bone density trends'],
      recommendations: [
        'Increase calcium and Vitamin D intake',
        'Weight-bearing exercises',
        'Bone density scan every 6 months',
        'Consider bone health supplements'
      ],
      trend: 'increasing'
    }
  ])

  const [metricTrends] = useState<HealthMetricTrend[]>([
    {
      metric: 'Blood Pressure (Systolic)',
      current: 128,
      predicted: 135,
      unit: 'mmHg',
      timeframe: '6 months',
      trend: 'up',
      confidence: 72
    },
    {
      metric: 'Cholesterol (Total)',
      current: 195,
      predicted: 185,
      unit: 'mg/dL',
      timeframe: '3 months',
      trend: 'down',
      confidence: 68
    },
    {
      metric: 'BMI',
      current: 24.2,
      predicted: 23.8,
      unit: 'kg/m²',
      timeframe: '6 months',
      trend: 'down',
      confidence: 75
    },
    {
      metric: 'HbA1c',
      current: 5.8,
      predicted: 5.9,
      unit: '%',
      timeframe: '3 months',
      trend: 'up',
      confidence: 70
    }
  ])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'moderate': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30'
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'decreasing':
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400'
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const renderPredictions = () => (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <div key={prediction.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {prediction.condition}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                  {prediction.riskLevel} risk
                </span>
                {getTrendIcon(prediction.trend)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk Probability</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {prediction.probability}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      in {prediction.timeframe}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
                  <span className={`text-lg font-bold ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </span>
                </div>
              </div>

              <ProgressBar
                progress={prediction.probability}
                variant={prediction.riskLevel === 'low' ? 'success' : prediction.riskLevel === 'moderate' ? 'health' : 'emergency'}
                size="sm"
                className="mb-3"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Key Risk Factors:
              </h5>
              <div className="flex flex-wrap gap-1">
                {prediction.factors.map((factor, index) => (
                  <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Recommendations:
              </h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {prediction.recommendations.slice(0, 2).map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
              {prediction.recommendations.length > 2 && (
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1">
                  View all {prediction.recommendations.length} recommendations
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTrends = () => (
    <div className="space-y-4">
      {metricTrends.map((trend, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {trend.metric}
            </h4>
            <div className="flex items-center space-x-2">
              {getTrendIcon(trend.trend)}
              <span className={`text-sm ${getConfidenceColor(trend.confidence)}`}>
                {trend.confidence}% confidence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current</p>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {trend.current} {trend.unit}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Predicted ({trend.timeframe})
              </p>
              <span className={`text-lg font-bold ${
                trend.trend === 'up' ? 'text-red-600 dark:text-red-400' :
                trend.trend === 'down' ? 'text-green-600 dark:text-green-400' :
                'text-gray-900 dark:text-white'
              }`}>
                {trend.predicted} {trend.unit}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Change:</span>
              <span className={`font-medium ${
                trend.predicted > trend.current ? 'text-red-600 dark:text-red-400' :
                trend.predicted < trend.current ? 'text-green-600 dark:text-green-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {trend.predicted > trend.current ? '+' : ''}
                {(trend.predicted - trend.current).toFixed(1)} {trend.unit}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderRecommendations = () => (
    <div className="space-y-4">
      <StatusIndicator
        status="info"
        text="Personalized Health Recommendations"
        subtext="Based on your health data, trends, and risk factors"
      />

      <div className="space-y-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Priority Actions (Next 30 Days)
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Schedule bone density scan</li>
                <li>• Start calcium supplementation (1200mg daily)</li>
                <li>• Begin weight-bearing exercise routine</li>
                <li>• Monitor blood pressure weekly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Activity className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Lifestyle Modifications
              </h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Reduce sodium intake to 2000mg/day</li>
                <li>• Increase fiber intake to 25-30g/day</li>
                <li>• Add 30 minutes of cardio 4x/week</li>
                <li>• Practice stress reduction techniques</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />
            <div>
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Monitoring Schedule
              </h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Blood pressure: Weekly</li>
                <li>• Weight: Daily</li>
                <li>• Cholesterol: Every 3 months</li>
                <li>• HbA1c: Every 6 months</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          Predictive Health Analytics
        </h3>
        <Button variant="outline" size="sm">
          <Info className="w-4 h-4 mr-2" />
          How it works
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'predictions', label: 'Risk Predictions' },
          { id: 'trends', label: 'Health Trends' },
          { id: 'recommendations', label: 'Recommendations' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'predictions' && renderPredictions()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Disclaimer:</strong> These predictions are based on statistical models and should not replace professional medical advice. 
            Always consult with your healthcare provider for personalized medical guidance.
          </p>
        </div>
      </div>
    </div>
  )
}