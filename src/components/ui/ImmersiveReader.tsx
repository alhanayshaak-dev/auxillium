'use client'

import { useState } from 'react'
import { BookOpen, X, Volume2, VolumeX, Type, Palette, Eye } from 'lucide-react'

interface ImmersiveReaderProps {
  content?: string
  title?: string
  className?: string
}

export function ImmersiveReader({ content, title, className = '' }: ImmersiveReaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [fontSize, setFontSize] = useState('medium')
  const [theme, setTheme] = useState('light')
  const [readingSpeed, setReadingSpeed] = useState('normal')

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(content || 'No content available')
      utterance.rate = readingSpeed === 'slow' ? 0.7 : readingSpeed === 'fast' ? 1.3 : 1.0
      utterance.onend = () => setIsReading(false)
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
    }
  }

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-xs'
      case 'large': return 'text-base'
      case 'xl': return 'text-lg'
      default: return 'text-sm'
    }
  }

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark': return 'bg-gray-900 text-white'
      case 'sepia': return 'bg-yellow-50 text-yellow-900'
      case 'high-contrast': return 'bg-black text-yellow-400'
      default: return 'bg-white text-gray-900'
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors ${className}`}
        title="Open Immersive Reader"
        aria-label="Open Immersive Reader for accessibility"
      >
        <BookOpen className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-[336px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header - Compact */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close Immersive Reader"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
              Reader
            </h1>
          </div>

          {/* Controls - Very Compact */}
          <div className="flex items-center space-x-1">
            {/* Read Aloud */}
            <button
              onClick={handleReadAloud}
              className={`p-1 rounded transition-colors ${
                isReading 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              title={isReading ? 'Stop' : 'Read'}
            >
              {isReading ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>

            {/* Font Size */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded p-0.5">
              <button
                onClick={() => setFontSize('small')}
                className={`px-1 py-0.5 rounded text-xs ${fontSize === 'small' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-1 py-0.5 rounded text-sm ${fontSize === 'medium' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 py-0.5 rounded text-base ${fontSize === 'large' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                A
              </button>
            </div>

            {/* Theme */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded p-0.5">
              <button
                onClick={() => setTheme('light')}
                className={`p-0.5 rounded ${theme === 'light' ? 'bg-blue-500' : ''}`}
                title="Light"
              >
                <div className="w-2 h-2 bg-white border border-gray-300 rounded"></div>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-0.5 rounded ${theme === 'dark' ? 'bg-blue-500' : ''}`}
                title="Dark"
              >
                <div className="w-2 h-2 bg-gray-900 rounded"></div>
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`p-0.5 rounded ${theme === 'sepia' ? 'bg-blue-500' : ''}`}
                title="Sepia"
              >
                <div className="w-2 h-2 bg-yellow-100 border border-yellow-300 rounded"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className={`flex-1 overflow-y-auto p-3 ${getThemeClasses()}`}>
          {title && (
            <h1 className={`font-bold mb-3 ${
              fontSize === 'xl' ? 'text-lg' : 
              fontSize === 'large' ? 'text-base' : 
              fontSize === 'small' ? 'text-xs' : 
              'text-sm'
            }`}>
              {title}
            </h1>
          )}
          <div className={`leading-relaxed ${getFontSizeClass()}`}>
            {content ? (
              content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-xs">
                No content available.
              </p>
            )}
          </div>
        </div>

        {/* Footer - Minimal */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
          <div className="text-center text-xs text-gray-600 dark:text-gray-400">
            Auxillium Reader
          </div>
        </div>
      </div>
    </div>
  )
}