'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Stethoscope, Compass, FileText, Pill } from 'lucide-react'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0">
      <div className="flex justify-around">
        <button 
          className={`flex items-center justify-center p-1 ${
            isActive('/') ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => router.push('/')}
        >
          <Home className="w-5 h-5" />
        </button>
        <button 
          className={`flex items-center justify-center p-1 ${
            isActive('/docconnect') ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => handleModuleClick('docconnect')}
        >
          <Stethoscope className="w-5 h-5" />
        </button>
        <button 
          className={`flex items-center justify-center p-1 ${
            isActive('/carecompass') ? 'text-purple-500' : 'text-gray-400 dark:text-gray-500 hover:text-purple-500'
          }`}
          onClick={() => handleModuleClick('carecompass')}
        >
          <Compass className="w-5 h-5" />
        </button>
        <button 
          className={`flex items-center justify-center p-1 ${
            isActive('/health-tracker') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500 hover:text-green-500'
          }`}
          onClick={() => handleModuleClick('health-tracker')}
        >
          <FileText className="w-5 h-5" />
        </button>
        <button 
          className={`flex items-center justify-center p-1 ${
            isActive('/medsupport') ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500 hover:text-orange-500'
          }`}
          onClick={() => handleModuleClick('medsupport')}
        >
          <Pill className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}