"use client"

import { useState, useEffect } from "react"
import { BigDataSystemManager } from "../core/BigDataSystemManager"
import { WeatherProcessingPipeline } from "../core/PolymorphismDemo"
import { supabase } from "../../lib/supabase"
import {
  Activity,
  Zap,
  Car,
  Droplets,
  Users,
  AlertTriangle,
  CheckCircle,
  Play,
  Square,
  TrendingUp,
  Settings,
  Database,
  Cpu,
} from "lucide-react"

export function BigDataDashboard() {
  const [systemManager] = useState(() => BigDataSystemManager.getInstance())
  const [polymorphismDemo] = useState(() => new WeatherProcessingPipeline())
  const [metrics, setMetrics] = useState(() => systemManager.getSystemMetrics())
  const [isProcessing, setIsProcessing] = useState(false)
  const [recentEvents, setRecentEvents] = useState<any[]>([])
  const [deviceStats, setDeviceStats] = useState({ online: 0, total: 0 })
  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 0,
    recordsProcessed: 0,
    processingRate: 0,
    dataVolume: 0,
  })

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const { data: events } = await supabase
        .from("system_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (events) {
        setRecentEvents(events)
      }

      const { data: devices } = await supabase.from("devices").select("status")

      if (devices) {
        const online = devices.filter((d) => d.status === "ONLINE").length
        setDeviceStats({ online, total: devices.length })
      }

      // Simulate processing statistics
      setProcessingStats({
        recordsProcessed: Math.floor(Math.random() * 10000) + 50000,
        processingRate: Math.floor(Math.random() * 1000) + 2000,
        dataVolume: Math.floor(Math.random() * 500) + 1000,
        totalProcessed: Math.floor(Math.random() * 100000) + 50000,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const handleStartProcessing = async () => {
    systemManager.startBigDataProcessing()
    setIsProcessing(true)
    updateMetrics()

    // Add system event to database
    await supabase.from("system_events").insert({
      event_type: "SYSTEM_STARTED",
      severity: "INFO",
      source: "BigDataDashboard",
      timestamp: new Date().toISOString(),
      event_data: { description: "Big data processing system started" }
    })

    loadDashboardData()
  }

  const handleStopProcessing = async () => {
    systemManager.stopBigDataProcessing()
    setIsProcessing(false)
    updateMetrics()

    // Add system event to database
    await supabase.from("system_events").insert({
      event_type: "SYSTEM_STOPPED",
      severity: "WARNING",
      source: "BigDataDashboard",
      timestamp: new Date().toISOString(),
      event_data: { description: "Big data processing system stopped" }
    })

    loadDashboardData()
  }

  const handleScaleSystem = async (nodes: number) => {
    systemManager.scaleSystem(nodes)
    updateMetrics()

    await supabase.from("system_events").insert({
      event_type: "SYSTEM_SCALED",
      severity: "INFO",
      source: "BigDataDashboard",
      timestamp: new Date().toISOString(),
      event_data: { description: `System scaled to ${nodes} nodes` }
    })

    loadDashboardData()
  }

  const updateMetrics = () => {
    setMetrics(systemManager.getSystemMetrics())
  }

  const handlePolymorphismDemo = async () => {
    setIsProcessing(true)
    
    try {
      // Fetch real weather data for polymorphism demonstration
      const response = await fetch('/api/weather?limit=4')
      const weatherData = await response.json()
      
      if (weatherData.length > 0) {
        // Demonstrate real-world polymorphism with actual weather data
        const results = await polymorphismDemo.demonstrateRealWorldPolymorphism(weatherData)
        
        console.log("🌍 REAL-WORLD POLYMORPHISM RESULTS:", results)
        
        setProcessingStats({
          totalProcessed: weatherData.length,
          recordsProcessed: results.insights.health.totalRecords,
          processingRate: (results as any).processingRate ?? 0,
          dataVolume: (results as any).dataVolume ?? 0,
        })

        await supabase.from("system_events").insert({
          event_type: "POLYMORPHISM_DEMO",
          severity: "INFO",
          source: "BigDataDashboard",
          timestamp: new Date().toISOString(),
          event_data: { 
            description: `Real-world polymorphism: ${results.summary}`,
            recommendations: results.recommendations.slice(0, 3),
            insights: results.insights
          }
        })

        alert(
          `Real-world polymorphism demonstrated!\n\n` +
          `${results.summary}\n\n` +
          `Key insights:\n` +
          `• Health Risk Score: ${results.insights.health.averageRiskScore}/100\n` +
          `• Traffic Impact: ${results.insights.traffic.averageTrafficImpact}/100\n` +
          `• Energy Efficiency: ${results.insights.energy.averageEfficiencyScore}/100\n\n` +
          `Top recommendations:\n${results.recommendations.slice(0, 3).map(r => `• ${r}`).join('\n')}`
        )
      } else {
        alert("No weather data available for demonstration")
      }
    } catch (error) {
      console.error("Error in polymorphism demo:", error)
      alert("Error running polymorphism demonstration")
    } finally {
      setIsProcessing(false)
      loadDashboardData()
    }
  }

  const handleUndo = async () => {
    const success = systemManager.undoLastOperation()
    if (success) {
      updateMetrics()
      await supabase.from("system_events").insert({
        event_type: "OPERATION_UNDONE",
        severity: "INFO",
        source: "BigDataDashboard",
        timestamp: new Date().toISOString(),
        event_data: { description: "Last operation was undone successfully" }
      })
      loadDashboardData()
      alert("Last operation undone successfully!")
    } else {
      alert("No operations to undo")
    }
  }

  const handleRedo = async () => {
    const success = systemManager.redoLastOperation()
    if (success) {
      updateMetrics()
      await supabase.from("system_events").insert({
        event_type: "OPERATION_REDONE",
        severity: "INFO",
        source: "BigDataDashboard",
        timestamp: new Date().toISOString(),
        event_data: { description: "Operation was redone successfully" }
      })
      loadDashboardData()
      alert("Operation redone successfully!")
    } else {
      alert("No operations to redo")
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-600 bg-red-50 border-red-200"
      case "ERROR":
        return "text-red-500 bg-red-50 border-red-200"
      case "WARNING":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{isProcessing ? "ACTIVE" : "STANDBY"}</p>
            </div>
            <div className={`p-3 rounded-full ${isProcessing ? "bg-green-100" : "bg-gray-100"}`}>
              {isProcessing ? (
                <Activity className="h-6 w-6 text-green-600" />
              ) : (
                <Square className="h-6 w-6 text-gray-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected Devices</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {deviceStats.online}/{deviceStats.total}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {processingStats.processingRate.toLocaleString()}/sec
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Cpu className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Volume</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{processingStats.dataVolume.toLocaleString()} MB</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Database className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Controls</h3>
          <div className="space-y-3">
            <button
              onClick={handleStartProcessing}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="h-4 w-4" />
              {isProcessing ? "Processing Active" : "Start Data Processing"}
            </button>

            <button
              onClick={handleStopProcessing}
              disabled={!isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Square className="h-4 w-4" />
              Stop Processing
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleScaleSystem(8)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Scale Up
              </button>
              <button
                onClick={() => handleScaleSystem(2)}
                className="flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Scale Down
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Operations</h3>
          <div className="space-y-3">
            <button
              onClick={handlePolymorphismDemo}
              disabled={isProcessing}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Activity className="h-4 w-4" />
              {isProcessing ? "Running Demo..." : "🔄 Demonstrate Polymorphism"}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleUndo}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={handleRedo}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Redo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-3">
            <Car className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Traffic</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">Normal</p>
          <p className="text-sm text-gray-600">Average flow: 65%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-5 w-5 text-yellow-600" />
            <h4 className="font-semibold text-gray-900">Energy</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">Optimized</p>
          <p className="text-sm text-gray-600">Efficiency: 87%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-3">
            <Droplets className="h-5 w-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900">Water</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">Excellent</p>
          <p className="text-sm text-gray-600">Quality: 94%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Services</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Active requests</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Events</h3>
        <div className="space-y-3">
          {recentEvents.length > 0 ? (
            recentEvents.map((event, index) => (
              <div key={event.id || index} className={`p-4 rounded-lg border ${getSeverityColor(event.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{event.event_type.replace(/_/g, " ")}</p>
                    <p className="text-sm mt-1">{event.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {event.severity === "CRITICAL" && <AlertTriangle className="h-4 w-4" />}
                    <span>{new Date(event.created_at).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No recent events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
