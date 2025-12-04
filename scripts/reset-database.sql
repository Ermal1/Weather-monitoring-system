-- Complete Database Reset and Setup for Weather Monitor System Integration
-- Run this script to completely reset your Supabase database

-- ========================================
-- STEP 1: Drop All Existing Tables
-- ========================================

-- Disable foreign key checks temporarily
SET session_replication_role = replica;

-- Drop all existing tables (if they exist)
DROP TABLE IF EXISTS real_time_dashboard CASCADE; -- View
DROP TABLE IF EXISTS cached_weather_data CASCADE;
DROP TABLE IF EXISTS weather_data CASCADE;
DROP TABLE IF EXISTS weather_measurements CASCADE;
DROP TABLE IF EXISTS api_usage_logs CASCADE;
DROP TABLE IF EXISTS data_insights CASCADE;
DROP TABLE IF EXISTS trend_analytics CASCADE;
DROP TABLE IF EXISTS energy_consumption CASCADE;
DROP TABLE IF EXISTS sensor_readings CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS traffic_data CASCADE;
DROP TABLE IF EXISTS service_requests CASCADE;
DROP TABLE IF EXISTS system_events CASCADE;
DROP TABLE IF EXISTS ml_models CASCADE;
DROP TABLE IF EXISTS processing_batches CASCADE;

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- ========================================
-- STEP 2: Create Core Tables
-- ========================================

-- Devices table (IoT sensors and weather monitoring devices)
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id TEXT UNIQUE NOT NULL,
    device_type TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'OFFLINE',
    last_update TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sensor readings from IoT devices
CREATE TABLE IF NOT EXISTS sensor_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id TEXT NOT NULL REFERENCES devices(device_id),
    sensor_type TEXT NOT NULL,
    value DECIMAL(10,4) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Energy consumption data
CREATE TABLE IF NOT EXISTS energy_consumption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id TEXT NOT NULL REFERENCES devices(device_id),
    consumption_kwh DECIMAL(10,4) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Traffic data for weather monitoring
CREATE TABLE IF NOT EXISTS traffic_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location TEXT NOT NULL,
    congestion_level INTEGER NOT NULL CHECK (congestion_level >= 0 AND congestion_level <= 100),
    vehicle_count INTEGER NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service requests from citizens
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    priority TEXT DEFAULT 'MEDIUM',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- System events and logs
CREATE TABLE IF NOT EXISTS system_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    source TEXT NOT NULL,
    severity TEXT NOT NULL,
    event_data JSONB,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Machine learning models
CREATE TABLE IF NOT EXISTS ml_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name TEXT NOT NULL,
    model_type TEXT NOT NULL,
    status TEXT NOT NULL,
    accuracy DECIMAL(5,4),
    parameters JSONB,
    last_trained TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Processing batches for big data
CREATE TABLE IF NOT EXISTS processing_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    records_processed INTEGER,
    worker_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- STEP 3: Create Weather Tables
-- ========================================

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

-- API usage tracking for monitoring big data consumption
CREATE TABLE IF NOT EXISTS api_usage_logs (
    id BIGSERIAL PRIMARY KEY,
    api_name TEXT NOT NULL,
    endpoint TEXT,
    calls_count INTEGER DEFAULT 1,
    response_time_ms INTEGER,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    date DATE DEFAULT CURRENT_DATE,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Insights generated from real data processing
CREATE TABLE IF NOT EXISTS data_insights (
    id BIGSERIAL PRIMARY KEY,
    insight_type TEXT NOT NULL,
    prediction TEXT NOT NULL,
    confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
    timeframe TEXT,
    impact TEXT CHECK (impact IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    data_source TEXT NOT NULL,
    related_data JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Trend data for analytics visualization
CREATE TABLE IF NOT EXISTS trend_analytics (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    category TEXT NOT NULL,
    source TEXT NOT NULL,
    location TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cached weather data from Weather API (updated structure)
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

-- ========================================
-- STEP 4: Create Indexes for Performance
-- ========================================

-- Device indexes
CREATE INDEX IF NOT EXISTS idx_devices_device_id ON devices(device_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
CREATE INDEX IF NOT EXISTS idx_devices_type ON devices(device_type);

-- Sensor readings indexes
CREATE INDEX IF NOT EXISTS idx_sensor_readings_device_id ON sensor_readings(device_id);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_timestamp ON sensor_readings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_type ON sensor_readings(sensor_type);

-- Energy consumption indexes
CREATE INDEX IF NOT EXISTS idx_energy_consumption_device_id ON energy_consumption(device_id);
CREATE INDEX IF NOT EXISTS idx_energy_consumption_timestamp ON energy_consumption(timestamp DESC);

-- Traffic data indexes
CREATE INDEX IF NOT EXISTS idx_traffic_data_location ON traffic_data(location);
CREATE INDEX IF NOT EXISTS idx_traffic_data_timestamp ON traffic_data(timestamp DESC);

-- Weather data indexes
CREATE INDEX IF NOT EXISTS idx_weather_data_timestamp ON weather_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_data_location ON weather_data(location_lat, location_lon);

-- Weather measurements indexes
CREATE INDEX IF NOT EXISTS idx_weather_measurements_timestamp ON weather_measurements(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_location ON weather_measurements(location);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_api_source ON weather_measurements(api_source);

-- API usage logs indexes
CREATE INDEX IF NOT EXISTS idx_api_usage_date ON api_usage_logs(date, api_name);

-- Data insights indexes
CREATE INDEX IF NOT EXISTS idx_insights_timestamp ON data_insights(timestamp);
CREATE INDEX IF NOT EXISTS idx_insights_type ON data_insights(insight_type);

-- Trend analytics indexes
CREATE INDEX IF NOT EXISTS idx_trend_analytics_timestamp ON trend_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_trend_analytics_category ON trend_analytics(category);

-- Weather cache indexes
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_city_name ON cached_weather_data(city_name);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_cached_at ON cached_weather_data(cached_at DESC);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_weather_index ON cached_weather_data(weather_index);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_condition ON cached_weather_data(health_level);
CREATE INDEX IF NOT EXISTS idx_cached_weather_data_city_time ON cached_weather_data(city_name, cached_at DESC);

-- System events indexes
CREATE INDEX IF NOT EXISTS idx_system_events_timestamp ON system_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(event_type);
CREATE INDEX IF NOT EXISTS idx_system_events_severity ON system_events(severity);

-- ========================================
-- STEP 5: Enable Row Level Security (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ml_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cached_weather_data ENABLE ROW LEVEL SECURITY;

-- ========================================
-- STEP 6: Create RLS Policies
-- ========================================

-- Devices policies
CREATE POLICY "Allow read access to devices" ON devices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert devices for service role" ON devices FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Allow update devices for service role" ON devices FOR UPDATE TO service_role USING (true);

-- Sensor readings policies
CREATE POLICY "Allow read access to sensor readings" ON sensor_readings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert sensor readings for service role" ON sensor_readings FOR INSERT TO service_role WITH CHECK (true);

-- Energy consumption policies
CREATE POLICY "Allow read access to energy consumption" ON energy_consumption FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert energy consumption for service role" ON energy_consumption FOR INSERT TO service_role WITH CHECK (true);

-- Traffic data policies
CREATE POLICY "Allow read access to traffic data" ON traffic_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert traffic data for service role" ON traffic_data FOR INSERT TO service_role WITH CHECK (true);

-- Service requests policies
CREATE POLICY "Allow read access to service requests" ON service_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert service requests" ON service_requests FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow update service requests for service role" ON service_requests FOR UPDATE TO service_role USING (true);

-- System events policies
CREATE POLICY "Allow read access to system events" ON system_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert system events for service role" ON system_events FOR INSERT TO service_role WITH CHECK (true);

-- ML models policies
CREATE POLICY "Allow read access to ml models" ON ml_models FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow full access to ml models for service role" ON ml_models FOR ALL TO service_role USING (true);

-- Processing batches policies
CREATE POLICY "Allow read access to processing batches" ON processing_batches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow full access to processing batches for service role" ON processing_batches FOR ALL TO service_role USING (true);

-- Weather data policies
CREATE POLICY "Allow authenticated read access on weather_data" ON weather_data
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow service role insert on weather_data" ON weather_data
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Weather measurements policies
CREATE POLICY "Allow authenticated read access on weather_measurements" ON weather_measurements
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow service role insert on weather_measurements" ON weather_measurements
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- API usage logs policies
CREATE POLICY "Allow authenticated read access on api_usage_logs" ON api_usage_logs
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow service role insert on api_usage_logs" ON api_usage_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Data insights policies
CREATE POLICY "Allow authenticated read access on data_insights" ON data_insights
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow service role insert on data_insights" ON data_insights
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Trend analytics policies
CREATE POLICY "Allow authenticated read access on trend_analytics" ON trend_analytics
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow service role insert on trend_analytics" ON trend_analytics
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Cached weather data policies
CREATE POLICY "Allow read access to cached weather data" ON cached_weather_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert cached weather data for service role" ON cached_weather_data FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Allow delete cached weather data for cleanup" ON cached_weather_data FOR DELETE TO service_role USING (true);

-- ========================================
-- STEP 7: Insert Sample Data
-- ========================================

-- Insert sample devices
INSERT INTO devices (device_id, device_type, location, status) VALUES
('SENSOR_001', 'Weather Station', 'Downtown Plaza', 'ONLINE'),
('SENSOR_002', 'Traffic Counter', 'Main Street Bridge', 'ONLINE'),
('SENSOR_003', 'Energy Meter', 'City Hall', 'ONLINE'),
('SENSOR_004', 'Weather Station', 'Central Park', 'ONLINE'),
('SENSOR_005', 'Noise Monitor', 'Residential District', 'OFFLINE')
ON CONFLICT (device_id) DO NOTHING;

-- Insert sample traffic data
INSERT INTO traffic_data (location, congestion_level, vehicle_count, timestamp) VALUES
('Main Street Bridge', 75, 245, NOW() - INTERVAL '1 hour'),
('Downtown Plaza', 45, 123, NOW() - INTERVAL '2 hours'),
('Central Avenue', 60, 189, NOW() - INTERVAL '30 minutes'),
('Industrial District', 30, 67, NOW() - INTERVAL '45 minutes')
ON CONFLICT DO NOTHING;

-- Insert sample service requests
INSERT INTO service_requests (request_type, description, location, status, priority) VALUES
('Street Lighting', 'Broken street light on Oak Avenue', 'Oak Avenue & 5th St', 'PENDING', 'HIGH'),
('Waste Management', 'Overflowing garbage bin in Central Park', 'Central Park', 'IN_PROGRESS', 'MEDIUM'),
('Traffic Signal', 'Traffic light malfunction at intersection', 'Main St & Broadway', 'COMPLETED', 'CRITICAL'),
('Road Maintenance', 'Pothole reported on Industrial Blvd', 'Industrial Blvd', 'PENDING', 'LOW')
ON CONFLICT DO NOTHING;

-- Insert sample system events
INSERT INTO system_events (event_type, source, severity, event_data, timestamp) VALUES
('DEVICE_ONLINE', 'SENSOR_001', 'INFO', '{"device_id": "SENSOR_001", "location": "Downtown Plaza"}', NOW() - INTERVAL '1 hour'),
('HIGH_TRAFFIC', 'SENSOR_002', 'WARNING', '{"congestion_level": 85, "location": "Main Street Bridge"}', NOW() - INTERVAL '30 minutes'),
('SYSTEM_STARTUP', 'ANALYTICS_ENGINE', 'INFO', '{"component": "RealTimeAnalytics", "status": "started"}', NOW() - INTERVAL '2 hours')
ON CONFLICT DO NOTHING;

-- ========================================
-- STEP 8: Create Real-Time Dashboard View
-- ========================================

-- Create a view for real-time dashboard data
CREATE OR REPLACE VIEW real_time_dashboard AS
SELECT 
    w.timestamp,
    w.temperature,
    w.humidity,
    w.weather_condition,
    wm.weather_index,
    wm.pm25,
    wm.pm10,
    wm.location,
    i.insight_type,
    i.prediction,
    i.confidence
FROM weather_data w
LEFT JOIN weather_measurements wm ON DATE(w.timestamp) = DATE(wm.timestamp)
LEFT JOIN data_insights i ON i.timestamp >= NOW() - INTERVAL '1 hour'
WHERE w.timestamp >= NOW() - INTERVAL '24 hours'
ORDER BY w.timestamp DESC;

-- Grant access to the view
GRANT SELECT ON real_time_dashboard TO authenticated;

-- ========================================
-- COMPLETED
-- ========================================

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE 'Database reset completed successfully!';
    RAISE NOTICE 'Created tables: devices, sensor_readings, energy_consumption, traffic_data, service_requests, system_events, ml_models, processing_batches';
    RAISE NOTICE 'Created weather tables: weather_data, weather_measurements, api_usage_logs, data_insights, trend_analytics, cached_weather_data';
    RAISE NOTICE 'Created view: real_time_dashboard';
    RAISE NOTICE 'Enabled RLS and created policies for all tables';
    RAISE NOTICE 'Inserted sample data for testing';
    RAISE NOTICE 'Ready for Weather API integration!';
END $$; 