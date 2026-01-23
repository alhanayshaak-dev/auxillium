'use client'

import { useState, useEffect } from 'react'
import { Brain, Utensils, Dumbbell, Clock, AlertTriangle, Target, TrendingUp, Calendar } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'
import ProgressBar from './ProgressBar'

interface PersonalizedRecommendation {
  id: string
  type: 'meal' | 'exercise' | 'medication' | 'lifestyle' | 'preventive'
  title: string
  description: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  timeframe: string
  confidence: number
}

interface MealPlan {
  id: string
  name: string
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber: number
  sodium: number
  suitableFor: string[]
  ingredients: string[]
  cookingTime: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface WorkoutPlan {
  id: string
  name: string
  type: 'cardio' | 'strength' | 'flexibility' | 'balance'
  duration: string
  intensity: 'low' | 'moderate' | 'high'
  equipment: string[]
  targetConditions: string[]
  exercises: Array<{
    name: string
    duration: string
    reps?: string
    description: string
  }>
}

interface PredictiveAlert {
  id: string
  type: 'health_risk' | 'medication' | 'appointment' | 'lifestyle'
  message: string
  prediction: string
  confidence: number
  timeframe: string
  actionRequired: boolean
}

interface AdvancedPersonalizationProps {
  className?: string
}

export default function AdvancedPersonalization({ className = '' }: AdvancedPersonalizationProps) {
  const [activeTab, setActiveTab] = useState<'coach' | 'meals' | 'workouts' | 'alerts'>('coach')
  const [userProfile] = useState({
    conditions: ['Type 2 Diabetes', 'Hypertension'],
    allergies: ['Peanuts', 'Shellfish'],
    medications: ['Metformin', 'Lisinopril'],
    goals: ['Weight Loss', 'Blood Sugar Control'],
    preferences: ['Vegetarian', 'Low Sodium'],
    activityLevel: 'moderate',
    sleepPattern: { bedtime: '22:30', wakeup: '06:30' },
    workSchedule: 'office_9to5'
  })

  const [recommendations] = useState<PersonalizedRecommendation[]>([
    {
      id: 'meal-timing',
      type: 'meal',
      title: 'Optimize Meal Timing',
      description: 'Eat your largest meal at lunch (12-1 PM) instead of dinner',
      reason: 'Your blood sugar spikes are highest in the evening. Shifting calories earlier can improve glucose control.',
      priority: 'high',
      timeframe: 'Start today',
      confidence: 87
    },
    {
      id: 'morning-walk',
      type: 'exercise',
      title: 'Morning Walk Routine',
      description: '20-minute walk after breakfast (7:30-7:50 AM)',
      reason: 'Post-meal exercise helps reduce blood sugar spikes. Morning timing fits your schedule best.',
      priority: 'high',
      timeframe: 'Daily',
      confidence: 92
    },
    {
      id: 'med-timing',
      type: 'medication',
      title: 'Adjust Metformin Timing',
      description: 'Take Metformin 30 minutes before your largest meal',
      reason: 'Your meal patterns show this timing would maximize effectiveness and reduce side effects.',
      priority: 'medium',
      timeframe: 'Consult doctor first',
      confidence: 78
    },
    {
      id: 'stress-management',
      type: 'lifestyle',
      title: 'Stress Reduction at 3 PM',
      description: '5-minute breathing exercise during your afternoon stress peak',
      reason: 'Your heart rate data shows stress spikes at 3 PM daily, affecting blood pressure.',
      priority: 'medium',
      timeframe: 'Weekdays',
      confidence: 84
    }
  ])

  const [mealPlans] = useState<MealPlan[]>([
    {
      id: 'diabetic-breakfast',
      name: 'Protein-Rich Oats Bowl',
      calories: 320,
      carbs: 35,
      protein: 18,
      fat: 12,
      fiber: 8,
      sodium: 180,
      suitableFor: ['Diabetes', 'Hypertension', 'Weight Loss'],
      ingredients: ['Steel-cut oats', 'Greek yogurt', 'Almonds', 'Berries', 'Cinnamon'],
      cookingTime: '15 min',
      difficulty: 'easy'
    },
    {
      id: 'heart-healthy-lunch',
      name: 'Mediterranean Quinoa Salad',
      calories: 420,
      carbs: 45,
      protein: 16,
      fat: 18,
      fiber: 12,
      sodium: 320,
      suitableFor: ['Hypertension', 'Heart Health', 'Weight Management'],
      ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Olive oil', 'Lemon'],
      cookingTime: '25 min',
      difficulty: 'medium'
    },
    {
      id: 'low-carb-dinner',
      name: 'Grilled Paneer with Vegetables',
      calories: 380,
      carbs: 15,
      protein: 28,
      fat: 24,
      fiber: 6,
      sodium: 420,
      suitableFor: ['Diabetes', 'Weight Loss', 'Vegetarian'],
      ingredients: ['Paneer', 'Bell peppers', 'Zucchini', 'Onions', 'Herbs', 'Olive oil'],
      cookingTime: '20 min',
      difficulty: 'easy'
    }
  ])

  const [workoutPlans] = useState<WorkoutPlan[]>([
    {
      id: 'diabetes-cardio',
      name: 'Blood Sugar Control Cardio',
      type: 'cardio',
      duration: '25 min',
      intensity: 'moderate',
      equipment: ['None'],
      targetConditions: ['Diabetes', 'Weight Loss'],
      exercises: [
        { name: 'Warm-up Walk', duration: '5 min', description: 'Gentle walking to prepare muscles' },
        { name: 'Brisk Walking', duration: '15 min', description: 'Maintain conversation pace' },
        { name: 'Cool-down Stretch', duration: '5 min', description: 'Focus on legs and back' }
      ]
    },
    {
      id: 'hypertension-strength',
      name: 'Heart-Healthy Strength Training',
      type: 'strength',
      duration: '30 min',
      intensity: 'moderate',
      equipment: ['Light weights', 'Resistance band'],
      targetConditions: ['Hypertension', 'Bone Health'],
      exercises: [
        { name: 'Wall Push-ups', duration: '2 min', reps: '2 sets of 10', description: 'Modified push-ups against wall' },
        { name: 'Seated Leg Extensions', duration: '3 min', reps: '2 sets of 12', description: 'Strengthen quadriceps' },
        { name: 'Arm Circles', duration: '2 min', reps: '2 sets of 15', description: 'Improve shoulder mobility' }
      ]
    }
  ])

  const [predictiveAlerts] = useState<PredictiveAlert[]>([
    {
      id: 'bp-spike-alert',
      type: 'health_risk',
      message: 'Blood Pressure Spike Predicted',
      prediction: 'Your BP may rise above 140/90 this afternoon based on stress patterns',
      confidence: 78,
      timeframe: 'Today 2-4 PM',
      actionRequired: true
    },
    {
      id: 'med-refill',
      type: 'medication',
      message: 'Medication Refill Needed',
      prediction: 'Metformin will run out in 3 days based on current usage',
      confidence: 95,
      timeframe: 'Next 3 days',
      actionRequired: true
    },
    {
      id: 'checkup-reminder',
      type: 'appointment',
      message: 'Quarterly Checkup Due',
      prediction: 'Based on your diabetes management, quarterly checkup is recommended',
      confidence: 88,
      timeframe: 'Next 2 weeks',
      actionRequired: false
    }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meal': return <Utensils className="w-4 h-4" />
      case 'exercise': return <Dumbbell className="w-4 h-4" />
      case 'medication': return <Clock className="w-4 h-4" />
      case 'lifestyle': return <Target className="w-4 h-4" />
      case 'preventive': return <AlertTriangle className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const renderAICoach = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Your AI Health Coach
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Based on your health data, daily patterns, and goals, here are personalized recommendations 
              to improve your diabetes and blood pressure management.
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-300">
              Last updated: {new Date().toLocaleString()} • Confidence: 85%
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 dark:text-blue-400 mt-1">
                  {getTypeIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{rec.title}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{rec.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.reason}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{rec.timeframe}</span>
                    <span>{rec.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="primary" size="sm" className="flex-1">
                Apply Recommendation
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMealPlans = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Personalized Meal Plans</h4>
        <Button variant="outline" size="sm">Customize</Button>
      </div>

      {mealPlans.map((meal) => (
        <div key={meal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white">{meal.name}</h5>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  meal.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  meal.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {meal.difficulty}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Calories:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{meal.calories}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Protein:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{meal.protein}g</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Carbs:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{meal.carbs}g</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Suitable for:</p>
                <div className="flex flex-wrap gap-1">
                  {meal.suitableFor.map((condition, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Cooking time:</span> {meal.cookingTime}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="primary" size="sm" className="flex-1">
              Add to Meal Plan
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Recipe
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderWorkoutPlans = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Custom Workout Routines</h4>
        <Button variant="outline" size="sm">Create New</Button>
      </div>

      {workoutPlans.map((workout) => (
        <div key={workout.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white">{workout.name}</h5>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  workout.intensity === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  workout.intensity === 'moderate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {workout.intensity} intensity
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{workout.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">{workout.type}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Target conditions:</p>
                <div className="flex flex-wrap gap-1">
                  {workout.targetConditions.map((condition, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Equipment:</span> {workout.equipment.join(', ')}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="primary" size="sm" className="flex-1">
              Start Workout
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderPredictiveAlerts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Predictive Health Alerts</h4>
        <Button variant="outline" size="sm">Settings</Button>
      </div>

      {predictiveAlerts.map((alert) => (
        <div key={alert.id} className={`border rounded-lg p-4 ${
          alert.actionRequired 
            ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' 
            : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
        }`}>
          <div className="flex items-start space-x-3">
            <AlertTriangle className={`w-5 h-5 mt-1 ${
              alert.actionRequired ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h5 className={`font-medium ${
                  alert.actionRequired ? 'text-red-900 dark:text-red-100' : 'text-yellow-900 dark:text-yellow-100'
                }`}>
                  {alert.message}
                </h5>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {alert.confidence}% confidence
                </span>
              </div>
              
              <p className={`text-sm mb-2 ${
                alert.actionRequired ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200'
              }`}>
                {alert.prediction}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${
                  alert.actionRequired ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'
                }`}>
                  {alert.timeframe}
                </span>
                
                {alert.actionRequired && (
                  <Button variant="primary" size="sm">
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          AI Personalization
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'coach', label: 'AI Coach', icon: Brain },
          { id: 'meals', label: 'Meals', icon: Utensils },
          { id: 'workouts', label: 'Workouts', icon: Dumbbell },
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'coach' && renderAICoach()}
        {activeTab === 'meals' && renderMealPlans()}
        {activeTab === 'workouts' && renderWorkoutPlans()}
        {activeTab === 'alerts' && renderPredictiveAlerts()}
      </div>
    </div>
  )
}