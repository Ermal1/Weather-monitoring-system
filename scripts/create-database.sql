-- SQL Script to create database tables for the Weather Monitor System
-- This demonstrates database integration and data persistence
-- Updated for Supabase/PostgreSQL with weather monitoring tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for IoT Devices
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) UNIQUE NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'OFFLINE' CHECK (status IN ('ONLINE', 'OFFLINE', 'MAINTENANCE', 'ERROR')),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Service Requests
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id VARCHAR(50) UNIQUE NOT NULL,
    citizen_id VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(10) DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for System Events
CREATE TABLE IF NOT EXISTS system_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    device_id VARCHAR(50),
    service_type VARCHAR(50),
    description TEXT,
    severity VARCHAR(10) DEFAULT 'INFO' CHECK (severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    event_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Energy Consumption
CREATE TABLE IF NOT EXISTS energy_consumption (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) NOT NULL,
    consumption_kwh DECIMAL(10,2) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weather data from OpenWeatherMap API
CREATE TABLE IF NOT EXISTS weather_data (
    id BIGSERIAL PRIMARY KEY,
    temperature DECIMAL(5,2) NOT NULL,
    humidity INTEGER NOT NULL,
    wind_speed DECIMAL(5,2),
    wind_direction INTEGER,
    pressure DECIMAL(7,2),
    visibility INTEGER,
    weather_condition TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    location_lat DECIMAL(10,7),
    location_lon DECIMAL(10,7),
    api_source TEXT DEFAULT 'openweathermap',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weather measurements data from multiple APIs
CREATE TABLE IF NOT EXISTS weather_measurements (
    id BIGSERIAL PRIMARY KEY,
    weather_index INTEGER,
    pm25 DECIMAL(8,2),
    pm10 DECIMAL(8,2),
    no2 DECIMAL(8,2),
    so2 DECIMAL(8,2),
    o3 DECIMAL(8,2),
    co DECIMAL(8,2),
    location TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    location_lat DECIMAL(10,7),
    location_lon DECIMAL(10,7),
    api_source TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cached weather data from Weather API
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
    -- Legacy fields for backward compatibility
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_devices_device_id ON devices(device_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
CREATE INDEX IF NOT EXISTS idx_weather_data_timestamp ON weather_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_timestamp ON weather_measurements(timestamp);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_city_name ON cached_weather_data(city_name);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_cached_at ON cached_weather_data(cached_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for service_requests
CREATE TRIGGER update_service_requests_updated_at 
    BEFORE UPDATE ON service_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO devices (device_id, device_type, location, status) VALUES
('TL001', 'TrafficLightController', 'Main St & 1st Ave', 'ONLINE'),
('TL002', 'TrafficLightController', 'Oak St & 2nd Ave', 'ONLINE'),
('SL001', 'SmartStreetLight', 'Park Avenue', 'ONLINE'),
('SL002', 'SmartStreetLight', 'Downtown Plaza', 'ONLINE'),
('WS001', 'WaterQualitySensor', 'Central Reservoir', 'ONLINE'),
('WS002', 'WaterQualitySensor', 'North Treatment Plant', 'ONLINE'),
('WEATHER_001', 'Weather Station', 'Downtown Plaza', 'ONLINE'),
('WEATHER_002', 'Weather Station', 'Central Park', 'ONLINE')
ON CONFLICT (device_id) DO NOTHING;

INSERT INTO service_requests (request_id, citizen_id, description, priority, status) VALUES
('REQ001', 'CIT001', 'Street light not working on Oak Street', 'HIGH', 'IN_PROGRESS'),
('REQ002', 'CIT002', 'Traffic light timing issue at Main & 1st', 'MEDIUM', 'PENDING'),
('REQ003', 'CIT003', 'Water quality concern in North district', 'HIGH', 'COMPLETED')
ON CONFLICT (request_id) DO NOTHING;

INSERT INTO system_events (event_type, device_id, description, severity, event_data) VALUES
('DEVICE_ONLINE', 'TL001', 'Traffic light controller came online', 'INFO', '{"location": "Main St & 1st Ave"}'),
('HIGH_TRAFFIC_DETECTED', 'TL001', 'High traffic density detected', 'WARNING', '{"density": 85, "threshold": 80}'),
('OPTIMIZATION_STARTED', 'SL001', 'Energy optimization initiated', 'INFO', '{"previous_brightness": 100, "new_brightness": 75}'),
('QUALITY_ALERT', 'WS001', 'Water quality reading below threshold', 'WARNING', '{"quality": 88, "threshold": 90}'),
('WEATHER_DATA_RECEIVED', 'WEATHER_001', 'Weather data successfully cached', 'INFO', '{"source": "Weather API", "city": "Downtown"}')
ON CONFLICT DO NOTHING;
