'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useRealtimeWeather } from '@/hooks/use-realtime-air-quality'
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
      <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-2xl shadow-emerald-500/30 border-emerald-400/40">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
              📊 Real-Time Analytics Dashboard
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "secondary"}
              className={isRunning ? "bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/50" : "bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"}
            >
              {isRunning ? "🛑 Stop Analytics" : "▶️ Start Analytics"}
            </Button>
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Live processing of weather data with anomaly detection, predictive analytics, and intelligent caching
          </CardDescription>
        </CardHeader>
      </Card>

      {!isRunning ? (
        <Card className="border-dashed border-2 border-emerald-500/30 bg-slate-900/60 backdrop-blur-xl">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-300">Analytics Engine Offline</h3>
            <p className="text-slate-400 mb-6">Click "Start Analytics" to begin real-time big data processing</p>
            <div className="grid grid-cols-3 gap-4 text-sm text-slate-500">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">🔍 Anomaly Detection</div>
              <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">📈 Predictive Analytics</div>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">💾 Smart Caching</div>
            </div>
          </CardContent>
        </Card>
      ) : !dashboardData ? (
        <Card className="bg-slate-900/60 backdrop-blur-xl border-emerald-500/30">
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-emerald-300">Initializing Analytics Engine</h3>
            <p className="text-slate-400 mb-4">Connecting to Weather API and processing initial data...</p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="text-emerald-400">✓ TanStack Query</span>
              <span className="text-emerald-400">✓ Supabase Cache</span>
              <span className="text-amber-400">⏳ Weather API</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/40 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-cyan-300">API Calls Today</p>
                    <p className="text-2xl font-bold text-cyan-200">
                      {dashboardData.systemMetrics?.apiCallsToday || 0}
                    </p>
                  </div>
                  <div className="text-2xl">📡</div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-cyan-400/80">
                    Data Rate: {realtimeStats?.processingRate || 0} pts/sec
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/40 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-300">Alerts Generated</p>
                    <p className="text-2xl font-bold text-emerald-200">
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

          <Card className="bg-slate-900/60 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-300">
                  🔄 Live Processing Status
                <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 animate-pulse backdrop-blur-sm">
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
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.weatherAPI ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></div>
                      Weather API ({dashboardData.bigDataVolume?.citiesMonitored || 0} cities)
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-teal-500/10">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.supabaseDB ? 'bg-teal-400 animate-pulse' : 'bg-rose-400'}`}></div>
                      Supabase Cache Database
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-cyan-500/10">
                      <div className={`w-2 h-2 rounded-full ${dashboardData.dataSourceStatus?.internalSensors ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></div>
                      Internal Sensor Network
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-teal-300">⚙️ Processing Pipeline</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-cyan-500/10">
                      <span>Data Ingestion</span>
                      <Badge variant="default" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/40">Active</Badge>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-violet-500/10">
                      <span>Anomaly Detection</span>
                      <Badge variant="default" className="bg-violet-500/20 text-violet-300 border-violet-400/40">Running</Badge>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                      <span>Predictive Analysis</span>
                      <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40">Computing</Badge>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-amber-500/10">
                      <span>Cache Management</span>
                      <Badge variant="default" className="bg-amber-500/20 text-amber-300 border-amber-400/40">Optimizing</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-cyan-300">📈 Performance Metrics</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-teal-500/10">
                      <span>Throughput</span>
                      <span className="font-medium text-teal-300">{realtimeStats?.processingRate || 0} pts/sec</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                      <span>Cache Hit Rate</span>
                      <span className="font-medium text-emerald-300">85%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                      <span>Error Rate</span>
                      <span className="font-medium text-emerald-300">0.2%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-cyan-500/10">
                      <span>Uptime</span>
                      <span className="font-medium text-cyan-300">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Insights */}
          {dashboardData.recentInsights && dashboardData.recentInsights.length > 0 && (
            <Card className="bg-slate-900/60 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-300">
                    🔍 Recent AI-Generated Insights
                  <Badge variant="outline" className="text-xs bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
                    {dashboardData.recentInsights.length} active
                  </Badge>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Machine learning predictions and anomaly detection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentInsights.slice(0, 4).map((insight: any, index: number) => (
                    <Alert key={index} className={`transition-all hover:shadow-lg hover:shadow-emerald-500/10 ${
                      insight.impact === 'CRITICAL' ? 'border-rose-500/40 bg-gradient-to-r from-rose-900/40 to-red-900/40 backdrop-blur-sm' :
                      insight.impact === 'HIGH' ? 'border-orange-500/40 bg-gradient-to-r from-orange-900/40 to-amber-900/40 backdrop-blur-sm' :
                      insight.impact === 'MEDIUM' ? 'border-amber-500/40 bg-gradient-to-r from-amber-900/40 to-yellow-900/40 backdrop-blur-sm' :
                      'border-cyan-500/40 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-sm'
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
                            <div className="text-xs text-slate-400 flex items-center gap-4">
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

          <Card className="bg-slate-900/60 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-emerald-300">📊 Big Data Processing Overview</CardTitle>
              <CardDescription className="text-slate-400">
                Real-time weather data analysis and pattern recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-300">🌍 Global Coverage</h4>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-cyan-300">
                          {dashboardData.bigDataVolume?.citiesMonitored || 0}
                        </div>
                        <div className="text-cyan-200/80">Cities Monitored</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-300">
                          {Math.floor((realtimeStats?.dataVolume || 0) / 1000)}K
                        </div>
                        <div className="text-cyan-200/80">Records Processed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-violet-300">🤖 AI Capabilities</h4>
                  <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-4 rounded-xl border border-violet-400/30 backdrop-blur-sm">
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                        <span>Statistical Anomaly Detection</span>
                        <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                        <span>Predictive Health Analytics</span>
                        <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                        <span>Weather Pattern Prediction</span>
                        <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
                        <span>Climate Forecasting</span>
                        <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40">Active</Badge>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950">
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
