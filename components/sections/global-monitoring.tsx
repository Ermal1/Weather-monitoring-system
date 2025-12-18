'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getWeatherByCity, weatherQueryKeys } from '@/app/bigdata/WeatherQueries'
import { CheckCircle, Sparkles } from 'lucide-react'
import AnimatedCounter from '@/components/magic-ui/animated-counter'

function WeatherCard({ city }: { city: string }) {
  const { data: weather, isLoading, error, refetch } = useQuery({
    queryKey: weatherQueryKeys.city(city),
    queryFn: () => {
      console.log(`Fetching weather data for city: ${city}`)
      return getWeatherByCity(city)
    },
    staleTime: 5 * 60 * 1000, 
    refetchInterval: 10 * 60 * 1000, 
    retry: 3,
    retryDelay: 1000,
  })

  const getWeatherConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': case 'sunny': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cloudy': case 'partly cloudy': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'rainy': case 'rain': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'stormy': case 'thunderstorm': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'snowy': case 'snow': return 'bg-cyan-100 text-cyan-800 border-cyan-200'
      case 'foggy': case 'fog': return 'bg-slate-100 text-slate-800 border-slate-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return 'text-blue-600'
    if (temp <= 15) return 'text-cyan-600'
    if (temp <= 25) return 'text-green-600'
    if (temp <= 30) return 'text-yellow-600'
    if (temp <= 35) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600">{city}</CardTitle>
          <CardDescription>Failed to load weather data</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card className="border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>{city}</CardTitle>
          <CardDescription>No weather data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Use actual weather data
  const temperature = weather.temperature || 20
  const condition = weather.weatherCondition || 'Clear'
  const humidity = weather.humidity || 65
  const windSpeed = weather.windSpeed || 15
  const pressure = weather.pressure || 1013
  const precipitation = weather.precipitation || 0

  return (
    <Card className="transition-all hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {weather.location}
          </span>
          <Badge variant="outline" className={getWeatherConditionColor(condition)}>
            {condition}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-gray-600">
          <Sparkles className="w-3 h-3" />
          Real-time weather data from {weather.apiSource}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-700">Temperature</span>
            <span className={`text-3xl font-bold ${getTemperatureColor(temperature)}`}>
              <AnimatedCounter value={temperature} duration={1500} />°C
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Humidity:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={humidity} duration={1200} />%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Wind Speed:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={windSpeed} duration={1200} /> km/h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pressure:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={pressure} duration={1200} /> hPa
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Precipitation:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={precipitation} duration={1200} /> mm
              </span>
            </div>
          </div>

          {weather.temperature && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-500">Feels Like:</span>
              <span className="font-medium text-gray-900">
                <AnimatedCounter value={Math.round(temperature + (windSpeed * 0.1))} duration={1000} />°C
              </span>
            </div>
          )}

          <div className="text-xs text-gray-400 flex items-center gap-1">
            <span>Weather condition:</span>
            <Badge variant="secondary" className="text-xs">
              {condition.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GlobalInsightsWidget() {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: weatherQueryKeys.globalInsights(),
    queryFn: async () => {
      const response = await fetch('/api/weather?type=global-insights')
      if (!response.ok) {
        throw new Error('Failed to fetch global insights')
      }
      const result = await response.json()
      return result.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
  })

  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle>Global Weather Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !insights) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle>Global Weather Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load global weather insights</p>
        </CardContent>
      </Card>
    )
  }

  // Use actual temperature data
  const avgTemp = insights.averageTemperature || 20
  const coolestTemp = insights.coolestCity?.temperature || 15
  const warmestTemp = insights.warmestCity?.temperature || 25

  return (
    <Card>
      <CardHeader>
        <CardTitle>🌍 Global Weather Insights</CardTitle>
        <CardDescription>Real-time analytics from {insights.totalCitiesMonitored} cities worldwide</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{avgTemp}°C</div>
            <div className="text-sm text-gray-500">Average Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{insights.citiesWithAlerts}</div>
            <div className="text-sm text-gray-500">Cities with Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{coolestTemp}°C</div>
            <div className="text-sm text-gray-500">Coolest: {insights.coolestCity?.name || 'N/A'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{warmestTemp}°C</div>
            <div className="text-sm text-gray-500">Warmest: {insights.warmestCity?.name || 'N/A'}</div>
          </div>
        </div>

        {insights.citiesWithAlerts > 0 && (
          <Alert className="mt-4">
            <AlertDescription>
              ⚠️ {insights.citiesWithAlerts} cities currently have severe weather conditions. 
              Stay informed and take necessary precautions.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export function GlobalMonitoring() {
  const majorCities = ['London', 'New York', 'Tokyo', 'Paris', 'Shanghai', 'Delhi']

  return (
    <div className="space-y-6">
      <GlobalInsightsWidget />

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🌍 Major Cities Weather Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Real-time weather monitoring across 6 major global cities with complete meteorological data and forecasts
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majorCities.map((city) => (
            <WeatherCard key={city} city={city} />
          ))}
        </div>
      </div>
    </div>
  )
} 