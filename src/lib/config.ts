// Environment Configuration
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Auxillium',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  },
  api: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    gemini: process.env.GEMINI_API_KEY,
    timeout: parseInt(process.env.API_TIMEOUT || '30000')
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  features: {
    aiAssistant: process.env.NEXT_PUBLIC_ENABLE_AI === 'true',
    emergencyServices: process.env.NEXT_PUBLIC_ENABLE_EMERGENCY !== 'false',
    telemedicine: process.env.NEXT_PUBLIC_ENABLE_TELEMEDICINE !== 'false',
    immersiveReader: process.env.NEXT_PUBLIC_ENABLE_IMMERSIVE_READER !== 'false'
  },
  emergency: {
    defaultServices: ['ambulance', 'police', 'fire'],
    maxConcurrentServices: parseInt(process.env.MAX_EMERGENCY_SERVICES || '3'),
    autoNotifyContacts: process.env.AUTO_NOTIFY_EMERGENCY_CONTACTS !== 'false'
  },
  healthcare: {
    hipaaCompliant: process.env.HIPAA_COMPLIANT !== 'false',
    dataRetentionYears: parseInt(process.env.DATA_RETENTION_YEARS || '7'),
    auditLogging: process.env.AUDIT_LOGGING !== 'false'
  }
} as const

// Validation
export function validateConfig() {
  const errors: string[] = []
  
  if (!config.supabase.url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required')
  }
  
  if (!config.supabase.anonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  }
  
  if (config.features.aiAssistant && !config.api.openai && !config.api.anthropic) {
    errors.push('AI Assistant is enabled but no API keys provided (OPENAI_API_KEY or ANTHROPIC_API_KEY)')
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`)
  }
}

// Initialize configuration
if (typeof window === 'undefined') {
  // Server-side validation
  try {
    validateConfig()
  } catch (error) {
    console.error('Configuration Error:', error)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}