// Application Constants
export const APP_CONFIG = {
  TIMEOUTS: {
    VOICE_INPUT: 3000,
    EMERGENCY_REDIRECT: 3000,
    NOTIFICATION_AUTO_REMOVE: 5000,
    AI_RESPONSE_TIMEOUT: 30000,
    CONNECTION_TIMEOUT: 10000
  },
  PORTS: {
    DEV: 3000,
    FALLBACK: 3003
  },
  HEALTH_SCORE_THRESHOLDS: {
    EXCELLENT: 90,
    GOOD: 75,
    FAIR: 60,
    POOR: 40
  },
  EMERGENCY: {
    SERVICES: ['ambulance', 'police', 'fire'] as const,
    PRIORITY_LEVELS: ['critical', 'urgent', 'standard'] as const,
    MAX_CONCURRENT_SERVICES: 3
  },
  AI: {
    MAX_RETRIES: 3,
    FALLBACK_PROVIDERS: ['openai', 'anthropic', 'gemini'] as const,
    SAFETY_KEYWORDS: [
      'emergency', 'urgent', 'critical', 'severe', 'life-threatening',
      'chest pain', 'difficulty breathing', 'unconscious', 'bleeding'
    ]
  },
  MEDICAL: {
    RECORD_RETENTION_YEARS: 7,
    EMERGENCY_CONTACT_LIMIT: 5,
    FAMILY_MEMBER_LIMIT: 10,
    MEDICATION_REMINDER_HOURS: [8, 12, 18, 22]
  }
} as const;

// UI Constants
export const UI_CONFIG = {
  MOBILE_FRAME: {
    WIDTH: 375,
    HEIGHT: 812,
    BORDER_RADIUS: '3rem'
  },
  COLORS: {
    MODULES: {
      home: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        gradient: 'from-blue-500 to-purple-500'
      },
      emergency: {
        primary: '#EF4444',
        secondary: '#F87171',
        gradient: 'from-red-500 to-pink-500'
      },
      docconnect: {
        primary: '#3B82F6',
        secondary: '#06B6D4',
        gradient: 'from-blue-500 to-cyan-500'
      },
      lifelog: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'from-green-500 to-emerald-500'
      },
      carecompass: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        gradient: 'from-purple-500 to-pink-500'
      },
      medsupport: {
        primary: '#F97316',
        secondary: '#F59E0B',
        gradient: 'from-orange-500 to-amber-500'
      }
    }
  },
  ANIMATIONS: {
    DURATION: {
      FAST: '150ms',
      NORMAL: '300ms',
      SLOW: '500ms'
    },
    EASING: {
      DEFAULT: 'ease-in-out',
      BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  EMERGENCY: '/api/emergency',
  HEALTH: '/api/health',
  NOTIFICATIONS: '/api/notifications'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network connection failed. Please check your internet connection.',
  AI_UNAVAILABLE: 'AI assistant is temporarily unavailable. Please try again later.',
  EMERGENCY_FAILED: 'Emergency service connection failed. Please call 108 directly.',
  INVALID_INPUT: 'Please provide valid information.',
  UNAUTHORIZED: 'You are not authorized to access this information.',
  SERVER_ERROR: 'Server error occurred. Please try again later.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  EMERGENCY_CONTACTED: 'Emergency services have been contacted successfully.',
  APPOINTMENT_BOOKED: 'Your appointment has been booked successfully.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  MEDICATION_ADDED: 'Medication has been added to your list.',
  CONTACT_NOTIFIED: 'Emergency contacts have been notified.'
} as const;