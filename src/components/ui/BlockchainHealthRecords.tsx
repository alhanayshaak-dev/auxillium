'use client'

import { useState } from 'react'
import { Shield, Lock, Eye, Share2, Download, CheckCircle, AlertTriangle, Clock, Key } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'

interface HealthRecord {
  id: string
  title: string
  type: 'lab_result' | 'prescription' | 'diagnosis' | 'imaging' | 'vaccination'
  date: Date
  provider: string
  hash: string
  verified: boolean
  encrypted: boolean
  sharedWith: string[]
  accessLog: Array<{
    accessor: string
    timestamp: Date
    action: 'view' | 'download' | 'share'
  }>
}

interface BlockchainHealthRecordsProps {
  className?: string
}

export default function BlockchainHealthRecords({ className = '' }: BlockchainHealthRecordsProps) {
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null)
  const [showAccessLog, setShowAccessLog] = useState(false)

  const [records] = useState<HealthRecord[]>([
    {
      id: 'rec-001',
      title: 'Blood Test Results - Complete Panel',
      type: 'lab_result',
      date: new Date('2024-01-15'),
      provider: 'City General Hospital',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      verified: true,
      encrypted: true,
      sharedWith: ['Dr. Smith', 'Insurance Provider'],
      accessLog: [
        { accessor: 'Dr. Smith', timestamp: new Date('2024-01-16T10:30:00'), action: 'view' },
        { accessor: 'Insurance Provider', timestamp: new Date('2024-01-17T14:20:00'), action: 'view' },
        { accessor: 'You', timestamp: new Date('2024-01-18T09:15:00'), action: 'download' }
      ]
    },
    {
      id: 'rec-002',
      title: 'Prescription - Lisinopril 10mg',
      type: 'prescription',
      date: new Date('2024-01-10'),
      provider: 'Dr. Johnson - Cardiology',
      hash: '0x9876543210fedcba0987654321abcdef',
      verified: true,
      encrypted: true,
      sharedWith: ['Pharmacy Plus', 'Emergency Contact'],
      accessLog: [
        { accessor: 'Pharmacy Plus', timestamp: new Date('2024-01-10T16:45:00'), action: 'view' },
        { accessor: 'You', timestamp: new Date('2024-01-11T08:30:00'), action: 'view' }
      ]
    },
    {
      id: 'rec-003',
      title: 'Chest X-Ray - Routine Checkup',
      type: 'imaging',
      date: new Date('2024-01-05'),
      provider: 'Metro Imaging Center',
      hash: '0xabcdef1234567890fedcba0987654321',
      verified: true,
      encrypted: true,
      sharedWith: ['Dr. Smith'],
      accessLog: [
        { accessor: 'Dr. Smith', timestamp: new Date('2024-01-06T11:20:00'), action: 'view' },
        { accessor: 'You', timestamp: new Date('2024-01-07T15:10:00'), action: 'view' }
      ]
    },
    {
      id: 'rec-004',
      title: 'COVID-19 Vaccination Record',
      type: 'vaccination',
      date: new Date('2023-12-20'),
      provider: 'Public Health Department',
      hash: '0x567890abcdef1234567890abcdef1234',
      verified: true,
      encrypted: true,
      sharedWith: ['Travel Authority', 'Employer'],
      accessLog: [
        { accessor: 'Travel Authority', timestamp: new Date('2024-01-12T13:45:00'), action: 'view' },
        { accessor: 'Employer', timestamp: new Date('2024-01-14T09:30:00'), action: 'view' }
      ]
    }
  ])

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_result': return '🧪'
      case 'prescription': return '💊'
      case 'diagnosis': return '🩺'
      case 'imaging': return '📷'
      case 'vaccination': return '💉'
      default: return '📄'
    }
  }

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'lab_result': return 'text-blue-600 dark:text-blue-400'
      case 'prescription': return 'text-green-600 dark:text-green-400'
      case 'diagnosis': return 'text-red-600 dark:text-red-400'
      case 'imaging': return 'text-purple-600 dark:text-purple-400'
      case 'vaccination': return 'text-orange-600 dark:text-orange-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="w-4 h-4" />
      case 'download': return <Download className="w-4 h-4" />
      case 'share': return <Share2 className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleShareRecord = (recordId: string) => {
    // In a real implementation, this would open a sharing dialog
    console.log('Sharing record:', recordId)
  }

  const handleDownloadRecord = (recordId: string) => {
    // In a real implementation, this would download the encrypted record
    console.log('Downloading record:', recordId)
  }

  const handleVerifyRecord = (recordId: string) => {
    // In a real implementation, this would verify the blockchain hash
    console.log('Verifying record on blockchain:', recordId)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-500" />
          Blockchain Health Records
        </h3>
        <Button variant="outline" size="sm">
          <Key className="w-4 h-4 mr-2" />
          Manage Keys
        </Button>
      </div>

      {/* Blockchain Status */}
      <div className="mb-4">
        <StatusIndicator
          status="success"
          text="Blockchain Network Connected"
          subtext="All records are cryptographically secured and verified"
          size="sm"
        />
      </div>

      {/* Records List */}
      <div className="space-y-3 mb-4">
        {records.map((record) => (
          <div key={record.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getRecordTypeIcon(record.type)}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {record.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {record.provider} • {record.date.toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      {record.verified ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {record.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lock className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Encrypted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => handleVerifyRecord(record.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Verify on blockchain"
                >
                  <Shield className="w-4 h-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleShareRecord(record.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Share record"
                >
                  <Share2 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDownloadRecord(record.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Download record"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Blockchain Hash */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Blockchain Hash:</span>
                <button
                  onClick={() => navigator.clipboard.writeText(record.hash)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Copy
                </button>
              </div>
              <code className="text-xs text-gray-700 dark:text-gray-300 font-mono break-all">
                {record.hash}
              </code>
            </div>

            {/* Shared With */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Shared with: </span>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {record.sharedWith.join(', ')}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedRecord(record)
                  setShowAccessLog(true)
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Access Log
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Access Log Modal */}
      {showAccessLog && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Access Log
              </h4>
              <button
                onClick={() => setShowAccessLog(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                {selectedRecord.title}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hash: {selectedRecord.hash.substring(0, 20)}...
              </p>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {selectedRecord.accessLog.map((log, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="text-gray-500 dark:text-gray-400">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {log.accessor}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {log.action} • {log.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => setShowAccessLog(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {records.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Records</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {records.filter(r => r.verified).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Verified</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {records.reduce((sum, r) => sum + r.sharedWith.length, 0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Shares</p>
        </div>
      </div>
    </div>
  )
}