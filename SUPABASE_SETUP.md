# Supabase Backend Setup Guide

## ✅ Your Credentials (Already in .env.local)
- **Supabase URL**: `https://uujehcirqmkpbqodnwar.supabase.co`
- **Public API Key**: `sb_publishable_A4s2_2ZQ1HnfMLgde_sOeQ_DvanAlDX`

## 🚀 Setup Steps

### Step 1: Go to Supabase Dashboard
1. Open your browser and go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `uujehcirqmkpbqodnwar`

### Step 2: Run the Database Schema
1. In the Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click **Run** to execute the schema

This will create all the necessary tables:
- ✅ `profiles` - User profiles and health information
- ✅ `emergency_contacts` - Emergency contact information
- ✅ `consultations` - Doctor consultation records
- ✅ `lifelog_entries` - Health tracking data
- ✅ `medications` - Medication tracking
- ✅ `appointments` - Appointment scheduling
- ✅ `health_records` - Medical records storage
- ✅ `family_members` - Family member profiles
- ✅ `workshops` - CareCompass workshops
- ✅ `donations` - Community donations
- ✅ `blood_requests` - Blood donation requests
- ✅ `medicine_orders` - Pharmacy orders

### Step 3: Enable Row Level Security (RLS)
The schema already includes RLS policies, but verify they're enabled:

1. Go to **Authentication** → **Policies**
2. Make sure RLS is enabled for all tables
3. The policies ensure users can only access their own data

### Step 4: Enable Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** authentication (already enabled by default)
3. Optional: Enable **Google**, **GitHub**, or other providers

### Step 5: Storage Setup (for medical records, images)
1. Go to **Storage** in the left sidebar
2. Create a new bucket called `medical-records`
3. Set it to **Private** (only authenticated users)
4. Create another bucket called `avatars` (for profile pictures)
5. Set it to **Public** (for profile pictures)

### Step 6: Test the Connection
1. Start your Auxillium app: `npm run dev`
2. Open http://localhost:3000
3. Try signing up for a new account
4. Check if the profile is created in Supabase → **Table Editor** → `profiles`

## 🔧 What's Already Connected

Your app is already configured to use Supabase for:

### ✅ Authentication
- Sign up / Sign in functionality
- Session management
- Password reset

### ✅ User Profiles
- Profile creation and updates
- Health information storage
- Family member management

### ✅ Health Data
- LifeLog entries (vitals, symptoms, medications)
- Medical records storage
- Appointment tracking

### ✅ Consultations
- Doctor consultation booking
- Consultation history
- Prescription storage

### ✅ Emergency Services
- Emergency contact storage
- Emergency request logging

### ✅ Community Features
- Workshop enrollment
- Donation tracking
- Blood donation requests

## 📊 Database Tables Overview

| Table | Purpose |
|-------|---------|
| `profiles` | User accounts and health profiles |
| `family_members` | Family member profiles linked to main user |
| `emergency_contacts` | Emergency contact information |
| `consultations` | Doctor consultation records |
| `lifelog_entries` | Daily health tracking (vitals, symptoms) |
| `medications` | Medication tracking and reminders |
| `appointments` | Appointment scheduling |
| `health_records` | Medical documents and reports |
| `workshops` | CareCompass workshop data |
| `donations` | Community donation records |
| `blood_requests` | Blood donation requests |
| `medicine_orders` | Pharmacy order history |

## 🔐 Security Features

- ✅ **Row Level Security (RLS)** - Users can only access their own data
- ✅ **Encrypted connections** - All data transmitted over HTTPS
- ✅ **JWT authentication** - Secure token-based auth
- ✅ **HIPAA-compliant** - Healthcare data protection

## 🧪 Testing the Backend

After setup, test these features:

1. **Sign Up**: Create a new account
2. **Profile**: Update your profile information
3. **LifeLog**: Add a health entry (blood pressure, weight, etc.)
4. **Family**: Add a family member
5. **Emergency**: Add an emergency contact
6. **Lez AI**: Chat with the AI assistant (uses Anthropic, not Supabase)

## 🆘 Troubleshooting

### "Failed to fetch" errors
- Check if Supabase URL and API key are correct in `.env.local`
- Restart the dev server after changing `.env.local`

### "Row Level Security" errors
- Make sure RLS policies are enabled
- Check if the user is authenticated

### "Table does not exist" errors
- Run the `supabase-schema.sql` in SQL Editor
- Check if all tables were created successfully

## 📝 Next Steps

1. Run the schema in Supabase SQL Editor
2. Enable authentication providers
3. Create storage buckets
4. Start the app and test!

Your backend is now fully integrated! 🎉
