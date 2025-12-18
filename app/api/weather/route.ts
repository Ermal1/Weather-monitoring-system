import { NextRequest, NextResponse } from 'next/server'
import { getGlobalWeatherInsights, getWeatherByCity, getMultipleCitiesWeather } from '@/app/bigdata/WeatherQueries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const limit = searchParams.get('limit')

    // Handle different query types
    if (type === 'global-insights') {
      const insights = await getGlobalWeatherInsights()
      return NextResponse.json({
        success: true,
        data: insights
      })
    }

    if (type === 'city' && city) {
      const weather = await getWeatherByCity(city)
      return NextResponse.json({
        success: true,
        data: weather
      })
    }

    if (type === 'multiple-cities') {
      const limitNum = limit ? parseInt(limit, 10) : 15
      const weather = await getMultipleCitiesWeather(limitNum)
      return NextResponse.json({
        success: true,
        data: weather
      })
    }

    // Default: return global insights
    const insights = await getGlobalWeatherInsights()
    return NextResponse.json({
      success: true,
      data: insights
    })

  } catch (error) {
    console.error('Error in weather API route:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data'
      },
      { status: 500 }
    )
  }
}
