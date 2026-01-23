'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'
import BottomNavigation from '@/components/ui/BottomNavigation'
import { 
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  Award,
  CheckCircle,
  User,
  Phone,
  Video,
  MessageSquare,
  Heart,
  Shield,
  Globe,
  BookOpen,
  Users,
  ThumbsUp
} from 'lucide-react'

export default function DoctorProfile() {
  const router = useRouter()
  const params = useParams()
  const [selectedTab, setSelectedTab] = useState('overview')

  // Mock doctor data - in real app, fetch based on params.id
  const doctor = {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: 4.9,
    reviews: 234,
    consultationFee: 'Free for BPL',
    regularFee: '₹500',
    subsidizedFee: '₹100',
    location: 'Apollo Hospital, Bangalore',
    languages: ['English', 'Hindi', 'Kannada'],
    nextSlot: 'Today 2:30 PM',
    availability: 'Available now',
    consultationTypes: ['online', 'physical'],
    education: [
      'MBBS - AIIMS Delhi (1995)',
      'MD Cardiology - PGIMER Chandigarh (1999)',
      'Fellowship in Interventional Cardiology - Harvard Medical School (2002)'
    ],
    certifications: [
      'Board Certified Cardiologist',
      'Fellow of American College of Cardiology',
      'Certified in Advanced Cardiac Life Support'
    ],
    specializations: [
      'Interventional Cardiology',
      'Heart Failure Management',
      'Preventive Cardiology',
      'Cardiac Rehabilitation'
    ],
    hospitalAffiliations: [
      'Apollo Hospital, Bangalore - Senior Consultant',
      'Fortis Hospital, Bangalore - Visiting Consultant',
      'Narayana Health - Advisory Board Member'
    ],
    awards: [
      'Best Cardiologist Award 2023 - Karnataka Medical Association',
      'Excellence in Patient Care 2022 - Apollo Hospitals',
      'Research Excellence Award 2021 - Indian Heart Association'
    ],
    about: 'Dr. Rajesh Sharma is a renowned cardiologist with over 15 years of experience in treating complex cardiac conditions. He has performed over 2000 successful cardiac procedures and is known for his patient-centric approach to healthcare.',
    offers: [
      {
        title: 'Free Initial Consultation',
        description: 'First consultation free for BPL cardholders',
        validity: 'Valid till March 2024'
      },
      {
        title: '50% Off Follow-up',
        description: 'Half price for follow-up consultations within 30 days',
        validity: 'Valid for all patients'
      }
    ],
    timeSlots: {
      today: ['2:30 PM', '4:00 PM', '5:30 PM'],
      tomorrow: ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'],
      dayAfter: ['9:00 AM', '10:30 AM', '12:00 PM', '2:30 PM', '4:00 PM']
    },
    patientReviews: [
      {
        id: 1,
        name: 'Priya M.',
        rating: 5,
        date: '2 days ago',
        comment: 'Excellent doctor! Very patient and explained everything clearly. The online consultation was smooth and professional.'
      },
      {
        id: 2,
        name: 'Rajesh K.',
        date: '1 week ago',
        rating: 5,
        comment: 'Dr. Sharma saved my life. His quick diagnosis and treatment plan helped me recover from a heart attack. Highly recommended!'
      },
      {
        id: 3,
        name: 'Sunita D.',
        date: '2 weeks ago',
        rating: 4,
        comment: 'Good doctor with lots of experience. The consultation fee is very reasonable and he provides detailed treatment plans.'
      }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'slots', label: 'Available Slots' }
  ]

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Doctor Profile</h1>
            <p className="text-sm text-blue-600">Detailed Information</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Doctor Info Card */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{doctor.specialty} • {doctor.experience}</p>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">{doctor.availability}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{doctor.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Languages: {doctor.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Consultation Fees */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Consultation Fees</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">BPL Cardholders:</span>
                <span className="text-sm font-medium text-green-900">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Subsidized Rate:</span>
                <span className="text-sm font-medium text-green-900">{doctor.subsidizedFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Regular Rate:</span>
                <span className="text-sm font-medium text-green-900">{doctor.regularFee}</span>
              </div>
            </div>
          </div>

          {/* Special Offers */}
          {doctor.offers.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Special Offers</h4>
              <div className="space-y-2">
                {doctor.offers.map((offer, index) => (
                  <div key={index} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">{offer.title}</p>
                    <p className="text-xs text-blue-700">{offer.description}</p>
                    <p className="text-xs text-blue-600 mt-1">{offer.validity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-4 pb-4">
          {selectedTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-sm text-gray-600">{doctor.about}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'experience' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                  Education
                </h3>
                <div className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <p key={index} className="text-sm text-gray-600">• {edu}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {doctor.certifications.map((cert, index) => (
                    <p key={index} className="text-sm text-gray-600">• {cert}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Hospital Affiliations
                </h3>
                <div className="space-y-2">
                  {doctor.hospitalAffiliations.map((hospital, index) => (
                    <p key={index} className="text-sm text-gray-600">• {hospital}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-4">
              {doctor.patientReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{review.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'slots' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Today</h3>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.timeSlots.today.map((slot, index) => (
                    <button
                      key={index}
                      className="p-2 border border-green-200 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Tomorrow</h3>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.timeSlots.tomorrow.map((slot, index) => (
                    <button
                      key={index}
                      className="p-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Day After Tomorrow</h3>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.timeSlots.dayAfter.map((slot, index) => (
                    <button
                      key={index}
                      className="p-2 border border-gray-200 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex space-x-3">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all flex items-center justify-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat
        </button>
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center">
          <Calendar className="w-5 h-5 mr-2" />
          Book Now
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}