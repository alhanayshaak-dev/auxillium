import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1]?.content || ''

    // Generate contextual responses based on the user's question
    const response = generateLezResponse(latestMessage)

    return NextResponse.json({ message: response })

  } catch (error) {
    console.error('Lez Chat API error:', error)
    
    // Provide fallback response
    return NextResponse.json({ 
      message: "I'm here to help! While I'm having a small technical hiccup, I can still assist you with basic health questions. What would you like to know about your health today?"
    })
  }
}

function generateLezResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Headache responses
  if (lowerMessage.includes('headache')) {
    return `For headaches, here are some immediate steps you can take:

🔹 **Rest in a quiet, dark room** - Light and noise can worsen headaches
🔹 **Stay hydrated** - Drink plenty of water as dehydration is a common cause
🔹 **Apply cold or warm compress** - Try what feels better for you
🔹 **Gentle neck/shoulder massage** - Tension headaches often respond well to this
🔹 **Over-the-counter pain relief** - Ibuprofen or acetaminophen as directed

**When to see a doctor:**
- Sudden, severe headache unlike any before
- Headache with fever, stiff neck, or vision changes
- Frequent headaches (more than 2-3 per week)
- Headaches that worsen over time

Would you like me to help you find a doctor through DocConnect, or do you have other questions about managing headaches?`
  }
  
  // Blood pressure tracking
  if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
    return `Great question! Here's how to effectively track your blood pressure:

📱 **Using LifeLog (Health Tracker):**
- Go to LifeLog → Health Metrics → Blood Pressure
- Log readings twice daily (morning & evening)
- Record both systolic (top) and diastolic (bottom) numbers

🩺 **Best Practices:**
- Measure at the same times daily
- Sit quietly for 5 minutes before measuring
- Use proper cuff size on bare arm
- Avoid caffeine/exercise 30 minutes before

📊 **Normal Ranges:**
- Normal: Less than 120/80 mmHg
- Elevated: 120-129 (systolic) and less than 80 (diastolic)
- High: 130/80 mmHg or higher

Would you like me to guide you to LifeLog to start tracking, or help you find a doctor for blood pressure management?`
  }
  
  // Finding a doctor
  if (lowerMessage.includes('find a doctor') || lowerMessage.includes('doctor')) {
    return `I can help you find the right doctor! Here's how:

🏥 **Through DocConnect:**
- Browse specialists by category (Cardiology, Dermatology, etc.)
- View doctor profiles with ratings and experience
- Check availability and book appointments
- Choose between online consultations or in-person visits

🔍 **What type of doctor do you need?**
- General Physician (for routine checkups)
- Specialist (for specific conditions)
- Emergency consultation (for urgent issues)

📍 **Location preferences:**
- Nearby clinics and hospitals
- Online consultation options
- Home visit services (where available)

Would you like me to take you to DocConnect to browse doctors, or do you have a specific medical concern I can help you find the right specialist for?`
  }
  
  // Booking appointments
  if (lowerMessage.includes('book') && lowerMessage.includes('appointment')) {
    return `I'll help you book an appointment! Here's the process:

📅 **Through DocConnect:**
1. **Choose your doctor** - Browse by specialty or search by name
2. **Select appointment type** - Online consultation or in-person visit
3. **Pick date & time** - View available slots
4. **Confirm booking** - Receive confirmation details

⚡ **Quick Options:**
- **Same-day appointments** - For urgent but non-emergency issues
- **Video consultations** - Convenient online meetings
- **Follow-up appointments** - With doctors you've seen before

💡 **Pro tip:** Book in advance for better time slot availability!

Would you like me to take you directly to DocConnect to start booking, or do you need help choosing what type of appointment you need?`
  }
  
  // Flu symptoms
  if (lowerMessage.includes('flu') || lowerMessage.includes('fever') || lowerMessage.includes('cold')) {
    return `Here are common flu symptoms and what to do:

🤒 **Common Flu Symptoms:**
- Fever (usually high, 100.4°F or higher)
- Body aches and chills
- Fatigue and weakness
- Cough and sore throat
- Runny or stuffy nose
- Headache

🏠 **Home Care:**
- Rest and sleep plenty
- Drink lots of fluids (water, warm broths, herbal tea)
- Use a humidifier or breathe steam
- Gargle with salt water for sore throat
- Over-the-counter medications for symptom relief

⚠️ **See a doctor if you have:**
- High fever (over 103°F)
- Difficulty breathing or chest pain
- Severe headache or neck stiffness
- Symptoms lasting more than 10 days
- Signs of dehydration

Would you like me to help you find a doctor through DocConnect, or track your symptoms in LifeLog?`
  }
  
  // LifeLog/medication tracking
  if (lowerMessage.includes('lifelog') || lowerMessage.includes('medication') || lowerMessage.includes('track')) {
    return `LifeLog is your comprehensive health tracking companion! Here's what you can do:

📊 **Health Metrics:**
- Blood pressure, heart rate, weight, BMI
- Blood sugar levels
- Sleep patterns and quality
- Exercise and activity tracking

💊 **Medication Management:**
- Set medication reminders
- Track dosages and timing
- Monitor side effects
- Refill reminders

📅 **Appointments & Records:**
- Upcoming doctor appointments
- Medical history and test results
- Family health information
- Emergency medical details

📈 **Progress Tracking:**
- Visual charts and trends
- Health goal setting
- Weekly/monthly reports
- Share data with healthcare providers

Would you like me to take you to LifeLog to start tracking, or do you have specific questions about any of these features?`
  }
  
  // General health questions
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness')) {
    return `I'm here to help with all your health questions! Here's what I can assist you with:

🏥 **Medical Services:**
- Find and book doctors (DocConnect)
- Track health metrics (LifeLog)
- Wellness programs (CareCompass)
- Medication support (MedSupport)

❓ **Common Questions I Can Help With:**
- Symptom guidance and when to see a doctor
- Health tracking and monitoring
- Medication management
- Appointment booking
- Emergency care guidance

🚨 **Emergency Services:**
- 24/7 emergency support
- Ambulance services
- Critical care guidance

💡 **Preventive Care:**
- Health screenings and checkups
- Vaccination schedules
- Lifestyle recommendations

What specific health topic would you like to explore today?`
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || message.length < 10) {
    return `Hello! I'm Lez, your AI health assistant. I'm here to help you with:

🏥 **Healthcare Navigation:**
- Finding and booking doctors
- Understanding symptoms
- Managing medications
- Tracking your health

📱 **Auxillium Features:**
- DocConnect for medical consultations
- LifeLog for health tracking
- CareCompass for wellness support
- MedSupport for medications and blood services

❓ **Ask me anything about:**
- Symptoms and when to see a doctor
- Health tracking and monitoring
- Booking appointments
- Managing medications
- Emergency care

What can I help you with today?`
  }
  
  // Default helpful response
  return `I understand you're asking about "${message}". While I can provide general health information, I always recommend consulting with healthcare professionals for personalized medical advice.

Here's how I can help you right now:

🏥 **Find Medical Care:**
- Use DocConnect to find and book doctors
- Get emergency care guidance
- Find specialists for your specific needs

📊 **Track Your Health:**
- Use LifeLog to monitor symptoms, medications, and vital signs
- Set health goals and track progress

🆘 **Need Immediate Help?**
- Use our Emergency services for urgent medical situations
- Get guidance on when to seek immediate care

Would you like me to help you navigate to any of these services, or do you have a more specific health question I can assist with?`
}