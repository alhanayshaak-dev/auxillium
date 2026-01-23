'use client'

import { useState } from 'react'
import { Eye, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'
import ProgressBar from './ProgressBar'

interface TrainingModule {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'ar' | 'vr' | '3d'
  category: 'emergency' | 'anatomy' | 'procedures' | 'medication'
  completed: boolean
  progress: number
  thumbnail: string
}

interface ARVRMedicalTrainingProps {
  className?: string
}

export default function ARVRMedicalTraining({ className = '' }: ARVRMedicalTrainingProps) {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const [modules] = useState<TrainingModule[]>([
    {
      id: 'cpr-basics',
      title: 'CPR Basics Training',
      description: 'Learn proper CPR technique with interactive 3D guidance',
      duration: '15 min',
      difficulty: 'beginner',
      type: 'ar',
      category: 'emergency',
      completed: true,
      progress: 100,
      thumbnail: '🫀'
    },
    {
      id: 'heart-anatomy',
      title: 'Heart Anatomy Explorer',
      description: 'Interactive 3D heart model with detailed explanations',
      duration: '20 min',
      difficulty: 'intermediate',
      type: 'vr',
      category: 'anatomy',
      completed: false,
      progress: 65,
      thumbnail: '❤️'
    },
    {
      id: 'injection-technique',
      title: 'Safe Injection Techniques',
      description: 'Practice proper injection methods in virtual environment',
      duration: '12 min',
      difficulty: 'intermediate',
      type: 'ar',
      category: 'procedures',
      completed: false,
      progress: 30,
      thumbnail: '💉'
    },
    {
      id: 'medication-safety',
      title: 'Medication Safety Protocol',
      description: 'Learn to identify and handle medication safely',
      duration: '18 min',
      difficulty: 'beginner',
      type: '3d',
      category: 'medication',
      completed: false,
      progress: 0,
      thumbnail: '💊'
    },
    {
      id: 'wound-care',
      title: 'Basic Wound Care',
      description: 'Step-by-step wound cleaning and dressing techniques',
      duration: '25 min',
      difficulty: 'intermediate',
      type: 'ar',
      category: 'procedures',
      completed: false,
      progress: 45,
      thumbnail: '🩹'
    },
    {
      id: 'choking-response',
      title: 'Choking Emergency Response',
      description: 'Practice Heimlich maneuver and emergency protocols',
      duration: '10 min',
      difficulty: 'beginner',
      type: 'ar',
      category: 'emergency',
      completed: true,
      progress: 100,
      thumbnail: '🫁'
    }
  ])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'intermediate': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ar': return '🥽'
      case 'vr': return '🕶️'
      case '3d': return '📱'
      default: return '💻'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'border-red-200 dark:border-red-800'
      case 'anatomy': return 'border-blue-200 dark:border-blue-800'
      case 'procedures': return 'border-green-200 dark:border-green-800'
      case 'medication': return 'border-purple-200 dark:border-purple-800'
      default: return 'border-gray-200 dark:border-gray-700'
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control the AR/VR session
  }

  const handleRestart = () => {
    setCurrentProgress(0)
    setIsPlaying(false)
    // Reset the training module
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Toggle fullscreen mode
  }

  const startTraining = (module: TrainingModule) => {
    setSelectedModule(module)
    setCurrentProgress(module.progress)
    setIsPlaying(false)
  }

  const closeTraining = () => {
    setSelectedModule(null)
    setIsPlaying(false)
    setCurrentProgress(0)
  }

  if (selectedModule) {
    return (
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-black text-white ${className}`}>
        <div className="h-full flex flex-col">
          {/* Training Header */}
          <div className="bg-gray-900 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={closeTraining}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <div>
                <h3 className="font-semibold">{selectedModule.title}</h3>
                <p className="text-sm text-gray-400">{selectedModule.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-800 rounded"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-gray-800 rounded"
              >
                <Maximize className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Training Viewport */}
          <div className="flex-1 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedModule.thumbnail}</div>
              <h2 className="text-lg font-bold mb-2">
                {selectedModule.type.toUpperCase()} Training Mode
              </h2>
              <p className="text-gray-300 mb-6">
                {isPlaying ? 'Training in progress...' : 'Ready to start training'}
              </p>
              
              {/* Simulated AR/VR Interface */}
              <div className="bg-black/50 rounded-lg p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Eye className="w-5 h-5" />
                    <span>Tracking: Active</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    Follow the highlighted steps and interact with 3D objects
                  </div>
                  {isPlaying && (
                    <div className="space-y-2">
                      <div className="text-yellow-400">Step 2 of 8: Position hands correctly</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Overlay Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-black/70 rounded-full px-6 py-3">
                <button
                  onClick={handleRestart}
                  className="p-2 hover:bg-white/20 rounded-full"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-900 p-4">
            <ProgressBar
              progress={currentProgress}
              variant="success"
              showLabel={true}
              label={`${Math.round(currentProgress)}% Complete`}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Duration: {selectedModule.duration}</span>
              <span>Difficulty: {selectedModule.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-500" />
          AR/VR Medical Training
        </h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      {/* Device Status */}
      <div className="mb-4">
        <StatusIndicator
          status="success"
          text="AR/VR Ready"
          subtext="Camera and sensors detected. Ready for immersive training."
          size="sm"
        />
      </div>

      {/* Training Modules */}
      <div className="space-y-3">
        {modules.map((module) => (
          <div 
            key={module.id} 
            className={`border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${getCategoryColor(module.category)}`}
            onClick={() => startTraining(module)}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{module.thumbnail}</div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {module.title}
                  </h4>
                  <span className="text-sm">{getTypeIcon(module.type)}</span>
                  {module.completed && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {module.duration}
                    </span>
                  </div>
                  
                  {module.progress > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            module.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {module.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {modules.filter(m => m.completed).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {modules.filter(m => m.progress > 0 && !m.completed).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Overall</p>
        </div>
      </div>
    </div>
  )
}