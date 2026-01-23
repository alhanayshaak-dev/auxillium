'use client'

import { useState, useEffect } from 'react'
import { Watch, Smartphone, Activity, Heart, Zap, Wifi, WifiOff } from 'lucide-react'
import { Button } from './Button'
import StatusIndicator from './StatusIndicator'

interface WearableDevice {
  id: string
  name: string
  type: 'smartwatch' | 'fitness_tracker' | 'health_monitor'
  connected: boolean
  batteryLevel: number
  lastSync: Date
  metrics: {
    heartRate?: number
    steps?: number
    calories?: number
    sleepHours?: number
  }
}

interface WearableIntegrationProps {
  className?: string
}

export default function WearableIntegration({ className = '' }: WearableIntegrationProps) {
  const [devices, setDevices] = useState<WearableDevice[]>([
    {
      id: 'apple-watch-1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      connected: true,
      batteryLevel: 78,
      lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      metrics: {
        heartRate: 72,
        steps: 8432,
        calories: 1847,
        sleepHours: 7.5
      }
    },
    {
      id: 'fitbit-1',
      name: 'Fitbit Charge 5',
      type: 'fitness_tracker',
      connected: false,
      batteryLevel: 23,
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      metrics: {
        steps: 6234,
        calories: 1456
      }
    }
  ])

  const [isScanning, setIsScanning] = useState(false)

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch': return Watch
      case 'fitness_tracker': return Activity
      case 'health_monitor': return Heart
      default: return Smartphone
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500'
    if (level > 20) return 'text-yellow-500'
    return 'text-red-500'
  }

  const formatLastSync = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const handleScanDevices = async () => {
    setIsScanning(true)
    // Simulate device scanning
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsScanning(false)
  }

  const handleConnectDevice = async (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: true, lastSync: new Date() }
        : device
    ))
  }

  const handleDisconnectDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: false }
        : device
    ))
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Wearable Devices
        </h3>
        <Button
          onClick={handleScanDevices}
          variant="outline"
          size="sm"
          disabled={isScanning}
          className="flex items-center space-x-2"
        >
          <Activity className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Scan'}</span>
        </Button>
      </div>

      <div className="space-y-3">
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type)
          
          return (
            <div key={device.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <DeviceIcon className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {device.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last sync: {formatLastSync(device.lastSync)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {device.connected ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-gray-400" />
                    )}
                    <Zap className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                    <span className={`text-sm ${getBatteryColor(device.batteryLevel)}`}>
                      {device.batteryLevel}%
                    </span>
                  </div>
                  
                  {device.connected ? (
                    <Button
                      onClick={() => handleDisconnectDevice(device.id)}
                      variant="outline"
                      size="sm"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleConnectDevice(device.id)}
                      variant="primary"
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>

              {device.connected && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  {device.metrics.heartRate && (
                    <div className="text-center">
                      <Heart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.metrics.heartRate} BPM
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Heart Rate</p>
                    </div>
                  )}
                  
                  {device.metrics.steps && (
                    <div className="text-center">
                      <Activity className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.metrics.steps.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Steps</p>
                    </div>
                  )}
                  
                  {device.metrics.calories && (
                    <div className="text-center">
                      <Zap className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.metrics.calories}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                    </div>
                  )}
                  
                  {device.metrics.sleepHours && (
                    <div className="text-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-1"></div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.metrics.sleepHours}h
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sleep</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {devices.length === 0 && (
        <StatusIndicator
          status="info"
          text="No wearable devices found"
          subtext="Scan for devices to start tracking your health metrics"
        />
      )}
    </div>
  )
}