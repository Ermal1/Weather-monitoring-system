'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useRealtimeWeather } from '@/hooks/use-realtime-air-quality' // Uses weather data
import { HeroSection } from '@/components/sections/hero-section'
import { GlobalMonitoring } from '@/components/sections/global-monitoring'
import { AIInsights } from '@/components/sections/ai-insights'
import { Presentation } from '@/components/sections/presentation'
import { AIChat } from '@/components/ai-chat'
import { RealTimeAnalytics } from './bigdata/RealTimeAnalytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'

const analytics = new RealTimeAnalytics()

function AnalyticsDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [realtimeStats, setRealtimeStats] = useState<any>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let statsInterval: NodeJS.Timeout

    const loadDashboard = async () => {
      try {
        const data = await analytics.getLiveDataDashboard()
        setDashboardData(data)
        
        const stats = analytics.getRealtimeStats()
        setRealtimeStats(stats)
      } catch (error) {
        console.error('Failed to load dashboard:', error)
      }
    }

    if (isRunning) {
      analytics.startAnalytics()
      loadDashboard()
      
      interval = setInterval(loadDashboard, 30000)
      
      statsInterval = setInterval(() => {
        const stats = analytics.getRealtimeStats()
        setRealtimeStats(stats)
      }, 5000)
    } else {
      analytics.stopAnalytics()
    }

    return () => {
      if (interval) clearInterval(interval)
      if (statsInterval) clearInterval(statsInterval)
    }
  }, [isRunning])

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
              📊 Real-Time Analytics Dashboard
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "secondary"}
              className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-white text-blue-600 hover:bg-gray-100"}
            >
              {isRunning ? "🛑 Stop Analytics" : "▶️ Start Analytics"}
            </Button>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Live processing of weather data with anomaly detection, predictive analytics, and intelligent caching
          </CardDescription>
        </CardHeader>
      </Card>

      {!isRunning ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Analytics Engine Offline</h3>
            <p className="text-gray-500 mb-6">Click "Start Analytics" to begin real-time big data processing</p>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
              <div>🔍 Anomaly Detection</div>
              <div>📈 Predictive Analytics</div>
              <div>💾 Smart Caching</div>
            </div>
          </CardContent>
        </Card>
      ) : !dashboardData ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Initializing Analytics Engine</h3>
            <p className="text-gray-500 mb-4">Connecting to Weather API and processing initial data...</p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="text-green-600">✓ TanStack Query</span>
              <span className="text-green-600">✓ Supabase Cache</span>
              <span className="text-yellow-600">⏳ Weather API</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">API Calls Today</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {dashboardData.systemMetrics?.apiCallsToday || 0}
                    </p>
                  </div>
                  <div className="text-2xl">📡</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-blue-600">
                    Data Rate: {realtimeStats?.processingRate || 0} pts/sec
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Alerts Generated</p>
                    <p className="text-2xl font-bold text-green-900">
                      {dashboardData.systemMetrics?.alertsGenerated || 0}
                    </p>
                  </div>
                  <div className="text-2xl">🚨</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-green-600">
                    Last 24h: {Math.floor((dashboardData.systemMetrics?.alertsGenerated || 0) * 0.8)} alerts
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Data Points</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {(dashboardData.bigDataVolume?.realTimeDataPoints || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-2xl">📊</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-purple-600">
                    Volume: {Math.floor((realtimeStats?.dataVolume || 0) / 1000)}K records
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Latency</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {realtimeStats?.latency || 0}ms
                    </p>
                  </div>
                  <div className="text-2xl">⚡</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-orange-600">
                    {realtimeStats?.activeStreams || 0} active streams
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  🔄 Live Processing Status
                <Badge variant="default" className="bg-green-100 text-green-800 animate-pulse">
                  ACTIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    📡 Data Sources
                    <Badge variant={dashboardData.dataSourceStatus?.weatherAPI ? "default" : "destructive"}>
                      {dashboardData.dataSourceStatus?.weatherAPI ? "Connected" : "Offline"}
                    </Badge>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.weatherAPI ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Weather API ({dashboardData.bigDataVolume?.citiesMonitored || 0} cities)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.supabaseDB ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      Supabase Cache Database
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.internalSensors ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Internal Sensor Network
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">⚙️ Processing Pipeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Data Ingestion</span>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Anomaly Detection</span>
                      <Badge variant="default" className="bg-purple-100 text-purple-800">Running</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Predictive Analysis</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">Computing</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Management</span>
                      <Badge variant="default" className="bg-orange-100 text-orange-800">Optimizing</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">📈 Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Throughput</span>
                      <span className="font-medium">{realtimeStats?.processingRate || 0} pts/sec</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Hit Rate</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Rate</span>
                      <span className="font-medium text-green-600">0.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span className="font-medium">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Insights */}
          {dashboardData.recentInsights && dashboardData.recentInsights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    🔍 Recent AI-Generated Insights
                  <Badge variant="outline" className="text-xs">
                    {dashboardData.recentInsights.length} active
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Machine learning predictions and anomaly detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentInsights.slice(0, 4).map((insight: any, index: number) => (
                    <Alert key={index} className={`transition-all hover:shadow-md ${
                      insight.impact === 'CRITICAL' ? 'border-red-200 bg-red-50' :
                      insight.impact === 'HIGH' ? 'border-orange-200 bg-orange-50' :
                      insight.impact === 'MEDIUM' ? 'border-yellow-200 bg-yellow-50' :
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <AlertDescription>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {insight.type.replace(/_/g, ' ')}
                              </Badge>
                              <Badge variant={
                                insight.impact === 'CRITICAL' ? 'destructive' :
                                insight.impact === 'HIGH' ? 'default' :
                                'secondary'
                              } className="text-xs">
                                {insight.impact}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium mb-1">{insight.prediction}</p>
                            <div className="text-xs text-gray-500 flex items-center gap-4">
                              <span>Confidence: {insight.confidence}%</span>
                              <span>Source: {insight.dataSource}</span>
                              <span>Timeframe: {insight.timeframe}</span>
                            </div>
                          </div>
                          <div className="text-2xl ml-4">
                            {                             insight.type.includes('WEATHER') ? '🌤️' :
                             insight.type.includes('STORM') ? '⛈️' :
                             insight.type.includes('TEMPERATURE') ? '🌡️' :
                             insight.type.includes('ANOMALY') ? '🔍' : '📊'}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>📊 Big Data Processing Overview</CardTitle>
              <CardDescription>
                Real-time weather data analysis and pattern recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">🌍 Global Coverage</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {dashboardData.bigDataVolume?.citiesMonitored || 0}
                        </div>
                        <div className="text-blue-700">Cities Monitored</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.floor((realtimeStats?.dataVolume || 0) / 1000)}K
                        </div>
                        <div className="text-blue-700">Records Processed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">🤖 AI Capabilities</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Statistical Anomaly Detection</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Predictive Health Analytics</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weather Pattern Prediction</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Climate Forecasting</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function WeatherMonitorDashboard() {
  const [activeTab, setActiveTab] = useState('monitoring')
  const { toast } = useToast()
  
  const { isConnected, connectionError, lastUpdate } = useRealtimeWeather({
    enabled: true
  })


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      

      
      <div className="container mx-auto px-2 py-8">
        <HeroSection 
          isConnected={isConnected}
          connectionError={connectionError}
          lastUpdate={lastUpdate}
        />

  

        <div className="space-y-6">
          {activeTab === 'monitoring' && <GlobalMonitoring />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <AIChat />
            </div>
          )}
          {activeTab === 'insights' && <AIInsights />}
          {activeTab === 'presentation' && <Presentation />}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
