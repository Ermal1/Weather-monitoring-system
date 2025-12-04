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
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Trend</span>
                  <Badge variant={predData.riskTrend === 'INCREASING' ? 'destructive' : 'default'}>
                    {predData.riskTrend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-red-600 mt-1">
                  {Math.round(predData.predictedRiskScore)}/100
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Vulnerable Groups</div>
                <div className="text-sm text-gray-600 mt-1">
                  {predData.vulnerableGroupAlerts.slice(0, 2).join(', ')}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">AI Health Insights</h4>
              {predData.aiInsights.map((insight: string, idx: number) => (
                <Alert key={idx} className="mb-2">
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>{insight}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )

      case 'traffic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Congestion Trend</span>
                  <Badge variant={predData.congestionTrend === 'WORSENING' ? 'destructive' : 'default'}>
                    {predData.congestionTrend}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Peak: {predData.peakHours.join(', ')}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Emission Reduction</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {predData.emissionReduction}%
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Route Optimizations</h4>
              <div className="grid gap-2">
                {predData.routeOptimizations.slice(0, 3).map((route: string, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
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
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Efficiency Trend</span>
                  <Badge variant={predData.efficiencyTrend === 'OPTIMAL' ? 'default' : 'secondary'}>
                    {predData.efficiencyTrend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mt-1">
                  {predData.predictedSavings}% Savings
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Natural Ventilation</div>
                <div className="text-sm text-gray-600 mt-1">
                  {predData.naturalVentilationHours.length} optimal hours
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">HVAC Optimizations</h4>
              <div className="grid gap-2">
                {predData.hvacOptimizations.slice(0, 3).map((opt: string, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
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
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-sm font-medium">Temperature</div>
                <Badge variant="default" className="mt-1">
                  {predData.weatherForecasts?.temperature?.trend || predData.pollutantForecasts?.pm25?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round((predData.weatherForecasts?.temperature?.confidence || predData.pollutantForecasts?.pm25?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-sm font-medium">Precipitation</div>
                <Badge variant="secondary" className="mt-1">
                  {predData.weatherForecasts?.precipitation?.trend || predData.pollutantForecasts?.no2?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round((predData.weatherForecasts?.precipitation?.confidence || predData.pollutantForecasts?.no2?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="text-sm font-medium">Wind Speed</div>
                <Badge variant="outline" className="mt-1">
                  {predData.weatherForecasts?.windSpeed?.trend || predData.pollutantForecasts?.o3?.trend || 'STABLE'}
                </Badge>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round((predData.weatherForecasts?.windSpeed?.confidence || predData.pollutantForecasts?.o3?.confidence || 0.75) * 100)}% confidence
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Weather Forecast AI Insights</h4>
              {predData.aiInsights.map((insight: string, idx: number) => (
                <Alert key={idx} className="mb-2">
                  <Brain className="h-4 w-4" />
                  <AlertDescription>{insight}</AlertDescription>
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI-Powered Predictive Analytics
          {predictions && (
            <Badge variant="outline" className="ml-auto">
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
            return (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id as any)}
                className="flex flex-col items-center gap-1 h-auto py-3"
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
          className="w-full"
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
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {predictionTypes.find(t => t.id === predictions.predictionType)?.label} Predictions
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {predictions.timeframe} forecast
              </div>
            </div>

            {renderPredictionContent()}

            {/* DeepSeek AI Insights */}
            {predictions.deepseekInsights && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">DeepSeek AI Enhanced Analysis</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">
                    AI-Powered
                  </Badge>
                </div>
                <div className="space-y-2">
                  {predictions.deepseekInsights.insights?.map((insight: any, idx: number) => (
                    <Alert key={idx} className="bg-white/60">
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{insight.category}:</strong> {insight.insight}
                        {insight.severity && (
                          <Badge variant="outline" className="ml-2">
                            {insight.severity}
                          </Badge>
                        )}
                      </AlertDescription>
                    </Alert>
                  )) || (
                    <div className="text-sm text-blue-700">
                      {predictions.deepseekInsights.summary || 'Enhanced AI analysis applied to predictions'}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">
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
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
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
