-- Migration: Add cached_weather_data table for Weather API data caching
-- This supports the real-time weather data caching functionality

-- Cached weather data from OpenWeatherMap API
CREATE TABLE IF NOT EXISTS cached_weather_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_name TEXT NOT NULL,
    weather_index INTEGER NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    humidity INTEGER NOT NULL,
    precipitation DECIMAL(5,2) DEFAULT 0,
    wind_speed DECIMAL(5,2) NOT NULL,
    pressure DECIMAL(7,2) NOT NULL,
    weather_condition TEXT NOT NULL,
    feels_like DECIMAL(5,2),
    visibility DECIMAL(5,2),
    uv_index INTEGER,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    -- Legacy fields for backward compatibility (optional)
    pm25 DECIMAL(8,2),
    pm10 DECIMAL(8,2),
    no2 DECIMAL(8,2),
    so2 DECIMAL(8,2),
    o3 DECIMAL(8,2),
    co DECIMAL(8,2),
    dominant_pollutant TEXT,
    health_level TEXT NOT NULL,
    api_source TEXT DEFAULT 'OPENWEATHERMAP',
    timestamp TIMESTAMPTZ NOT NULL,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_city_name 
    ON cached_weather_data(city_name);

CREATE INDEX IF NOT EXISTS idx_cached_weather_data_cached_at 
    ON cached_weather_data(cached_at DESC);

CREATE INDEX IF NOT EXISTS idx_cached_weather_data_weather_index 
    ON cached_weather_data(weather_index);

CREATE INDEX IF NOT EXISTS idx_cached_weather_data_condition 
    ON cached_weather_data(health_level);

-- Create a compound index for city and time-based queries
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_city_time 
    ON cached_weather_data(city_name, cached_at DESC);

-- Add Row Level Security (RLS)
ALTER TABLE cached_weather_data ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to cached weather data" 
    ON cached_weather_data FOR SELECT 
    TO authenticated 
    USING (true);

-- Allow insert for service role (for caching new data)
CREATE POLICY "Allow insert for service role" 
    ON cached_weather_data FOR INSERT 
    TO service_role 
    WITH CHECK (true);

-- Allow delete for cleanup operations (service role only)
CREATE POLICY "Allow delete for cleanup" 
    ON cached_weather_data FOR DELETE 
    TO service_role 
    USING (true); 