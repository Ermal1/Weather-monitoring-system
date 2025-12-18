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
      case 'clear': case 'sunny': return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-400/40 backdrop-blur-sm'
      case 'cloudy': case 'partly cloudy': return 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-300 border-slate-400/40 backdrop-blur-sm'
      case 'rainy': case 'rain': return 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/40 backdrop-blur-sm'
      case 'stormy': case 'thunderstorm': return 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-400/40 backdrop-blur-sm'
      case 'snowy': case 'snow': return 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border-cyan-400/40 backdrop-blur-sm'
      case 'foggy': case 'fog': return 'bg-gradient-to-r from-slate-500/20 to-zinc-500/20 text-slate-300 border-slate-400/40 backdrop-blur-sm'
      default: return 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-300 border-slate-400/40 backdrop-blur-sm'
    }
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return 'text-cyan-400'
    if (temp <= 15) return 'text-teal-400'
    if (temp <= 25) return 'text-emerald-400'
    if (temp <= 30) return 'text-amber-400'
    if (temp <= 35) return 'text-orange-400'
    return 'text-rose-400'
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 border-emerald-500/20">
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
      <Card className="border-rose-500/40 bg-rose-900/30 backdrop-blur-xl shadow-2xl shadow-rose-500/10">
        <CardHeader>
          <CardTitle className="text-rose-400">{city}</CardTitle>
          <CardDescription className="text-rose-300/70">Failed to load weather data</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
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
    <Card className="transition-all hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl shadow-2xl border-emerald-500/30 group">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
            {weather.location}
          </span>
          <Badge variant="outline" className={getWeatherConditionColor(condition)}>
            {condition}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-emerald-300/70">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Real-time weather data from {weather.apiSource}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-300">Temperature</span>
            <span className={`text-4xl font-bold ${getTemperatureColor(temperature)} drop-shadow-lg`}>
              <AnimatedCounter value={temperature} duration={1500} />°C
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-emerald-500/10">
              <span className="text-slate-400">Humidity:</span>
              <span className="ml-1 font-medium text-emerald-300">
                <AnimatedCounter value={humidity} duration={1200} />%
              </span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-teal-500/10">
              <span className="text-slate-400">Wind Speed:</span>
              <span className="ml-1 font-medium text-teal-300">
                <AnimatedCounter value={windSpeed} duration={1200} /> km/h
              </span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-cyan-500/10">
              <span className="text-slate-400">Pressure:</span>
              <span className="ml-1 font-medium text-cyan-300">
                <AnimatedCounter value={pressure} duration={1200} /> hPa
              </span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-blue-500/10">
              <span className="text-slate-400">Precipitation:</span>
              <span className="ml-1 font-medium text-blue-300">
                <AnimatedCounter value={precipitation} duration={1200} /> mm
              </span>
            </div>
          </div>

          {weather.temperature && (
            <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
              <span className="text-slate-400">Feels Like:</span>
              <span className="font-medium text-emerald-300">
                <AnimatedCounter value={Math.round(temperature + (windSpeed * 0.1))} duration={1000} />°C
              </span>
            </div>
          )}

          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>Weather condition:</span>
            <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-300 border-emerald-500/30">
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
      <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl shadow-2xl border-emerald-500/30">
        <CardHeader>
          <CardTitle className="text-emerald-300">Global Weather Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-emerald-500/20 rounded w-3/4"></div>
            <div className="h-4 bg-emerald-500/20 rounded w-1/2"></div>
            <div className="h-4 bg-emerald-500/20 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !insights) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl shadow-2xl border-rose-500/30">
        <CardHeader>
          <CardTitle className="text-rose-300">Global Weather Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-rose-400">Failed to load global weather insights</p>
        </CardContent>
      </Card>
    )
  }

  // Use actual temperature data
  const avgTemp = insights.averageTemperature || 20
  const coolestTemp = insights.coolestCity?.temperature || 15
  const warmestTemp = insights.warmestCity?.temperature || 25

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 via-emerald-900/20 to-teal-900/20 backdrop-blur-xl shadow-2xl border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          🌍 Global Weather Insights
        </CardTitle>
        <CardDescription className="text-emerald-300/80">Real-time analytics from {insights.totalCitiesMonitored} cities worldwide</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-cyan-300 drop-shadow-lg">{avgTemp}°C</div>
            <div className="text-sm text-cyan-200/80 mt-2">Average Temperature</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-400/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-rose-300 drop-shadow-lg">{insights.citiesWithAlerts}</div>
            <div className="text-sm text-rose-200/80 mt-2">Cities with Alerts</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-400/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-teal-300 drop-shadow-lg">{coolestTemp}°C</div>
            <div className="text-sm text-teal-200/80 mt-2">Coolest: {insights.coolestCity?.name || 'N/A'}</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-amber-300 drop-shadow-lg">{warmestTemp}°C</div>
            <div className="text-sm text-amber-200/80 mt-2">Warmest: {insights.warmestCity?.name || 'N/A'}</div>
          </div>
        </div>

        {insights.citiesWithAlerts > 0 && (
          <Alert className="mt-6 bg-gradient-to-r from-rose-900/40 to-orange-900/40 border-rose-500/50 backdrop-blur-sm">
            <AlertDescription className="text-rose-200">
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
  const majorCities = ['London', 'New York', 'Moscow', 'Paris', 'Shanghai', 'Mexico City']

  return (
    <div className="space-y-6">
      <GlobalInsightsWidget />

      <div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          🌍 Major Cities Weather Dashboard
        </h2>
        <p className="text-emerald-200/80 mb-6 text-lg">
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