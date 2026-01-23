import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Profile helpers
export const profiles = {
  create: async (profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single()
    return { data, error }
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  }
}

// Health metrics helpers
export const healthMetrics = {
  create: async (metricData: any) => {
    const { data, error } = await supabase
      .from('health_metrics')
      .insert(metricData)
      .select()
      .single()
    return { data, error }
  },

  getByUser: async (userId: string, limit = 50) => {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  getByType: async (userId: string, metricType: string, limit = 20) => {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('metric_type', metricType)
      .order('recorded_at', { ascending: false })
      .limit(limit)
    return { data, error }
  }
}

// Family members helpers
export const familyMembers = {
  create: async (memberData: any) => {
    const { data, error } = await supabase
      .from('family_members')
      .insert(memberData)
      .select()
      .single()
    return { data, error }
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('family_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Appointments helpers
export const appointments = {
  create: async (appointmentData: any) => {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select(`
        *,
        doctors (
          name,
          specialty,
          rating
        )
      `)
      .single()
    return { data, error }
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name,
          specialty,
          rating,
          hospital_name
        )
      `)
      .eq('user_id', userId)
      .order('appointment_date', { ascending: false })
    return { data, error }
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Medications helpers
export const medications = {
  create: async (medicationData: any) => {
    const { data, error } = await supabase
      .from('medications')
      .insert(medicationData)
      .select()
      .single()
    return { data, error }
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Emergency contacts helpers
export const emergencyContacts = {
  create: async (contactData: any) => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert(contactData)
      .select()
      .single()
    return { data, error }
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false })
    return { data, error }
  },

  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Blood donation helpers
export const bloodDonation = {
  createRequest: async (requestData: any) => {
    const { data, error } = await supabase
      .from('blood_requests')
      .insert(requestData)
      .select()
      .single()
    return { data, error }
  },

  getActiveRequests: async (location?: string, bloodType?: string) => {
    let query = supabase
      .from('blood_requests')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }
    if (bloodType) {
      query = query.eq('blood_type', bloodType)
    }

    const { data, error } = await query
    return { data, error }
  },

  acceptRequest: async (requestId: string, donorId: string) => {
    const { data, error } = await supabase
      .from('blood_donations')
      .insert({
        request_id: requestId,
        donor_id: donorId,
        status: 'accepted'
      })
      .select()
      .single()
    return { data, error }
  }
}

// Workshops helpers
export const workshops = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: true })
    return { data, error }
  },

  enroll: async (workshopId: string, userId: string) => {
    const { data, error } = await supabase
      .from('workshop_enrollments')
      .insert({
        workshop_id: workshopId,
        user_id: userId
      })
      .select()
      .single()
    return { data, error }
  },

  getUserEnrollments: async (userId: string) => {
    const { data, error } = await supabase
      .from('workshop_enrollments')
      .select(`
        *,
        workshops (
          title,
          description,
          instructor,
          date,
          time
        )
      `)
      .eq('user_id', userId)
    return { data, error }
  }
}

// Donations helpers
export const donations = {
  create: async (donationData: any) => {
    const { data, error } = await supabase
      .from('donations')
      .insert(donationData)
      .select()
      .single()
    return { data, error }
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('donations')
      .select(`
        *,
        donation_initiatives (
          title,
          description
        )
      `)
      .eq('user_id', userId)
      .order('donated_at', { ascending: false })
    return { data, error }
  }
}

// Real-time subscriptions
export const subscriptions = {
  healthMetrics: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('health_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'health_metrics',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  appointments: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('appointments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}