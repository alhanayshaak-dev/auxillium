'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSettings } from '@/contexts/SettingsContext'
import { 
  Mic, 
  MicOff,
  Video, 
  VideoOff,
  X,
  User,
  FileText,
  Volume2,
  VolumeX,
  MessageSquare,
  Settings,
  Users,
  Share,
  MoreVertical,
  Phone,
  Shield,
  Truck,
  Camera,
  MapPin,
  Home,
  Stethoscope,
  Compass,
  Pill
} from 'lucide-react'

export default function EmergencyCall() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme } = useSettings()
  const mode = searchParams.get('mode') || 'voice'
  
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(mode === 'video')
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(true)
  const [showTrackingTooltip, setShowTrackingTooltip] = useState(false)
  const [audioLevels, setAudioLevels] = useState(0)
  const [isConnected, setIsConnected] = useState(true)
  const [meetingNotes, setMeetingNotes] = useState([
    "Dr. Johnson: Check patient's pulse and breathing",
    "Dr. Johnson: Keep patient calm and lying down",
    "Dr. Johnson: If conscious, give small sips of water",
  ])
  const [newNote, setNewNote] = useState('')
  const [emergencyServices] = useState({
    ambulance: { distance: 2.3, eta: 6 },
    police: { distance: 1.8, eta: 4 },
    fire: { distance: 3.1, eta: 8 }
  })
  const [showServiceDistances, setShowServiceDistances] = useState(false)
  const [showShareMedical, setShowShareMedical] = useState(false)
  const [selectedMember, setSelectedMember] = useState('self')
  const [showEndCallOptions, setShowEndCallOptions] = useState(false)

  const familyMembers = [
    { id: 'self', name: 'Avery Gray (Self)', age: 35, bloodType: 'A+', relation: 'Primary' },
    { id: 'heather', name: 'Heather Gray', age: 62, bloodType: 'O+', relation: 'Mother' }
  ]

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate audio levels for voice activity
  useEffect(() => {
    const audioTimer = setInterval(() => {
      setAudioLevels(Math.random() * 100)
    }, 200)
    return () => clearInterval(audioTimer)
  }, [])

  // Simulate automatic meeting notes - focused on doctor instructions
  useEffect(() => {
    const instructionNotes = [
      "Dr. Johnson: Apply pressure to any bleeding wounds",
      "Dr. Johnson: Monitor breathing every 2 minutes",
      "Dr. Johnson: Do not move patient unless necessary",
      "Dr. Johnson: Prepare list of current medications",
      "Dr. Johnson: Note any changes in consciousness",
      "Dr. Johnson: Keep airway clear and head tilted back"
    ]
    
    const noteTimer = setInterval(() => {
      if (meetingNotes.length < 8) {
        const randomNote = instructionNotes[Math.floor(Math.random() * instructionNotes.length)]
        if (!meetingNotes.includes(randomNote)) {
          setMeetingNotes(prev => [...prev, randomNote])
        }
      }
    }, 20000)
    
    return () => clearInterval(noteTimer)
  }, [meetingNotes])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    setShowEndCallOptions(true)
  }

  const downloadPrescription = () => {
    alert('Prescription downloaded as PDF')
    router.push('/')
  }

  const downloadNotes = () => {
    alert('Meeting notes downloaded')
    router.push('/')
  }

  const shareMedicalInfo = () => {
    const member = familyMembers.find(m => m.id === selectedMember)
    alert(`Shared medical information for ${member?.name} with Dr. Sarah Johnson`)
    setShowShareMedical(false)
  }

  const addNote = () => {
    if (!newNote.trim()) return
    setMeetingNotes(prev => [...prev, `Manual: ${newNote}`])
    setNewNote('')
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col relative">
      {/* Status Bar - STANDARD FORMAT */}
      <div className="flex justify-between items-center px-4 py-1 text-black dark:text-white text-sm bg-gray-50 dark:bg-gray-800 pt-2">
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

      {/* Call Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Dr. Sarah Johnson</h1>
            <p className="text-xs text-red-500 dark:text-red-400">MD, Emergency Medicine</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">12 years experience</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          {isRecording && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-500 dark:text-red-400">REC</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-xs text-gray-900 dark:text-white">{formatDuration(callDuration)}</p>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 relative">
        {/* Doctor Video (Main) */}
        <div className="w-full h-full bg-white dark:bg-gray-700 flex items-center justify-center relative">
          {/* Video quality indicator */}
          <div className="absolute top-4 left-4 flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">HD</span>
          </div>

          {/* Connection quality bars */}
          <div className="absolute top-4 right-4 flex items-center space-x-1">
            <div className="w-1 h-3 bg-green-500 rounded"></div>
            <div className="w-1 h-4 bg-green-500 rounded"></div>
            <div className="w-1 h-5 bg-green-500 rounded"></div>
            <div className="w-1 h-3 bg-gray-500 rounded"></div>
          </div>
          
          <div className="text-center text-gray-900 dark:text-white relative z-10">
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <User className="w-12 h-12 text-gray-600 dark:text-gray-300" />
              {/* Speaking indicator */}
              {audioLevels > 30 && (
                <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping"></div>
              )}
            </div>
            <p className="text-lg font-medium">Dr. Sarah Johnson</p>
            <p className="text-sm text-red-500 dark:text-red-400">MD, Emergency Medicine</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">12 years experience</p>
            
            {/* Audio level indicator */}
            <div className="mt-3 flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded ${
                    audioLevels > (i * 20) ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'
                  } transition-colors duration-200`}
                  style={{
                    height: audioLevels > (i * 20) ? `${8 + i * 2}px` : '8px'
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Doctor Name Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            Dr. Sarah Johnson {audioLevels > 30 && <span className="text-green-400">🎤</span>}
          </div>
        </div>
        
        {/* Your Video (Bottom Right) */}
        <div className="absolute bottom-4 right-4 w-24 h-18 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center relative">
            {isVideoOn ? (
              <>
                <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
              </>
            ) : (
              <div className="text-gray-700 dark:text-white text-xs">Camera Off</div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-1 py-0.5 text-xs text-center">
              You {!isMuted && <span className="text-green-400">🎤</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-white dark:bg-gray-800 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMuted ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-gray-700 dark:text-white" />}
          </button>
          
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              !isVideoOn ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            {isVideoOn ? <Video className="w-5 h-5 text-gray-700 dark:text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
            <Camera className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
            <MessageSquare className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
            <Users className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
            <MoreVertical className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <button
            onClick={handleEndCall}
            className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Emergency Services Status - Combined Buttons */}
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowServiceDistances(true)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
          >
            <Truck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Track Services</span>
          </button>
          
          <button 
            onClick={() => setShowShareMedical(true)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-2 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
          >
            <Share className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Share Medical Info</span>
          </button>
        </div>
      </div>

      {/* Distance Popup for Emergency Services - INSIDE PHONE SCREEN */}
      {showServiceDistances && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-t-3xl w-full max-h-[70vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Track Services</h3>
                <button onClick={() => setShowServiceDistances(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">Current distance and ETA:</p>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Ambulance (108)</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">AMB-KA-2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-red-600">{emergencyServices.ambulance.distance} km</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ETA: {emergencyServices.ambulance.eta} mins</p>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Police (100)</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">POL-KA-1847</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-blue-600">{emergencyServices.police.distance} km</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ETA: {emergencyServices.police.eta} mins</p>
                    </div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">Fire Department (101)</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">FIRE-KA-0923</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-orange-600">{emergencyServices.fire.distance} km</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ETA: {emergencyServices.fire.eta} mins</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300 text-center">📍 All services notified of your location</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Instructions */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center text-sm">
            <FileText className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" />
            Doctor Instructions
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Live recording</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-3 max-h-24 overflow-y-auto scrollbar-hide">
          {meetingNotes.slice(-3).map((note, index) => (
            <div key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded p-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{formatDuration((meetingNotes.length - 3 + index) * 30)}</span>
              {note}
            </div>
          ))}
        </div>

        {/* Manual Note Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
            placeholder="Add your own note..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>

      {/* Share Medical Info Popup - INSIDE PHONE SCREEN */}
      {showShareMedical && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-t-3xl w-full max-h-[70vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Share Medical Information</h3>
                <button onClick={() => setShowShareMedical(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">Select family member to share medical records with doctor:</p>
              <div className="space-y-2">
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member.id)}
                    className={`w-full p-3 rounded-lg border-2 flex items-center justify-between ${
                      selectedMember === member.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {member.age} years • {member.bloodType} • {member.relation}
                      </p>
                    </div>
                    {selectedMember === member.id && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-2.5">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Medical records including health history, medications, and allergies will be shared with Dr. Sarah Johnson
                </p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowShareMedical(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg text-sm">
                  Cancel
                </button>
                <button onClick={shareMedicalInfo} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg text-sm">
                  Share Information
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End Call Options Popup - INSIDE PHONE SCREEN */}
      {showEndCallOptions && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 pt-3 pb-2 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">End Call</h3>
                <button onClick={() => setShowEndCallOptions(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Download consultation documents:</p>
              
              <button
                onClick={downloadPrescription}
                className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg flex items-center justify-between hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Download Prescription</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">PDF format</p>
                  </div>
                </div>
                <span className="text-blue-600 dark:text-blue-400 text-xs">Download</span>
              </button>

              <button
                onClick={downloadNotes}
                className="w-full p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg flex items-center justify-between hover:bg-green-100 dark:hover:bg-green-900/30"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Download Meeting Notes</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">All doctor instructions</p>
                  </div>
                </div>
                <span className="text-green-600 dark:text-green-400 text-xs">Download</span>
              </button>

              <div className="pt-2">
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg text-sm"
                >
                  End Call & Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            className="flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-purple-500 p-1"
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