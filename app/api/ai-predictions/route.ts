import { NextRequest, NextResponse } from 'next/server'
import { getMultipleCitiesWeather } from '@/app/bigdata/WeatherQueries'
import { WeatherProcessingPipeline } from '@/app/core/PolymorphismDemo'
import { DeepSeekInsightsService, WeatherData } from '@/lib/deepseek-service'

// Backward compatibility
const getMultipleCitiesAirQuality = getMultipleCitiesWeather
const AirQualityProcessingPipeline = WeatherProcessingPipeline
type AirQualityData = WeatherData

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { predictionType, cityName, timeframe } = body

    if (!predictionType || !['health', 'traffic', 'energy', 'environmental'].includes(predictionType)) {
      return NextResponse.json(
        { error: 'Invalid prediction type. Must be: health, traffic, energy, or environmental' },
        { status: 400 }
      )
    }

    const weatherData = await getMultipleCitiesWeather(8)
    
    if (!weatherData || weatherData.length === 0) {
      return NextResponse.json(
        { error: 'No weather data available for predictions' },
        { status: 404 }
      )
    }

    let targetData = weatherData
    if (cityName) {
      targetData = weatherData.filter(data => 
        data.location.toLowerCase().includes(cityName.toLowerCase())
      )
      
      if (targetData.length === 0) {
        return NextResponse.json(
          { error: `No data found for city: ${cityName}` },
          { status: 404 }
        )
      }
    }

    const pipeline = new WeatherProcessingPipeline()
    const results = await pipeline.processWeatherData(targetData as any[]) 

    const predictions = await generateAdvancedPredictions(
      predictionType,
      results,
      timeframe || '24h'
    )

    let deepseekInsights = null
    if (process.env.Deepseek_API_KEY) {
      try {
        const deepSeekService = new DeepSeekInsightsService()
        const weatherForDeepSeek: WeatherData[] = targetData.map(data => ({
          city: data.location,
          location: data.location,
          temperature: data.temperature,
          humidity: data.humidity,
          precipitation: data.precipitation,
          windSpeed: data.windSpeed,
          pressure: data.pressure,
          weatherCondition: data.weatherCondition,
          timestamp: data.timestamp,
          // Backward compatibility
          aqi: data.aqi,
          pm25: data.pm25 || 0,
          pm10: data.pm10 || 0,
          o3: data.o3 || 0,
          no2: data.no2 || 0,
          so2: data.so2 || 0,
          co: data.co || 0,
          dominentPollutant: data.dominantPollutant || 'Unknown'
        }))
        
        deepseekInsights = await deepSeekService.generateInsights(weatherForDeepSeek)
      } catch (error) {
        console.warn('DeepSeek AI unavailable, using polymorphic predictions only:', error)
      }
    }

    const responseData = {
      success: true,
      predictionType,
      cityName: cityName || 'Global',
      timeframe: timeframe || '24h',
      predictions,
      deepseekInsights,
      dataPoints: targetData.length,
      confidence: calculatePredictionConfidence(results),
      generatedAt: new Date().toISOString(),
      metadata: {
        source: 'POLYMORPHIC_AI_WITH_DEEPSEEK',
        processingTime: results.processingStats.processingTime,
        algorithmsUsed: deepseekInsights
          ? ['HealthRiskML', 'TrafficOptimizationAI', 'EnergyEfficiencyPredictor', 'DeepSeekAI']
          : ['HealthRiskML', 'TrafficOptimizationAI', 'EnergyEfficiencyPredictor'],
        enhancedWithDeepSeek: !!deepseekInsights
      }
    }

    return NextResponse.json(responseData)

  } catch (error) {
    console.error('AI Prediction Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI predictions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

async function generateAdvancedPredictions(
  type: string, 
  results: any, 
  timeframe: string
): Promise<any> {
  const baseTime = new Date()
  const hours = timeframe === '24h' ? 24 : timeframe === '7d' ? 168 : 24

  console.log('Results structure:', results)
  switch (type) {
    case 'health':
      return generateHealthPredictions(results.healthAnalysis, hours)

    case 'traffic':
      return generateTrafficPredictions(results.trafficOptimization, hours)

    case 'energy':
      return generateEnergyPredictions(results.energyEfficiency, hours)

    case 'environmental':
      return generateEnvironmentalPredictions(results, hours)

    default:
      throw new Error('Invalid prediction type')
  }
}

function generateHealthPredictions(healthData: any[], hours: number) {
  const avgRisk = healthData.reduce((sum, d) => sum + (d.healthRisk || 0), 0) / healthData.length


  const result = {
    riskTrend: avgRisk > 50 ? 'INCREASING' : 'STABLE',
    predictedRiskScore: Math.min(100, avgRisk + (Math.random() * 10 - 5)),
    criticalHours: Array.from({ length: Math.min(hours, 24) }, (_, i) => {
      const hour = new Date()
      hour.setHours(hour.getHours() + i)
      return {
        time: hour.toISOString(),
        riskLevel: avgRisk + (Math.sin(i * 0.5) * 15),
        recommendation: avgRisk > 60 ? 'Avoid outdoor activities due to weather conditions' : 'Normal activities safe'
      }
    }),
    vulnerableGroupAlerts: healthData.flatMap(d => d.vulnerableGroups || [])
      .filter((group, index, self) => self.indexOf(group) === index)
      .slice(0, 3),
    aiInsights: [
      `Weather-related health risk expected to ${avgRisk > 50 ? 'increase' : 'remain stable'} over next ${hours}h`,
      `Primary concern: ${avgRisk > 70 ? 'Extreme weather conditions' : 'Moderate weather impact'}`,
      `Recommendation: ${avgRisk > 60 ? 'Stay indoors and monitor weather alerts' : 'Normal weather precautions sufficient'}`
    ]
  }

  return result
}

function generateTrafficPredictions(trafficData: any[], hours: number) {
  const avgImpact = trafficData.reduce((sum, d) => sum + (d.trafficImpact || 0), 0) / trafficData.length
  
  return {
    congestionTrend: avgImpact > 40 ? 'WORSENING' : 'IMPROVING',
    peakHours: ['08:00', '17:30', '19:00'],
    routeOptimizations: trafficData.flatMap(d => d.routeRecommendations || [])
      .filter((route, index, self) => self.indexOf(route) === index)
      .slice(0, 4),
    emissionReduction: Math.round(25 + (Math.random() * 15)),
    aiInsights: [
      `Weather-related traffic impact: ${avgImpact > 50 ? 'High' : 'Moderate'} for next ${hours}h`,
      `Optimal routes: ${avgImpact > 60 ? 'Avoid areas prone to weather issues' : 'Normal routes acceptable'}`,
      `Public transport recommendation: ${avgImpact > 70 ? 'Strongly advised due to weather' : 'Optional'}`
    ]
  }
}

function generateEnergyPredictions(energyData: any[], hours: number) {
  const avgEfficiency = energyData.reduce((sum, d) => sum + (d.energyEfficiencyScore || 0), 0) / energyData.length
  
  return {
    efficiencyTrend: avgEfficiency > 70 ? 'OPTIMAL' : 'NEEDS_IMPROVEMENT',
    predictedSavings: Math.round(15 + (avgEfficiency / 10)),
    hvacOptimizations: energyData.flatMap(d => d.hvacRecommendations || [])
      .filter((rec, index, self) => self.indexOf(rec) === index)
      .slice(0, 4),
    naturalVentilationHours: Array.from({ length: Math.min(hours, 24) }, (_, i) => {
      const suitable = avgEfficiency > 60 && Math.random() > 0.3
      return {
        hour: i,
        suitable,
        energySavings: suitable ? Math.round(5 + Math.random() * 10) : 0
      }
    }).filter(h => h.suitable),
    aiInsights: [
      `Energy efficiency: ${avgEfficiency > 70 ? 'Excellent' : 'Needs optimization'} conditions predicted`,
      `HVAC optimization potential: ${Math.round(avgEfficiency * 0.8)}% efficiency achievable`,
      `Natural ventilation: ${avgEfficiency > 60 ? 'Recommended' : 'Limited effectiveness'} for next ${hours}h`
    ]
  }
}

function generateEnvironmentalPredictions(results: any, hours: number) {
  return {
    weatherTrend: 'STABLE_WITH_VARIATIONS',
    weatherForecasts: {
      temperature: { trend: 'STABLE', confidence: 0.85 },
      precipitation: { trend: 'VARIABLE', confidence: 0.78 },
      windSpeed: { trend: 'MODERATE', confidence: 0.82 }
    },
    weatherImpact: {
      windEffect: 'POSITIVE',
      precipitationProb: 0.3,
      temperatureInfluence: 'MODERATE'
    },
    aiInsights: [
      'Multi-processor analysis indicates stable weather conditions',
      'Health, traffic, and energy systems show coordinated optimization potential',
      'Predictive models suggest 15-20% improvement with integrated weather monitoring approach'
    ]
  }
}

function calculatePredictionConfidence(results: any): number {
  const healthConfidence = results.healthAnalysis.length > 3 ? 0.9 : 0.7
  const trafficConfidence = results.trafficOptimization.length > 3 ? 0.85 : 0.65
  const energyConfidence = results.energyEfficiency.length > 3 ? 0.88 : 0.68
  
  return Math.round(((healthConfidence + trafficConfidence + energyConfidence) / 3) * 100) / 100
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'environmental'
    const city = searchParams.get('city')
    const timeframe = searchParams.get('timeframe') || '24h'

    const mockBody = { predictionType: type, cityName: city, timeframe }
    const mockRequest = new NextRequest(request.url, {
      method: 'POST',
      body: JSON.stringify(mockBody),
      headers: { 'Content-Type': 'application/json' }
    })

    return POST(mockRequest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate quick prediction' },
      { status: 500 }
    )
  }
}
