import { APP_CONFIG } from './constants'

interface EmergencyAttempt {
  userId: string
  timestamp: Date
  location: { lat: number; lng: number }
  verified: boolean
  completed: boolean
}

interface UserEmergencyHistory {
  userId: string
  attempts: EmergencyAttempt[]
  falseAlarms: number
  lastEmergency: Date | null
  suspended: boolean
  suspensionEnd: Date | null
}

class EmergencyPreventionSystem {
  private userHistory: Map<string, UserEmergencyHistory> = new Map()
  
  // Rate limiting check
  async checkRateLimit(userId: string): Promise<boolean> {
    const history = this.getUserHistory(userId)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    const recentAttempts = history.attempts.filter(
      attempt => attempt.timestamp > oneHourAgo
    )
    
    return recentAttempts.length < APP_CONFIG.EMERGENCY.MAX_CONCURRENT_SERVICES
  }
  
  // Check if user is suspended
  async checkSuspension(userId: string): Promise<boolean> {
    const history = this.getUserHistory(userId)
    
    if (history.suspended && history.suspensionEnd) {
      if (new Date() > history.suspensionEnd) {
        // Suspension expired
        history.suspended = false
        history.suspensionEnd = null
        return false
      }
      return true
    }
    
    return false
  }
  
  // Verify emergency legitimacy
  async verifyEmergency(
    userId: string, 
    location: { lat: number; lng: number },
    description: string
  ): Promise<{ verified: boolean; confidence: number; warnings: string[] }> {
    const warnings: string[] = []
    let confidence = 0.5 // Base confidence
    
    // Location verification
    const locationValid = await this.verifyLocation(location)
    if (!locationValid) {
      warnings.push('Location could not be verified')
      confidence -= 0.2
    } else {
      confidence += 0.2
    }
    
    // Description analysis
    const descriptionScore = this.analyzeDescription(description)
    confidence += descriptionScore * 0.3
    
    // User history check
    const history = this.getUserHistory(userId)
    if (history.falseAlarms > 2) {
      warnings.push('User has history of false alarms')
      confidence -= 0.3
    }
    
    // Time pattern analysis
    const timeScore = this.analyzeTimePattern(userId)
    confidence += timeScore * 0.1
    
    return {
      verified: confidence > 0.6,
      confidence,
      warnings
    }
  }
  
  // Record emergency attempt
  async recordAttempt(
    userId: string,
    location: { lat: number; lng: number },
    verified: boolean
  ): Promise<void> {
    const history = this.getUserHistory(userId)
    
    const attempt: EmergencyAttempt = {
      userId,
      timestamp: new Date(),
      location,
      verified,
      completed: false
    }
    
    history.attempts.push(attempt)
    
    // Keep only last 50 attempts
    if (history.attempts.length > 50) {
      history.attempts = history.attempts.slice(-50)
    }
  }
  
  // Report false alarm
  async reportFalseAlarm(userId: string): Promise<void> {
    const history = this.getUserHistory(userId)
    history.falseAlarms++
    
    // Suspend user if too many false alarms
    if (history.falseAlarms >= 3) {
      const suspensionDays = Math.min(history.falseAlarms - 2, 30) // Max 30 days
      history.suspended = true
      history.suspensionEnd = new Date(Date.now() + suspensionDays * 24 * 60 * 60 * 1000)
    }
  }
  
  private getUserHistory(userId: string): UserEmergencyHistory {
    if (!this.userHistory.has(userId)) {
      this.userHistory.set(userId, {
        userId,
        attempts: [],
        falseAlarms: 0,
        lastEmergency: null,
        suspended: false,
        suspensionEnd: null
      })
    }
    return this.userHistory.get(userId)!
  }
  
  private async verifyLocation(location: { lat: number; lng: number }): Promise<boolean> {
    // Verify location is within reasonable bounds for India
    const indiaLatRange = [6.4, 37.6] // Approximate latitude range for India
    const indiaLngRange = [68.7, 97.25] // Approximate longitude range for India
    
    return (
      location.lat >= indiaLatRange[0] && location.lat <= indiaLatRange[1] &&
      location.lng >= indiaLngRange[0] && location.lng <= indiaLngRange[1]
    )
  }
  
  private analyzeDescription(description: string): number {
    const emergencyKeywords = [
      'chest pain', 'heart attack', 'stroke', 'bleeding', 'unconscious',
      'difficulty breathing', 'severe pain', 'accident', 'fire', 'robbery'
    ]
    
    const suspiciousKeywords = [
      'test', 'testing', 'fake', 'practice', 'joke'
    ]
    
    const lowerDesc = description.toLowerCase()
    
    let score = 0
    
    // Check for emergency keywords
    emergencyKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) {
        score += 0.2
      }
    })
    
    // Check for suspicious keywords
    suspiciousKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) {
        score -= 0.5
      }
    })
    
    // Length check (too short might be fake)
    if (description.length < 10) {
      score -= 0.2
    }
    
    return Math.max(0, Math.min(1, score))
  }
  
  private analyzeTimePattern(userId: string): number {
    const history = this.getUserHistory(userId)
    
    if (history.attempts.length < 2) return 0
    
    // Check if calls are at unusual times (might indicate testing)
    const now = new Date()
    const hour = now.getHours()
    
    // Suspicious if calling between 2-5 AM repeatedly
    if (hour >= 2 && hour <= 5) {
      const recentNightCalls = history.attempts.filter(attempt => {
        const attemptHour = attempt.timestamp.getHours()
        return attemptHour >= 2 && attemptHour <= 5
      }).length
      
      if (recentNightCalls > 2) return -0.3
    }
    
    return 0
  }
}

export const emergencyPrevention = new EmergencyPreventionSystem()

// Emergency confirmation dialog data
export const EMERGENCY_CONFIRMATION = {
  title: 'Confirm Real Emergency',
  message: 'You are about to contact emergency services. This should only be used for real emergencies.',
  consequences: [
    'False emergency calls are illegal and punishable by law',
    'Misuse may result in account suspension',
    'Emergency services will be dispatched to your location',
    'You may be charged for false emergency calls'
  ],
  voiceConfirmation: 'Say "This is a real emergency" to continue',
  countdownSeconds: 10
}