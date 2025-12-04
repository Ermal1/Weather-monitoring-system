import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = "https://zhmisoijuhzviasuvkwd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlzb2lqdWh6dmlhc3V2a3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTg2NTUsImV4cCI6MjA2ODI3NDY1NX0.cPKo3nAYNKCiEM3heezDZd92xr-7UWwEccrj9rs3jVQ"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]

// Weather specific types  
// Note: Using cached_weather_data table for weather monitoring
export type WeatherData = Tables<"cached_weather_data">
export type AirQualityData = WeatherData // Backward compatibility

export type RealtimeWeatherPayload = {
  new: WeatherData
  old: WeatherData | null
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
}
export type RealtimeAirQualityPayload = RealtimeWeatherPayload // Backward compatibility

export function createWeatherChannel(channelName: string = 'weather-updates') {
  return supabase.channel(channelName)
}
export const createAirQualityChannel = createWeatherChannel // Backward compatibility
