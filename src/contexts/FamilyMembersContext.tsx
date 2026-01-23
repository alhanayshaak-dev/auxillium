/**
 * Family Members Context - Enhanced with Supabase Integration
 * 
 * This context provides shared state management for family member data across
 * the Family Members page and Health Tracker (LifeLog) page. Any changes made
 * in one page will be automatically reflected in the other.
 * 
 * Now integrated with Supabase for real-time data persistence and synchronization.
 * Falls back to localStorage when offline or when Supabase is unavailable.
 */

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { familyMembers as familyMembersAPI, auth } from '@/lib/supabase-client'
import { demoHelpers } from '@/lib/demo-config'

export type FamilyMember = {
  id: number | string
  name: string
  relation: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  phone?: string
  email?: string
  conditions: string[]
  color: string
  insurance?: {
    provider: string
    policyNumber: string
    validUntil: string
    coverage: string
  }
  healthMetrics?: {
    bloodPressure: string
    heartRate: string
    bloodSugar: string
    weight: string
    bmi: string
  }
  smartwatch?: {
    device: string
    connected: boolean
    lastSync: string
    batteryLevel: number
  }
  // Supabase fields
  user_id?: string
  created_at?: string
  updated_at?: string
  medical_conditions?: string[]
  allergies?: string[]
  insurance_provider?: string
  insurance_policy_number?: string
  insurance_valid_until?: string
  insurance_coverage?: string
  smartwatch_connected?: boolean
  smartwatch_device?: string
  smartwatch_last_sync?: string
}

type FamilyMembersContextType = {
  familyMembers: FamilyMember[]
  loading: boolean
  error: string | null
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'conditions' | 'color'>) => Promise<void>
  updateFamilyMember: (id: number | string, updates: Partial<FamilyMember>) => Promise<void>
  removeFamilyMember: (id: number | string) => Promise<void>
  getFamilyMember: (id: number | string) => FamilyMember | undefined
  refreshFamilyMembers: () => Promise<void>
}

const FamilyMembersContext = createContext<FamilyMembersContextType | undefined>(undefined)

export function FamilyMembersProvider({ children }: { children: ReactNode }) {
  // Initialize with default members immediately to prevent SSR issues
  const defaultMembers: FamilyMember[] = [
    { 
      id: 1, 
      name: 'Avery Gray', 
      relation: 'Primary Member', 
      dateOfBirth: '15 March 1989',
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '+91 98765 43210',
      email: 'avery.gray@email.com',
      conditions: ['Lactose Intolerance'],
      color: 'from-blue-500 to-purple-500',
      insurance: {
        provider: 'Star Health Insurance',
        policyNumber: 'SH123456',
        validUntil: 'Dec 2025',
        coverage: '₹5,00,000'
      },
      healthMetrics: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        bloodSugar: '95 mg/dL',
        weight: '65 kg',
        bmi: '22.4'
      },
      smartwatch: {
        device: 'Apple Watch Series 9',
        connected: true,
        lastSync: '2 mins ago',
        batteryLevel: 85
      }
    },
    { 
      id: 2, 
      name: 'Heather Gray', 
      relation: 'Mother', 
      dateOfBirth: '22 June 1962',
      gender: 'Female',
      bloodGroup: 'O+',
      phone: '+91 87654 32109',
      email: 'heather.gray@email.com',
      conditions: [],
      color: 'from-pink-500 to-rose-500',
      insurance: {
        provider: 'ICICI Lombard',
        policyNumber: 'IL789012',
        validUntil: 'Mar 2026',
        coverage: '₹3,00,000'
      },
      healthMetrics: {
        bloodPressure: '140/90',
        heartRate: '78 bpm',
        bloodSugar: '145 mg/dL',
        weight: '70 kg',
        bmi: '26.8'
      },
      smartwatch: {
        device: 'Fitbit Versa 4',
        connected: true,
        lastSync: '15 mins ago',
        batteryLevel: 62
      }
    }
  ]

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(defaultMembers) // Start with defaults
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { user } = await auth.getCurrentUser()
        setCurrentUser(user)
      } catch (err) {
        console.log('No authenticated user, using offline mode')
      }
    }
    getCurrentUser()
  }, [])

  // Convert Supabase format to local format
  const convertFromSupabase = (supabaseMember: any): FamilyMember => {
    const colors = [
      'from-blue-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-green-500 to-teal-500',
      'from-purple-500 to-indigo-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500'
    ]
    
    return {
      id: supabaseMember.id,
      name: supabaseMember.name,
      relation: supabaseMember.relation,
      dateOfBirth: new Date(supabaseMember.date_of_birth).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      gender: supabaseMember.gender,
      bloodGroup: supabaseMember.blood_group || 'Unknown',
      conditions: supabaseMember.medical_conditions || [],
      color: colors[Math.abs(supabaseMember.name.charCodeAt(0)) % colors.length],
      insurance: supabaseMember.insurance_provider ? {
        provider: supabaseMember.insurance_provider,
        policyNumber: supabaseMember.insurance_policy_number || '',
        validUntil: supabaseMember.insurance_valid_until || '',
        coverage: supabaseMember.insurance_coverage || ''
      } : undefined,
      smartwatch: supabaseMember.smartwatch_device ? {
        device: supabaseMember.smartwatch_device,
        connected: supabaseMember.smartwatch_connected || false,
        lastSync: supabaseMember.smartwatch_last_sync || 'Never',
        batteryLevel: 75 // Default value
      } : undefined,
      // Keep Supabase fields for updates
      user_id: supabaseMember.user_id,
      created_at: supabaseMember.created_at,
      updated_at: supabaseMember.updated_at
    }
  }

  // Convert local format to Supabase format
  const convertToSupabase = (localMember: Partial<FamilyMember>) => {
    const dateOfBirth = localMember.dateOfBirth ? 
      new Date(localMember.dateOfBirth).toISOString().split('T')[0] : 
      new Date().toISOString().split('T')[0]

    return {
      name: localMember.name,
      relation: localMember.relation,
      date_of_birth: dateOfBirth,
      age: localMember.dateOfBirth ? 
        new Date().getFullYear() - new Date(localMember.dateOfBirth).getFullYear() : 
        0,
      gender: localMember.gender,
      blood_group: localMember.bloodGroup,
      medical_conditions: localMember.conditions || [],
      allergies: [],
      insurance_provider: localMember.insurance?.provider,
      insurance_policy_number: localMember.insurance?.policyNumber,
      insurance_valid_until: localMember.insurance?.validUntil,
      insurance_coverage: localMember.insurance?.coverage,
      smartwatch_connected: localMember.smartwatch?.connected || false,
      smartwatch_device: localMember.smartwatch?.device,
      smartwatch_last_sync: localMember.smartwatch?.lastSync
    }
  }

  // Load family members from Supabase or localStorage
  const refreshFamilyMembers = async () => {
    try {
      setLoading(true)
      setError(null)

      if (currentUser?.id) {
        // Try to load from Supabase with timeout for demo
        try {
          const { data, error: fetchError } = await demoHelpers.withTimeout(
            familyMembersAPI.getByUser(currentUser.id),
            5000
          )
          
          if (fetchError) {
            throw new Error(fetchError.message)
          }

          if (data && data.length > 0) {
            const convertedMembers = data.map(convertFromSupabase)
            setFamilyMembers(convertedMembers)
            // Backup to localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('familyMembers', JSON.stringify(convertedMembers))
            }
          } else {
            // No data in Supabase, use default members
            setFamilyMembers(defaultMembers)
            if (typeof window !== 'undefined') {
              localStorage.setItem('familyMembers', JSON.stringify(defaultMembers))
            }
          }
        } catch (timeoutError) {
          // Timeout or error, use localStorage or defaults
          const stored = typeof window !== 'undefined' ? localStorage.getItem('familyMembers') : null
          if (stored) {
            setFamilyMembers(JSON.parse(stored))
          } else {
            setFamilyMembers(defaultMembers)
            if (typeof window !== 'undefined') {
              localStorage.setItem('familyMembers', JSON.stringify(defaultMembers))
            }
          }
        }
      } else {
        // No user, try localStorage first, then default
        const stored = typeof window !== 'undefined' ? localStorage.getItem('familyMembers') : null
        if (stored) {
          setFamilyMembers(JSON.parse(stored))
        } else {
          setFamilyMembers(defaultMembers)
          if (typeof window !== 'undefined') {
            localStorage.setItem('familyMembers', JSON.stringify(defaultMembers))
          }
        }
      }
    } catch (err) {
      console.error('Error loading family members:', err)
      setError('Failed to load family members')
      
      // Fallback to localStorage or default
      const stored = typeof window !== 'undefined' ? localStorage.getItem('familyMembers') : null
      if (stored) {
        setFamilyMembers(JSON.parse(stored))
      } else {
        setFamilyMembers(defaultMembers)
        if (typeof window !== 'undefined') {
          localStorage.setItem('familyMembers', JSON.stringify(defaultMembers))
        }
      }
    } finally {
      // Fast loading for demo
      await demoHelpers.fastDelay(300)
      setLoading(false)
    }
  }

  // Load family members when user changes
  useEffect(() => {
    refreshFamilyMembers()
  }, [currentUser])

  const addFamilyMember = async (memberData: Omit<FamilyMember, 'id' | 'conditions' | 'color'>) => {
    try {
      setError(null)
      
      const colors = [
        'from-green-500 to-teal-500',
        'from-purple-500 to-indigo-500',
        'from-orange-500 to-red-500',
        'from-cyan-500 to-blue-500',
        'from-yellow-500 to-orange-500',
        'from-indigo-500 to-purple-500'
      ]

      if (currentUser?.id) {
        // Add to Supabase
        const supabaseData = convertToSupabase(memberData)
        const { data, error: addError } = await familyMembersAPI.create({
          user_id: currentUser.id,
          ...supabaseData
        })
        
        if (addError) {
          throw new Error(addError.message)
        }
        
        if (data) {
          const newMember = convertFromSupabase(data)
          setFamilyMembers(prev => [...prev, newMember])
          // Backup to localStorage
          const updated = [...familyMembers, newMember]
          if (typeof window !== 'undefined') {
            localStorage.setItem('familyMembers', JSON.stringify(updated))
          }
        }
      } else {
        // Offline mode - add to localStorage only
        const newId = Math.max(...familyMembers.map(m => Number(m.id) || 0)) + 1
        const colorIndex = (newId - 1) % colors.length
        
        const newMember: FamilyMember = {
          ...memberData,
          id: newId,
          conditions: [],
          color: colors[colorIndex]
        }
        
        setFamilyMembers(prev => [...prev, newMember])
        const updated = [...familyMembers, newMember]
        if (typeof window !== 'undefined') {
          localStorage.setItem('familyMembers', JSON.stringify(updated))
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add family member')
      throw err
    }
  }

  const updateFamilyMember = async (id: number | string, updates: Partial<FamilyMember>) => {
    try {
      setError(null)
      
      if (currentUser?.id && typeof id === 'string') {
        // Update in Supabase
        const supabaseUpdates = convertToSupabase(updates)
        const { data, error: updateError } = await familyMembersAPI.update(id, supabaseUpdates)
        
        if (updateError) {
          throw new Error(updateError.message)
        }
        
        if (data) {
          const updatedMember = convertFromSupabase(data)
          setFamilyMembers(prev => 
            prev.map(member => member.id === id ? updatedMember : member)
          )
          // Backup to localStorage
          const updated = familyMembers.map(member => member.id === id ? updatedMember : member)
          if (typeof window !== 'undefined') {
            localStorage.setItem('familyMembers', JSON.stringify(updated))
          }
        }
      } else {
        // Offline mode or numeric ID - update localStorage only
        setFamilyMembers(prev => 
          prev.map(member => 
            member.id === id ? { ...member, ...updates } : member
          )
        )
        const updated = familyMembers.map(member => 
          member.id === id ? { ...member, ...updates } : member
        )
        if (typeof window !== 'undefined') {
          localStorage.setItem('familyMembers', JSON.stringify(updated))
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update family member')
      throw err
    }
  }

  const removeFamilyMember = async (id: number | string) => {
    try {
      setError(null)
      
      if (currentUser?.id && typeof id === 'string') {
        // Delete from Supabase
        const { error: deleteError } = await familyMembersAPI.delete(id)
        
        if (deleteError) {
          throw new Error(deleteError.message)
        }
      }
      
      // Remove from local state and localStorage
      setFamilyMembers(prev => prev.filter(member => member.id !== id))
      const updated = familyMembers.filter(member => member.id !== id)
      if (typeof window !== 'undefined') {
        localStorage.setItem('familyMembers', JSON.stringify(updated))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove family member')
      throw err
    }
  }

  const getFamilyMember = (id: number | string) => {
    return familyMembers.find(member => member.id === id)
  }

  return (
    <FamilyMembersContext.Provider value={{
      familyMembers,
      loading,
      error,
      addFamilyMember,
      updateFamilyMember,
      removeFamilyMember,
      getFamilyMember,
      refreshFamilyMembers
    }}>
      {children}
    </FamilyMembersContext.Provider>
  )
}

export function useFamilyMembers() {
  const context = useContext(FamilyMembersContext)
  if (context === undefined) {
    throw new Error('useFamilyMembers must be used within a FamilyMembersProvider')
  }
  return context
}