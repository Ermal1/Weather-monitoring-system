
export interface AQICNResponse {
  status: string
  data: AQICNData
}

export interface AQICNData {
  aqi: number
  idx: number
  attributions: Attribution[]
  city: CityInfo
  dominentpol: string
  iaqi: IndividualAQI
  time: TimeInfo
  forecast?: ForecastData
}

export interface Attribution {
  url: string
  name: string
}

export interface CityInfo {
  geo: [number, number] // [latitude, longitude]
  name: string
  url: string
  location: string
}

export interface IndividualAQI {
  co?: { v: number }
  h?: { v: number }    
  no2?: { v: number }
  o3?: { v: number }
  p?: { v: number }    
  pm10?: { v: number }
  pm25?: { v: number }
  so2?: { v: number }
  t?: { v: number }    
  w?: { v: number }   
}

export interface TimeInfo {
  s: string      
  tz: string    
  v: number      
  iso: string    
}

export interface ForecastData {
  daily: {
    o3?: ForecastItem[]
    pm10?: ForecastItem[]
    pm25?: ForecastItem[]
    uvi?: ForecastItem[]
  }
}

export interface ForecastItem {
  avg: number
  day: string
  max: number
  min: number
}

export interface ProcessedAirQualityData {
  aqi: number
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  timestamp: string
  location: string
  coordinates: { lat: number; lng: number }
  temperature?: number
  humidity?: number
  pressure?: number
  windSpeed?: number
  dominantPollutant: string
  healthLevel: string
  apiSource: string
}

/**
 * @deprecated This class is deprecated. Use WeatherAPIConnector instead.
 * This class is kept for backward compatibility only.
 */

export class RealTimeDataConnector {
  private readonly BASE_URL = "http://api.waqi.info"
  private readonly API_TOKEN = "demo"
  private requestCount = 0

  private readonly SUPPORTED_CITIES = [
    "shanghai", "beijing", "paris", "london", "tokyo", "delhi", "new-york", "los-angeles"
  ]

  constructor() {
    console.warn("⚠️  RealTimeDataConnector is deprecated. Use WeatherAPIConnector instead.")
    console.warn("⚠️  This connector uses AQICN API which is no longer the primary data source.")
  }

  public async fetchAirQualityByCity(cityName: string): Promise<ProcessedAirQualityData | null> {
    try {
      this.requestCount++
      
      const url = `${this.BASE_URL}/feed/${cityName}/?token=${this.API_TOKEN}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        console.error(`❌ HTTP error for ${cityName}: ${response.status} ${response.statusText}`)
        return null
      }

      const data: AQICNResponse = await response.json()

      if (data.status !== "ok") {
        console.error(`❌ API error for ${cityName}:`, data.status)
        
        if (data.status === "error" && !this.SUPPORTED_CITIES.includes(cityName)) {
          console.warn(`⚠️  City ${cityName} not available with demo token. Register for free token at https://aqicn.org/data-platform/token/`)
        }
        
        return null
      }

      return this.processAQICNData(data.data)
    } catch (error) {
      console.error(`❌ Error fetching data for ${cityName}:`, error)
      return null
    }
  }

  public async fetchAirQualityByCoordinates(lat: number, lng: number): Promise<ProcessedAirQualityData | null> {
    try {
      const url = `${this.BASE_URL}/feed/geo:${lat};${lng}/?token=${this.API_TOKEN}`
      this.requestCount++
      
      
      const response = await fetch(url)
      const data: AQICNResponse = await response.json()
      
      if (data.status !== "ok" || !data.data) {
        console.error(`❌ Failed to fetch data for coordinates ${lat}, ${lng}:`, data)
        return null
      }

      return this.processAQICNData(data.data)
    } catch (error) {
      console.error(`❌ Error fetching data for coordinates ${lat}, ${lng}:`, error)
      return null
    }
  }

  public async fetchMultipleCitiesData(limit?: number): Promise<ProcessedAirQualityData[]> {
    const citiesToFetch = limit ? this.SUPPORTED_CITIES.slice(0, limit) : this.SUPPORTED_CITIES.slice(0, 4)
    const results: ProcessedAirQualityData[] = []


    for (const cityName of citiesToFetch) {
      const cityData = await this.fetchAirQualityByCity(cityName)
      if (cityData) {
        results.push(cityData)
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return results
  }

  private processAQICNData(data: AQICNData): ProcessedAirQualityData {
    const aqi = data.aqi || 0
    const pm25 = data.iaqi?.pm25?.v || 0
    const pm10 = data.iaqi?.pm10?.v || 0
    const no2 = data.iaqi?.no2?.v || 0
    const so2 = data.iaqi?.so2?.v || 0
    const o3 = data.iaqi?.o3?.v || 0
    const co = data.iaqi?.co?.v || 0

    const temperature = data.iaqi?.t?.v
    const humidity = data.iaqi?.h?.v
    const pressure = data.iaqi?.p?.v
    const windSpeed = data.iaqi?.w?.v

    const pollutants = { pm25, pm10, no2, so2, o3, co }
    const dominantPollutant = Object.entries(pollutants)
      .filter(([_, value]) => value > 0)
      .sort(([_, a], [__, b]) => b - a)[0]?.[0] || 'pm25'

    const getHealthLevel = (aqi: number): string => {
      if (aqi <= 50) return 'Good'
      if (aqi <= 100) return 'Moderate'
      if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
      if (aqi <= 200) return 'Unhealthy'
      if (aqi <= 300) return 'Very Unhealthy'
      return 'Hazardous'
    }

    return {
      aqi,
      pm25,
      pm10,
      no2,
      so2,
      o3,
      co,
      timestamp: data.time?.iso || new Date().toISOString(),
      location: data.city?.name || 'Unknown City',
      coordinates: {
        lat: data.city?.geo?.[0] || 0,
        lng: data.city?.geo?.[1] || 0
      },
      temperature,
      humidity,
      pressure,
      windSpeed,
      dominantPollutant,
      healthLevel: getHealthLevel(aqi),
      apiSource: 'AQICN_DEPRECATED' // Deprecated - use WeatherAPIConnector
    }
  }


  public async searchStations(query: string): Promise<ProcessedAirQualityData[]> {
    try {
      const url = `${this.BASE_URL}/search/?token=${this.API_TOKEN}&keyword=${encodeURIComponent(query)}`
      this.requestCount++
      
      const response = await fetch(url)
      const searchData = await response.json()
      
      if (searchData.status !== "ok" || !searchData.data) {
        console.error("Failed to search stations:", searchData)
        return []
      }

      const results: ProcessedAirQualityData[] = []
      const stations = searchData.data.slice(0, 10) // Limit to 10 results
      
      for (const station of stations) {
        if (station.uid) {
          try {
            const detailUrl = `${this.BASE_URL}/feed/@${station.uid}/?token=${this.API_TOKEN}`
            const detailResponse = await fetch(detailUrl)
            const detailData: AQICNResponse = await detailResponse.json()
            
            if (detailData.status === "ok" && detailData.data) {
              const processed = this.processAQICNData(detailData.data)
              results.push(processed)
            }
          } catch (error) {
            console.error(`Error fetching station details for ${station.uid}:`, error)
          }
        }
      }
      
      return results
    } catch (error) {
      console.error("Error searching stations:", error)
      return []
    }
  }

  public getAPIStats(): { requestCount: number; dailyLimit: number; isDemo: boolean } {
    return {
      requestCount: this.requestCount,
      dailyLimit: 86400,
      isDemo: true
    }
  }

  public async checkCityAirQualityAlert(cityName: string): Promise<{
    hasAlert: boolean;
    alertLevel: string;
    aqi: number;
    recommendation: string;
  } | null> {
    const data = await this.fetchAirQualityByCity(cityName)
    
    if (!data) return null

    const hasAlert = data.aqi > 100
    let alertLevel = "None"
    let recommendation = "Air quality is acceptable for outdoor activities."

    if (data.aqi > 300) {
      alertLevel = "Emergency"
      recommendation = "Health alert: everyone may experience serious health effects. Avoid all outdoor activities."
    } else if (data.aqi > 200) {
      alertLevel = "Critical"
      recommendation = "Health warning: everyone should avoid all outdoor exertion."
    } else if (data.aqi > 150) {
      alertLevel = "High"
      recommendation = "Everyone should avoid prolonged outdoor exertion."
    } else if (data.aqi > 100) {
      alertLevel = "Moderate"
      recommendation = "Sensitive individuals should limit outdoor activities."
    }

    return {
      hasAlert,
      alertLevel,
      aqi: data.aqi,
      recommendation
    }
  }

  public async getGlobalAirQualityInsights(): Promise<{
    totalCitiesMonitored: number;
    averageAQI: number;
    citiesWithAlerts: number;
    bestCity: { name: string; aqi: number };
    worstCity: { name: string; aqi: number };
  } | null> {
    try {
      const citiesData = await this.fetchMultipleCitiesData(6)
      
      if (citiesData.length === 0) {
        return null
      }

      const totalAQI = citiesData.reduce((sum, city) => sum + city.aqi, 0)
      const averageAQI = Math.round(totalAQI / citiesData.length)
      const citiesWithAlerts = citiesData.filter(city => city.aqi > 100).length

      const sortedByAQI = [...citiesData].sort((a, b) => a.aqi - b.aqi)
      const bestCity = { name: sortedByAQI[0].location, aqi: sortedByAQI[0].aqi }
      const worstCity = { name: sortedByAQI[sortedByAQI.length - 1].location, aqi: sortedByAQI[sortedByAQI.length - 1].aqi }

      return {
        totalCitiesMonitored: citiesData.length,
        averageAQI,
        citiesWithAlerts,
        bestCity,
        worstCity
      }
    } catch (error) {
      console.error("❌ Error getting global insights:", error)
      return null
    }
  }
}

export function createAQICNDataConnector(): RealTimeDataConnector {
  return new RealTimeDataConnector()
}

export const createDataConnector = createAQICNDataConnector

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  pressure: number
  visibility: number
  weatherCondition: string
  timestamp: string
}

export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  timestamp: string
  location: string
} 