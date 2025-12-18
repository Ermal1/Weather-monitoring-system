import type { IDataProcessor } from "../interfaces/IDataProcessor"
import type { ProcessedWeatherData } from "../bigdata/WeatherQueries"

// Helper function for weather index calculation
function calculateWeatherIndex(data: ProcessedWeatherData): number {
  let index = 50
  if (data.temperature && (data.temperature > 35 || data.temperature < -10)) index += 100
  if (data.windSpeed && data.windSpeed > 30) index += 80
  if (data.precipitation && data.precipitation > 50) index += 70
  return Math.min(500, index)
}

export class HealthRiskProcessor implements IDataProcessor {
  private batchSize = 100
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedWeatherData[]> {
    this.processingRate = data.length / 10 // Simulate processing speed

    return data.map((weatherData: ProcessedWeatherData) => ({
      ...weatherData,
      healthRisk: this.calculateHealthRisk(weatherData),
      recommendations: this.generateHealthRecommendations(weatherData),
      riskCategory: this.getRiskCategory(weatherData.weatherIndex || calculateWeatherIndex(weatherData)),
      vulnerableGroups: this.getVulnerableGroups(weatherData),
      processor_type: "HEALTH_RISK",
      processed_at: new Date().toISOString()
    }))
  }

  private calculateHealthRisk(data: ProcessedWeatherData): number {
    // Calculate health risk based on weather conditions
    let risk = 0
    if (data.temperature && (data.temperature > 35 || data.temperature < -10)) risk += 50
    if (data.humidity && (data.humidity > 90 || data.humidity < 20)) risk += 30
    if (data.windSpeed && data.windSpeed > 30) risk += 40
    if (data.precipitation && data.precipitation > 50) risk += 30
    if (data.weatherCondition?.toLowerCase().includes('storm')) risk += 60
    // Legacy pollutant-based calculation if available
    if (data.pm25 && data.pm10) {
      const weights = { pm25: 0.3, pm10: 0.25, no2: 0.2, o3: 0.15, so2: 0.1 }
      risk += Math.round(
        ((data.pm25 || 0) * weights.pm25 + 
         (data.pm10 || 0) * weights.pm10 + 
         (data.no2 || 0) * weights.no2 + 
         (data.o3 || 0) * weights.o3 + 
         (data.so2 || 0) * weights.so2) / 10
      )
    }
    return Math.min(100, risk)
  }

  private generateHealthRecommendations(data: ProcessedWeatherData): string[] {
    const recommendations: string[] = []
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    
    if (weatherIndex > 150 || data.temperature > 35 || data.temperature < -10) {
      recommendations.push("Avoid outdoor activities")
      recommendations.push("Stay in air-conditioned or heated spaces")
      recommendations.push("Monitor weather alerts")
    } else if (weatherIndex > 100 || data.windSpeed > 25) {
      recommendations.push("Limit prolonged outdoor activities")
      recommendations.push("Dress appropriately for weather conditions")
    } else if (weatherIndex > 50 || data.precipitation > 20) {
      recommendations.push("Sensitive individuals should limit outdoor exposure")
      recommendations.push("Carry weather protection (umbrella, jacket)")
    } else {
      recommendations.push("Weather conditions are good for outdoor activities")
    }

    if (data.temperature > 30) recommendations.push("Stay hydrated and seek shade")
    if (data.temperature < 0) recommendations.push("Dress in layers and limit exposure")
    if (data.precipitation > 30) recommendations.push("Avoid outdoor activities during heavy precipitation")

    return recommendations
  }

  private calculateWeatherIndex(data: ProcessedWeatherData): number {
    let index = 50
    if (data.temperature > 35 || data.temperature < -10) index += 100
    if (data.windSpeed > 30) index += 80
    if (data.precipitation > 50) index += 70
    return Math.min(500, index)
  }

  private getRiskCategory(weatherIndex: number): string {
    if (weatherIndex <= 50) return "LOW"
    if (weatherIndex <= 100) return "MODERATE"
    if (weatherIndex <= 150) return "HIGH"
    if (weatherIndex <= 200) return "VERY_HIGH"
    return "EXTREME"
  }

  private getVulnerableGroups(data: ProcessedWeatherData): string[] {
    const groups: string[] = []
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    
    if (weatherIndex > 100 || data.temperature > 30 || data.temperature < -5) {
      groups.push("Children", "Elderly", "Pregnant women")
    }
    if (data.temperature > 35 || data.temperature < -10) {
      groups.push("People with respiratory conditions", "Heart disease patients")
    }
    if (data.windSpeed > 25 || data.precipitation > 30) {
      groups.push("Outdoor workers", "Athletes")
    }

    return groups
  }

  public getBatchSize(): number {
    return this.batchSize
  }

  public setBatchSize(size: number): void {
    this.batchSize = size
  }

  public getProcessingRate(): number {
    return this.processingRate
  }
}

export class TrafficOptimizationProcessor implements IDataProcessor {
  private batchSize = 200
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedWeatherData[]> {
    this.processingRate = data.length / 5 // Faster processing for traffic optimization

    return data.map((weatherData: ProcessedWeatherData) => ({
      ...weatherData,
      trafficImpact: this.calculateTrafficImpact(weatherData),
      routeRecommendations: this.generateRouteRecommendations(weatherData),
      congestionLevel: this.estimateCongestionLevel(weatherData),
      alternativeRoutes: this.suggestAlternativeRoutes(weatherData),
      processor_type: "TRAFFIC_OPTIMIZATION",
      processed_at: new Date().toISOString()
    }))
  }

  private calculateTrafficImpact(data: ProcessedWeatherData): number {
    // Calculate traffic impact based on weather conditions
    let impact = 0
    if (data.precipitation > 20) impact += 40 // Rain affects traffic
    if (data.windSpeed > 25) impact += 30 // High winds affect driving
    if (data.visibility && data.visibility < 5) impact += 50 // Low visibility
    if (data.temperature < 0) impact += 35 // Icy conditions
    // Legacy pollutant-based if available
    if (data.no2 && data.co) {
      impact += Math.round((data.no2 * 0.6 + data.co * 0.4) / 10)
    }
    return Math.min(100, impact)
  }

  private generateRouteRecommendations(data: ProcessedWeatherData): string[] {
    const recommendations: string[] = []
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    
    if (weatherIndex > 150 || data.precipitation > 30 || data.windSpeed > 30) {
      recommendations.push("Avoid high-traffic routes")
      recommendations.push("Use highway/ring roads instead of city center")
      recommendations.push("Consider public transportation")
      recommendations.push("Allow extra travel time")
    } else if (data.precipitation > 10 || data.windSpeed > 20) {
      recommendations.push("Drive carefully in adverse weather")
      recommendations.push("Reduce speed and increase following distance")
    } else {
      recommendations.push("Normal traffic routes are acceptable")
    }

    return recommendations
  }

  private estimateCongestionLevel(data: ProcessedWeatherData): string {
    // Estimate congestion based on weather conditions
    let congestionScore = 0
    if (data.precipitation > 20) congestionScore += 40
    if (data.windSpeed > 25) congestionScore += 20
    if (data.visibility && data.visibility < 5) congestionScore += 50
    // Legacy calculation if available
    if (data.no2 && data.co) {
      congestionScore += (data.no2 + data.co) / 2
    }
    
    if (congestionScore > 100) return "SEVERE"
    if (congestionScore > 60) return "HEAVY"
    if (congestionScore > 30) return "MODERATE"
    return "LIGHT"
  }

  private suggestAlternativeRoutes(data: ProcessedWeatherData): string[] {
    const routes: string[] = []
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    
    if (weatherIndex > 100 || data.precipitation > 20 || data.windSpeed > 25) {
      routes.push("Main highways with better drainage")
      routes.push("Routes with less exposure to wind")
      routes.push("Elevated routes away from flooding areas")
    }

    return routes
  }

  public getBatchSize(): number {
    return this.batchSize
  }

  public setBatchSize(size: number): void {
    this.batchSize = size
  }

  public getProcessingRate(): number {
    return this.processingRate
  }
}

export class EnergyEfficiencyProcessor implements IDataProcessor {
  private batchSize = 150
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedWeatherData[]> {
    this.processingRate = data.length / 8 // Moderate processing speed

    return data.map((weatherData: ProcessedWeatherData) => ({
      ...weatherData,
      // Energy-focused processing: HVAC and building optimization
      hvacRecommendations: this.generateHVACRecommendations(weatherData),
      energyEfficiencyScore: this.calculateEnergyEfficiency(weatherData),
      ventilationStrategy: this.determineVentilationStrategy(weatherData),
      indoorWeatherConditions: this.predictIndoorWeatherConditions(weatherData),
      processor_type: "ENERGY_EFFICIENCY",
      processed_at: new Date().toISOString()
    }))
  }

  private generateHVACRecommendations(data: ProcessedWeatherData): string[] {
    const recommendations: string[] = []
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    
    if (weatherIndex > 100 || data.temperature > 30 || data.temperature < 0) {
      recommendations.push("Increase HVAC efficiency settings")
      recommendations.push("Maintain comfortable indoor temperature")
      recommendations.push("Monitor energy consumption")
    } else if (weatherIndex < 50 && data.temperature && data.temperature >= 15 && data.temperature <= 25) {
      recommendations.push("Increase natural ventilation")
      recommendations.push("Reduce HVAC energy consumption")
      recommendations.push("Open windows for free cooling/heating")
    }

    if (data.temperature && data.temperature > 25) {
      recommendations.push("Optimize cooling efficiency")
      recommendations.push("Use energy-efficient cooling modes")
    }
    if (data.temperature && data.temperature < 5) {
      recommendations.push("Optimize heating efficiency")
      recommendations.push("Seal windows and doors")
    }

    return recommendations
  }

  private calculateEnergyEfficiency(data: ProcessedWeatherData): number {
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    const baseEfficiency = 100 - (weatherIndex / 3) // Higher weather index reduces efficiency
    const temperatureBonus = data.temperature && Math.abs(data.temperature - 22) < 3 ? 10 : 0
    const humidityBonus = data.humidity && data.humidity >= 40 && data.humidity <= 60 ? 5 : 0
    
    return Math.round(Math.max(0, Math.min(100, baseEfficiency + temperatureBonus + humidityBonus)))
  }

  private determineVentilationStrategy(data: ProcessedWeatherData): string {
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    if (weatherIndex > 150 || data.temperature > 35 || data.temperature < -10) return "RECIRCULATION_ONLY"
    if (weatherIndex > 100 || data.precipitation > 20 || data.windSpeed > 30) return "MINIMAL_FRESH_WEATHER"
    if (weatherIndex > 50 || data.precipitation > 10) return "BALANCED_VENTILATION"
    return "NATURAL_VENTILATION"
  }

  private predictIndoorWeatherConditions(data: ProcessedWeatherData): number {
    const weatherIndex = data.weatherIndex || calculateWeatherIndex(data)
    const reductionFactor = weatherIndex > 100 ? 0.3 : 0.5
    return Math.round(weatherIndex * (1 - reductionFactor))
  }

  public getBatchSize(): number {
    return this.batchSize
  }

  public setBatchSize(size: number): void {
    this.batchSize = size
  }

  public getProcessingRate(): number {
    return this.processingRate
  }
}

export class WeatherProcessingPipeline {
  private processors: IDataProcessor[] = []
  private processingResults: Map<string, any[]> = new Map()

  public addProcessor(processor: IDataProcessor): void {
    this.processors.push(processor)
  }

  public async processWeatherData(weatherData: ProcessedWeatherData[]): Promise<{
    healthAnalysis: any[];
    trafficOptimization: any[];
    energyEfficiency: any[];
    processingStats: {
      totalProcessors: number;
      totalDataPoints: number;
      processingTime: number;
    }
  }> {
    const startTime = Date.now()
    
    const healthProcessor = new HealthRiskProcessor()
    const trafficProcessor = new TrafficOptimizationProcessor()
    const energyProcessor = new EnergyEfficiencyProcessor()

    const [healthResults, trafficResults, energyResults] = await Promise.all([
      healthProcessor.processData(weatherData),
      trafficProcessor.processData(weatherData),
      energyProcessor.processData(weatherData)
    ])

    const processingTime = Date.now() - startTime

    this.processingResults.set('health', healthResults)
    this.processingResults.set('traffic', trafficResults)
    this.processingResults.set('energy', energyResults)

    return {
      healthAnalysis: healthResults,
      trafficOptimization: trafficResults,
      energyEfficiency: energyResults,
      processingStats: {
        totalProcessors: 3,
        totalDataPoints: weatherData.length,
        processingTime
      }
    }
  }


  public getProcessingResults(): Map<string, any[]> {
    return this.processingResults
  }

  public async demonstrateRealWorldPolymorphism(weatherData: ProcessedWeatherData[]): Promise<{
    summary: string;
    insights: any;
    recommendations: string[];
  }> {
    console.log("🌍 REAL-WORLD POLYMORPHISM DEMONSTRATION")
    console.log("Processing weather data for different monitoring systems...")

    const results = await this.processWeatherData(weatherData)
    
    const healthInsights = this.extractHealthInsights(results.healthAnalysis)
    const trafficInsights = this.extractTrafficInsights(results.trafficOptimization)
    const energyInsights = this.extractEnergyInsights(results.energyEfficiency)

    const overallRecommendations = [
      ...healthInsights.recommendations.slice(0, 2),
      ...trafficInsights.recommendations.slice(0, 2),
      ...energyInsights.recommendations.slice(0, 2)
    ]

    return {
      summary: `Processed ${weatherData.length} data points through 3 specialized processors in ${results.processingStats.processingTime}ms`,
      insights: {
        health: healthInsights,
        traffic: trafficInsights,
        energy: energyInsights
      },
      recommendations: overallRecommendations
    }
  }

  private extractHealthInsights(healthData: any[]): any {
    const highRiskLocations = healthData.filter(d => d.riskCategory === 'HIGH' || d.riskCategory === 'VERY_HIGH')
    const averageHealthRisk = healthData.reduce((sum, d) => sum + (d.healthRisk || 0), 0) / healthData.length

    return {
      averageRiskScore: Math.round(averageHealthRisk),
      highRiskLocations: highRiskLocations.length,
      mostVulnerableGroups: this.getMostCommonVulnerableGroups(healthData),
      recommendations: this.getTopHealthRecommendations(healthData)
    }
  }

  private extractTrafficInsights(trafficData: any[]): any {
    const highCongestionAreas = trafficData.filter(d => d.congestionLevel === 'SEVERE' || d.congestionLevel === 'HEAVY')
    const averageTrafficImpact = trafficData.reduce((sum, d) => sum + (d.trafficImpact || 0), 0) / trafficData.length

    return {
      averageTrafficImpact: Math.round(averageTrafficImpact),
      congestedAreas: highCongestionAreas.length,
      recommendations: this.getTopTrafficRecommendations(trafficData)
    }
  }

  private extractEnergyInsights(energyData: any[]): any {
    const averageEfficiency = energyData.reduce((sum, d) => sum + (d.energyEfficiencyScore || 0), 0) / energyData.length
    const naturalVentilationSuitable = energyData.filter(d => d.ventilationStrategy === 'NATURAL_VENTILATION')

    return {
      averageEfficiencyScore: Math.round(averageEfficiency),
      naturalVentilationSuitableLocations: naturalVentilationSuitable.length,
      recommendations: this.getTopEnergyRecommendations(energyData)
    }
  }

  private getMostCommonVulnerableGroups(healthData: any[]): string[] {
    const groups = healthData.flatMap(d => d.vulnerableGroups || [])
    const groupCounts = groups.reduce((acc, group) => {
      acc[group] = (acc[group] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(groupCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([group]) => group)
  }

  private getTopHealthRecommendations(healthData: any[]): string[] {
    const allRecommendations = healthData.flatMap(d => d.recommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }

  private getTopTrafficRecommendations(trafficData: any[]): string[] {
    const allRecommendations = trafficData.flatMap(d => d.routeRecommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }

  private getTopEnergyRecommendations(energyData: any[]): string[] {
    const allRecommendations = energyData.flatMap(d => d.hvacRecommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }
}
