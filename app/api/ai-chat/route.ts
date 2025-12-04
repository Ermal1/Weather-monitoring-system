import { NextRequest, NextResponse } from 'next/server'
import { getMultipleCitiesWeather, getGlobalWeatherInsights } from '@/app/bigdata/WeatherQueries'

// Backward compatibility
const getMultipleCitiesAirQuality = getMultipleCitiesWeather
const getGlobalAirQualityInsights = getGlobalWeatherInsights
import { createDeepSeek } from '@ai-sdk/deepseek'
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Message is required'
      }, { status: 400 })
    }

    const [citiesData, globalInsights] = await Promise.all([
      getMultipleCitiesAirQuality(10), 
      getGlobalAirQualityInsights()
    ])

    const currentData = citiesData.map(city => ({
      city: city.location,
      temperature: city.temperature,
      humidity: city.humidity,
      precipitation: city.precipitation,
      windSpeed: city.windSpeed,
      pressure: city.pressure,
      weatherCondition: city.weatherCondition,
      // Backward compatibility
      aqi: city.aqi,
      healthLevel: city.healthLevel,
      pm25: city.pm25,
      dominantPollutant: city.dominantPollutant,
      timestamp: city.timestamp
    }))


    const contextPrompt = `You are an AI weather assistant with access to real-time weather data. 

CURRENT WEATHER DATA (Updated: ${new Date().toISOString()}):
${currentData.map(city => 
  `• ${city.city}: ${city.temperature}°C, ${city.humidity}% humidity, ${city.precipitation}mm precipitation, ${city.windSpeed} km/h wind, ${city.pressure} hPa pressure - Condition: ${city.weatherCondition}`
).join('\n')}

GLOBAL INSIGHTS:
• Cities monitored: ${globalInsights?.totalCitiesMonitored || 'N/A'}
• Average Temperature: ${globalInsights?.averageTemperature || globalInsights?.averageAQI || 'N/A'}°C
• Cities with alerts: ${globalInsights?.citiesWithAlerts || 'N/A'}
• Coolest weather: ${globalInsights?.coolestCity?.name || globalInsights?.bestCity?.name || 'N/A'} (${globalInsights?.coolestCity?.temperature || globalInsights?.bestCity?.aqi || 'N/A'}°C)
• Warmest weather: ${globalInsights?.warmestCity?.name || globalInsights?.worstCity?.name || 'N/A'} (${globalInsights?.warmestCity?.temperature || globalInsights?.worstCity?.aqi || 'N/A'}°C)

Use this real-time data to provide accurate, current information about weather conditions. When users ask about specific cities, reference the actual current weather data above.

User message: ${message}`

    const apiKey = process.env.DEEPSEEK_API_KEY
    let response: string

    console.log(`🔑 DeepSeek API Key status: ${apiKey ? 'Present' : 'Missing'}`)

    if (!apiKey) {
      console.log('⚠️ DeepSeek API key not found, using fallback response')
               const alertCities = currentData.filter(city => city.aqi > 100)
        const goodCities = currentData.filter(city => city.aqi <= 50)
        
        const sortedCities = [...currentData].sort((a, b) => a.aqi - b.aqi)
        const bestCity = sortedCities[0]
        const worstCity = sortedCities[sortedCities.length - 1]
        
        const isAskingForWeatherDetails = message.toLowerCase().includes('temperature') || 
                                    message.toLowerCase().includes('humidity') || 
                                    message.toLowerCase().includes('precipitation') ||
                                    message.toLowerCase().includes('wind') ||
                                    message.toLowerCase().includes('detailed')

        if (isAskingForWeatherDetails) {
          response = `🌍 **Detailed Weather Data** (${currentData.length} cities):\n\n` +
            currentData.map(c => 
              `**${c.city.split(',')[0]}**: ${c.temperature}°C, ${c.weatherCondition}\n` +
              `  • Temperature: ${c.temperature}°C\n` +
              `  • Humidity: ${c.humidity}%\n` +
              `  • Precipitation: ${c.precipitation}mm\n` +
              `  • Wind Speed: ${c.windSpeed} km/h\n` +
              `  • Pressure: ${c.pressure} hPa\n` +
              `  • Condition: ${c.weatherCondition || 'N/A'}\n`
            ).join('\n') +
            `\n*Live weather data updated ${new Date().toLocaleTimeString()}*`
        } else {
          response = `Based on current weather data from ${currentData.length} cities:\n\n` +
            `🌍 **Current Cities**: ${currentData.map(c => `${c.city.split(',')[0]} (${c.temperature}°C, ${c.weatherCondition})`).join(', ')}\n\n` +
            (alertCities.length > 0 ? 
              `⚠️ **Cities with Weather Alerts**: ${alertCities.map(c => `${c.city.split(',')[0]} (${c.temperature}°C)`).join(', ')}\n\n` : '') +
            (goodCities.length > 0 ? 
              `✅ **Good Weather Conditions**: ${goodCities.map(c => `${c.city.split(',')[0]} (${c.temperature}°C, ${c.weatherCondition})`).join(', ')}\n\n` : '') +
            `🏆 **Best**: ${bestCity?.city.split(',')[0] || 'N/A'} (AQI ${bestCity?.aqi || 'N/A'})\n` +
            `📉 **Worst**: ${worstCity?.city.split(',')[0] || 'N/A'} (AQI ${worstCity?.aqi || 'N/A'})\n\n` +
            `*Note: DeepSeek AI is not configured. Showing current live data.*`
        }
     } else {
       const deepseek = createDeepSeek({ apiKey })
       const { text } = await generateText({
         model: deepseek('deepseek-chat'),
         prompt: contextPrompt,
         temperature: 0.4,
       })
       response = text
     }

    return NextResponse.json({
      success: true,
      response: response,
      dataSource: 'Real-time AQICN + AI Analysis',
      citiesIncluded: currentData.length,
      lastUpdate: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in AI chat:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process your request. Please try again.',
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI Chat API is running',
    timestamp: new Date().toISOString()
  });
} 