'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import StatusBar from '@/components/ui/StatusBar'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  MessageSquare,
  Video,
  Phone,
  Star,
  Award,
  Users,
  Clock,
  Calendar,
  Send,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  PhoneCall,
  PhoneOff,
  Heart,
  FileText,
  Camera,
  Paperclip
} from 'lucide-react'

export default function SpecialistConsultation() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'chat'
  
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{id: number, sender: 'user' | 'specialist', content: string, timestamp: string}>>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  // Mock specialist data - in real app, fetch based on params.id
  const specialist = {
    id: 1,
    name: 'Dr. Anita Desai',
    specialty: 'Clinical Dietitian',
    experience: '12 years',
    rating: 4.9,
    reviews: 234,
    consultations: 500,
    price: 800,
    languages: ['English', 'Hindi', 'Gujarati'],
    specializations: ['Weight Management', 'Diabetes Diet', 'Heart Health'],
    verified: true,
    image: '👩‍⚕️',
    availability: 'Available now',
    bio: 'Dr. Anita Desai is a certified clinical dietitian with over 12 years of experience in nutritional counseling and dietary planning. She specializes in weight management, diabetes care, and heart-healthy nutrition.'
  }

  useEffect(() => {
    // Simulate connection after 2 seconds
    const timer = setTimeout(() => {
      setIsConnected(true)
      if (mode === 'chat') {
        setMessages([
          {
            id: 1,
            sender: 'specialist',
            content: `Hello! I'm Dr. ${specialist.name}. How can I help you today?`,
            timestamp: new Date().toLocaleTimeString()
          }
        ])
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [mode, specialist.name])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user' as const,
        content: message,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages([...messages, newMessage])
      setMessage('')
      
      // Simulate specialist response
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'specialist' as const,
          content: 'Thank you for sharing that information. Let me help you with a personalized recommendation...',
          timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prev => [...prev, response])
      }, 1500)
    }
  }

  const handleEndConsultation = () => {
    router.push('/carecompass/session-notes')
  }

  const renderChatInterface = () => (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide">
        {!isConnected ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Connecting to Dr. {specialist.name}...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chat Input */}
      {isConnected && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-purple-500">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-purple-500">
              <Camera className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <Button variant="primary" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  const renderVideoInterface = () => (
    <div className="flex-1 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 bg-gray-900 relative">
        {!isConnected ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Video className="w-8 h-8" />
              </div>
              <p>Connecting to Dr. {specialist.name}...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Main Video */}
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{specialist.image}</span>
                </div>
                <p className="text-lg font-medium">Dr. {specialist.name}</p>
                <p className="text-sm opacity-80">{specialist.specialty}</p>
              </div>
            </div>
            
            {/* Self Video */}
            <div className="absolute top-4 right-4 w-24 h-32 bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                {isVideoOn ? (
                  <span className="text-white text-sm">You</span>
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Video Controls */}
      {isConnected && (
        <div className="bg-gray-900 p-4">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </button>
            
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                !isVideoOn ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              {isVideoOn ? <VideoIcon className="w-6 h-6 text-white" /> : <VideoOff className="w-6 h-6 text-white" />}
            </button>
            
            <button
              onClick={handleEndConsultation}
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderVoiceInterface = () => (
    <div className="flex-1 flex flex-col">
      {/* Voice Call Area */}
      <div className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        {!isConnected ? (
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Phone className="w-8 h-8" />
            </div>
            <p>Calling Dr. {specialist.name}...</p>
          </div>
        ) : (
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">{specialist.image}</span>
            </div>
            <h2 className="text-lg font-bold mb-2">Dr. {specialist.name}</h2>
            <p className="text-lg opacity-80 mb-4">{specialist.specialty}</p>
            <div className="flex items-center justify-center space-x-2 text-sm opacity-60">
              <Clock className="w-4 h-4" />
              <span>05:23</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Voice Controls */}
      {isConnected && (
        <div className="bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isMuted ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {isMuted ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-gray-600 dark:text-gray-300" />}
            </button>
            
            <button
              onClick={handleEndConsultation}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
            >
              <PhoneOff className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dr. {specialist.name}</h1>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-purple-600 dark:text-purple-300">{specialist.specialty}</p>
              {specialist.verified && (
                <Award className="w-4 h-4 text-blue-500" />
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{specialist.rating}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{specialist.consultations} consultations</p>
        </div>
      </div>

      {/* Consultation Interface */}
      {mode === 'chat' && renderChatInterface()}
      {mode === 'video' && renderVideoInterface()}
      {mode === 'voice' && renderVoiceInterface()}

      {/* Session Info Banner */}
      {isConnected && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-blue-500" />
              <span className="text-blue-700 dark:text-blue-300">Session will be auto-saved to LifeLog</span>
            </div>
            <button 
              onClick={() => router.push('/health-tracker')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}