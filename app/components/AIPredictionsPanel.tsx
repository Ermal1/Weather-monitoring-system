"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Brain, 
  TrendingUp, 
  Car, 
  Zap, 
  Heart, 
  Leaf,
  Clock,
  BarChart3,
  Target,
  Lightbulb
} from "lucide-react"

import { PredictionResult } from "@/types"

export function AIPredictionsPanel() {
  const [predictions, setPredictions] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<'health' | 'traffic' | 'energy' | 'environmental'>('health')

  const predictionTypes = [
    { id: 'health', label: 'Health Risk', icon: Heart, color: 'bg-red-500' },
    { id: 'traffic', label: 'Traffic Impact', icon: Car, color: 'bg-blue-500' },
    { id: 'energy', label: 'Energy Efficiency', icon: Zap, color: 'bg-yellow-500' },
    { id: 'environmental', label: 'Environmental', icon: Leaf, color: 'bg-green-500' }
  ]

  const generatePredictions = async (type: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai-predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          predictionType: type,
          timeframe: '24h'
        })
      })

      if (response.ok) {
        const result = await response.json()
        setPredictions(result)
      } else {
        console.error('Failed to generate predictions')
      }
    } catch (error) {
      console.error('Error generating predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderPredictionContent = () => {
    if (!predictions) return null

    const { predictions: predData, confidence, predictionType } = predictions

    switch (predictionType) {
      case 'health':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-rose-900/40 to-red-900/40 p-3 rounded-lg border border-rose-500/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-rose-200">Risk Trend</span>
                  <Badge variant={predData.riskTrend === 'INCREASING' ? 'destructive' : 'default'} className={predData.riskTrend === 'STABLE' ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" : ""}>
                    {predData.riskTrend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-rose-300 mt-1">
                  {Math.round(predData.predictedRiskScore)}/100
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-3 rounded-lg border border-cyan-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-cyan-200">Vulnerable Groups</div>
                <div className="text-sm text-cyan-300/80 mt-1">
                  {predData.vulnerableGroupAlerts.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-emerald-300">AI Health Insights</h4>
              {predData.aiInsights.map((insight: string, idx: number) => (
                <Alert key={idx} className="mb-2 bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border-amber-500/40 backdrop-blur-sm">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-amber-200">{insight}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )

      case 'traffic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-3 rounded-lg border border-cyan-500/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cyan-200">Congestion Trend</span>
                  <Badge variant={predData.congestionTrend === 'WORSENING' ? 'destructive' : 'default'} className={predData.congestionTrend === 'IMPROVING' ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" : ""}>
                    {predData.congestionTrend}
                  </Badge>
                </div>
                <div className="text-sm text-cyan-300/80 mt-1">
                  Peak: {predData.peakHours.join(', ')}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 p-3 rounded-lg border border-emerald-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-emerald-200">Emission Reduction</div>
                <div className="text-2xl font-bold text-emerald-300 mt-1">
                  {predData.emissionReduction}%
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-teal-300">Route Optimizations</h4>
              <div className="grid gap-2">
                {predData.routeOptimizations.slice(0, 3).map((route: string, idx: number) => (
                  <div key={idx} className="bg-slate-800/60 p-2 rounded text-sm text-slate-200 border border-teal-500/20 backdrop-blur-sm">
                    • {route}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'energy':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 p-3 rounded-lg border border-amber-500/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-200">Efficiency Trend</span>
                  <Badge variant={predData.efficiencyTrend === 'OPTIMAL' ? 'default' : 'secondary'} className={predData.efficiencyTrend === 'OPTIMAL' ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40" : "bg-slate-700/50 text-slate-300"}>
                    {predData.efficiencyTrend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-amber-300 mt-1">
                  {predData.predictedSavings}% Savings
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 p-3 rounded-lg border border-emerald-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-emerald-200">Natural Ventilation</div>
                <div className="text-sm text-emerald-300/80 mt-1">
                  {predData.naturalVentilationHours.length} optimal hours
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-amber-300">HVAC Optimizations</h4>
              <div className="grid gap-2">
                {predData.hvacOptimizations.slice(0, 3).map((opt: string, idx: number) => (
                  <div key={idx} className="bg-slate-800/60 p-2 rounded text-sm text-slate-200 border border-amber-500/20 backdrop-blur-sm">
                    • {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'environmental':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 p-3 rounded-lg text-center border border-emerald-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-emerald-200">Temperature</div>
                <Badge variant="default" className="mt-1 bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
                  {predData.weatherForecasts?.temperature?.trend || predData.pollutantForecasts?.pm25?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-emerald-300/80 mt-1">
                  {Math.round((predData.weatherForecasts?.temperature?.confidence || predData.pollutantForecasts?.pm25?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-3 rounded-lg text-center border border-cyan-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-cyan-200">Precipitation</div>
                <Badge variant="secondary" className="mt-1 bg-cyan-500/20 text-cyan-300 border-cyan-400/40">
                  {predData.weatherForecasts?.precipitation?.trend || predData.pollutantForecasts?.no2?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-cyan-300/80 mt-1">
                  {Math.round((predData.weatherForecasts?.precipitation?.confidence || predData.pollutantForecasts?.no2?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 p-3 rounded-lg text-center border border-amber-500/40 backdrop-blur-sm">
                <div className="text-sm font-medium text-amber-200">Wind Speed</div>
                <Badge variant="outline" className="mt-1 bg-amber-500/20 text-amber-300 border-amber-400/40">
                  {predData.weatherForecasts?.windSpeed?.trend || predData.pollutantForecasts?.o3?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-amber-300/80 mt-1">
                  {Math.round((predData.weatherForecasts?.windSpeed?.confidence || predData.pollutantForecasts?.o3?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-teal-300">Weather Forecast AI Insights</h4>
              {predData.aiInsights.map((insight: string, idx: number) => (
                <Alert key={idx} className="mb-2 bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-teal-500/40 backdrop-blur-sm">
                  <Brain className="h-4 w-4 text-teal-400" />
                  <AlertDescription className="text-teal-200">{insight}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Unknown prediction type</div>
    }
  }

  return (
    <Card className="w-full bg-slate-900/80 backdrop-blur-xl border-emerald-500/30 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 border-b border-emerald-500/30">
        <CardTitle className="flex items-center gap-2 text-emerald-300">
          <Brain className="h-5 w-5 text-emerald-400" />
          AI-Powered Predictive Analytics
          {predictions && (
            <Badge variant="outline" className="ml-auto bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
              {Math.round(predictions.confidence * 100)}% Confidence
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prediction Type Selector */}
        <div className="grid grid-cols-4 gap-2">
          {predictionTypes.map((type) => {
            const IconComponent = type.icon
            const isSelected = selectedType === type.id
            return (
              <Button
                key={type.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id as any)}
                className={`flex flex-col items-center gap-1 h-auto py-3 ${
                  isSelected 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400/30 shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-800/50 text-slate-300 border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-300"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs">{type.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Generate Predictions Button */}
        <Button 
          onClick={() => generatePredictions(selectedType)}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-emerald-400/30 shadow-lg shadow-emerald-500/20"
        >
          {loading ? (
            <>
              <Target className="h-4 w-4 mr-2 animate-spin" />
              Generating AI Predictions...
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate {predictionTypes.find(t => t.id === selectedType)?.label} Predictions
            </>
          )}
        </Button>

        {/* Prediction Results */}
        {predictions && (
          <div className="border-t border-emerald-500/20 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-emerald-300">
                {predictionTypes.find(t => t.id === predictions.predictionType)?.label} Predictions
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-emerald-400" />
                {predictions.timeframe} forecast
              </div>
            </div>

            {renderPredictionContent()}

            {/* DeepSeek AI Insights */}
            {predictions.deepseekInsights && (
              <div className="mt-4 p-4 bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-violet-900/40 rounded-lg border border-cyan-500/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold text-cyan-300">DeepSeek AI Enhanced Analysis</span>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/40">
                    AI-Powered
                  </Badge>
                </div>
                <div className="space-y-2">
                  {predictions.deepseekInsights.insights?.map((insight: any, idx: number) => (
                    <Alert key={idx} className="bg-slate-800/60 border-amber-500/40 backdrop-blur-sm">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      <AlertDescription className="text-amber-200">
                        <strong className="text-amber-300">{insight.category}:</strong> {insight.insight}
                        {insight.severity && (
                          <Badge variant="outline" className="ml-2 bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
                            {insight.severity}
                          </Badge>
                        )}
                      </AlertDescription>
                    </Alert>
                  )) || (
                    <div className="text-sm text-cyan-300">
                      {predictions.deepseekInsights.summary || 'Enhanced AI analysis applied to predictions'}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-emerald-500/20 bg-slate-800/50 p-3 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Data Points:</span>
                  <span>{predictions.dataPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>{predictions.metadata.processingTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Algorithms:</span>
                  <span>{predictions.metadata.algorithmsUsed.length}</span>
                </div>
                {predictions.metadata.enhancedWithDeepSeek && (
                  <div className="flex justify-between">
                    <span>DeepSeek AI:</span>
                    <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/40">
                      Enhanced
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
