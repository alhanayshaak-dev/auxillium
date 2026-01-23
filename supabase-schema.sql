-- Auxillium Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'retired_doctor', 'pharmacy', 'blood_bank', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE consultation_type AS ENUM ('emergency', 'regular');
CREATE TYPE consultation_mode AS ENUM ('text', 'voice', 'video');
CREATE TYPE consultation_status AS ENUM ('pending', 'active', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'subsidized', 'donated');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info (from signup)
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  
  -- Health Info
  blood_group TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  current_medications TEXT[],
  primary_doctor TEXT,
  
  -- Location & Emergency
  address TEXT,
  
  -- Financial & Eligibility
  income_level TEXT,
  insurance_info TEXT,
  
  -- Preferences
  preferred_language TEXT DEFAULT 'english',
  notifications_enabled BOOLEAN DEFAULT true,
  recording_consent BOOLEAN DEFAULT false,
  data_storage_consent BOOLEAN DEFAULT false,
  location_sharing_consent BOOLEAN DEFAULT false,
  
  -- System
  role user_role DEFAULT 'patient',
  verification_status verification_status DEFAULT 'pending',
  avatar_url TEXT,
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Emergency contacts
CREATE TABLE emergency_contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations
CREATE TABLE consultations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  type consultation_type NOT NULL,
  mode consultation_mode NOT NULL,
  status consultation_status DEFAULT 'pending',
  
  -- Consultation details
  symptoms TEXT,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  recording_url TEXT,
  
  -- Payment
  cost DECIMAL(10,2),
  payment_status payment_status DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- LifeLog entries
CREATE TABLE lifelog_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID, -- For family members
  
  entry_type TEXT NOT NULL, -- 'vitals', 'symptoms', 'medication', 'notes'
  title TEXT NOT NULL,
  content JSONB NOT NULL, -- Flexible structure for different entry types
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents storage
CREATE TABLE documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID, -- For family members
  
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'reports', 'prescriptions', 'ids', 'insurance', 'other'
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reminders
CREATE TABLE reminders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID, -- For family members
  
  title TEXT NOT NULL,
  description TEXT,
  reminder_type TEXT NOT NULL, -- 'medicine', 'appointment', 'test'
  
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  repeat_pattern TEXT, -- 'daily', 'weekly', 'monthly', 'custom'
  is_completed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Doctors can view patient profiles during consultations" ON profiles FOR SELECT USING (
  role = 'doctor' AND EXISTS (
    SELECT 1 FROM consultations 
    WHERE (doctor_id = auth.uid() OR patient_id = auth.uid()) 
    AND status IN ('active', 'completed')
  )
);

-- Emergency contacts policies
CREATE POLICY "Users can manage own emergency contacts" ON emergency_contacts FOR ALL USING (auth.uid() = user_id);

-- Consultations policies
CREATE POLICY "Users can view own consultations" ON consultations FOR SELECT USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);
CREATE POLICY "Patients can create consultations" ON consultations FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Doctors can update consultations" ON consultations FOR UPDATE USING (auth.uid() = doctor_id);

-- LifeLog policies
CREATE POLICY "Users can manage own lifelog entries" ON lifelog_entries FOR ALL USING (auth.uid() = user_id);

-- Documents policies
CREATE POLICY "Users can manage own documents" ON documents FOR ALL USING (auth.uid() = user_id);

-- Reminders policies
CREATE POLICY "Users can manage own reminders" ON reminders FOR ALL USING (auth.uid() = user_id);

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lifelog_entries_updated_at BEFORE UPDATE ON lifelog_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();