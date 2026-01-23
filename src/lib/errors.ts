import { ERROR_MESSAGES } from './constants'

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'low' | 'medium' | 'high' = 'medium',
    public context?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string = ERROR_MESSAGES.NETWORK, context?: Record<string, any>) {
    super(message, 'NETWORK_ERROR', 'high', context)
    this.name = 'NetworkError'
  }
}

export class AIError extends AppError {
  constructor(message: string = ERROR_MESSAGES.AI_UNAVAILABLE, context?: Record<string, any>) {
    super(message, 'AI_ERROR', 'medium', context)
    this.name = 'AIError'
  }
}

export class EmergencyError extends AppError {
  constructor(message: string = ERROR_MESSAGES.EMERGENCY_FAILED, context?: Record<string, any>) {
    super(message, 'EMERGENCY_ERROR', 'high', context)
    this.name = 'EmergencyError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string = ERROR_MESSAGES.INVALID_INPUT, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 'low', context)
    this.name = 'ValidationError'
  }
}

export class AuthError extends AppError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED, context?: Record<string, any>) {
    super(message, 'AUTH_ERROR', 'medium', context)
    this.name = 'AuthError'
  }
}

// Error handler utility
export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }
  
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message)
    }
    
    // AI/API errors
    if (error.message.includes('API') || error.message.includes('OpenAI') || error.message.includes('Anthropic')) {
      return new AIError(error.message)
    }
    
    // Generic error
    return new AppError(error.message, 'UNKNOWN_ERROR', 'medium')
  }
  
  // Unknown error type
  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 'medium')
}

// Error logging utility
export function logError(error: AppError, additionalContext?: Record<string, any>) {
  const errorLog = {
    name: error.name,
    message: error.message,
    code: error.code,
    severity: error.severity,
    context: { ...error.context, ...additionalContext },
    timestamp: new Date().toISOString(),
    stack: error.stack
  }
  
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('App Error:', errorLog)
  }
  
  // In production, send to error tracking service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // sendToErrorTracking(errorLog)
  }
}

// Retry utility for network operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      
      if (attempt === maxRetries) {
        throw handleError(lastError)
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
    }
  }
  
  throw handleError(lastError!)
}