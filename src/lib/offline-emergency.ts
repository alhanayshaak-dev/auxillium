interface OfflineEmergencyData {
  userId: string
  emergencyContacts: Array<{
    name: string
    phone: string
    relation: string
  }>
  medicalInfo: {
    bloodType: string
    allergies: string[]
    conditions: string[]
    medications: string[]
  }
  location: {
    lat: number
    lng: number
    address: string
  }
  timestamp: Date
}

interface OfflineEmergencyMessage {
  id: string
  type: 'sms' | 'call' | 'data'
  recipient: string
  message: string
  priority: 'critical' | 'high' | 'normal'
  attempts: number
  lastAttempt: Date
  delivered: boolean
}

class OfflineEmergencySystem {
  private readonly STORAGE_KEY = 'auxillium_offline_emergency'
  private readonly MESSAGE_QUEUE_KEY = 'auxillium_message_queue'
  
  // Cache emergency data for offline use
  async cacheEmergencyData(data: OfflineEmergencyData): Promise<void> {
    try {
      if (typeof window === 'undefined') return
      
      const encryptedData = this.encryptData(JSON.stringify(data))
      localStorage.setItem(this.STORAGE_KEY, encryptedData)
    } catch (error) {
      console.error('Failed to cache emergency data:', error)
    }
  }
  
  // Retrieve cached emergency data
  async getCachedEmergencyData(): Promise<OfflineEmergencyData | null> {
    try {
      if (typeof window === 'undefined') return null
      
      const encryptedData = localStorage.getItem(this.STORAGE_KEY)
      if (!encryptedData) return null
      
      const decryptedData = this.decryptData(encryptedData)
      return JSON.parse(decryptedData)
    } catch (error) {
      console.error('Failed to retrieve cached emergency data:', error)
      return null
    }
  }
  
  // Trigger offline emergency
  async triggerOfflineEmergency(
    emergencyType: 'medical' | 'fire' | 'police' | 'general',
    description: string
  ): Promise<boolean> {
    const cachedData = await this.getCachedEmergencyData()
    if (!cachedData) {
      console.error('No cached emergency data available')
      return false
    }
    
    // Create emergency messages
    const messages = this.createEmergencyMessages(cachedData, emergencyType, description)
    
    // Queue messages for sending
    await this.queueMessages(messages)
    
    // Attempt to send immediately
    await this.processPendingMessages()
    
    // Start background sync
    this.startBackgroundSync()
    
    return true
  }
  
  // Create emergency messages for different channels
  private createEmergencyMessages(
    data: OfflineEmergencyData,
    emergencyType: string,
    description: string
  ): OfflineEmergencyMessage[] {
    const messages: OfflineEmergencyMessage[] = []
    const timestamp = new Date().toLocaleString()
    
    // SMS messages to emergency contacts
    data.emergencyContacts.forEach(contact => {
      const smsMessage = `🚨 EMERGENCY ALERT 🚨
${data.userId} needs immediate help!

Type: ${emergencyType.toUpperCase()}
Description: ${description}
Location: ${data.location.address}
GPS: ${data.location.lat}, ${data.location.lng}
Time: ${timestamp}

Medical Info:
Blood Type: ${data.medicalInfo.bloodType}
Allergies: ${data.medicalInfo.allergies.join(', ') || 'None'}
Conditions: ${data.medicalInfo.conditions.join(', ') || 'None'}

This is an automated emergency alert from Auxillium.`
      
      messages.push({
        id: `sms_${contact.phone}_${Date.now()}`,
        type: 'sms',
        recipient: contact.phone,
        message: smsMessage,
        priority: 'critical',
        attempts: 0,
        lastAttempt: new Date(),
        delivered: false
      })
    })
    
    // Emergency services SMS (if available)
    const emergencyNumbers = {
      medical: '108',
      fire: '101',
      police: '100'
    }
    
    if (emergencyNumbers[emergencyType as keyof typeof emergencyNumbers]) {
      const serviceNumber = emergencyNumbers[emergencyType as keyof typeof emergencyNumbers]
      const serviceMessage = `EMERGENCY: ${description}
Location: ${data.location.address}
GPS: ${data.location.lat}, ${data.location.lng}
Contact: ${data.emergencyContacts[0]?.phone || 'N/A'}
Medical: ${data.medicalInfo.bloodType}, ${data.medicalInfo.allergies.join(', ')}`
      
      messages.push({
        id: `service_${serviceNumber}_${Date.now()}`,
        type: 'sms',
        recipient: serviceNumber,
        message: serviceMessage,
        priority: 'critical',
        attempts: 0,
        lastAttempt: new Date(),
        delivered: false
      })
    }
    
    return messages
  }
  
  // Queue messages for sending
  private async queueMessages(messages: OfflineEmergencyMessage[]): Promise<void> {
    try {
      if (typeof window === 'undefined') return
      
      const existingQueue = this.getMessageQueue()
      const updatedQueue = [...existingQueue, ...messages]
      
      localStorage.setItem(this.MESSAGE_QUEUE_KEY, JSON.stringify(updatedQueue))
    } catch (error) {
      console.error('Failed to queue messages:', error)
    }
  }
  
  // Get pending messages from queue
  private getMessageQueue(): OfflineEmergencyMessage[] {
    try {
      if (typeof window === 'undefined') return []
      
      const queueData = localStorage.getItem(this.MESSAGE_QUEUE_KEY)
      return queueData ? JSON.parse(queueData) : []
    } catch (error) {
      console.error('Failed to get message queue:', error)
      return []
    }
  }
  
  // Process pending messages
  async processPendingMessages(): Promise<void> {
    const queue = this.getMessageQueue()
    const pendingMessages = queue.filter(msg => !msg.delivered)
    
    for (const message of pendingMessages) {
      try {
        const success = await this.sendMessage(message)
        if (success) {
          message.delivered = true
        } else {
          message.attempts++
          message.lastAttempt = new Date()
        }
      } catch (error) {
        console.error('Failed to send message:', error)
        message.attempts++
        message.lastAttempt = new Date()
      }
    }
    
    // Update queue
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.MESSAGE_QUEUE_KEY, JSON.stringify(queue))
    }
  }
  
  // Send individual message
  private async sendMessage(message: OfflineEmergencyMessage): Promise<boolean> {
    // Check if online
    if (!navigator.onLine) {
      return false
    }
    
    try {
      if (message.type === 'sms') {
        // Use SMS API or service
        return await this.sendSMS(message.recipient, message.message)
      }
      
      return false
    } catch (error) {
      console.error('Message sending failed:', error)
      return false
    }
  }
  
  // Send SMS (would integrate with SMS service)
  private async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    // In a real implementation, this would use an SMS service like Twilio
    // For now, we'll simulate the API call
    
    try {
      const response = await fetch('/api/emergency/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
          priority: 'emergency'
        })
      })
      
      return response.ok
    } catch (error) {
      console.error('SMS sending failed:', error)
      return false
    }
  }
  
  // Start background sync
  private startBackgroundSync(): void {
    // Register service worker for background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        // Note: Background sync is not available in all browsers
        // This is a fallback for when sync is not supported
        if ('sync' in registration) {
          return (registration as any).sync.register('emergency-sync')
        } else {
          // Fallback: just resolve immediately
          return Promise.resolve()
        }
      }).catch(error => {
        console.error('Background sync registration failed:', error)
      })
    }
    
    // Fallback: periodic retry
    const retryInterval = setInterval(async () => {
      const queue = this.getMessageQueue()
      const pendingMessages = queue.filter(msg => !msg.delivered && msg.attempts < 5)
      
      if (pendingMessages.length === 0) {
        clearInterval(retryInterval)
        return
      }
      
      await this.processPendingMessages()
    }, 30000) // Retry every 30 seconds
  }
  
  // Simple encryption for cached data
  private encryptData(data: string): string {
    // In a real implementation, use proper encryption
    // For now, just base64 encode
    return btoa(data)
  }
  
  // Simple decryption for cached data
  private decryptData(encryptedData: string): string {
    // In a real implementation, use proper decryption
    // For now, just base64 decode
    return atob(encryptedData)
  }
  
  // Check if offline emergency is available
  async isOfflineEmergencyAvailable(): Promise<boolean> {
    const cachedData = await this.getCachedEmergencyData()
    return cachedData !== null
  }
  
  // Clear cached data (for privacy)
  async clearCachedData(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.MESSAGE_QUEUE_KEY)
    }
  }
}

export const offlineEmergency = new OfflineEmergencySystem()

// Service Worker for background sync
export const registerEmergencyServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw-emergency.js')
      console.log('Emergency service worker registered:', registration)
    } catch (error) {
      console.error('Emergency service worker registration failed:', error)
    }
  }
}