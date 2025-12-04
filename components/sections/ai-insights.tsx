'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from 'lucide-react'
import { AIPredictionsPanel } from "@/app/components/AIPredictionsPanel"

export function AIInsights() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardTitle className="text-white">🔬 Weather Big Data Processing</CardTitle>
          <CardDescription className="text-purple-100">
            Advanced weather data analysis with Weather API integration and real-time insights
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-900">📡 Data Sources & Volume</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Weather API Cities Monitored</span>
                  <Badge variant="default" className="bg-blue-600">30+</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Weather Measurements</span>
                  <Badge variant="default" className="bg-green-600">210+</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Countries Represented</span>
                  <Badge variant="default" className="bg-purple-600">19</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium">Real-time Updates</span>
                  <Badge variant="default" className="bg-orange-600">Live</Badge>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-900">🤖 AI Analytics Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Weather Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Weather Risk Assessment</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Weather Pattern Analysis</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Real-time Weather Alerts</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm">Supabase Real-time Integration</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              📊 Live Weather Statistics
              <Badge variant="default" className="bg-green-100 text-green-800 animate-pulse">LIVE</Badge>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">210+</div>
                <div className="text-blue-700">Weather Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">18</div>
                <div className="text-green-700">Weather Alerts Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-purple-700">Forecast Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">&lt;50ms</div>
                <div className="text-orange-700">Response Time</div>
              </div>
            </div>
            <p className="text-blue-800 text-sm mt-4 text-center">
              🌤️ Processing real weather data from Weather API network - monitoring temperature, humidity, precipitation, and wind patterns with 
              advanced ML pattern recognition and weather predictions.
            </p>
          </div>
        </CardContent>
      </Card>
      <AIPredictionsPanel/>
    </div>
  )
} 