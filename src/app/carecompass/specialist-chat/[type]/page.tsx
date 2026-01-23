'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react'
import StatusBar from '@/components/ui/StatusBar'
import BottomNavigation from '@/components/ui/BottomNavigation'

interface Message {
  id: string
  sender: 'user' | 'specialist'
  message: string
  timestamp: string
}

interface Specialist {
  name: string
  role: string
  expertise: string
  avatar?: string
}

const SPECIALIST_INFO = {
  dietician: {
    name: "Dr. Priya Sharma",
    role: "Certified Nutritionist & Dietician",
    expertise: "Clinical Nutrition, Weight Management, Diabetes Care",
    avatar: "👩‍⚕️"
  },
  physiotherapist: {
    name: "Dr. Rajesh Kumar", 
    role: "Senior Physiotherapist",
    expertise: "Sports Injury, Post-Surgery Rehabilitation, Pain Management",
    avatar: "👨‍⚕️"
  },
  fitness: {
    name: "Coach Anita Desai",
    role: "Certified Fitness Trainer", 
    expertise: "Strength Training, Cardio Fitness, Functional Movement",
    avatar: "💪"
  },
  yoga: {
    name: "Guru Meera Patel",
    role: "Certified Yoga Instructor",
    expertise: "Hatha Yoga, Therapeutic Yoga, Meditation", 
    avatar: "🧘‍♀️"
  },
  wellness: {
    name: "Dr. Kavya Nair",
    role: "Wellness Coach",
    expertise: "Stress Management, Sleep Optimization, Lifestyle Medicine",
    avatar: "🌿"
  }
}

export default function SpecialistChatPage() {
  const router = useRouter()
  const params = useParams()
  const specialistType = params.type as string
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const specialist = SPECIALIST_INFO[specialistType as keyof typeof SPECIALIST_INFO]

  useEffect(() => {
    if (!specialist) {
      router.push('/carecompass/specialists')
      return
    }

    // Send initial greeting
    const initialMessage: Message = {
      id: '1',
      sender: 'specialist',
      message: `Hello! I'm ${specialist.name}, your ${specialist.role}. I'm here to help you with ${specialist.expertise.toLowerCase()}. How can I assist you today?`,
      timestamp: new Date().toISOString()
    }
    setMessages([initialMessage])
  }, [specialist, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/specialist-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.message,
          specialistType,
          conversationHistory: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      const specialistMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'specialist',
        message: data.message,
        timestamp: data.timestamp
      }

      setMessages(prev => [...prev, specialistMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'specialist',
        message: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!specialist) {
    return null
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <StatusBar />
      
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center text-2xl">
              {specialist.avatar}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{specialist.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Specialist Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <p className="text-sm text-purple-800 dark:text-purple-200">
            <span className="font-medium">{specialist.role}</span> • {specialist.expertise}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'specialist' && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center text-sm">
                    {specialist.avatar}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.name}</span>
                </div>
              )}
              
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white rounded-br-md'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </div>
              
              <div className={`flex items-center space-x-1 mt-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === 'user' && (
                  <CheckCircle2 className="w-3 h-3 text-purple-500" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center text-sm">
                  {specialist.avatar}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.name} is typing...</span>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 fixed bottom-20 left-0 right-0">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="w-12 h-12 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}