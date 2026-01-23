import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, Search, Heart } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
        
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-2 flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-blue-700">
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
          
          <Link href="/carecompass">
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Explore Features
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}