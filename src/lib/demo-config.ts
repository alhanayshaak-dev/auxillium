/**
 * Demo Configuration for Pitch Presentations
 * Optimizes loading times and user experience for demonstrations
 */

export const DEMO_CONFIG = {
  // Loading optimization for demos
  FAST_LOADING: true,
  LOADING_TIMEOUT: 800, // Max loading time in ms
  PROGRESS_INTERVAL: 50, // Progress update interval
  PROGRESS_INCREMENT: 25, // Progress increment per update
  
  // API timeouts for demo
  API_TIMEOUT: 5000, // 5 second timeout for API calls
  SUPABASE_TIMEOUT: 5000, // 5 seconds timeout for Supabase
  AI_TIMEOUT: 5000, // 5 seconds for AI responses
  
  // Demo data preferences
  USE_MOCK_DATA: false, // Set to true to use mock data instead of API calls
  SHOW_LOADING_ANIMATIONS: true, // Show loading animations
  AUTO_COMPLETE_FORMS: false, // Auto-fill forms for faster demos
  
  // Performance optimizations
  REDUCE_ANIMATIONS: false, // Reduce animations for performance
  PRELOAD_IMAGES: true, // Preload critical images
  CACHE_RESPONSES: true, // Cache API responses for faster subsequent calls
  
  // Demo-specific features
  DEMO_MODE_INDICATOR: false, // Show demo mode indicator
  SKIP_ONBOARDING: false, // Skip onboarding flows
  FAST_NAVIGATION: true, // Faster page transitions
}

// Demo helper functions
export const demoHelpers = {
  // Create a timeout promise for API calls
  createTimeout: (ms: number = DEMO_CONFIG.API_TIMEOUT) => {
    return new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Demo timeout')), ms)
    )
  },
  
  // Wrap API calls with timeout for demo
  withTimeout: async <T>(promise: Promise<T>, timeoutMs?: number): Promise<T> => {
    if (!DEMO_CONFIG.FAST_LOADING) return promise
    
    try {
      return await Promise.race([
        promise,
        demoHelpers.createTimeout(timeoutMs)
      ]) as T
    } catch (error) {
      // In demo mode, return mock data or handle gracefully
      throw error
    }
  },
  
  // Fast loading delay
  fastDelay: (ms: number = 300) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  
  // Mock successful response for demos
  mockSuccess: <T>(data: T, delay: number = 300): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay))
  },
  
  // Check if we're in demo mode
  isDemoMode: () => {
    return DEMO_CONFIG.FAST_LOADING || 
           process.env.NODE_ENV === 'development' ||
           window.location.hostname.includes('demo')
  }
}

// Export for use in components
export default DEMO_CONFIG