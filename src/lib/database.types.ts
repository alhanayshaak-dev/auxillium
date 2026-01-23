export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
          age: number | null
          gender: string | null
          blood_group: string | null
          medical_conditions: string[] | null
          allergies: string[] | null
          address: string | null
          city: string | null
          state: string | null
          pincode: string | null
          income_level: string | null
          preferred_language: string
          theme: string
          notifications_enabled: boolean
          role: 'patient' | 'doctor' | 'specialist' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status: 'pending' | 'verified' | 'rejected'
          avatar_url: string | null
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone: string
          date_of_birth?: string | null
          age?: number | null
          gender?: string | null
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          income_level?: string | null
          preferred_language?: string
          theme?: string
          notifications_enabled?: boolean
          role?: 'patient' | 'doctor' | 'specialist' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status?: 'pending' | 'verified' | 'rejected'
          avatar_url?: string | null
        }
        Update: {
          full_name?: string
          email?: string
          phone?: string
          date_of_birth?: string | null
          age?: number | null
          gender?: string | null
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          income_level?: string | null
          preferred_language?: string
          theme?: string
          notifications_enabled?: boolean
          role?: 'patient' | 'doctor' | 'specialist' | 'pharmacy' | 'blood_bank' | 'admin'
          verification_status?: 'pending' | 'verified' | 'rejected'
          avatar_url?: string | null
        }
      }
      family_members: {
        Row: {
          id: string
          user_id: string
          name: string
          relation: string
          date_of_birth: string
          age: number
          gender: string
          blood_group: string | null
          medical_conditions: string[] | null
          allergies: string[] | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          insurance_valid_until: string | null
          insurance_coverage: string | null
          smartwatch_connected: boolean
          smartwatch_device: string | null
          smartwatch_last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          relation: string
          date_of_birth: string
          age: number
          gender: string
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_valid_until?: string | null
          insurance_coverage?: string | null
          smartwatch_connected?: boolean
          smartwatch_device?: string | null
        }
        Update: {
          name?: string
          relation?: string
          date_of_birth?: string
          age?: number
          gender?: string
          blood_group?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_valid_until?: string | null
          insurance_coverage?: string | null
          smartwatch_connected?: boolean
          smartwatch_device?: string | null
          smartwatch_last_sync?: string | null
        }
      }
      health_metrics: {
        Row: {
          id: string
          user_id: string
          family_member_id: string | null
          metric_type: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'oxygen_level' | 'weight' | 'bmi' | 'temperature'
          value: number
          unit: string
          status: string | null
          systolic: number | null
          diastolic: number | null
          recorded_at: string
          source: string
          notes: string | null
        }
        Insert: {
          user_id: string
          family_member_id?: string | null
          metric_type: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'oxygen_level' | 'weight' | 'bmi' | 'temperature'
          value: number
          unit: string
          status?: string | null
          systolic?: number | null
          diastolic?: number | null
          recorded_at?: string
          source?: string
          notes?: string | null
        }
        Update: {
          metric_type?: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'oxygen_level' | 'weight' | 'bmi' | 'temperature'
          value?: number
          unit?: string
          status?: string | null
          systolic?: number | null
          diastolic?: number | null
          notes?: string | null
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          family_member_id: string | null
          name: string
          dosage: string
          frequency: string
          time_of_day: string[]
          start_date: string
          end_date: string | null
          is_active: boolean
          prescribed_by: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          family_member_id?: string | null
          name: string
          dosage: string
          frequency: string
          time_of_day: string[]
          start_date: string
          end_date?: string | null
          is_active?: boolean
          prescribed_by?: string | null
          notes?: string | null
        }
        Update: {
          name?: string
          dosage?: string
          frequency?: string
          time_of_day?: string[]
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          prescribed_by?: string | null
          notes?: string | null
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          relationship: string
          phone: string
          email: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
          relationship: string
          phone: string
          email?: string | null
          is_primary?: boolean
        }
        Update: {
          name?: string
          relationship?: string
          phone?: string
          email?: string | null
          is_primary?: boolean
        }
      }
      doctors: {
        Row: {
          id: string
          profile_id: string | null
          name: string
          specialty: string
          experience: string
          rating: number
          reviews_count: number
          qualifications: string[]
          languages: string[]
          nationality: string | null
          gender: string | null
          location: string | null
          hospital_name: string | null
          hospital_address: string | null
          consultation_fee: number
          insurance_accepted: string[]
          is_available: boolean
          created_at: string
        }
        Insert: {
          profile_id?: string | null
          name: string
          specialty: string
          experience: string
          rating?: number
          reviews_count?: number
          qualifications: string[]
          languages: string[]
          nationality?: string | null
          gender?: string | null
          location?: string | null
          hospital_name?: string | null
          hospital_address?: string | null
          consultation_fee: number
          insurance_accepted?: string[]
          is_available?: boolean
        }
        Update: {
          name?: string
          specialty?: string
          experience?: string
          rating?: number
          reviews_count?: number
          qualifications?: string[]
          languages?: string[]
          nationality?: string | null
          gender?: string | null
          location?: string | null
          hospital_name?: string | null
          hospital_address?: string | null
          consultation_fee?: number
          insurance_accepted?: string[]
          is_available?: boolean
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          family_member_id: string | null
          doctor_id: string
          consultation_type: 'online' | 'in-person'
          appointment_date: string
          appointment_time: string
          status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
          symptoms: string | null
          diagnosis: string | null
          prescription: string | null
          notes: string | null
          consultation_fee: number
          insurance_coverage: number
          amount_paid: number
          payment_status: 'pending' | 'paid' | 'subsidized' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          family_member_id?: string | null
          doctor_id: string
          consultation_type: 'online' | 'in-person'
          appointment_date: string
          appointment_time: string
          status?: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
          symptoms?: string | null
          consultation_fee: number
          insurance_coverage?: number
          amount_paid: number
          payment_status?: 'pending' | 'paid' | 'subsidized' | 'refunded'
        }
        Update: {
          consultation_type?: 'online' | 'in-person'
          appointment_date?: string
          appointment_time?: string
          status?: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
          symptoms?: string | null
          diagnosis?: string | null
          prescription?: string | null
          notes?: string | null
          consultation_fee?: number
          insurance_coverage?: number
          amount_paid?: number
          payment_status?: 'pending' | 'paid' | 'subsidized' | 'refunded'
        }
      }
      workshops: {
        Row: {
          id: string
          title: string
          description: string | null
          instructor: string
          type: string
          date: string | null
          time: string | null
          duration: string | null
          max_participants: number | null
          enrolled_count: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          title: string
          description?: string | null
          instructor: string
          type: string
          date?: string | null
          time?: string | null
          duration?: string | null
          max_participants?: number | null
          enrolled_count?: number
          is_active?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          instructor?: string
          type?: string
          date?: string | null
          time?: string | null
          duration?: string | null
          max_participants?: number | null
          enrolled_count?: number
          is_active?: boolean
        }
      }
      workshop_enrollments: {
        Row: {
          id: string
          user_id: string
          workshop_id: string
          enrolled_at: string
          attended: boolean
        }
        Insert: {
          user_id: string
          workshop_id: string
          attended?: boolean
        }
        Update: {
          attended?: boolean
        }
      }
      donation_initiatives: {
        Row: {
          id: string
          title: string
          description: string | null
          goal_amount: number
          raised_amount: number
          start_date: string
          end_date: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          title: string
          description?: string | null
          goal_amount: number
          raised_amount?: number
          start_date: string
          end_date?: string | null
          is_active?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          goal_amount?: number
          raised_amount?: number
          start_date?: string
          end_date?: string | null
          is_active?: boolean
        }
      }
      donations: {
        Row: {
          id: string
          user_id: string | null
          initiative_id: string
          amount: number
          payment_status: 'pending' | 'paid' | 'subsidized' | 'refunded'
          donated_at: string
        }
        Insert: {
          user_id?: string | null
          initiative_id: string
          amount: number
          payment_status?: 'pending' | 'paid' | 'subsidized' | 'refunded'
        }
        Update: {
          amount?: number
          payment_status?: 'pending' | 'paid' | 'subsidized' | 'refunded'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'patient' | 'doctor' | 'specialist' | 'pharmacy' | 'blood_bank' | 'admin'
      verification_status: 'pending' | 'verified' | 'rejected'
      consultation_type: 'online' | 'in-person'
      consultation_status: 'scheduled' | 'active' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'subsidized' | 'refunded'
      appointment_status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
      health_metric_type: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'oxygen_level' | 'weight' | 'bmi' | 'temperature'
      symptom_severity: 'mild' | 'moderate' | 'severe'
      service_type: 'dietician' | 'physiotherapy' | 'fitness' | 'yoga' | 'wellness'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}