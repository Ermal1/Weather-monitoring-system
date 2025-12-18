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
    <Card className="border-2 border-violet-500/40 bg-gradient-to-br from-slate-900/80 via-violet-900/20 to-indigo-900/20 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-violet-300">
          <Activity className="h-6 w-6 text-violet-400" />
          🔄 Real-World Polymorphism Demo
          <Badge variant="outline" className="ml-auto bg-violet-500/20 text-violet-300 border-violet-400/40 backdrop-blur-sm">
            OOP
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-slate-300 mb-4">
          <p className="font-semibold mb-2 text-violet-300">Demonstrates Advanced OOP Concepts:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-slate-800/60 rounded border border-rose-500/30 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-rose-400" />
              <span className="text-xs text-rose-200">Health Risk Processor</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-800/60 rounded border border-cyan-500/30 backdrop-blur-sm">
              <Car className="h-4 w-4 text-cyan-400" />
              <span className="text-xs text-cyan-200">Traffic Optimization</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-800/60 rounded border border-amber-500/30 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-amber-200">Energy Efficiency</span>
            </div>
          </div>
        </div>

        <Alert className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border-violet-500/40 backdrop-blur-sm">
          <Brain className="h-4 w-4 text-violet-400" />
          <AlertDescription className="text-violet-200">
            <strong className="text-violet-300">Same Interface, Different Implementations:</strong> One weather dataset processed through three specialized processors, each serving different weather monitoring needs. This is polymorphism in action!
          </AlertDescription>
        </Alert>

        <Button 
          onClick={runDemo}
          disabled={isRunning}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg shadow-violet-500/20"
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
          <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-violet-500/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="font-semibold text-emerald-300">Last Demo Results:</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gradient-to-br from-rose-900/40 to-red-900/40 p-2 rounded border border-rose-500/30">
                <div className="text-lg font-bold text-rose-300">
                  {lastResults.insights.health.averageRiskScore}
                </div>
                <div className="text-xs text-rose-200/80">Health Risk</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-2 rounded border border-cyan-500/30">
                <div className="text-lg font-bold text-cyan-300">
                  {lastResults.insights.traffic.averageTrafficImpact}
                </div>
                <div className="text-xs text-cyan-200/80">Traffic Impact</div>
              </div>
              <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 p-2 rounded border border-amber-500/30">
                <div className="text-lg font-bold text-amber-300">
                  {lastResults.insights.energy.averageEfficiencyScore}
                </div>
                <div className="text-xs text-amber-200/80">Energy Score</div>
              </div>
            </div>
            <div className="text-xs text-slate-300 mt-2 text-center">
              {lastResults.summary}
            </div>
          </div>
        )}

        <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded border border-violet-500/20 backdrop-blur-sm">
          <strong className="text-violet-300">Technical Implementation:</strong> <span className="text-slate-300">Uses real OpenWeatherMap API data, processes through HealthRiskProcessor, TrafficOptimizationProcessor, and EnergyEfficiencyProcessor - all implementing the same IDataProcessor interface but producing completely different business insights.</span>
        </div>
      </CardContent>
    </Card>
  )
}
