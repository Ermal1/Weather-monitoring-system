'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase, createAirQualityChannel, type AirQualityData } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { weatherQueryKeys, aqicnQueryKeys } from '@/app/bigdata/WeatherQueries'

interface UseRealtimeWeatherOptions {
  enabled?: boolean
  onUpdate?: (data: AirQualityData) => void
  onInsert?: (data: AirQualityData) => void
  onDelete?: (data: AirQualityData) => void
}

export function useRealtimeWeather(options: UseRealtimeWeatherOptions = {}) {
  const { enabled = true } = options
  const [isConnected, setIsConnected] = useState(true) // Default to connected
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(new Date())
  const queryClient = useQueryClient()
  const channelRef = useRef<any>(null)

  // Memoize handlers to prevent useEffect re-runs
  const handleInsert = useCallback((payload: any) => {
    console.log('🆕 New weather data received:', payload.new)
    setLastUpdate(new Date())
    queryClient.invalidateQueries({ queryKey: weatherQueryKeys.globalInsights() })
    options.onInsert?.(payload.new as AirQualityData)
  }, [queryClient, options.onInsert])

  const handleUpdate = useCallback((payload: any) => {
    console.log('🔄 Weather data updated:', payload.new)
    setLastUpdate(new Date())
    
    if (payload.new?.city_name) {
      queryClient.invalidateQueries({ 
        queryKey: weatherQueryKeys.city(payload.new.city_name) 
      })
    }
    
    queryClient.invalidateQueries({ queryKey: weatherQueryKeys.globalInsights() })
    options.onUpdate?.(payload.new as AirQualityData)
  }, [queryClient, options.onUpdate])

  const handleDelete = useCallback((payload: any) => {
    console.log('🗑️ Weather data deleted:', payload.old)
    setLastUpdate(new Date())
    queryClient.invalidateQueries({ queryKey: weatherQueryKeys.globalInsights() })
    options.onDelete?.(payload.old as AirQualityData)
  }, [queryClient, options.onDelete])

  useEffect(() => {
    if (!enabled) {
      setIsConnected(false)
      setConnectionError(null)
      return
    }

    // Avoid duplicate subscriptions
    if (channelRef.current) {
      return
    }

    // Create the real-time channel
    const channel = createAirQualityChannel('weather-monitor-realtime')
    channelRef.current = channel

    // Subscribe to events
    channel
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'cached_weather_data',
      }, handleInsert)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'cached_weather_data',
      }, handleUpdate)
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'cached_weather_data',
      }, handleDelete)

    // Subscribe to the channel
    channel.subscribe((status) => {
      console.log('Real-time subscription status:', status)
      if (status === 'SUBSCRIBED') {
        console.log('✅ Real-time weather subscription active')
        setIsConnected(true)
        setConnectionError(null)
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Real-time subscription error')
        setConnectionError('Connection issues')
      } else if (status === 'TIMED_OUT') {
        console.warn('⏰ Real-time subscription timed out')
        setConnectionError(null)
      } else if (status === 'CLOSED') {
        console.log('📴 Real-time subscription closed')
        setIsConnected(false)
      }
    })

    return () => {
      if (channelRef.current) {
        console.log('🔌 Unsubscribing from real-time weather updates')
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
      setIsConnected(false)
    }
  }, [enabled, handleInsert, handleUpdate, handleDelete])

  const disconnect = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
      setIsConnected(false)
    }
  }, [])

  return {
    isConnected,
    connectionError,
    lastUpdate,
    disconnect,
  }
}

export function useRealtimeCityWeather(cityName: string, enabled = true) {
  return useRealtimeWeather({ enabled })
}

// Keep old export for backward compatibility
export const useRealtimeAirQuality = useRealtimeWeather
export const useRealtimeCityAirQuality = useRealtimeCityWeather 