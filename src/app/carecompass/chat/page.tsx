'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft,
  Send,
  User,
  Star,
  Phone,
  Video,
  MoreVertical,
  MessageSquare,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

// Chat Message Component
function ChatMessage({ 
  message, 
  isUser, 
  timestamp 
}: { 
  message: string
  isUser: boolean
  timestamp: string
}) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
      } rounded-2xl px-4 py-3 shadow-sm`}>
        <p className="text-sm">{message}</p>
        <p className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {timestamp}
        </p>
      </div>
    </div>
  )
}

// Specialist Header
function SpecialistHeader({ specialist }: { specialist: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{specialist.name}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.rating}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.experience}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 dark:text-green-400">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button className="w-8 h-8 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full flex items-center justify-center transition-colors">
            <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </button>
          <button className="w-8 h-8 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Quick Actions Component
function QuickActions({ onBookService }: { onBookService: () => void }) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-t border-green-200 dark:border-green-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-800 dark:text-green-200">Ready to book?</p>
          <p className="text-xs text-green-600 dark:text-green-400">Finalize your service package</p>
        </div>
        <button 
          onClick={onBookService}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Book Service
        </button>
      </div>
    </div>
  )
}

// Main Chat Content Component
function ChatContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const specialistId = searchParams.get('specialist')
  const service = searchParams.get('service') || 'Dietician'
  
  const [messages, setMessages] = useState<Array<{
    id: number
    message: string
    isUser: boolean
    timestamp: string
  }>>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [specialist, setSpecialist] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock specialist data
  const specialists = {
    '1': {
      id: 1,
      name: 'Dr. Priya Sharma',
      rating: 4.9,
      experience: '8 years',
      specialization: 'Clinical Nutritionist',
      location: 'Mumbai, Maharashtra',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '9600',
        originalPrice: '12000'
      }
    },
    '2': {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      rating: 4.7,
      experience: '12 years',
      specialization: 'Senior Nutritionist',
      location: 'Delhi, NCR',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '11520',
        originalPrice: '14400'
      }
    },
    '3': {
      id: 3,
      name: 'Dr. Anita Desai',
      rating: 4.8,
      experience: '6 years',
      specialization: 'Weight Management Specialist',
      location: 'Bangalore, Karnataka',
      package: {
        duration: '3 months',
        sessions: '24 sessions',
        frequency: '2 sessions/week',
        price: '8640',
        originalPrice: '10800'
      }
    }
  }

  // Initialize specialist and welcome message
  useEffect(() => {
    if (specialistId && specialists[specialistId as keyof typeof specialists]) {
      const spec = specialists[specialistId as keyof typeof specialists]
      setSpecialist(spec)
      
      // Add welcome message from specialist
      const welcomeMessage = {
        id: 1,
        message: `Hello! I'm Dr. ${spec.name.split(' ')[1]}, your ${service.toLowerCase()} specialist. I'm excited to help you achieve your health goals. Let's discuss your package details and customize it to your needs. What would you like to know?`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([welcomeMessage])
    }
  }, [specialistId, service])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Generate AI response using API
  const generateDoctorResponse = async (userMessage: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          specialist: specialist,
          service: service,
          context: messages.slice(-5) // Send last 5 messages for context
        })
      })
      
      const data = await response.json()
      return data.response || "I understand your concern. Let me help you with that. Could you provide more details about your specific needs?"
    } catch (error) {
      console.error('Error generating AI response:', error)
      // Fallback to contextual responses
      return generateFallbackResponse(userMessage)
    }
  }

  // Fallback response generator for when API fails
  const generateFallbackResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Price-related responses
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
      return `I understand cost is an important factor. My current package is ₹${specialist.package?.price} for ${specialist.package?.duration} with ${specialist.package?.sessions}. I'm happy to discuss flexible payment options or adjust the package to better fit your budget. What would work best for you?`
    }
    
    // Schedule-related responses
    if (lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('when') || lowerMessage.includes('available') || lowerMessage.includes('appointment')) {
      return `I have flexible scheduling options available. Currently, I can accommodate sessions on weekdays and weekends, with morning and evening slots. My standard frequency is ${specialist.package?.frequency}, but we can adjust this based on your availability. What days and times work best for you?`
    }
    
    // Duration/frequency related
    if (lowerMessage.includes('duration') || lowerMessage.includes('long') || lowerMessage.includes('sessions') || lowerMessage.includes('weeks') || lowerMessage.includes('months')) {
      return `Great question! My standard program is ${specialist.package?.duration} with ${specialist.package?.sessions} at ${specialist.package?.frequency}. However, I can customize this based on your goals and availability. Some clients prefer intensive programs, while others need a more gradual approach. What timeline feels right for your goals?`
    }
    
    // Diet/nutrition specific
    if (service.toLowerCase().includes('diet') && (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('meal') || lowerMessage.includes('weight') || lowerMessage.includes('nutrition'))) {
      return `Absolutely! As a ${specialist.specialization}, I create personalized meal plans based on your lifestyle, preferences, and health goals. I'll assess your current eating habits, any dietary restrictions, and design a sustainable nutrition plan. We'll also work on portion control and healthy cooking methods. What are your main dietary concerns or goals?`
    }
    
    // Experience/qualifications
    if (lowerMessage.includes('experience') || lowerMessage.includes('qualification') || lowerMessage.includes('background') || lowerMessage.includes('certified')) {
      return `I have ${specialist.experience} of experience in ${service.toLowerCase()}. I'm certified and have helped hundreds of clients achieve their health goals. My approach combines evidence-based practices with personalized care. I maintain a ${specialist.rating}/5 rating from my clients. I'd be happy to share more about my specific expertise in areas that matter most to you.`
    }
    
    // Results/success
    if (lowerMessage.includes('result') || lowerMessage.includes('success') || lowerMessage.includes('work') || lowerMessage.includes('effective')) {
      return `I'm glad you asked about results! With my ${specialist.experience} of experience, I've helped clients achieve significant improvements in their health goals. Success depends on commitment and consistency, but I provide ongoing support and adjust our approach as needed. Most clients see positive changes within the first few weeks. What specific results are you hoping to achieve?`
    }
    
    // Default contextual response
    return `That's a great point! Based on my ${specialist.experience} of experience as a ${specialist.specialization}, I can definitely help you with that. Let me know more about your specific situation so I can provide the most relevant guidance for your ${service.toLowerCase()} needs.`
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      message: newMessage.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate typing delay and generate AI response
    setTimeout(async () => {
      const aiResponse = await generateDoctorResponse(userMessage.message)
      
      const specialistMessage = {
        id: messages.length + 2,
        message: aiResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, specialistMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBookService = () => {
    // Navigate to booking page
    router.push(`/carecompass/book-service?specialist=${specialistId}&service=${service}`)
  }

  if (!specialist) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading specialist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 pt-2 flex-shrink-0">
        <span className="font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white opacity-50 rounded"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-green-600 dark:text-green-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Specialist Chat</h1>
              <p className="text-sm text-green-600 dark:text-green-400">Connect With Healthcare Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialist Info Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{specialist.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.rating}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{specialist.experience}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 dark:text-green-400">Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button className="w-7 h-7 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full flex items-center justify-center transition-colors">
              <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </button>
            <button className="w-7 h-7 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full flex items-center justify-center transition-colors">
              <Video className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </button>
            <button className="w-7 h-7 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <MoreVertical className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 min-h-0">
        
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Dr. {specialist.name.split(' ')[1]} is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <QuickActions onBookService={handleBookService} />

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="w-11 h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
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

// Main export with Suspense wrapper
export default function SpecialistChat() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading chat...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}