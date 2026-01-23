'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeft,
  Video,
  Play,
  Calendar,
  Clock,
  Users,
  Star,
  BookOpen,
  Heart,
  Brain,
  Activity,
  Utensils,
  Shield,
  Baby,
  X,
  Search,
  Filter,
  Home,
  Stethoscope,
  Compass,
  FileText,
  Pill
} from 'lucide-react'

type Workshop = {
  id: number
  title: string
  instructor: string
  duration: string
  participants: number
  rating: number
  category: string
  description: string
  date?: string
  time?: string
  isLive?: boolean
  thumbnail: string
  price?: number
  originalPrice?: number
}

export default function WorkshopsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') // 'live' or 'recorded'
  
  const [activeTab, setActiveTab] = useState<'live' | 'recorded'>(
    typeParam === 'recorded' ? 'recorded' : 'live'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  // Set tab based on URL parameter
  useEffect(() => {
    if (typeParam === 'recorded') {
      setActiveTab('recorded')
    } else if (typeParam === 'live') {
      setActiveTab('live')
    }
  }, [typeParam])

  const liveWorkshops: Workshop[] = [
    {
      id: 1,
      title: 'Diabetes Management Workshop',
      instructor: 'Dr. Sarah Johnson',
      duration: '90 mins',
      participants: 45,
      rating: 4.8,
      category: 'Chronic Care',
      description: 'Learn effective strategies for managing diabetes through diet, exercise, and medication.',
      date: 'Jan 20, 2026',
      time: '3:00 PM IST',
      isLive: true,
      thumbnail: '🩺'
    },
    {
      id: 2,
      title: 'Mental Health & Stress Management',
      instructor: 'Dr. Priya Sharma',
      duration: '60 mins',
      participants: 67,
      rating: 4.9,
      category: 'Mental Health',
      description: 'Practical techniques for managing stress and improving mental wellbeing.',
      date: 'Jan 22, 2026',
      time: '7:00 PM IST',
      isLive: true,
      thumbnail: '🧠'
    },
    {
      id: 3,
      title: 'Heart Health & Prevention',
      instructor: 'Dr. Michael Chen',
      duration: '75 mins',
      participants: 38,
      rating: 4.7,
      category: 'Cardiology',
      description: 'Understanding heart disease prevention and lifestyle modifications.',
      date: 'Jan 25, 2026',
      time: '4:30 PM IST',
      isLive: true,
      thumbnail: '❤️'
    },
    {
      id: 4,
      title: 'Nutrition for Immunity',
      instructor: 'Dr. Anita Desai',
      duration: '45 mins',
      participants: 89,
      rating: 4.6,
      category: 'Nutrition',
      description: 'Boost your immune system with proper nutrition and dietary choices.',
      date: 'Jan 27, 2026',
      time: '6:00 PM IST',
      isLive: true,
      thumbnail: '🥗'
    }
  ]

  const recordedWorkshops: Workshop[] = [
    {
      id: 5,
      title: 'Complete Guide to Pregnancy Care',
      instructor: 'Dr. Kavya Reddy',
      duration: '120 mins',
      participants: 234,
      rating: 4.9,
      category: 'Women\'s Health',
      description: 'Comprehensive guide covering all aspects of pregnancy care and preparation.',
      thumbnail: '🤱'
    },
    {
      id: 6,
      title: 'Yoga for Back Pain Relief',
      instructor: 'Instructor Maya Patel',
      duration: '45 mins',
      participants: 156,
      rating: 4.8,
      category: 'Physical Therapy',
      description: 'Gentle yoga poses and stretches specifically designed for back pain relief.',
      thumbnail: '🧘‍♀️'
    },
    {
      id: 7,
      title: 'Understanding Blood Pressure',
      instructor: 'Dr. Rajesh Kumar',
      duration: '60 mins',
      participants: 189,
      rating: 4.7,
      category: 'Cardiology',
      description: 'Learn about blood pressure management, monitoring, and lifestyle changes.',
      thumbnail: '🩺'
    },
    {
      id: 8,
      title: 'Child Nutrition Basics',
      instructor: 'Dr. Sunita Agarwal',
      duration: '90 mins',
      participants: 267,
      rating: 4.8,
      category: 'Pediatrics',
      description: 'Essential nutrition guidelines for healthy child development.',
      thumbnail: '👶'
    },
    {
      id: 9,
      title: 'Sleep Hygiene & Disorders',
      instructor: 'Dr. Amit Verma',
      duration: '75 mins',
      participants: 145,
      rating: 4.6,
      category: 'Sleep Medicine',
      description: 'Improve your sleep quality with proven techniques and habits.',
      thumbnail: '😴'
    },
    {
      id: 10,
      title: 'Managing Anxiety Naturally',
      instructor: 'Dr. Neha Gupta',
      duration: '55 mins',
      participants: 198,
      rating: 4.9,
      category: 'Mental Health',
      description: 'Natural approaches to managing anxiety and panic disorders.',
      thumbnail: '🌱'
    }
  ]

  const categories = ['all', 'Mental Health', 'Cardiology', 'Nutrition', 'Physical Therapy', 'Women\'s Health', 'Pediatrics', 'Chronic Care', 'Sleep Medicine']
  const priceRanges = ['all', '₹0-₹199', '₹200-₹399', '₹400-₹599', '₹600+']
  const sortOptions = ['rating', 'price-low', 'price-high', 'participants', 'duration']

  // Add price data to existing workshops
  const liveWorkshopsWithPrices = liveWorkshops.map(workshop => ({
    ...workshop,
    price: workshop.id === 1 ? 299 : workshop.id === 2 ? 199 : workshop.id === 3 ? 399 : 149,
    originalPrice: workshop.id === 1 ? 399 : workshop.id === 3 ? 499 : undefined
  }))

  const recordedWorkshopsWithPrices = recordedWorkshops.map(workshop => ({
    ...workshop,
    price: workshop.id === 5 ? 599 : workshop.id === 6 ? 99 : workshop.id === 7 ? 249 : workshop.id === 8 ? 199 : workshop.id === 9 ? 299 : 399,
    originalPrice: workshop.id === 5 ? 799 : workshop.id === 7 ? 349 : workshop.id === 10 ? 499 : undefined
  }))

  const currentWorkshops = activeTab === 'live' ? liveWorkshopsWithPrices : recordedWorkshopsWithPrices

  // Filter workshops based on search, category, and price
  const filteredWorkshops = currentWorkshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workshop.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || workshop.category.toLowerCase() === selectedCategory.toLowerCase()
    
    let matchesPrice = true
    if (selectedPriceRange !== 'all') {
      switch (selectedPriceRange) {
        case '₹0-₹199':
          matchesPrice = workshop.price <= 199
          break
        case '₹200-₹399':
          matchesPrice = workshop.price >= 200 && workshop.price <= 399
          break
        case '₹400-₹599':
          matchesPrice = workshop.price >= 400 && workshop.price <= 599
          break
        case '₹600+':
          matchesPrice = workshop.price >= 600
          break
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort workshops
  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'participants':
        return b.participants - a.participants
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration)
      case 'rating':
      default:
        return b.rating - a.rating
    }
  })

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mental health': return <Brain className="w-4 h-4" />
      case 'cardiology': return <Heart className="w-4 h-4" />
      case 'nutrition': return <Utensils className="w-4 h-4" />
      case 'physical therapy': return <Activity className="w-4 h-4" />
      case 'women\'s health': return <Shield className="w-4 h-4" />
      case 'pediatrics': return <Baby className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mental health': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      case 'cardiology': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'nutrition': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'physical therapy': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      case 'women\'s health': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
      case 'pediatrics': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

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
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Health Workshops</h1>
              <p className="text-sm text-blue-600 dark:text-blue-400">Learn From Healthcare Experts</p>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 pb-20 overflow-y-auto scrollbar-hide min-h-0">
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search workshops, instructors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg border transition-all ${
              showFilters || selectedCategory !== 'all'
                ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400'
                : 'bg-white border-gray-300 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedPriceRange === range
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {range === 'all' ? 'All Prices' : range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="participants">Most Popular</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'live'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="font-medium">Live Sessions</span>
          </button>
          <button
            onClick={() => setActiveTab('recorded')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'recorded'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Play className="w-4 h-4" />
            <span className="font-medium">Recorded</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sortedWorkshops.length} {activeTab} workshop{sortedWorkshops.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {selectedPriceRange !== 'all' && ` (${selectedPriceRange})`}
          </p>
        </div>

        {/* Workshop List */}
        <div className="space-y-4">
          {sortedWorkshops.length > 0 ? (
            sortedWorkshops.map((workshop) => (
              <div key={workshop.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {workshop.thumbnail}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight pr-2">
                        {workshop.title}
                      </h3>
                      {workshop.isLive && (
                        <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full flex-shrink-0">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                      {workshop.description}
                    </p>
                    
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{workshop.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{workshop.participants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{workshop.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(workshop.category)}`}>
                          {getCategoryIcon(workshop.category)}
                          <span>{workshop.category}</span>
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">by {workshop.instructor}</span>
                      </div>
                      
                      {workshop.isLive ? (
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{workshop.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{workshop.time}</p>
                        </div>
                      ) : (
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{workshop.price}</span>
                            {workshop.originalPrice && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{workshop.originalPrice}</span>
                            )}
                          </div>
                          {workshop.originalPrice && (
                            <p className="text-xs text-green-600 dark:text-green-400">
                              Save ₹{workshop.originalPrice - workshop.price}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Price for live workshops */}
                    {workshop.isLive && (
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{workshop.price}</span>
                          {workshop.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{workshop.originalPrice}</span>
                          )}
                        </div>
                        {workshop.originalPrice && (
                          <span className="text-xs text-green-600 dark:text-green-400">
                            Save ₹{workshop.originalPrice - workshop.price}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/carecompass/workshops/${workshop.id}`)}
                      >
                        {workshop.isLive ? 'Join Live' : 'Watch Now'}
                      </Button>
                      {workshop.isLive && (
                        <Button variant="outline" size="sm" className="flex-shrink-0">
                          <Calendar className="w-4 h-4 mr-1" />
                          Remind Me
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No workshops found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredWorkshops.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full">
              Load More Workshops
            </Button>
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