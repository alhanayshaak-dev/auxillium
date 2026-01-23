'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Home, Stethoscope, Compass, FileText, Pill, X } from 'lucide-react'

export default function LanguagePage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const handleModuleClick = (module: string) => {
    router.push(`/${module}`)
  }

  const languages = [
    // Indo-European Languages
    { code: 'en', name: 'English', native: 'English', working: true },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', working: true },
    { code: 'ur', name: 'Urdu', native: 'اردو', working: false },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', working: false },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া', working: false },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', working: false },
    { code: 'mai', name: 'Maithili', native: 'मैथिली', working: false },
    { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी', working: false },
    { code: 'anp', name: 'Angika', native: 'अंगिका', working: false },
    { code: 'awa', name: 'Awadhi', native: 'अवधी', working: false },
    { code: 'bra', name: 'Braj', native: 'ब्रज', working: false },
    { code: 'bns', name: 'Bundeli', native: 'बुन्देली', working: false },
    { code: 'hne', name: 'Chhattisgarhi', native: 'छत्तीसगढ़ी', working: false },
    { code: 'bgc', name: 'Haryanvi', native: 'हरियाणवी', working: false },
    { code: 'mwr', name: 'Marwari', native: 'मारवाड़ी', working: false },
    { code: 'mtr', name: 'Mewari', native: 'मेवाड़ी', working: false },
    { code: 'swv', name: 'Shekhawati', native: 'शेखावाटी', working: false },
    { code: 'dhd', name: 'Dhundhari', native: 'ढूंढाड़ी', working: false },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', working: false },
    { code: 'kfr', name: 'Kutchi', native: 'કચ્છી', working: false },
    { code: 'mr', name: 'Marathi', native: 'मराठी', working: false },
    { code: 'kok', name: 'Konkani', native: 'कोंकणी', working: false },
    { code: 'sd', name: 'Sindhi', native: 'سنڌي', working: false },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', working: false },
    { code: 'doi', name: 'Dogri', native: 'डोगरी', working: false },
    { code: 'ks', name: 'Kashmiri', native: 'कॉशुर', working: false },
    { code: 'ne', name: 'Nepali', native: 'नेपाली', working: false },
    { code: 'gbm', name: 'Garhwali', native: 'गढ़वाली', working: false },
    { code: 'kfy', name: 'Kumaoni', native: 'कुमाऊँनी', working: false },
    { code: 'xnr', name: 'Kangri', native: 'कांगड़ी', working: false },
    { code: 'him', name: 'Pahari', native: 'पहाड़ी', working: false },
    { code: 'skr', name: 'Saraiki', native: 'سرائیکی', working: false },

    // Dravidian Languages
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', working: false },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', working: false },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', working: true },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', working: true },
    { code: 'tcy', name: 'Tulu', native: 'ತುಳು', working: false },
    { code: 'kfa', name: 'Kodava', native: 'ಕೊಡವ', working: false },
    { code: 'bfq', name: 'Badaga', native: 'ಬಡಗ', working: false },
    { code: 'iru', name: 'Irula', native: 'ಇರುಳ', working: false },
    { code: 'tcx', name: 'Toda', native: 'ತೋಡ', working: false },
    { code: 'kfe', name: 'Kota', native: 'ಕೋಟ', working: false },
    { code: 'gon', name: 'Gondi', native: 'गोंडी', working: false },
    { code: 'kff', name: 'Koya', native: 'కోయ', working: false },
    { code: 'kxu', name: 'Kui', native: 'କୁଇ', working: false },
    { code: 'kxv', name: 'Kuvi', native: 'କୁଭି', working: false },
    { code: 'kfb', name: 'Kolami', native: 'కొలమి', working: false },
    { code: 'prc', name: 'Parji', native: 'పర్జి', working: false },
    { code: 'brh', name: 'Brahui', native: 'براہوئی', working: false },

    // Austroasiatic Languages
    { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', working: false },
    { code: 'unr', name: 'Mundari', native: 'मुण्डारी', working: false },
    { code: 'hoc', name: 'Ho', native: 'हो', working: false },
    { code: 'kha', name: 'Kharia', native: 'खड़िया', working: false },
    { code: 'jun', name: 'Juang', native: 'जुआंग', working: false },
    { code: 'svr', name: 'Savara', native: 'सवरा', working: false },
    { code: 'bfw', name: 'Bhumij', native: 'भूमिज', working: false },
    { code: 'kfq', name: 'Korwa', native: 'कोरवा', working: false },
    { code: 'biy', name: 'Birhor', native: 'बिरहोर', working: false },
    { code: 'asr', name: 'Asuri', native: 'असुरी', working: false },
    { code: 'kfp', name: 'Korku', native: 'कोरकू', working: false },

    // Sino-Tibetan Languages
    { code: 'mni', name: 'Meitei (Manipuri)', native: 'ꯃꯩꯇꯩꯂꯣꯟ', working: false },
    { code: 'brx', name: 'Bodo', native: 'बर\'', working: false },
    { code: 'dis', name: 'Dimasa', native: 'दिमासा', working: false },
    { code: 'mjz', name: 'Karbi', native: 'कार्बी', working: false },
    { code: 'trp', name: 'Kokborok', native: 'ককবরক', working: false },
    { code: 'lus', name: 'Mizo (Lushai)', native: 'मिज़ो', working: false },
    { code: 'njo', name: 'Ao', native: 'आओ', working: false },
    { code: 'nnh', name: 'Angami', native: 'अंगामी', working: false },
    { code: 'nse', name: 'Sema', native: 'सेमा', working: false },
    { code: 'njh', name: 'Lotha', native: 'लोथा', working: false },
    { code: 'nbe', name: 'Konyak', native: 'कोन्याक', working: false },
    { code: 'nmf', name: 'Tangkhul', native: 'तांगखुल', working: false },
    { code: 'ctd', name: 'Thado', native: 'थाडो', working: false },
    { code: 'pck', name: 'Paite', native: 'पाइते', working: false },
    { code: 'hmr', name: 'Hmar', native: 'ह्मार', working: false },
    { code: 'nrm', name: 'Rongmei', native: 'रोंगमेई', working: false },
    { code: 'lep', name: 'Lepcha', native: 'ᰛᰩᰵ', working: false },
    { code: 'sip', name: 'Bhutia', native: 'འབྲུག', working: false },
    { code: 'xsr', name: 'Sherpa', native: 'ཤར་པ', working: false },
    { code: 'mpz', name: 'Monpa', native: 'མོན་པ', working: false },
    { code: 'njz', name: 'Nishi', native: 'निशि', working: false },
    { code: 'apt', name: 'Apatani', native: 'अपातानी', working: false },
    { code: 'adi', name: 'Adi', native: 'आदी', working: false },
    { code: 'clk', name: 'Idu Mishmi', native: 'इडु मिश्मी', working: false },
    { code: 'mhu', name: 'Digaru Mishmi', native: 'दिगारू मिश्मी', working: false },
    { code: 'mmr', name: 'Miju Mishmi', native: 'मिजू मिश्मी', working: false },
    { code: 'grt', name: 'Garo', native: 'গারো', working: false },

    // Language Isolates and Others
    { code: 'nhl', name: 'Nihali', native: 'निहाली', working: false },
    { code: 'jko', name: 'Great Andamanese', native: 'जको', working: false },
    { code: 'ong', name: 'Onge', native: 'ओंगे', working: false },
    { code: 'anq', name: 'Jarawa', native: 'जारवा', working: false },
    { code: 'std', name: 'Sentinelese', native: 'सेंटिनलीज़', working: false },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृत', working: false }
  ]

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 px-4 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Language</h1>
        </div>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-purple-600 dark:text-purple-300" />
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select your preferred language for the app
        </p>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400'
                  : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex-1 text-left">
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {lang.native}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{lang.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                {lang.working && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    Available
                  </span>
                )}
                {selectedLanguage === lang.code && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - ALWAYS VISIBLE */}
      <div className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 px-4 py-2 pb-3 shadow-2xl flex-shrink-0 sticky bottom-0 z-50">
        <div className="flex justify-around">
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => handleModuleClick('')}
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-500 p-1"
            onClick={() => handleModuleClick('docconnect')}
          >
            <Stethoscope className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
            onClick={() => handleModuleClick('carecompass')}
          >
            <Compass className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-green-500 p-1"
            onClick={() => handleModuleClick('health-tracker')}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-orange-500 p-1"
            onClick={() => handleModuleClick('medsupport')}
          >
            <Pill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
