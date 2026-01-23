/**
 * Auxillium Healthcare Platform - Integration Test
 * Tests Supabase integration and Claude API specialist chats
 */

const { createClient } = require('@supabase/supabase-js')
const fetch = require('node-fetch')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const claudeApiKey = process.env.ANTHROPIC_API_KEY

console.log('🏥 Auxillium Healthcare Platform - Integration Test')
console.log('================================================\n')

// Test Supabase Connection
async function testSupabaseConnection() {
  console.log('1. Testing Supabase Connection...')
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Supabase credentials missing')
    return false
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test connection by checking if we can access the profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('❌ Supabase connection failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful')
    console.log(`   URL: ${supabaseUrl}`)
    return true
  } catch (err) {
    console.log('❌ Supabase connection error:', err.message)
    return false
  }
}

// Test Claude API
async function testClaudeAPI() {
  console.log('\n2. Testing Claude API for Specialist Chats...')
  
  if (!claudeApiKey) {
    console.log('❌ Claude API key missing')
    return false
  }

  try {
    const response = await fetch('http://localhost:3000/api/specialist-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, I need help with my diet plan',
        specialistType: 'dietician',
        conversationHistory: []
      }),
    })

    if (!response.ok) {
      console.log('❌ Claude API test failed - Server not running or API error')
      console.log('   Make sure to run: npm run dev')
      return false
    }

    const data = await response.json()
    
    if (data.message && data.specialist) {
      console.log('✅ Claude API specialist chat working')
      console.log(`   Specialist: ${data.specialist.name}`)
      console.log(`   Response: ${data.message.substring(0, 100)}...`)
      return true
    } else {
      console.log('❌ Claude API response format invalid')
      return false
    }
  } catch (err) {
    console.log('❌ Claude API test error:', err.message)
    console.log('   Make sure the development server is running: npm run dev')
    return false
  }
}

// Test Database Schema
async function testDatabaseSchema() {
  console.log('\n3. Testing Database Schema...')
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test key tables exist
    const tables = [
      'profiles',
      'family_members', 
      'health_metrics',
      'medications',
      'appointments',
      'doctors',
      'workshops',
      'donations'
    ]
    
    let allTablesExist = true
    
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
        
        if (error && error.code === '42P01') {
          console.log(`❌ Table '${table}' does not exist`)
          allTablesExist = false
        } else {
          console.log(`✅ Table '${table}' exists`)
        }
      } catch (err) {
        console.log(`❌ Error checking table '${table}':`, err.message)
        allTablesExist = false
      }
    }
    
    return allTablesExist
  } catch (err) {
    console.log('❌ Database schema test error:', err.message)
    return false
  }
}

// Test Specialist Chat Types
async function testSpecialistTypes() {
  console.log('\n4. Testing All Specialist Types...')
  
  const specialistTypes = ['dietician', 'physiotherapist', 'fitness', 'yoga', 'wellness']
  let allWorking = true
  
  for (const type of specialistTypes) {
    try {
      const response = await fetch('http://localhost:3000/api/specialist-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Hello, I need help with ${type}`,
          specialistType: type,
          conversationHistory: []
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ${type} specialist working - ${data.specialist.name}`)
      } else {
        console.log(`❌ ${type} specialist failed`)
        allWorking = false
      }
    } catch (err) {
      console.log(`❌ ${type} specialist error:`, err.message)
      allWorking = false
    }
  }
  
  return allWorking
}

// Main test function
async function runTests() {
  console.log('Starting integration tests...\n')
  
  const results = {
    supabase: await testSupabaseConnection(),
    claude: await testClaudeAPI(),
    schema: await testDatabaseSchema(),
    specialists: await testSpecialistTypes()
  }
  
  console.log('\n📊 Test Results Summary')
  console.log('======================')
  console.log(`Supabase Connection: ${results.supabase ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Claude API: ${results.claude ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Database Schema: ${results.schema ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Specialist Chats: ${results.specialists ? '✅ PASS' : '❌ FAIL'}`)
  
  const allPassed = Object.values(results).every(result => result)
  
  console.log(`\n🎯 Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`)
  
  if (!allPassed) {
    console.log('\n🔧 Troubleshooting Tips:')
    if (!results.supabase) {
      console.log('- Check Supabase URL and API key in .env.local')
      console.log('- Verify Supabase project is active')
    }
    if (!results.claude) {
      console.log('- Check Anthropic API key in .env.local')
      console.log('- Make sure development server is running (npm run dev)')
    }
    if (!results.schema) {
      console.log('- Run the database schema: supabase-schema-updated.sql')
      console.log('- Check table permissions in Supabase dashboard')
    }
    if (!results.specialists) {
      console.log('- Verify Claude API is working')
      console.log('- Check specialist chat route implementation')
    }
  } else {
    console.log('\n🎉 Auxillium Healthcare Platform is fully integrated!')
    console.log('   - Supabase database ready for real-time health data')
    console.log('   - Claude AI specialists ready for consultations')
    console.log('   - All modules can now use persistent data storage')
  }
}

// Run the tests
runTests().catch(console.error)