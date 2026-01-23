import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Toast notification system
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export function showToast(message: string, type: ToastType = 'info') {
  const toastContainer = document.getElementById('toast-container')
  if (!toastContainer) return

  const toast = document.createElement('div')
  toast.className = `toast-notification border-l-4 ${getToastStyles(type)}`
  
  toast.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        ${getToastIcon(type)}
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">${message}</p>
      </div>
      <div class="ml-auto pl-3">
        <button class="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.parentElement.parentElement.parentElement.remove()">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  `

  toastContainer.appendChild(toast)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove()
    }
  }, 5000)
}

function getToastStyles(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'border-green-400 bg-green-50 dark:bg-green-900/20'
    case 'error':
      return 'border-red-400 bg-red-50 dark:bg-red-900/20'
    case 'warning':
      return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    case 'info':
    default:
      return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
  }
}

function getToastIcon(type: ToastType): string {
  switch (type) {
    case 'success':
      return '<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
    case 'error':
      return '<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>'
    case 'warning':
      return '<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>'
    case 'info':
    default:
      return '<svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>'
  }
}

// Language utilities
export const languages = {
  english: 'English',
  hindi: 'हिंदी',
  kannada: 'ಕನ್ನಡ'
}

export type Language = keyof typeof languages

// Format date utilities
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// Emergency utilities
export function triggerEmergencyNotification(contacts: string[], message: string) {
  // In a real app, this would send actual SMS/notifications
  showToast(`Emergency contacts notified (${contacts.length} contacts)`, 'info')
}

export function shareLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    })
  })
}