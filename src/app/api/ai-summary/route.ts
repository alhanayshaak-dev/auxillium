import { NextRequest, NextResponse } from 'next/server'
import { generateRequirementsSummary, generateSpecialistRecommendation } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, service, requirements, formData, specialists } = body

    if (action === 'summarize') {
      const summary = await generateRequirementsSummary(service, requirements, formData)
      return NextResponse.json({ summary })
    }

    if (action === 'recommend') {
      const recommendation = await generateSpecialistRecommendation(service, requirements, specialists)
      return NextResponse.json(recommendation)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('AI Summary API Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}