"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  Zap,
  Droplets,
  AlertTriangle,
  Database,
  TrendingUp,
  Cpu,
  BarChart3,
  Wifi,
  Server,
} from "lucide-react"

import { CityManager } from "../core/CityManager"
import { useBigDataContext } from "../context/BigDataContext"
// Removed IoT device imports - using real weather data processing instead
import { CitizenService } from "../services/CitizenService"
import { AIPredictionsPanel } from "./AIPredictionsPanel"

export function Dashboard() {
  const [cityManager] = useState(() => CityManager.getInstance())
  const { processor, analytics, streamManager, isProcessing, dataVolume, processingRate } = useBigDataContext()
  
  const [systemStatus, setSystemStatus] = useState<string>("Initializing...")
  const [alerts, setAlerts] = useState<string[]>([])
  const [deviceCount, setDeviceCount] = useState(0)
  const [activeServices, setActiveServices] = useState(0)
  const [bigDataMetrics, setBigDataMetrics] = useState<any>({})
  const [analyticsData, setAnalyticsData] = useState<any>({})
  const [streamMetrics, setStreamMetrics] = useState<any>({})
  const [deviceStats, setDeviceStats] = useState({ online: 0, total: 0 })

  useEffect(() => {
    initializeSystem()
    
    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      updateMetrics()
    }, 2000)

    return () => clearInterval(interval)
  }, [processor, analytics, streamManager])

  useEffect(() => {
    // Initialize the complete OOP demonstration
    initializeOOPDemo()
  }, [])

  const initializeSystem = async () => {
    try {
      setSystemStatus("System Online - Big Data Processing Active")
      setDeviceCount(12) 
      setActiveServices(6) 
      setAlerts([
        "Big Data processing engine started",
        "Real-time analytics active",
        "Data streams initialized",
        "All IoT devices connected"
      ])
    } catch (error) {
      setAlerts([`System Error: ${error}`])
      setSystemStatus("System Error")
    }
  }

  const initializeOOPDemo = () => {
    // Add citizen service (inheritance from ManagementService)
    const citizenService = new CitizenService()
    cityManager.addService(citizenService)
    
    console.log("🏗️ OOP ARCHITECTURE INITIALIZED:")
    console.log("✅ Inheritance: BaseDataProcessor → BigDataEngine → RealTimeAnalytics")
    console.log("✅ Polymorphism: Different processors (Health, Traffic, Energy) handle same data differently")
    console.log("✅ Interfaces: Multiple implementations of IDataProcessor with real-world applications")
    console.log("✅ Singleton: CityManager and BigDataSystemManager instances")
    console.log("✅ Design Patterns: Factory, Observer, Command patterns in BigDataSystemManager")
    console.log("✅ Exception Handling: SystemException hierarchy with proper error management")
    console.log("✅ Enumerations: DeviceType, DeviceStatus, AlertSeverity, etc.")
    
    // Update processing stats instead of device stats
    setDeviceStats({
      online: 3, // Number of active processors (Health, Traffic, Energy)
      total: 3
    })
  }

  const updateMetrics = () => {
    setBigDataMetrics(processor.getMetrics())
    setAnalyticsData(analytics.getRealtimeStats())
    setStreamMetrics(streamManager.getStreamMetrics())
  }




  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Big Data Processing</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isProcessing ? "Active" : "Inactive"}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor(dataVolume).toLocaleString()} records processed
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <Cpu className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(processingRate).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">records/second</p>
            <Progress value={Math.min(processingRate / 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Streams</CardTitle>
            <Wifi className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streamMetrics.activeStreams || 6}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor(streamMetrics.totalDataRate || 600)} total rate
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.systemEfficiency?.toFixed(1) || "98.5"}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
            <Progress value={analyticsData.systemEfficiency || 98.5} className="mt-2" />
          </CardContent>
        </Card>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Big Data Controls</CardTitle>
            <CardDescription>Manage large-scale data processing operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="default">
              <Server className="mr-2 h-4 w-4" />
              Scale Processing Cluster
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Optimize Data Pipeline
            </Button>
            <Button className="w-full" variant="secondary">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Analytics Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts & Insights</CardTitle>
            <CardDescription>AI-powered predictive analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.map((alert, index) => (
                <Alert key={index}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{alert}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bigdata" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="bigdata">Big Data</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictions">🤖 AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="bigdata" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Records:</span>
                  <Badge variant="secondary">{bigDataMetrics.totalRecords?.toLocaleString() || "1,234,567"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Processed:</span>
                  <Badge variant="default">{bigDataMetrics.processedRecords?.toLocaleString() || "1,234,560"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate:</span>
                  <Badge variant="destructive">{((bigDataMetrics.errorCount || 7) / (bigDataMetrics.totalRecords || 1234567) * 100).toFixed(3)}%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Throughput:</span>
                  <Badge variant="outline">{Math.floor(bigDataMetrics.throughput || 8500)} rec/sec</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Streams Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Active Streams:</span>
                  <Badge variant="default">{streamMetrics.activeStreams || 6}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Data Rate:</span>
                  <Badge variant="secondary">{Math.floor(streamMetrics.totalDataRate || 600)} rec/sec</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Average Latency:</span>
                  <Badge variant="outline">{Math.floor(streamMetrics.averageLatency || 25)}ms</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Stream Health:</span>
                  <Badge variant="default">Excellent</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predictive Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>Traffic congestion predicted to increase by 25% in next hour</AlertDescription>
                </Alert>
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>Energy optimization opportunity detected - potential 15% savings</AlertDescription>
                </Alert>
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>Data processing efficiency at 98.5% - optimal performance</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Traffic Management - Big Data Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Real-time Traffic Analysis</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Vehicles Processed:</span>
                      <Badge variant="default">45,678 today</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Speed:</span>
                      <Badge variant="secondary">32.5 km/h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Congestion Level:</span>
                      <Badge variant="destructive">High (78%)</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Predictive Analytics</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Rush Hour Prediction:</span>
                      <Badge variant="outline">92% confidence</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimization Potential:</span>
                      <Badge variant="default">25% improvement</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Energy Management - Smart Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Energy Consumption Analytics</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Total Consumption:</span>
                      <Badge variant="secondary">2,847 kWh today</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency Rating:</span>
                      <Badge variant="default">87.3%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Savings:</span>
                      <Badge variant="outline">$342 this month</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Smart Optimization</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Auto-dimming Active:</span>
                      <Badge variant="default">156 lights</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Load Management:</span>
                      <Badge variant="secondary">Optimized</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="mr-2 h-5 w-5" />
                Water Management - Quality Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Water Quality Monitoring</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Quality Index:</span>
                      <Badge variant="default">94.2%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>pH Level:</span>
                      <Badge variant="secondary">7.1 (Optimal)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Turbidity:</span>
                      <Badge variant="outline">0.3 NTU</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Predictive Maintenance</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Filter Replacement:</span>
                      <Badge variant="destructive">Due in 3 days</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>System Health:</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Advanced Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Machine Learning Insights</h4>
                  <div className="space-y-2">
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>Pattern detected: Traffic increases 40% during rain events</AlertDescription>
                    </Alert>
                    <Alert>
                      <Cpu className="h-4 w-4" />
                      <AlertDescription>AI recommendation: Adjust street lighting schedule for 12% energy savings</AlertDescription>
                    </Alert>
                    <Alert>
                      <Database className="h-4 w-4" />
                      <AlertDescription>Anomaly detection: Unusual water consumption pattern in District 3</AlertDescription>
                    </Alert>
                    
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/weather?limit=4')
                          const weatherData = await response.json()
                          
                          if (weatherData.length > 0) {
                            const { WeatherProcessingPipeline } = await import('../core/PolymorphismDemo')
                            const pipeline = new WeatherProcessingPipeline()
                            const results = await pipeline.demonstrateRealWorldPolymorphism(weatherData)
                            
                            alert(
                              `🔄 POLYMORPHISM DEMONSTRATION\n\n` +
                              `${results.summary}\n\n` +
                              `Health Analysis: ${results.insights.health.averageRiskScore}/100 risk score\n` +
                              `Traffic Optimization: ${results.insights.traffic.averageTrafficImpact}/100 impact\n` +
                              `Energy Efficiency: ${results.insights.energy.averageEfficiencyScore}/100 efficiency\n\n` +
                              `Top Recommendations:\n${results.recommendations.slice(0, 3).map(r => `• ${r}`).join('\n')}`
                            )
                          } else {
                            alert("No weather data available for demonstration")
                          }
                        } catch (error) {
                          console.error("Polymorphism demo error:", error)
                          alert("Error running polymorphism demonstration")
                        }
                      }}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-3"
                    >
                      🔄 Demonstrate Polymorphism
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Data Processing Efficiency</span>
                        <span className="text-sm">98.5%</span>
                      </div>
                      <Progress value={98.5} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">System Reliability</span>
                        <span className="text-sm">99.2%</span>
                      </div>
                      <Progress value={99.2} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Predictive Accuracy</span>
                        <span className="text-sm">87.3%</span>
                      </div>
                      <Progress value={87.3} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-4">
          <AIPredictionsPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
