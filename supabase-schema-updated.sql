-- Auxillium Healthcare Platform - Complete Database Schema
-- Updated: January 2026
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- CUSTOM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'specialist', 'pharmacy', 'blood_bank', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE consultation_type AS ENUM ('online', 'in-person');
CREATE TYPE consultation_status AS ENUM ('scheduled', 'active', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'subsidized', 'refunded');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show');
CREATE TYPE health_metric_type AS ENUM ('blood_pressure', 'heart_rate', 'blood_sugar', 'oxygen_level', 'weight', 'bmi', 'temperature');
CREATE TYPE symptom_severity AS ENUM ('mild', 'moderate', 'severe');
CREATE TYPE service_type AS ENUM ('dietician', 'physiotherapy', 'fitness', 'yoga', 'wellness');

-- ============================================
-- CORE TABLES
-- ============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  age INTEGER,
  gender TEXT,
  
  -- Health Info
  blood_group TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  
  -- Location
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  
  -- Financial & Eligibility
  income_level TEXT,
  
  -- Preferences
  preferred_language TEXT DEFAULT 'english',
  theme TEXT DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT true,
  
  -- System
  role user_role DEFAULT 'patient',
  verification_status verification_status DEFAULT 'verified',
  avatar_url TEXT,
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Family Members
CREATE TABLE family_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic Info
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  blood_group TEXT,
  
  -- Health Info
  medical_conditions TEXT[],
  allergies TEXT[],
  
  -- Insurance
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  insurance_valid_until TEXT,
  insurance_coverage TEXT,
  
  -- Smartwatch
  smartwatch_connected BOOLEAN DEFAULT false,
  smartwatch_device TEXT,
  smartwatch_last_sync TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health Metrics
CREATE TABLE health_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  
  metric_type health_metric_type NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  status TEXT, -- 'normal', 'high', 'low'
  
  -- For blood pressure
  systolic INTEGER,
  diastolic INTEGER,
  
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'manual', -- 'manual', 'smartwatch', 'device'
  notes TEXT
);

-- Medications
CREATE TABLE medications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  time_of_day TEXT[], -- ['Morning', 'Evening']
  
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  
  prescribed_by TEXT,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Symptoms Log
CREATE TABLE symptoms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  
  symptom TEXT NOT NULL,
  severity symptom_severity NOT NULL,
  description TEXT,
  
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Contacts
CREATE TABLE emergency_contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  is_primary BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DOCCONNECT TABLES
-- ============================================

-- Doctors
CREATE TABLE doctors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  
  qualifications TEXT[],
  languages TEXT[],
  nationality TEXT,
  gender TEXT,
  location TEXT,
  
  -- For in-person consultations
  hospital_name TEXT,
  hospital_address TEXT,
  
  -- Pricing
  consultation_fee DECIMAL(10,2) NOT NULL,
  insurance_accepted TEXT[],
  
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor Availability
CREATE TABLE doctor_availability (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  
  date DATE NOT NULL,
  time_slots TEXT[], -- ['9:00 AM', '10:00 AM', ...]
  
  UNIQUE(doctor_id, date)
);

-- Appointments
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL NOT NULL,
  
  consultation_type consultation_type NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  
  -- Consultation details
  symptoms TEXT,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  
  -- Payment
  consultation_fee DECIMAL(10,2) NOT NULL,
  insurance_coverage DECIMAL(10,2) DEFAULT 0,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CARECOMPASS TABLES
-- ============================================

-- Specialists (for supplementary services)
CREATE TABLE specialists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  service_type service_type NOT NULL,
  experience TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  
  qualifications TEXT[],
  languages TEXT[],
  gender TEXT,
  location TEXT,
  
  price_per_session DECIMAL(10,2) NOT NULL,
  
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specialist Availability
CREATE TABLE specialist_availability (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  specialist_id UUID REFERENCES specialists(id) ON DELETE CASCADE NOT NULL,
  
  date DATE NOT NULL,
  time_slots TEXT[],
  
  UNIQUE(specialist_id, date)
);

-- Service Packages
CREATE TABLE service_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
  specialist_id UUID REFERENCES specialists(id) ON DELETE SET NULL NOT NULL,
  
  service_type service_type NOT NULL,
  duration_months INTEGER NOT NULL,
  sessions_per_week INTEGER NOT NULL,
  total_sessions INTEGER NOT NULL,
  
  start_date DATE NOT NULL,
  first_session_time TEXT NOT NULL,
  
  total_price DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  
  requirements TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workshops
CREATE TABLE workshops (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  type TEXT NOT NULL, -- 'live', 'recorded'
  
  date DATE,
  time TEXT,
  duration TEXT,
  
  max_participants INTEGER,
  enrolled_count INTEGER DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workshop Enrollments
CREATE TABLE workshop_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE NOT NULL,
  
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attended BOOLEAN DEFAULT false,
  
  UNIQUE(user_id, workshop_id)
);

-- Community Support Groups
CREATE TABLE support_groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donation Initiatives
CREATE TABLE donation_initiatives (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  title TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(12,2) NOT NULL,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  
  start_date DATE NOT NULL,
  end_date DATE,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations
CREATE TABLE donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  initiative_id UUID REFERENCES donation_initiatives(id) ON DELETE CASCADE NOT NULL,
  
  amount DECIMAL(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'paid',
  
  donated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

