import { NextRequest, NextResponse } from 'next/server'
import { getMultipleCitiesWeather } from '@/app/bigdata/WeatherQueries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    
    const weatherData = await getMultipleCitiesWeather(limit)
    
    if (!weatherData || weatherData.length === 0) {
      return NextResponse.json(
        { error: 'No weather data available' },
        { status: 404 }
      )
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}



