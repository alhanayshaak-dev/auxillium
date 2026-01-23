'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  MessageSquare, 
  Bot,
  Send,
  Loader2,
  ArrowLeft,
  Sparkles,
  Menu,
  Plus,
  Trash2,
  Clock,
  Camera,
  Mic,
  Paperclip,
  Heart,
  X,
  Video,
  Phone,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

interface ChatMessage {
  id: number
  sender: 'lez' | 'user'
  message: string
  timestamp: string
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  messages: ChatMessage[]
}

export default function LezAIAssistant() {
  const router = useRouter()
  const [currentSession, setCurrentSession] = useState<string>('default')
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isVideoMode, setIsVideoMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 'default',
      title: 'New Chat',
      lastMessage: "Hello! I'm Lez, your AI health assistant...",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: 1,
          sender: 'lez',
          message: "Hello! I'm Lez, your AI health assistant. I'm here to help you with all your healthcare needs and guide you through the Auxillium app features. How can I assist you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }
  ])
  
  const [showSidebar, setShowSidebar] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const getCurrentMessages = () => {
    const session = chatSessions.find(s => s.id === currentSession)
    return session?.messages || []
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [getCurrentMessages()])

  const createNewChat = () => {
    const newSessionId = `chat-${Date.now()}`
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Chat',
      lastMessage: "Hello! I'm Lez, your AI health assistant...",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: 1,
          sender: 'lez',
          message: "Hello! I'm Lez, your AI health assistant. I'm here to help you with all your healthcare needs and guide you through the Auxillium app features. How can I assist you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }
    
    setChatSessions(prev => [newSession, ...prev])
    setCurrentSession(newSessionId)
    setShowSidebar(false)
  }

  const switchToChat = (sessionId: string) => {
    setCurrentSession(sessionId)
    setShowSidebar(false)
  }

  const deleteChat = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (chatSessions.length <= 1) return
    
    setChatSessions(prev => prev.filter(s => s.id !== sessionId))
    if (currentSession === sessionId) {
      setCurrentSession(chatSessions.find(s => s.id !== sessionId)?.id || 'default')
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      message: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Update current session with new message
    setChatSessions(prev => prev.map(session => 
      session.id === currentSession 
        ? { 
            ...session, 
            messages: [...session.messages, userMessage],
            lastMessage: inputMessage.trim(),
            timestamp: userMessage.timestamp,
            title: session.title === 'New Chat' ? inputMessage.trim().substring(0, 30) + '...' : session.title
          }
        : session
    ))

    setInputMessage('')
    setIsLoading(true)

    try {
      const currentMessages = getCurrentMessages()
      const conversationHistory = currentMessages
        .filter(msg => msg.sender !== 'lez' || msg.id === 1)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.message
        }))

      conversationHistory.push({
        role: 'user',
        content: inputMessage.trim()
      })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Lez')
      }

      const data = await response.json()

      const lezMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'lez',
        message: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setChatSessions(prev => prev.map(session => 
        session.id === currentSession 
          ? { 
              ...session, 
              messages: [...session.messages, lezMessage],
              lastMessage: data.message.substring(0, 50) + '...',
              timestamp: lezMessage.timestamp
            }
          : session
      ))
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'lez',
        message: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact our support team if the issue persists.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setChatSessions(prev => prev.map(session => 
        session.id === currentSession 
          ? { ...session, messages: [...session.messages, errorMessage] }
          : session
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
    inputRef.current?.focus()
  }

  const healthPrompts = [
    "I have a headache, what should I do?",
    "How do I track my blood pressure?",
    "I need to find a doctor",
    "Help me book an appointment",
    "What are the symptoms of flu?",
    "How do I use LifeLog to track medications?"
  ]

  const currentMessages = getCurrentMessages()
  const isNewChat = currentMessages.length <= 1

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

      {/* Header - LEZ BRANDING with Close Button */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Lez</h1>
              <p className="text-sm text-red-600 dark:text-red-400">AI Health Assistant</p>
            </div>
          </div>
          {/* Close Button on Right */}
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-red-600 dark:text-red-300" />
          </button>
        </div>
      </div>

      {/* Settings below header */}
      <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowSidebar(true)}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
          >
            Settings
          </button>
          <button
            onClick={createNewChat}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Sidebar for Previous Chats - STAYS WITHIN PHONE SCREEN */}
      {showSidebar && (
        <>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl max-w-[80%] overflow-hidden">
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Previous Chats</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              <button
                onClick={createNewChat}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl px-4 py-3 flex items-center space-x-2 mb-4 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">New Chat</span>
              </button>

              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => switchToChat(session.id)}
                    className={`group p-3 rounded-xl cursor-pointer transition-all ${
                      session.id === currentSession
                        ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {session.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{session.timestamp}</span>
                        </div>
                      </div>
                      {chatSessions.length > 1 && (
                        <button
                          onClick={(e) => deleteChat(session.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Settings Section */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Settings</h3>
                <div className="space-y-1">
                  <button className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-2 transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">History</span>
                  </button>
                  <button className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-2 transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Lez Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Area - ADD CHAT BUBBLES AND CHAT RECOMMENDATIONS HERE */}
      <div className="flex-1 px-4 py-2 flex flex-col min-h-0">
        {isNewChat ? (
          /* Welcome Screen with Health Prompts */
          <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto scrollbar-hide">
            <div className="w-full text-center px-2">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Hello! I'm Lez
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Your AI health assistant. I can help with health questions and guide you through Auxillium features.
              </p>
              
              <div className="space-y-2 mb-4">
                {healthPrompts.slice(0, 4).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(prompt)}
                    className="w-full p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all text-left group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-all flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {prompt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages - Compact for phone screen */
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 mb-2 min-h-0">
            {currentMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs ${
                  message.sender === 'user'
                    ? 'bg-red-500 text-white rounded-lg rounded-br-sm px-3 py-2'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-bl-sm px-3 py-2 shadow-sm'
                }`}>
                  {message.sender === 'lez' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-2 h-2 text-white" />
                      </div>
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">Lez</span>
                    </div>
                  )}
                  <p className={`text-sm whitespace-pre-line ${
                    message.sender === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {message.message}
                  </p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-red-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-bl-sm px-3 py-2 shadow-sm max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Lez is thinking...</span>
                  </div>
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-1 mb-1">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Analyzing your question...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* REPLACE EMERGENCY BUTTON W CHAT BUBBLE + PHOTO + VOICE + UPLOAD OPTION */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex-shrink-0">
          <div className="flex items-center space-x-2">
            {/* Upload/Attachment Options - More highlighted */}
            <button className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors flex-shrink-0">
              <Camera className="w-5 h-5" />
            </button>
            
            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Lez anything..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 text-sm min-w-0"
            />
            
            {/* Voice and Send Options - More highlighted */}
            <button 
              onClick={() => {
                setIsRecording(!isRecording)
                if (!isRecording) {
                  alert('Voice input feature coming soon! Speak your question and Lez will respond.')
                }
              }}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Disclaimer - OUTSIDE THE BOX */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Always consult healthcare professionals for medical advice.
          </p>
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