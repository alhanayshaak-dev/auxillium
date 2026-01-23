import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { FamilyMembersProvider } from '@/contexts/FamilyMembersContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auxillium - Complete Healthcare Platform',
  description: 'Emergency medical access, health records, education, and medicine services in one platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300 dark:bg-gray-900`}>
        <SettingsProvider>
          <FamilyMembersProvider>
            {/* iPhone Frame Container */}
            <div className="min-h-screen flex items-center justify-center p-4">
              {/* iPhone Frame */}
              <div className="relative">
                {/* iPhone Outer Frame */}
                <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
                  {/* iPhone Inner Frame */}
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full overflow-hidden">
                      {children}
                    </div>
                  </div>
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
          </FamilyMembersProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}