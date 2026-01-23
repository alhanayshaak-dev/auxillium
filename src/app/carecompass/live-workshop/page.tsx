'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import { 
  Mic, 
  MicOff, 
  MessageSquare, 
  Users, 
  Hand,
  Share2,
  Download,
  FileText,
  Clock,
  Star,
  Send,
  MoreVertical,
  Maximize,
  Home,
  Stethoscope,
  Compass,
  Pill
} from 'lucide-react'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

// Screen C2: Live Workshop Screen
export default function LiveWorkshop() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [duration, setDuration] = useState(0)
  const [participants] = useState(47)

  // Simulate workshop duration
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const workshopInfo = {
    title: 'Diabetes Management Workshop',
    instructor: 'Dr. Priya Sharma',
    specialty: 'Endocrinologist',
    topic: 'Diet and Lifestyle for Type 2 Diabetes',
    startTime: '3:00 PM',
    duration: '90 minutes'
  }

  const chatMessages = [
    { id: 1, user: 'Moderator', message: 'Welcome everyone! Please keep your mics muted unless asking questions.', time: '3:02 PM', isHost: true },
    { id: 2, user: 'Rajesh K.', message: 'Thank you for this session, very informative!', time: '3:15 PM', isHost: false },
    { id: 3, user: 'Priya M.', message: 'Can you share the diet chart mentioned?', time: '3:18 PM', isHost: false },
    { id: 4, user: 'Dr. Priya Sharma', message: 'Yes, I\'ll share the diet chart in the resources section after the session.', time: '3:19 PM', isHost: true },
    { id: 5, user: 'Amit S.', message: 'What about exercise recommendations for seniors?', time: '3:22 PM', isHost: false }
  ]

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Here you would send the message to the chat
      setChatMessage('')
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <StatusBar />
      
      {/* Workshop Video Area */}
      <div className="flex-1 relative">
        {/* Video Stream */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white">👩‍⚕️</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{workshopInfo.instructor}</h2>
              <p className="text-gray-300 mb-1">{workshopInfo.specialty}</p>
              <p className="text-gray-400 text-sm">{workshopInfo.topic}</p>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.back()}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-lg">←</span>
              </button>
              <div className="bg-black/50 rounded-lg px-3 py-2">
                <h3 className="text-white font-medium text-sm">{workshopInfo.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span>Live • {formatDuration(duration)}</span>
                  <Users className="w-3 h-3 ml-2" />
                  <span>{participants} participants</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-red-500/20 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs">Recording</span>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Participant Grid (Small) */}
        <div className="absolute top-20 right-4 w-24 space-y-2">
          <div className="w-24 h-16 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
            <div className="flex items-center justify-center h-full">
              <span className="text-sm">👤</span>
            </div>
          </div>
          <div className="w-24 h-16 bg-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center h-full">
              <span className="text-sm">👨</span>
            </div>
          </div>
          <div className="w-24 h-16 bg-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center h-full">
              <span className="text-sm">👩</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>
            
            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isHandRaised ? 'bg-yellow-500' : 'bg-gray-700'
              }`}
            >
              <Hand className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center relative"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </div>
            </button>
            
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </button>
            
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Maximize className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-white text-sm opacity-75">
              Raise hand to ask questions • Chat for discussions
            </p>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl transform transition-transform max-h-96">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Workshop Chat</h3>
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 dark:text-gray-400"
                >
                  ×
                </button>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="flex items-start space-x-2">
                      <span className={`font-medium ${
                        message.isHost ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {message.user}
                        {message.isHost && <span className="text-xs ml-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1 rounded">Host</span>}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{message.message}</p>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="primary" size="sm" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Workshop Info Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Auto-generating notes</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Will be saved to your LifeLog</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Resources
            </Button>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-1" />
              Rate
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0">
        <div className="flex justify-around">
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-purple-500 p-1"
            onClick={() => router.push('/carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => router.push('/health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => router.push('/medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}