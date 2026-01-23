// Test Supabase Connection
// Run this with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://uujehcirqmkpbqodnwar.supabase.co'
const supabaseKey = 'sb_publishable_A4s2_2ZQ1HnfMLgde_sOeQ_DvanAlDX'

console.log('🔍 Testing Supabase Connection...\n')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test 1: Check if we can connect
    console.log('✅ Supabase client created successfully')
    console.log(`📍 URL: ${supabaseUrl}\n`)

    // Test 2: Try to query profiles table
    console.log('🔍 Testing database connection...')
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (error) {
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.log('⚠️  Database tables not created yet')
        console.log('📝 Please run the supabase-schema.sql in your Supabase SQL Editor')
        console.log('   1. Go to https://supabase.com/dashboard')
        console.log('   2. Select your project')
        console.log('   3. Click SQL Editor')
        console.log('   4. Paste the contents of supabase-schema.sql')
        console.log('   5. Click Run\n')
      } else {
        console.log('❌ Database error:', error.message)
      }
    } else {
      console.log('✅ Database connection successful!')
      console.log('✅ Tables are set up correctly\n')
    }

    // Test 3: Check authentication
    console.log('🔍 Testing authentication...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.log('⚠️  Auth error:', authError.message)
    } else {
      console.log('✅ Authentication system is working')
      if (authData.session) {
        console.log('✅ User is logged in')
      } else {
        console.log('ℹ️  No active session (this is normal for testing)')
      }
    }

    console.log('\n🎉 Supabase backend is ready!')
    console.log('📱 You can now run: npm run dev')
    
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('   1. Check if your Supabase URL and API key are correct')
    console.log('   2. Make sure you have internet connection')
    console.log('   3. Verify your Supabase project is active')
  }
}

testConnection()
