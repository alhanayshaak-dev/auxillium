'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  User,
  Star,
  MapPin,
  Clock,
  Search,
  Filter,
  Award,
  Heart,
  MessageSquare,
  Calendar,
  CheckCircle,
  Languages,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

export default function SpecialistsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const specialists = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Clinical Nutritionist',
      type: 'dietician',
      rating: 4.9,
      reviews: 234,
      experience: '8 years',
      location: 'Mumbai, Maharashtra',
      languages: ['English', 'Hindi', 'Gujarati'],
      consultationFee: '₹800',
      subsidizedFee: '₹200',
      availability: 'Available today',
      image: '👩‍⚕️',
      verified: true,
      specializations: ['Weight Management', 'Diabetes Diet', 'Heart Health']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Senior Physiotherapist',
      type: 'physiotherapist',
      rating: 4.7,
      reviews: 189,
      experience: '12 years',
      location: 'Delhi, NCR',
      languages: ['English', 'Hindi'],
      consultationFee: '₹1200',
      subsidizedFee: '₹300',
      availability: 'Available tomorrow',
      image: '👨‍⚕️',
      verified: true,
      specializations: ['Sports Injury', 'Post-Surgery Rehab', 'Pain Management']
    },
    {
      id: 3,
      name: 'Coach Anita Desai',
      specialty: 'Certified Fitness Trainer',
      type: 'fitness',
      rating: 4.8,
      reviews: 156,
      experience: '6 years',
      location: 'Bangalore, Karnataka',
      languages: ['English', 'Hindi', 'Kannada'],
      consultationFee: '₹900',
      subsidizedFee: '₹250',
      availability: 'Available now',
      image: '💪',
      verified: true,
      specializations: ['Strength Training', 'Cardio Fitness', 'Functional Movement']
    },
    {
      id: 4,
      name: 'Guru Meera Patel',
      specialty: 'Certified Yoga Instructor',
      type: 'yoga',
      rating: 4.9,
      reviews: 203,
      experience: '12 years',
      location: 'Pune, Maharashtra',
      languages: ['English', 'Hindi', 'Marathi'],
      consultationFee: '₹700',
      subsidizedFee: '₹180',
      availability: 'Available today',
      image: '🧘‍♀️',
      verified: true,
      specializations: ['Hatha Yoga', 'Therapeutic Yoga', 'Meditation']
    },
    {
      id: 5,
      name: 'Dr. Kavya Nair',
      specialty: 'Wellness Coach',
      type: 'wellness',
      rating: 4.8,
      reviews: 178,
      experience: '7 years',
      location: 'Kochi, Kerala',
      languages: ['English', 'Hindi', 'Malayalam'],
      consultationFee: '₹850',
      subsidizedFee: '₹220',
      availability: 'Available now',
      image: '🌿',
      verified: true,
      specializations: ['Stress Management', 'Sleep Optimization', 'Lifestyle Medicine']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Specialists' },
    { id: 'dietician', name: 'Dietician' },
    { id: 'physiotherapy', name: 'Physiotherapy' },
    { id: 'fitness', name: 'Physical Fitness' },
    { id: 'yoga', name: 'Yoga & Meditation' },
    { id: 'wellness', name: 'Wellness' }
  ]

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           specialist.specialty.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 pt-2 flex-shrink-0">
        <span className="font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white rounded"></div>
            <div className="w-1 h-3 bg-black dark:bg-white opacity-50 rounded"></div>
          </div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-green-600 dark:text-green-300" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Healthcare Specialists</h1>
              <p className="text-sm text-green-600 dark:text-green-400">Find Verified Healthcare Experts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 pb-20 overflow-y-auto scrollbar-hide min-h-0">
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialists..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
          </div>
          <button className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Specialists List */}
        <div className="space-y-4">
          {filteredSpecialists.map((specialist) => (
            <div key={specialist.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {specialist.image}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{specialist.name}</h3>
                        {specialist.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{specialist.specialty}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{specialist.rating}</span>
                          <span>({specialist.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{specialist.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{specialist.consultationFee}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Subsidized: {specialist.subsidizedFee}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{specialist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Languages className="w-3 h-3" />
                      <span>{specialist.languages.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <Clock className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400">{specialist.availability}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specialist.specializations.map((spec, index) => (
                      <span key={index} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => router.push(`/carecompass/specialist-chat/${specialist.type}`)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Chat Now
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => router.push(`/carecompass/specialist-profile/${specialist.id}`)}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Book Session
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpecialists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No specialists found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
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