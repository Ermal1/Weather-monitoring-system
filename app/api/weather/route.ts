import { NextRequest, NextResponse } from 'next/server'
import { getGlobalWeatherInsights, getWeatherByCity, getMultipleCitiesWeather } from '@/app/bigdata/WeatherQueries'
import { supabase } from '@/lib/supabase'
import type { ProcessedWeatherData } from '@/app/bigdata/WeatherQueries'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cityName, data } = body

    if (!cityName || !data) {
      return NextResponse.json(
        {
          success: false,
          error: 'cityName and data are required'
        },
        { status: 400 }
      )
    }

    // Try to cache to Supabase, but don't fail if it doesn't work
    // This is a non-critical operation - analytics should continue even if caching fails
    try {
      const weatherIndex = data.weatherIndex ? Number(data.weatherIndex) : 50
      
      const cacheEntry = {
        city_name: cityName || "Unknown",
        weather_index: weatherIndex,
        temperature: data.temperature ? Number(data.temperature) : 20,
        humidity: Math.floor(data.humidity ? data.humidity : 65),
        precipitation: data.precipitation ? Number(data.precipitation) : 0,
        wind_speed: data.windSpeed ? Number(data.windSpeed) : 15,
        pressure: data.pressure ? Number(data.pressure) : 1013,
        weather_condition: data.weatherCondition || "Clear",
        feels_like: data.feelsLike ? Number(data.feelsLike) : null,
        visibility: data.visibility ? Number(data.visibility) : null,
        uv_index: data.uvIndex || null,
        latitude: Number(data.latitude) || 0.0,
        longitude: Number(data.longitude) || 0.0,
        pm25: Number(data.pm25) || null,
        pm10: Number(data.pm10) || null,
        no2: Number(data.no2) || null,
        so2: Number(data.so2) || null,
        o3: Number(data.o3) || null,
        co: Number(data.co) || null,
        dominant_pollutant: data.dominantPollutant || "pm25",
        health_level: data.healthLevel || "Moderate",
        api_source: data.apiSource || "MULTI_SOURCE_REAL_TIME",
        timestamp: data.timestamp || new Date().toISOString(),
      }

      // Validate required fields
      if (
        !cacheEntry.city_name ||
        cacheEntry.weather_index === undefined ||
        cacheEntry.temperature === undefined ||
        cacheEntry.humidity === undefined ||
        cacheEntry.wind_speed === undefined ||
        cacheEntry.pressure === undefined ||
        !cacheEntry.weather_condition ||
        cacheEntry.latitude === undefined ||
        cacheEntry.longitude === undefined ||
        !cacheEntry.health_level ||
        !cacheEntry.timestamp
      ) {
        console.warn(`Skipping cache for ${cityName}: missing required fields`)
        // Return success anyway - caching is optional
        return NextResponse.json({
          success: true,
          message: 'Data processed (caching skipped due to missing fields)'
        })
      }

      // Only attempt insert if we're on the server-side
      if (typeof window === 'undefined') {
        const { error } = await supabase
          .from("cached_weather_data")
          .insert(cacheEntry)

        if (error) {
          // Log but don't fail - caching is optional
          console.warn(`Failed to cache ${cityName} to Supabase:`, error.message)
          // Still return success - analytics should continue
          return NextResponse.json({
            success: true,
            message: 'Data processed (caching failed but operation succeeded)',
            warning: error.message
          })
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Data cached successfully'
      })
    } catch (cacheError) {
      // Caching failed but that's okay - return success anyway
      console.warn(`Caching error for ${cityName} (non-critical):`, cacheError)
      return NextResponse.json({
        success: true,
        message: 'Data processed (caching failed but operation succeeded)',
        warning: cacheError instanceof Error ? cacheError.message : 'Unknown caching error'
      })
    }

  } catch (error) {
    console.error('Error in weather cache API route:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process request'
      },
      { status: 500 }
    )
  }
}
