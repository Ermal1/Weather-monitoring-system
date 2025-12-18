import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = "https://skezrqipdsdzviclhahw.supabase.co"  
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZXpycWlwZHNkenZpY2xoYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTg0MTMsImV4cCI6MjA4MDM3NDQxM30.DTHS8UeVZeG_S45z0vnwwT_R9tVP0LCUnVJEKsYsj5s"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})
console.log("supabase", supabase);
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]

// Weather specific types  
// Note: Using cached_weather_data table for weather monitoring
export type WeatherData = Tables<"cached_weather_data">

export type RealtimeWeatherPayload = {
  new: WeatherData
  old: WeatherData | null
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
}

export function createWeatherChannel(channelName: string = 'weather-updates') {
  return supabase.channel(channelName)
}
