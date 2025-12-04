-- Migration: Add tables for real-time big data from external APIs
-- This supports the new RealTimeDataConnector functionality

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

-- Weather measurements data from multiple APIs (OpenWeatherMap, Weather API, etc.)
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
    api_source TEXT NOT NULL, -- 'openweathermap', 'weather_api', 'meteorological_service', etc.
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
    related_data JSONB, -- Store related data points
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ -- When this insight is no longer relevant
);

-- Trend data for analytics visualization
CREATE TABLE IF NOT EXISTS trend_analytics (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    category TEXT NOT NULL, -- 'temperature', 'humidity', 'precipitation', 'wind_speed', etc.
    source TEXT NOT NULL, -- API source or system component
    location TEXT,
    metadata JSONB, -- Additional data about the trend point
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_weather_data_timestamp ON weather_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_data_location ON weather_data(location_lat, location_lon);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_timestamp ON weather_measurements(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_location ON weather_measurements(location);
CREATE INDEX IF NOT EXISTS idx_weather_measurements_api_source ON weather_measurements(api_source);
CREATE INDEX IF NOT EXISTS idx_api_usage_date ON api_usage_logs(date, api_name);
CREATE INDEX IF NOT EXISTS idx_insights_timestamp ON data_insights(timestamp);
CREATE INDEX IF NOT EXISTS idx_insights_type ON data_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_trend_analytics_timestamp ON trend_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_trend_analytics_category ON trend_analytics(category);

-- RLS (Row Level Security) policies for data access
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_analytics ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all data
CREATE POLICY "Allow authenticated read access on weather_data" ON weather_data
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access on weather_measurements" ON weather_measurements
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access on api_usage_logs" ON api_usage_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access on data_insights" ON data_insights
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access on trend_analytics" ON trend_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow system to insert data (service role)
CREATE POLICY "Allow service role insert on weather_data" ON weather_data
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role insert on weather_measurements" ON weather_measurements
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role insert on api_usage_logs" ON api_usage_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role insert on data_insights" ON data_insights
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role insert on trend_analytics" ON trend_analytics
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

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

COMMENT ON TABLE weather_data IS 'Real-time weather data from external APIs like OpenWeatherMap';
COMMENT ON TABLE weather_measurements IS 'Weather measurements from multiple API sources';
COMMENT ON TABLE api_usage_logs IS 'Tracking API calls for monitoring and rate limiting';
COMMENT ON TABLE data_insights IS 'AI-generated insights from real weather data processing';
COMMENT ON TABLE trend_analytics IS 'Time-series data for weather analytics visualization';
COMMENT ON VIEW real_time_dashboard IS 'Combined view of recent weather data and insights'; 