import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY_BACKUP,
})

export async function POST(request: NextRequest) {
  try {
    const { message, specialist, service, context } = await request.json()

    if (!message || !specialist || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY_BACKUP) {
      // Fallback to realistic but static responses
      return NextResponse.json({ 
        response: generateFallbackResponse(message, specialist, service)
      })
    }

    // Build context from previous messages
    let conversationContext = ''
    if (context && context.length > 0) {
      conversationContext = context.map((msg: any) => 
        `${msg.isUser ? 'Patient' : 'Dr. ' + specialist.name.split(' ')[1]}: ${msg.message}`
      ).join('\n')
    }

    // Create a detailed system prompt for the specialist role
    const systemPrompt = `You are Dr. ${specialist.name}, a professional ${service.toLowerCase()} specialist with ${specialist.experience} of experience. You are currently chatting with a patient who is interested in your services.

Your background:
- Name: Dr. ${specialist.name}
- Experience: ${specialist.experience}
- Specialization: ${specialist.specialization || service}
- Location: ${specialist.location}
- Rating: ${specialist.rating}/5.0
- Package Details: ${specialist.package?.duration || '3 months'}, ${specialist.package?.sessions || '24 sessions'}, ${specialist.package?.frequency || '2 sessions/week'}, ₹${specialist.package?.price || '10000'}

Your role and personality:
- You are a warm, professional, and knowledgeable healthcare specialist
- You provide evidence-based advice and recommendations
- You ask relevant follow-up questions to better understand the patient's needs
- You explain complex medical concepts in simple, understandable terms
- You are empathetic and supportive
- You maintain professional boundaries while being friendly
- You can discuss pricing, scheduling, and package customization
- You encourage patients to book your services when appropriate
- You can negotiate on pricing within reasonable limits (10-20% discount max)
- You can adjust session frequency and duration based on patient needs

Guidelines for responses:
- Keep responses conversational but professional (2-4 sentences typically)
- Ask specific questions about the patient's health goals, current situation, or concerns
- Provide practical advice and actionable recommendations
- Mention your experience and expertise when relevant
- If asked about pricing, be flexible but professional
- If asked about scheduling, offer multiple options
- If the patient seems ready, gently suggest booking a consultation or service package
- Use "I" statements to personalize your responses
- Be encouraging and positive about the patient's health journey
- Address their specific questions directly and thoroughly

Current conversation context:
${conversationContext}

Patient's latest message: "${message}"

Respond as Dr. ${specialist.name} would, staying in character as a professional ${service.toLowerCase()} specialist. Keep your response natural, helpful, and directly address what the patient asked.`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })

    const aiResponse = response.content[0]?.type === 'text' 
      ? response.content[0].text 
      : generateFallbackResponse(message, specialist, service)

    return NextResponse.json({ response: aiResponse })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Provide fallback response
    return NextResponse.json({ 
      response: generateFallbackResponse(message, specialist, service)
    })
  }
}

function generateFallbackResponse(message: string, specialist: any, service: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Price-related responses
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
    return `I understand cost is an important factor. My current package is ₹${specialist.package?.price || '10000'} for ${specialist.package?.duration || '3 months'} with ${specialist.package?.sessions || '24 sessions'}. I'm happy to discuss flexible payment options or adjust the package to better fit your budget. What would work best for you?`
  }
  
  // Schedule-related responses
  if (lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('when') || lowerMessage.includes('available') || lowerMessage.includes('appointment')) {
    return `I have flexible scheduling options available. Currently, I can accommodate sessions on weekdays and weekends, with morning and evening slots. My standard frequency is ${specialist.package?.frequency || '2 sessions/week'}, but we can adjust this based on your availability. What days and times work best for you?`
  }
  
  // Duration/frequency related
  if (lowerMessage.includes('duration') || lowerMessage.includes('long') || lowerMessage.includes('sessions') || lowerMessage.includes('weeks') || lowerMessage.includes('months')) {
    return `Great question! My standard program is ${specialist.package?.duration || '3 months'} with ${specialist.package?.sessions || '24 sessions'} at ${specialist.package?.frequency || '2 sessions/week'}. However, I can customize this based on your goals and availability. Some clients prefer intensive programs, while others need a more gradual approach. What timeline feels right for your goals?`
  }
  
  // Diet/nutrition specific
  if (service.toLowerCase().includes('diet') && (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('meal') || lowerMessage.includes('weight') || lowerMessage.includes('nutrition'))) {
    return `Absolutely! As a ${specialist.specialization || 'nutritionist'}, I create personalized meal plans based on your lifestyle, preferences, and health goals. I'll assess your current eating habits, any dietary restrictions, and design a sustainable nutrition plan. We'll also work on portion control and healthy cooking methods. What are your main dietary concerns or goals?`
  }
  
  // Experience/qualifications
  if (lowerMessage.includes('experience') || lowerMessage.includes('qualification') || lowerMessage.includes('background') || lowerMessage.includes('certified')) {
    return `I have ${specialist.experience} of experience in ${service.toLowerCase()}. I'm certified and have helped hundreds of clients achieve their health goals. My approach combines evidence-based practices with personalized care. I maintain a ${specialist.rating}/5 rating from my clients. I'd be happy to share more about my specific expertise in areas that matter most to you.`
  }
  
  // Results/success
  if (lowerMessage.includes('result') || lowerMessage.includes('success') || lowerMessage.includes('work') || lowerMessage.includes('effective')) {
    return `I'm glad you asked about results! With my ${specialist.experience} of experience, I've helped clients achieve significant improvements in their health goals. Success depends on commitment and consistency, but I provide ongoing support and adjust our approach as needed. Most clients see positive changes within the first few weeks. What specific results are you hoping to achieve?`
  }
  
  // Location/online
  if (lowerMessage.includes('location') || lowerMessage.includes('online') || lowerMessage.includes('virtual') || lowerMessage.includes('person') || lowerMessage.includes('clinic')) {
    return `I'm based in ${specialist.location}, but I offer both in-person and online consultations for maximum flexibility. Many of my clients prefer online sessions as they're more convenient and just as effective. We can use video calls for consultations and I'll provide digital resources and meal plans. Which format would you prefer?`
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || message.length < 10) {
    return `Hello! I'm Dr. ${specialist.name.split(' ')[1]}, and I'm excited to help you with your ${service.toLowerCase()} goals. With ${specialist.experience} of experience, I've helped many clients achieve lasting results. What brings you here today, and what are your main health objectives?`
  }
  
  // Default responses based on service type
  const serviceResponses = {
    'dietician': `That's a great question about nutrition! As a clinical nutritionist with ${specialist.experience} of experience, I can help you create a sustainable eating plan that fits your lifestyle. Every client is unique, so I always start with understanding your current habits, preferences, and goals. What specific dietary challenges are you facing?`,
    'physiotherapy': `Thank you for reaching out! As a physiotherapist, I specialize in helping clients recover from injuries and improve their physical function. With ${specialist.experience} of experience, I use evidence-based techniques tailored to each individual. Could you tell me more about what's bringing you to seek physiotherapy?`,
    'fitness': `I'm excited to help you with your fitness journey! With ${specialist.experience} in fitness training, I create personalized workout plans that are both effective and enjoyable. Whether you're a beginner or looking to reach new goals, I'll support you every step of the way. What are your current fitness goals?`,
    'yoga': `Namaste! I'm delighted you're interested in yoga and meditation. With ${specialist.experience} of practice and teaching, I've seen how transformative these practices can be for both physical and mental well-being. I offer sessions for all levels, from beginners to advanced practitioners. What draws you to yoga?`,
    'wellness': `Thank you for your interest in wellness coaching! With ${specialist.experience} of experience, I take a holistic approach to health, focusing on nutrition, exercise, stress management, and lifestyle balance. Every person's wellness journey is unique. What aspects of your health and wellness would you like to focus on?`
  }
  
  const serviceKey = service.toLowerCase()
  return serviceResponses[serviceKey as keyof typeof serviceResponses] || 
    `Thank you for your message! As a ${service.toLowerCase()} specialist with ${specialist.experience} of experience, I'm here to help you achieve your health goals. I'd love to learn more about what you're looking for so I can provide the best guidance. Could you tell me more about your specific needs?`
}