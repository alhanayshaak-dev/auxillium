import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types will be generated from Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string
          phone: string
          date_of_birth: string | null
          gender: string | null
          blood_group: string | null
          medical_conditions: string[] | null
          allergies: string[] | null
          current_medications: string[] | null
          primary_doctor: string | null
          address: string | null
          income_level: string | null
          insurance_info: string | null
          preferred_language: string
          role: 'patient' | 'doctor' | 'retired_doctor' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status: 'pending' | 'verified' | 'rejected'
          avatar_url: string | null
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone: string
          date_of_birth?: string | null
          gender?: string | null
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          current_medications?: string[] | null
          primary_doctor?: string | null
          address?: string | null
          income_level?: string | null
          insurance_info?: string | null
          preferred_language?: string
          role?: 'patient' | 'doctor' | 'retired_doctor' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status?: 'pending' | 'verified' | 'rejected'
          avatar_url?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          date_of_birth?: string | null
          gender?: string | null
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          current_medications?: string[] | null
          primary_doctor?: string | null
          address?: string | null
          income_level?: string | null
          insurance_info?: string | null
          preferred_language?: string
          role?: 'patient' | 'doctor' | 'retired_doctor' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status?: 'pending' | 'verified' | 'rejected'
          avatar_url?: string | null
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          relationship: string
          phone: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
          relationship: string
          phone: string
          is_primary?: boolean
        }
        Update: {
          name?: string
          relationship?: string
          phone?: string
          is_primary?: boolean
        }
      }
      consultations: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string | null
          type: 'emergency' | 'regular'
          mode: 'text' | 'voice' | 'video'
          status: 'pending' | 'active' | 'completed' | 'cancelled'
          symptoms: string | null
          diagnosis: string | null
          prescription: string | null
          notes: string | null
          recording_url: string | null
          cost: number | null
          payment_status: 'pending' | 'paid' | 'subsidized' | 'donated'
          created_at: string
          started_at: string | null
          ended_at: string | null
        }
        Insert: {
          patient_id: string
          doctor_id?: string | null
          type: 'emergency' | 'regular'
          mode: 'text' | 'voice' | 'video'
          symptoms?: string | null
          cost?: number | null
        }
        Update: {
          doctor_id?: string | null
          status?: 'pending' | 'active' | 'completed' | 'cancelled'
          symptoms?: string | null
          diagnosis?: string | null
          prescription?: string | null
          notes?: string | null
          recording_url?: string | null
          payment_status?: 'pending' | 'paid' | 'subsidized' | 'donated'
          started_at?: string | null
          ended_at?: string | null
        }
      }
    }
  }
}