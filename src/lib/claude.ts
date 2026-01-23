import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY_BACKUP,
})

export async function generateRequirementsSummary(
  service: string,
  requirements: string,
  formData?: any
): Promise<string> {
  try {
    const prompt = formData 
      ? `Based on the following structured requirements for ${service} services, generate a clear, professional summary:

Service: ${service}
Duration: ${formData.duration}
Sessions per week: ${formData.sessionsPerWeek}
Preferred days: ${formData.preferredDays?.join(', ')}
Gender preference: ${formData.genderPreference}
Budget range: ${formData.budgetRange}
Specific requirements: ${formData.specificRequirements}
Health goals: ${formData.healthGoals}

Generate a concise summary that specialists can use to provide accurate quotes.`
      : `Based on the following requirements for ${service} services, generate a clear, professional summary that specialists can use to provide accurate quotes:

"${requirements}"

Extract key details like:
- Duration/timeline
- Session frequency
- Specific preferences (gender, location, etc.)
- Goals and objectives
- Any special requirements

Format as a professional summary for healthcare specialists.`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const content = response.content[0]
    return content.type === 'text' ? content.text : 'Unable to generate summary'
  } catch (error) {
    console.error('Error generating requirements summary:', error)
    return `Professional Summary: The client is seeking ${service} services with the following requirements: ${requirements.substring(0, 200)}...`
  }
}

export async function generateSpecialistRecommendation(
  service: string,
  requirements: string,
  specialists: any[]
): Promise<{ recommendedId: number; reason: string }> {
  try {
    const specialistsList = specialists.map(s => 
      `ID: ${s.id}, Name: ${s.name}, Rating: ${s.rating}, Experience: ${s.experience}, Gender: ${s.gender}, Specialties: ${s.specialties?.join(', ') || 'General'}, Price: ₹${s.package.price}`
    ).join('\n')

    const prompt = `Based on these requirements for ${service} services:
"${requirements}"

And these available specialists:
${specialistsList}

Recommend the best specialist by ID and explain why in 1-2 sentences. Consider factors like experience, specialization match, gender preference, and value for money.

Respond in JSON format: {"recommendedId": number, "reason": "explanation"}`

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const content = response.content[0]
    if (content.type === 'text') {
      try {
        const parsed = JSON.parse(content.text)
        return {
          recommendedId: parsed.recommendedId || specialists[0]?.id || 1,
          reason: parsed.reason || 'Best match based on your requirements'
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError)
      }
    }
    
    return {
      recommendedId: specialists[0]?.id || 1,
      reason: 'Recommended based on high ratings and experience'
    }
  } catch (error) {
    console.error('Error generating recommendation:', error)
    return {
      recommendedId: specialists[0]?.id || 1,
      reason: 'Recommended based on high ratings and experience'
    }
  }
}