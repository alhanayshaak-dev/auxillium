'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  Video, 
  Phone, 
  CheckCircle,
  Award,
  BookOpen,
  Languages,
  DollarSign,
  Heart,
  ArrowLeft,
  Share2,
  Bookmark,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function SpecialistProfile() {
  const router = useRouter()
  const params = useParams()
  const [selectedTab, setSelectedTab] = useState('about')
  const [consultationType, setConsultationType] = useState<'online' | 'physical'>('online')

  // Mock data - in real app, fetch based on params.id
  const specialist = {
    id: 1,
    name: 'Dr. Anita Desai',
    specialty: 'Clinical Dietitian',
    qualifications: 'MSc Nutrition, RD',
    experience: '12 years',
    rating: 4.9,
    reviews: 234,
    consultationFee: '₹800/session',
    subsidizedFee: '₹200/session',
    location: 'Mumbai, Maharashtra',
    languages: ['English', 'Hindi', 'Gujarati'],
    nextSlot: 'Today 2:30 PM',
    availability: 'Available now',
    consultationTypes: ['online', 'physical'],
    specializations: ['Weight Management', 'Diabetes Diet', 'Heart Health', 'Sports Nutrition'],
    about: 'Dr. Anita Desai is an experienced clinical dietitian with over 12 years of expertise in therapeutic nutrition and lifestyle modification. She specializes in creating personalized nutrition plans for individuals with chronic conditions, weight management goals, and sports performance enhancement. Her approach combines evidence-based nutrition science with practical, sustainable lifestyle changes.',
    education: [
      'MSc Clinical Nutrition - All India Institute of Medical Sciences (AIIMS), Delhi',
      'BSc Dietetics and Applied Nutrition - Mumbai University'
    ],
    certifications: [
      'Registered Dietitian (RD) - Indian Dietetic Association',
      'Certified Diabetes Educator - Diabetes Educator Society',
      'Sports Nutrition Specialist - International Society of Sports Nutrition'
    ],
    achievements: [
      'Published 15+ research papers in nutrition journals',
      'Speaker at National Nutrition Conference 2023',
      'Awarded "Best Clinical Dietitian" by Maharashtra Health Association'
    ],
    clinicAddress: 'Nutrition Care Center, Bandra West, Mumbai - 400050',
    consultationHours: {
      online: 'Mon-Sat: 9:00 AM - 8:00 PM',
      physical: 'Mon-Fri: 10:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM'
    },
    totalPatients: 1200,
    successRate: 92
  }

  const reviews = [
    {
      id: 1,
      patientName: 'Priya S.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Dr. Desai helped me lose 15kg in 6 months with a sustainable diet plan. Her approach is very practical and easy to follow.',
      condition: 'Weight Management'
    },
    {
      id: 2,
      patientName: 'Rajesh K.',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent guidance for managing my diabetes through diet. My HbA1c improved significantly after following her recommendations.',
      condition: 'Diabetes Management'
    },
    {
      id: 3,
      patientName: 'Meera P.',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Very knowledgeable and patient. She explained everything clearly and provided detailed meal plans.',
      condition: 'Heart Health'
    }
  ]

  const availableSlots = [
    { time: '2:30 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '4:30 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '6:00 PM', available: false }
  ]

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <StatusBar />
      
      {/* Custom Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">Specialist Profile</h1>
            <p className="text-sm text-gray-600">{specialist.specialty}</p>
          </div>
          <div className="flex space-x-2">
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
        {/* Profile Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-lg font-semibold text-gray-900">{specialist.name}</h2>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-1">{specialist.specialty}</p>
              <p className="text-sm text-purple-600 mb-2">{specialist.qualifications}</p>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{specialist.rating}</span>
                  <span className="text-sm text-gray-600">({specialist.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{specialist.experience}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">{specialist.availability}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Languages className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{specialist.languages.join(', ')}</span>
              </div>
            </div>
          </div>
          
          {/* Specializations */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {specialist.specializations.map((spec, index) => (
                <span key={index} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{specialist.totalPatients}</p>
              <p className="text-xs text-gray-600">Patients Treated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{specialist.successRate}%</p>
              <p className="text-xs text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{specialist.reviews}</p>
              <p className="text-xs text-gray-600">Reviews</p>
            </div>
          </div>
        </div>

        {/* Consultation Type & Pricing */}
        <div className="bg-white p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Consultation Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Online Consultation</p>
                  <p className="text-sm text-gray-600">{specialist.consultationHours.online}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{specialist.consultationFee}</p>
                <p className="text-sm text-green-600">Subsidized: {specialist.subsidizedFee}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Physical Consultation</p>
                  <p className="text-sm text-gray-600">{specialist.consultationHours.physical}</p>
                  <p className="text-xs text-gray-500">{specialist.clinicAddress}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{specialist.consultationFee}</p>
                <p className="text-sm text-green-600">Subsidized: {specialist.subsidizedFee}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {['about', 'reviews', 'availability'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-3 px-4 text-sm font-medium capitalize ${
                  selectedTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-4">
          {selectedTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{specialist.about}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <ul className="space-y-1">
                  {specialist.education.map((edu, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <ul className="space-y-1">
                  {specialist.certifications.map((cert, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                      <Award className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                <ul className="space-y-1">
                  {specialist.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Patient Reviews</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{specialist.rating}</span>
                  <span className="text-sm text-gray-600">({specialist.reviews} reviews)</span>
                </div>
              </div>
              
              {reviews.map((review) => (
                <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">{review.patientName}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {review.condition}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'availability' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Today's Availability</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        slot.available
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next available slot:</strong> {specialist.nextSlot}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Book now to secure your preferred time slot
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => router.push(`/carecompass/chat/${specialist.id}`)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => router.push(`/carecompass/book-specialist/${specialist.id}`)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
        <div className="flex justify-around">
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => router.push('/docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-purple-500 p-1"
            onClick={() => router.push('/carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => router.push('/health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => router.push('/medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}