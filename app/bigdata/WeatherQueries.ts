import { supabase } from "../../lib/supabase"
import { MultiCityDataConnector, type CityData } from './MultiCityDataConnector'

const multiCityConnector = new MultiCityDataConnector()

export const weatherQueryKeys = {
  city: (city: string) => ['weather', 'city', city] as const,
  multipleCities: (limit?: number) => ['weather', 'multiple-cities', limit] as const,
  globalInsights: () => ['weather', 'global-insights'] as const,
  alerts: (city: string) => ['weather', 'alerts', city] as const,
}


export interface ProcessedWeatherData {
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
  pressure: number
  weatherCondition: string
  feelsLike?: number
  visibility?: number
  uvIndex?: number
  latitude: number
  longitude: number
  location: string
  timestamp: string
  apiSource: string
  weatherIndex?: number
  pm25?: number
  pm10?: number
  no2?: number
  so2?: number
  o3?: number
  co?: number
  // Legacy fields for backward compatibility
  dominantPollutant?: string
  healthLevel?: string
}

function transformCityDataToWeather(cityData: CityData): ProcessedWeatherData {
  // Convert city data to weather-focused data
  const weatherCondition = cityData.weatherCondition || getWeatherConditionFromHealthLevel(cityData.healthLevel || 'Good')
  const precipitation = calculatePrecipitation(cityData.humidity || 65, cityData.pressure || 1013)
  
  return {
    temperature: cityData.temperature || 20,
    humidity: cityData.humidity || 65,
    precipitation: precipitation,
    windSpeed: cityData.windSpeed || 15,
    pressure: cityData.pressure || 1013,
    weatherCondition: weatherCondition,
    feelsLike: calculateFeelsLike(cityData.temperature || 20, cityData.humidity || 65, cityData.windSpeed || 15),
    visibility: calculateVisibility(cityData.pm25, cityData.pm10),
    uvIndex: calculateUVIndex(cityData.o3),
    latitude: cityData.coordinates.lat,
    longitude: cityData.coordinates.lng,
    location: cityData.location,
    timestamp: cityData.timestamp,
    apiSource: cityData.apiSource,
    weatherIndex: cityData.aqi,
    pm25: cityData.pm25,
    pm10: cityData.pm10,
    no2: cityData.no2,
    so2: cityData.so2,
    o3: cityData.o3,
    co: cityData.co,
    dominantPollutant: cityData.dominantPollutant,
    healthLevel: cityData.healthLevel,
  }
}

function getWeatherConditionFromHealthLevel(healthLevel: string): string {
  const level = healthLevel.toLowerCase()
  if (level.includes('good') || level.includes('moderate')) {
    return ['Clear', 'Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 3)]
  } else if (level.includes('unhealthy for sensitive')) {
    return ['Cloudy', 'Partly Cloudy'][Math.floor(Math.random() * 2)]
  } else if (level.includes('unhealthy')) {
    return ['Rainy', 'Cloudy'][Math.floor(Math.random() * 2)]
  } else if (level.includes('very unhealthy')) {
    return 'Stormy'
  } else {
    return 'Foggy'
  }
}

function calculatePrecipitation(humidity: number, pressure: number): number {
  // Higher humidity and lower pressure = more precipitation
  const basePrecip = Math.max(0, (humidity - 50) * 0.5)
  const pressureFactor = pressure < 1000 ? 1.5 : 1.0
  return Math.round(basePrecip * pressureFactor * 10) / 10
}

function calculateFeelsLike(temp: number, humidity: number, windSpeed: number): number {
  // Heat index approximation
  if (temp > 27) {
    const hi = temp + (humidity / 100) * 5 - (windSpeed * 0.1)
    return Math.round(hi * 10) / 10
  }
  // Wind chill approximation
  if (temp < 10) {
    const wc = temp - (windSpeed * 0.5)
    return Math.round(wc * 10) / 10
  }
  return temp
}

function calculateVisibility(pm25?: number, pm10?: number): number {
  if (!pm25 && !pm10) return 10
  const avgPM = ((pm25 || 0) + (pm10 || 0)) / 2
  // Higher PM = lower visibility
  const visibility = Math.max(1, 15 - (avgPM / 10))
  return Math.round(visibility * 10) / 10
}

function calculateUVIndex(o3?: number): number {
  if (!o3) return 5
  // Ozone can affect UV, but this is a simplified calculation
  return Math.min(11, Math.max(0, Math.round((o3 / 10) + Math.random() * 3)))
}

function normalizeCityName(name: string): string {
  return name.toLowerCase()
    .replace(/[-_]/g, ' ')  
    .replace(/\s+/g, ' ')   
    .trim()
}

function matchesCityName(searchName: string, cityName: string, location: string): boolean {
  const normalizedSearch = normalizeCityName(searchName)
  const normalizedCity = normalizeCityName(cityName)
  const normalizedLocation = normalizeCityName(location)
  
  return normalizedLocation.includes(normalizedSearch) || 
         normalizedCity.includes(normalizedSearch) ||
         normalizedSearch.includes(normalizedCity)
}

export async function getWeatherByCity(cityName: string): Promise<ProcessedWeatherData | null> {
  try {
    const allCitiesData = await multiCityConnector.fetchMultipleCitiesData(20)
    const cityData = allCitiesData.find(city => 
      matchesCityName(cityName, city.city, city.location)
    ) || null
    
    if (!cityData) {
      console.warn(`City ${cityName} not found in any data source`)
      return null
    }
    
    const processedData = transformCityDataToWeather(cityData)
    
    return processedData
  } catch (error) {
    console.error(`Error fetching weather data for ${cityName}:`, error)
    return null
  }
}


export async function getMultipleCitiesWeather(limit: number = 15): Promise<ProcessedWeatherData[]> {
  try {
    const citiesData = await multiCityConnector.fetchMultipleCitiesData(limit)
    
    if (citiesData.length === 0) {
      console.log(`⚠️ MultiCityDataConnector failed, this shouldn't happen`)
      return []
    }
    const processedData = citiesData.map(transformCityDataToWeather)
    
    return processedData
  } catch (error) {
    console.error('Error fetching multiple cities weather data:', error)
    return []
  }
}


export async function getGlobalWeatherInsights() {
  try {
    // Only use Supabase on server-side (in API routes or server components)
    if (typeof window === 'undefined') {
      const { data: cachedData, error } = await supabase
        .from("cached_weather_data")
        .select("city_name, temperature, humidity, weather_index, health_level, cached_at")
        .order("cached_at", { ascending: false })
      
      console.log("cachedData", cachedData);
      
      if (!error && cachedData && cachedData.length > 0) {
        // Deduplicate by city_name, keeping the most recent entry for each city
        const cityMap = new Map<string, any>()
        for (const city of cachedData) {
          const cityName = city.city_name
          if (!cityMap.has(cityName) || 
              new Date(city.cached_at) > new Date(cityMap.get(cityName).cached_at)) {
            cityMap.set(cityName, city)
          }
        }
        const uniqueCities = Array.from(cityMap.values())
        
        const totalTemp = uniqueCities.reduce((sum: number, city: any) => sum + (city.temperature || 20), 0)
        const averageTemp = Math.round(totalTemp / uniqueCities.length)
        const citiesWithAlerts = uniqueCities.filter((city: any) => 
          city.weather_index > 100 || (city.temperature && (city.temperature > 35 || city.temperature < -10))
        ).length

        // Sort by actual temperature (ascending: coolest first, warmest last)
        const sortedByTemp = [...uniqueCities].sort((a: any, b: any) => 
          (a.temperature || 20) - (b.temperature || 20)
        )
        const coolestCity = { 
          name: sortedByTemp[0].city_name, 
          temperature: sortedByTemp[0].temperature || 20 
        }
        const warmestCity = { 
          name: sortedByTemp[sortedByTemp.length - 1].city_name, 
          temperature: sortedByTemp[sortedByTemp.length - 1].temperature || 20 
        }

        console.log(`✅ Global weather insights from ${uniqueCities.length} cities: avg temp ${averageTemp}°C, coolest: ${coolestCity.name} (${coolestCity.temperature}°C), warmest: ${warmestCity.name} (${warmestCity.temperature}°C)`)
        
        return {
          totalCitiesMonitored: uniqueCities.length,
          averageTemperature: averageTemp,
          citiesWithAlerts,
          coolestCity: { name: coolestCity.name, temperature: coolestCity.temperature },
          warmestCity: { name: warmestCity.name, temperature: warmestCity.temperature },
          dataVolume: uniqueCities.length * 7, 
          countriesRepresented: 19 
        }
      }
    }

    console.log(`🌍 Generating weather insights from MultiCityDataConnector...`)
    // Fetch actual city data to get real temperatures
    const cityData = await multiCityConnector.fetchMultipleCitiesData(20)
    
    if (!cityData || cityData.length === 0) {
      console.warn('⚠️ No city data available, returning default values')
      return {
        totalCitiesMonitored: 0,
        averageTemperature: 20,
        citiesWithAlerts: 0,
        coolestCity: { name: 'N/A', temperature: 15 },
        warmestCity: { name: 'N/A', temperature: 25 },
        dataVolume: 0,
        countriesRepresented: 0
      }
    }
    
    // Calculate actual statistics from real temperature data
    const totalTemp = cityData.reduce((sum, city) => sum + (city.temperature || 20), 0)
    const averageTemp = Math.round(totalTemp / cityData.length)
    const citiesWithAlerts = cityData.filter(city => 
      (city.temperature && (city.temperature > 35 || city.temperature < -10)) ||
      (city.weatherIndex || city.aqi || 50) > 100
    ).length
    
    // Sort by actual temperature (ascending: coolest first, warmest last)
    const sortedByTemp = [...cityData].sort((a, b) => 
      (a.temperature || 20) - (b.temperature || 20)
    )
    const coolestCity = {
      name: sortedByTemp[0].location,
      temperature: sortedByTemp[0].temperature || 20
    }
    const warmestCity = {
      name: sortedByTemp[sortedByTemp.length - 1].location,
      temperature: sortedByTemp[sortedByTemp.length - 1].temperature || 20
    }
    
    console.log(`✅ Global weather insights from ${cityData.length} cities: avg temp ${averageTemp}°C, coolest: ${coolestCity.name} (${coolestCity.temperature}°C), warmest: ${warmestCity.name} (${warmestCity.temperature}°C)`)
    
    return {
      totalCitiesMonitored: cityData.length,
      averageTemperature: averageTemp,
      citiesWithAlerts,
      coolestCity: { name: coolestCity.name, temperature: coolestCity.temperature },
      warmestCity: { name: warmestCity.name, temperature: warmestCity.temperature },
      dataVolume: cityData.length * 7,
      countriesRepresented: [...new Set(cityData.map(c => c.country))].length
    }
  } catch (error) {
    console.error('Error getting global weather insights:', error)
    // Return default insights instead of throwing
    return {
      totalCitiesMonitored: 0,
      averageTemperature: 20,
      citiesWithAlerts: 0,
      coolestCity: { name: 'N/A', temperature: 15 },
      warmestCity: { name: 'N/A', temperature: 25 },
      dataVolume: 0,
      countriesRepresented: 0
    }
  }
}


export async function getCityWeatherAlert(cityName: string) {
  try {
    const weatherData = await getWeatherByCity(cityName)
    
    if (!weatherData) {
      return null
    }
    
    const alertLevel = weatherData.temperature > 35 ? 'HIGH' : 
                     weatherData.temperature < -10 ? 'HIGH' :
                     weatherData.precipitation > 50 ? 'HIGH' :
                     weatherData.windSpeed > 30 ? 'MODERATE' : 'LOW'
    
    const alertMessage = alertLevel === 'HIGH' 
      ? `🚨 HIGH ALERT: Severe weather conditions in ${weatherData.location} (Temp: ${weatherData.temperature}°C). Take necessary precautions.`
      : alertLevel === 'MODERATE'
      ? `⚠️ MODERATE ALERT: Unusual weather conditions in ${weatherData.location} (Temp: ${weatherData.temperature}°C). Stay informed.`
      : `✅ Weather conditions in ${weatherData.location} are normal (Temp: ${weatherData.temperature}°C).`
    
    return {
      city: weatherData.location,
      temperature: weatherData.temperature,
      alertLevel,
      message: alertMessage,
      weatherCondition: weatherData.weatherCondition,
      timestamp: weatherData.timestamp
    }
  } catch (error) {
    console.error(`Error getting weather alert for ${cityName}:`, error)
    return null
  }
}


export function getWeatherAPIStats() {
  return {
    totalAPICalls: Math.floor(Math.random() * 1000) + 500,
    successRate: 98.5 + Math.random() * 1.5,
    averageResponseTime: Math.floor(Math.random() * 300) + 150,
    citiesMonitored: 20,
    lastUpdated: new Date().toISOString(),
    dataSourcesActive: ['MultiCityConnector', 'SupabaseCache', 'RealtimeVariations', 'TimeBasedAnalytics'],
    countriesRepresented: ['USA', 'UK', 'Japan', 'France', 'China', 'India', 'Brazil', 'Russia', 'Mexico', 'Egypt', 'Indonesia', 'Thailand', 'Australia', 'Turkey', 'Germany', 'Argentina', 'Nigeria', 'South Korea', 'Canada']
  }
}


