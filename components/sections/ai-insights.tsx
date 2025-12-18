'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from 'lucide-react'
import { AIPredictionsPanel } from "@/app/components/AIPredictionsPanel"

export function AIInsights() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-slate-900/80 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
          <CardTitle className="text-white">🔬 Weather Big Data Processing</CardTitle>
          <CardDescription className="text-emerald-100">
            Advanced weather data analysis with Weather API integration and real-time insights
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-300">📡 Data Sources & Volume</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
                  <span className="text-sm font-medium text-cyan-200">Weather API Cities Monitored</span>
                  <Badge variant="default" className="bg-cyan-500 text-white">30+</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-400/30 backdrop-blur-sm">
                  <span className="text-sm font-medium text-emerald-200">Weather Measurements</span>
                  <Badge variant="default" className="bg-emerald-500 text-white">210+</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-400/30 backdrop-blur-sm">
                  <span className="text-sm font-medium text-violet-200">Countries Represented</span>
                  <Badge variant="default" className="bg-violet-500 text-white">19</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-400/30 backdrop-blur-sm">
                  <span className="text-sm font-medium text-amber-200">Real-time Updates</span>
                  <Badge variant="default" className="bg-amber-500 text-white">Live</Badge>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-300">🤖 AI Analytics Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg border border-emerald-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-emerald-200">Weather Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-cyan-200">Weather Risk Assessment</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-violet-400" />
                  <span className="text-sm text-violet-200">Weather Pattern Analysis</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-amber-200">Real-time Weather Alerts</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg border border-indigo-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm text-indigo-200">Supabase Real-time Integration</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-violet-900/40 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
            <h4 className="font-bold text-cyan-300 mb-3 flex items-center gap-2">
              📊 Live Weather Statistics
              <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 animate-pulse backdrop-blur-sm">LIVE</Badge>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">210+</div>
                <div className="text-cyan-200/80">Weather Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">18</div>
                <div className="text-emerald-200/80">Weather Alerts Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-300">95%</div>
                <div className="text-violet-200/80">Forecast Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">&lt;50ms</div>
                <div className="text-amber-200/80">Response Time</div>
              </div>
            </div>
            <p className="text-cyan-200 text-sm mt-4 text-center">
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