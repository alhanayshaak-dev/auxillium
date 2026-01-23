'use client'

import { useState } from 'react'
import { Building2, FileText, CreditCard, Pill, UserCheck, Calendar, Download, Upload, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'
import ProgressBar from './ProgressBar'

interface EMRIntegration {
  hospitalName: string
  status: 'connected' | 'pending' | 'failed'
  lastSync: Date
  recordsCount: number
  dataTypes: string[]
}

interface LabResult {
  id: string
  testName: string
  labName: string
  date: Date
  status: 'completed' | 'pending' | 'processing'
  results: Array<{
    parameter: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'high' | 'low' | 'critical'
  }>
  autoImported: boolean
}

interface InsuranceClaim {
  id: string
  claimNumber: string
  provider: string
  amount: number
  status: 'approved' | 'pending' | 'rejected' | 'processing'
  submissionDate: Date
  approvalDate?: Date
  description: string
  preAuthRequired: boolean
  autoSubmitted: boolean
}

interface PrescriptionRefill {
  id: string
  medicationName: string
  pharmacy: string
  quantity: string
  refillsRemaining: number
  lastRefillDate: Date
  nextRefillDate: Date
  autoRefillEnabled: boolean
  status: 'active' | 'expired' | 'pending'
}

interface SpecialistReferral {
  id: string
  referringDoctor: string
  specialistType: string
  reason: string
  urgency: 'routine' | 'urgent' | 'emergency'
  status: 'pending' | 'scheduled' | 'completed'
  appointmentDate?: Date
  notes?: string
}

interface ProfessionalHealthcareIntegrationProps {
  className?: string
}

export default function ProfessionalHealthcareIntegration({ className = '' }: ProfessionalHealthcareIntegrationProps) {
  const [activeTab, setActiveTab] = useState<'emr' | 'labs' | 'insurance' | 'prescriptions' | 'referrals'>('emr')

  const [emrIntegrations] = useState<EMRIntegration[]>([
    {
      hospitalName: 'Apollo Hospitals',
      status: 'connected',
      lastSync: new Date('2024-01-20T08:30:00'),
      recordsCount: 45,
      dataTypes: ['Lab Results', 'Prescriptions', 'Discharge Summaries', 'Imaging Reports']
    },
    {
      hospitalName: 'Fortis Healthcare',
      status: 'connected',
      lastSync: new Date('2024-01-19T14:20:00'),
      recordsCount: 23,
      dataTypes: ['Lab Results', 'Consultation Notes', 'Prescriptions']
    },
    {
      hospitalName: 'Max Healthcare',
      status: 'pending',
      lastSync: new Date('2024-01-15T10:00:00'),
      recordsCount: 0,
      dataTypes: []
    }
  ])

  const [labResults] = useState<LabResult[]>([
    {
      id: 'lab-001',
      testName: 'Complete Blood Count (CBC)',
      labName: 'SRL Diagnostics',
      date: new Date('2024-01-18'),
      status: 'completed',
      autoImported: true,
      results: [
        { parameter: 'Hemoglobin', value: '13.5', unit: 'g/dL', normalRange: '12.0-15.5', status: 'normal' },
        { parameter: 'White Blood Cells', value: '8.2', unit: '10³/μL', normalRange: '4.0-11.0', status: 'normal' },
        { parameter: 'Platelets', value: '280', unit: '10³/μL', normalRange: '150-450', status: 'normal' }
      ]
    },
    {
      id: 'lab-002',
      testName: 'HbA1c (Diabetes)',
      labName: 'Dr. Lal PathLabs',
      date: new Date('2024-01-15'),
      status: 'completed',
      autoImported: true,
      results: [
        { parameter: 'HbA1c', value: '7.2', unit: '%', normalRange: '<7.0', status: 'high' },
        { parameter: 'Fasting Glucose', value: '145', unit: 'mg/dL', normalRange: '70-100', status: 'high' }
      ]
    },
    {
      id: 'lab-003',
      testName: 'Lipid Profile',
      labName: 'Metropolis Healthcare',
      date: new Date('2024-01-20'),
      status: 'processing',
      autoImported: false,
      results: []
    }
  ])

  const [insuranceClaims] = useState<InsuranceClaim[]>([
    {
      id: 'claim-001',
      claimNumber: 'CLM-2024-001234',
      provider: 'Star Health Insurance',
      amount: 15000,
      status: 'approved',
      submissionDate: new Date('2024-01-10'),
      approvalDate: new Date('2024-01-15'),
      description: 'Cardiology consultation and ECG',
      preAuthRequired: false,
      autoSubmitted: true
    },
    {
      id: 'claim-002',
      claimNumber: 'CLM-2024-001235',
      provider: 'HDFC ERGO Health',
      amount: 8500,
      status: 'processing',
      submissionDate: new Date('2024-01-18'),
      description: 'Diabetes management consultation',
      preAuthRequired: true,
      autoSubmitted: true
    },
    {
      id: 'claim-003',
      claimNumber: 'CLM-2024-001236',
      provider: 'Star Health Insurance',
      amount: 3200,
      status: 'pending',
      submissionDate: new Date('2024-01-20'),
      description: 'Lab tests - CBC and HbA1c',
      preAuthRequired: false,
      autoSubmitted: false
    }
  ])

  const [prescriptionRefills] = useState<PrescriptionRefill[]>([
    {
      id: 'rx-001',
      medicationName: 'Metformin 500mg',
      pharmacy: 'Apollo Pharmacy',
      quantity: '30 tablets',
      refillsRemaining: 2,
      lastRefillDate: new Date('2024-01-05'),
      nextRefillDate: new Date('2024-02-05'),
      autoRefillEnabled: true,
      status: 'active'
    },
    {
      id: 'rx-002',
      medicationName: 'Lisinopril 10mg',
      pharmacy: 'MedPlus',
      quantity: '30 tablets',
      refillsRemaining: 1,
      lastRefillDate: new Date('2024-01-10'),
      nextRefillDate: new Date('2024-02-10'),
      autoRefillEnabled: false,
      status: 'active'
    },
    {
      id: 'rx-003',
      medicationName: 'Atorvastatin 20mg',
      pharmacy: 'Netmeds',
      quantity: '30 tablets',
      refillsRemaining: 0,
      lastRefillDate: new Date('2023-12-15'),
      nextRefillDate: new Date('2024-01-15'),
      autoRefillEnabled: true,
      status: 'expired'
    }
  ])

  const [specialistReferrals] = useState<SpecialistReferral[]>([
    {
      id: 'ref-001',
      referringDoctor: 'Dr. Priya Sharma (General Physician)',
      specialistType: 'Endocrinologist',
      reason: 'Diabetes management optimization',
      urgency: 'routine',
      status: 'scheduled',
      appointmentDate: new Date('2024-01-25T10:00:00'),
      notes: 'HbA1c levels need specialist review'
    },
    {
      id: 'ref-002',
      referringDoctor: 'Dr. Rajesh Kumar (Cardiologist)',
      specialistType: 'Cardiac Surgeon',
      reason: 'Valve replacement consultation',
      urgency: 'urgent',
      status: 'pending',
      notes: 'Echo shows moderate aortic stenosis'
    },
    {
      id: 'ref-003',
      referringDoctor: 'Dr. Anita Patel (Endocrinologist)',
      specialistType: 'Ophthalmologist',
      reason: 'Diabetic retinopathy screening',
      urgency: 'routine',
      status: 'completed',
      appointmentDate: new Date('2024-01-12T14:30:00'),
      notes: 'Annual screening completed - no issues found'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
      case 'approved':
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'pending':
      case 'processing':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'failed':
      case 'rejected':
      case 'expired':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'scheduled':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 dark:text-green-400'
      case 'high': return 'text-red-600 dark:text-red-400'
      case 'low': return 'text-blue-600 dark:text-blue-400'
      case 'critical': return 'text-red-700 dark:text-red-300 font-bold'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const renderEMRIntegration = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Electronic Medical Records</h4>
        <Button variant="outline" size="sm">Connect Hospital</Button>
      </div>

      {emrIntegrations.map((emr, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{emr.hospitalName}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last sync: {emr.lastSync.toLocaleString()}
                </p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(emr.status)}`}>
              {emr.status}
            </span>
          </div>

          {emr.status === 'connected' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Records imported:</span>
                <span className="font-medium text-gray-900 dark:text-white">{emr.recordsCount}</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data types:</p>
                <div className="flex flex-wrap gap-1">
                  {emr.dataTypes.map((type, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Records
                </Button>
              </div>
            </div>
          )}

          {emr.status === 'pending' && (
            <div className="pt-2">
              <StatusIndicator
                status="warning"
                text="Connection pending"
                subtext="Hospital approval required for data access"
                size="sm"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderLabResults = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Lab Results Auto-Import</h4>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Manual Upload
        </Button>
      </div>

      {labResults.map((lab) => (
        <div key={lab.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">{lab.testName}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lab.labName} • {lab.date.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {lab.autoImported && (
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                  Auto-imported
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lab.status)}`}>
                {lab.status}
              </span>
            </div>
          </div>

          {lab.status === 'completed' && lab.results.length > 0 && (
            <div className="space-y-2">
              <h6 className="text-sm font-medium text-gray-900 dark:text-white">Results:</h6>
              {lab.results.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.parameter}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      (Normal: {result.normalRange})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${getResultStatusColor(result.status)}`}>
                      {result.value} {result.unit}
                    </span>
                    <div className={`text-xs ${getResultStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Share with Doctor
                </Button>
              </div>
            </div>
          )}

          {lab.status === 'processing' && (
            <StatusIndicator
              status="info"
              text="Results being processed"
              subtext="You'll be notified when results are ready"
              size="sm"
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderInsuranceClaims = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Insurance Claims</h4>
        <Button variant="outline" size="sm">Submit New Claim</Button>
      </div>

      {insuranceClaims.map((claim) => (
        <div key={claim.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {claim.claimNumber}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {claim.provider} • ₹{claim.amount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {claim.autoSubmitted && (
                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
                  Auto-submitted
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(claim.status)}`}>
                {claim.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">{claim.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Submitted:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {claim.submissionDate.toLocaleDateString()}
                </span>
              </div>
              {claim.approvalDate && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Approved:</span>
                  <span className="font-medium text-gray-900 dark:text-white ml-1">
                    {claim.approvalDate.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {claim.preAuthRequired && (
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ Pre-authorization required
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
            {claim.status === 'pending' && (
              <Button variant="primary" size="sm" className="flex-1">
                Track Status
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderPrescriptionRefills = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Prescription Auto-Refill</h4>
        <Button variant="outline" size="sm">Add Prescription</Button>
      </div>

      {prescriptionRefills.map((rx) => (
        <div key={rx.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {rx.medicationName}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {rx.pharmacy} • {rx.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {rx.autoRefillEnabled && (
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                  Auto-refill ON
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(rx.status)}`}>
                {rx.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Refills remaining:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {rx.refillsRemaining}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Next refill:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {rx.nextRefillDate.toLocaleDateString()}
                </span>
              </div>
            </div>

            {rx.status === 'expired' && (
              <StatusIndicator
                status="error"
                text="Prescription expired"
                subtext="Contact your doctor for a new prescription"
                size="sm"
              />
            )}

            {rx.refillsRemaining === 0 && rx.status === 'active' && (
              <StatusIndicator
                status="warning"
                text="No refills remaining"
                subtext="Contact your doctor for prescription renewal"
                size="sm"
              />
            )}
          </div>

          <div className="flex space-x-2">
            {rx.status === 'active' && rx.refillsRemaining > 0 && (
              <Button variant="primary" size="sm" className="flex-1">
                Order Refill
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1">
              {rx.autoRefillEnabled ? 'Disable Auto-refill' : 'Enable Auto-refill'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderSpecialistReferrals = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">Specialist Referrals</h4>
        <Button variant="outline" size="sm">Request Referral</Button>
      </div>

      {specialistReferrals.map((referral) => (
        <div key={referral.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {referral.specialistType}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Referred by {referral.referringDoctor}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                referral.urgency === 'emergency' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                referral.urgency === 'urgent' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {referral.urgency}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(referral.status)}`}>
                {referral.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Reason:</strong> {referral.reason}
            </p>
            
            {referral.notes && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Notes:</strong> {referral.notes}
              </p>
            )}

            {referral.appointmentDate && (
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Appointment:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {referral.appointmentDate.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {referral.status === 'pending' && (
              <Button variant="primary" size="sm" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            )}
            {referral.status === 'scheduled' && (
              <Button variant="outline" size="sm" className="flex-1">
                View Appointment
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1">
              Contact Specialist
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-blue-500" />
          Healthcare Integration
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-x-auto">
        {[
          { id: 'emr', label: 'EMR', icon: Building2 },
          { id: 'labs', label: 'Labs', icon: FileText },
          { id: 'insurance', label: 'Insurance', icon: CreditCard },
          { id: 'prescriptions', label: 'Rx', icon: Pill },
          { id: 'referrals', label: 'Referrals', icon: UserCheck }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'emr' && renderEMRIntegration()}
        {activeTab === 'labs' && renderLabResults()}
        {activeTab === 'insurance' && renderInsuranceClaims()}
        {activeTab === 'prescriptions' && renderPrescriptionRefills()}
        {activeTab === 'referrals' && renderSpecialistReferrals()}
      </div>
    </div>
  )
}