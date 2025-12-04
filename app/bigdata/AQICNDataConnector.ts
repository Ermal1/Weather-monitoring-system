/**
 * @deprecated This class is deprecated. Use WeatherAPIConnector instead.
 * This class is kept for backward compatibility only.
 */

import { CityData } from './MultiCityDataConnector'

export class AQICNDataConnector {
  private readonly API_BASE_URL = 'https://api.waqi.info'
  private readonly API_TOKEN = process.env.NEXT_PUBLIC_AQICN_API_KEY || 'demo'
  
  constructor() {
    console.warn('⚠️ AQICNDataConnector is deprecated. Use WeatherAPIConnector instead.')
  } 
  private readonly GLOBAL_CITIES = [
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
    { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 },
    { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
    { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6176 },
    { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
    { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
    { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
    { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
    { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.3960 },
    { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
    { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 },
    { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 }
  ]


  public async fetchCityDataByCoords(lat: number, lng: number): Promise<CityData | null> {
    try {
      const url = `${this.API_BASE_URL}/feed/geo:${lat};${lng}/?token=${this.API_TOKEN}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'SmartCitySystem/1.0'
        }
      })

      if (!response.ok) {
        console.warn(`AQICN API responded with status: ${response.status}`)
        return null
      }

      const data = await response.json()
      
      if (data.status !== 'ok' || !data.data) {
        console.warn('Invalid AQICN API response:', data)
        return null
      }

      return this.transformAQICNData(data.data)
    } catch (error) {
      console.error(`Error fetching AQICN data for coords ${lat}, ${lng}:`, error)
      return null
    }
  }


  public async fetchCityDataByName(cityName: string): Promise<CityData | null> {
    try {
      const encodedCity = encodeURIComponent(cityName)
      const url = `${this.API_BASE_URL}/feed/${encodedCity}/?token=${this.API_TOKEN}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'SmartCitySystem/1.0'
        }
      })

      if (!response.ok) {
        console.warn(`AQICN API responded with status: ${response.status}`)
        return null
      }

      const data = await response.json()
      
      if (data.status !== 'ok' || !data.data) {
        console.warn('Invalid AQICN API response:', data)
        return null
      }

      return this.transformAQICNData(data.data)
    } catch (error) {
      console.error(`Error fetching AQICN data for city ${cityName}:`, error)
      return null
    }
  }


  public async fetchMultipleCitiesData(limit?: number): Promise<CityData[]> {
    const citiesToFetch = limit ? this.GLOBAL_CITIES.slice(0, limit) : this.GLOBAL_CITIES.slice(0, 15)
    const results: CityData[] = []


    const batchSize = 3
    for (let i = 0; i < citiesToFetch.length; i += batchSize) {
      const batch = citiesToFetch.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (city) => {
        try {
          let cityData = await this.fetchCityDataByCoords(city.lat, city.lng)
          
          if (!cityData) {
            cityData = await this.fetchCityDataByName(city.name)
          }
          
          return cityData
        } catch (error) {
          console.error(`Failed to fetch data for ${city.name}:`, error)
          return null
        }
      })
      
      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults.filter(result => result !== null) as CityData[])
      
      if (i + batchSize < citiesToFetch.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay
      }
    }

    console.log(`✅ Successfully fetched AQICN data for ${results.length} cities`)
    return results
  }


  private transformAQICNData(aqicnData: any): CityData {
    const city = aqicnData.city?.name || 'Unknown'
    const country = this.extractCountryFromCityName(city)
    
    const iaqi = aqicnData.iaqi || {}
    const pm25 = iaqi.pm25?.v || 0
    const pm10 = iaqi.pm10?.v || 0
    const no2 = iaqi.no2?.v || 0
    const so2 = iaqi.so2?.v || 0
    const o3 = iaqi.o3?.v || 0
    const co = iaqi.co?.v || 0

    const temperature = iaqi.t?.v
    const humidity = iaqi.h?.v
    const pressure = iaqi.p?.v
    const windSpeed = iaqi.w?.v

    const aqi = aqicnData.aqi || 0
    const dominantPollutant = aqicnData.dominentpol || 'pm25'
    const healthLevel = this.getHealthLevel(aqi)

    return {
      city: city.split(',')[0].trim(),
      country,
      aqi,
      pm25,
      pm10,
      no2,
      so2,
      o3,
      co,
      timestamp: aqicnData.time?.iso || new Date().toISOString(),
      location: city,
      coordinates: {
        lat: aqicnData.city?.geo?.[0] || 0,
        lng: aqicnData.city?.geo?.[1] || 0
      },
      temperature,
      humidity,
      pressure,
      windSpeed,
      dominantPollutant,
      healthLevel,
      apiSource: 'AQICN_DEPRECATED' // Deprecated - use WeatherAPIConnector
    }
  }


  private extractCountryFromCityName(cityName: string): string {
    const cityMapping: { [key: string]: string } = {
      'New York': 'USA',
      'London': 'UK',
      'Tokyo': 'Japan',
      'Paris': 'France',
      'Shanghai': 'China',
      'Delhi': 'India',
      'São Paulo': 'Brazil',
      'Moscow': 'Russia',
      'Mexico City': 'Mexico',
      'Los Angeles': 'USA',
      'Cairo': 'Egypt',
      'Jakarta': 'Indonesia',
      'Bangkok': 'Thailand',
      'Sydney': 'Australia',
      'Istanbul': 'Turkey',
      'Berlin': 'Germany',
      'Buenos Aires': 'Argentina',
      'Lagos': 'Nigeria',
      'Seoul': 'South Korea',
      'Toronto': 'Canada'
    }

    for (const [city, country] of Object.entries(cityMapping)) {
      if (cityName.toLowerCase().includes(city.toLowerCase())) {
        return country
      }
    }

    return 'Unknown'
  }


  private getHealthLevel(aqi: number): string {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
    if (aqi <= 200) return 'Unhealthy'
    if (aqi <= 300) return 'Very Unhealthy'
    return 'Hazardous'
  }


  public async getGlobalInsights(citiesData?: CityData[]): Promise<{
    totalCitiesMonitored: number;
    averageAQI: number;
    citiesWithAlerts: number;
    bestCity: { name: string; aqi: number };
    worstCity: { name: string; aqi: number };
    dataVolume: number;
    countriesRepresented: number;
  } | null> {
    try {
      const data = citiesData || await this.fetchMultipleCitiesData(15)
      
      if (data.length === 0) {
        throw new Error('No city data available for insights')
      }

      const totalAQI = data.reduce((sum, city) => sum + city.aqi, 0)
      const averageAQI = Math.round(totalAQI / data.length)
      const citiesWithAlerts = data.filter(city => city.aqi > 100).length

      const sortedByAQI = [...data].sort((a, b) => a.aqi - b.aqi)
      const bestCity = { name: sortedByAQI[0].city, aqi: sortedByAQI[0].aqi }
      const worstCity = { name: sortedByAQI[sortedByAQI.length - 1].city, aqi: sortedByAQI[sortedByAQI.length - 1].aqi }

      return {
        totalCitiesMonitored: data.length,
        averageAQI,
        citiesWithAlerts,
        bestCity,
        worstCity,
        dataVolume: data.length * 7, 
        countriesRepresented: new Set(data.map(city => city.country)).size
      }
    } catch (error) {
      console.error('Error generating global insights:', error)
      throw error
    }
  }
} 