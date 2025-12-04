"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Activity, 
  TrendingUp, 
  Car, 
  Zap, 
  Heart, 
  Leaf,
  Brain,
  Target,
  CheckCircle
} from "lucide-react"

export function PolymorphismDemoCard() {
  const [isRunning, setIsRunning] = useState(false)
  const [lastResults, setLastResults] = useState<any>(null)

  const runDemo = async () => {
    setIsRunning(true)
    
    try {
      const response = await fetch('/api/weather?limit=4')
      const weatherData = await response.json()

      if (weatherData.length > 0) {
        const { WeatherProcessingPipeline } = await import('../core/PolymorphismDemo')
        const pipeline = new WeatherProcessingPipeline()
        const results = await pipeline.demonstrateRealWorldPolymorphism(weatherData)
        
        setLastResults(results)
        
        alert(
          `🔄 POLYMORPHISM DEMONSTRATION\n\n` +
          `${results.summary}\n\n` +
          `SAME DATA → THREE DIFFERENT PROCESSORS:\n\n` +
          `🏥 Health Analysis: ${results.insights.health.averageRiskScore}/100 risk score\n` +
          `🚗 Traffic Optimization: ${results.insights.traffic.averageTrafficImpact}/100 impact\n` +
          `⚡ Energy Efficiency: ${results.insights.energy.averageEfficiencyScore}/100 efficiency\n\n` +
          `This demonstrates REAL POLYMORPHISM:\n` +
          `• Same IDataProcessor interface\n` +
          `• Different implementations (Health, Traffic, Energy)\n` +
          `• Same input data, completely different outputs\n` +
          `• Actual business value in weather monitoring\n\n` +
          `Top Recommendations:\n${results.recommendations.slice(0, 3).map(r => `• ${r}`).join('\n')}`
        )
      } else {
        alert("No weather data available for demonstration")
      }
    } catch (error) {
      console.error("Polymorphism demo error:", error)
      alert("Error running polymorphism demonstration")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Activity className="h-6 w-6" />
          🔄 Real-World Polymorphism Demo
          <Badge variant="outline" className="ml-auto bg-purple-100 text-purple-700">
            OOP
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-700 mb-4">
          <p className="font-semibold mb-2">Demonstrates Advanced OOP Concepts:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-xs">Health Risk Processor</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
              <Car className="h-4 w-4 text-blue-500" />
              <span className="text-xs">Traffic Optimization</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs">Energy Efficiency</span>
            </div>
          </div>
        </div>

        <Alert className="bg-purple-50 border-purple-200">
          <Brain className="h-4 w-4" />
          <AlertDescription>
            <strong>Same Interface, Different Implementations:</strong> One weather dataset processed through three specialized processors, each serving different weather monitoring needs. This is polymorphism in action!
          </AlertDescription>
        </Alert>

        <Button 
          onClick={runDemo}
          disabled={isRunning}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
          size="lg"
        >
          {isRunning ? (
            <>
              <Target className="h-5 w-5 mr-2 animate-spin" />
              Running Polymorphism Demo...
            </>
          ) : (
            <>
              <Activity className="h-5 w-5 mr-2" />
              🔄 Demonstrate Polymorphism Now
            </>
          )}
        </Button>

        {lastResults && (
          <div className="mt-4 p-4 bg-white/80 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700">Last Demo Results:</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-red-50 p-2 rounded">
                <div className="text-lg font-bold text-red-600">
                  {lastResults.insights.health.averageRiskScore}
                </div>
                <div className="text-xs text-red-700">Health Risk</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-lg font-bold text-blue-600">
                  {lastResults.insights.traffic.averageTrafficImpact}
                </div>
                <div className="text-xs text-blue-700">Traffic Impact</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                <div className="text-lg font-bold text-yellow-600">
                  {lastResults.insights.energy.averageEfficiencyScore}
                </div>
                <div className="text-xs text-yellow-700">Energy Score</div>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">
              {lastResults.summary}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 bg-white/50 p-2 rounded">
          <strong>Technical Implementation:</strong> Uses real OpenWeatherMap API data, processes through HealthRiskProcessor, TrafficOptimizationProcessor, and EnergyEfficiencyProcessor - all implementing the same IDataProcessor interface but producing completely different business insights.
        </div>
      </CardContent>
    </Card>
  )
}
