-- Supabase Migration: Create Weather Monitor System Tables
-- Run this in Supabase SQL Editor or save as migration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) UNIQUE NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'OFFLINE' CHECK (status IN ('ONLINE', 'OFFLINE', 'MAINTENANCE', 'ERROR')),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sensor readings table (Big Data - high volume)
CREATE TABLE IF NOT EXISTS sensor_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) NOT NULL,
    reading_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'units',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    processed BOOLEAN DEFAULT FALSE,
    ml_score DECIMAL(5,2),
    anomaly_detected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Traffic data table (Big Data)
CREATE TABLE IF NOT EXISTS traffic_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) NOT NULL,
    vehicle_count INTEGER NOT NULL DEFAULT 0,
    average_speed DECIMAL(5,2) NOT NULL DEFAULT 0,
    congestion_level DECIMAL(5,2) NOT NULL DEFAULT 0,
    efficiency_score DECIMAL(5,2),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    worker_id VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Energy consumption table (Big Data)
CREATE TABLE IF NOT EXISTS energy_consumption (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id VARCHAR(50) NOT NULL,
    consumption_kwh DECIMAL(10,3) NOT NULL,
    efficiency_rating DECIMAL(5,2) NOT NULL DEFAULT 0,
    efficiency_category VARCHAR(10) CHECK (efficiency_category IN ('LOW', 'MEDIUM', 'HIGH')),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    worker_id VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service requests table
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

-- System events table
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

-- Big data processing batches table
CREATE TABLE IF NOT EXISTS processing_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id VARCHAR(100) UNIQUE NOT NULL,
    batch_type VARCHAR(50) NOT NULL,
    record_count INTEGER NOT NULL DEFAULT 0,
    processing_time_ms INTEGER,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ML models table
CREATE TABLE IF NOT EXISTS ml_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id VARCHAR(50) UNIQUE NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    accuracy DECIMAL(5,2) DEFAULT 0,
    last_trained TIMESTAMPTZ,
    training_data_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'INACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'TRAINING')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance on big data queries
CREATE INDEX IF NOT EXISTS idx_sensor_readings_device_timestamp ON sensor_readings(device_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_timestamp ON sensor_readings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_processed ON sensor_readings(processed, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_traffic_data_device_timestamp ON traffic_data(device_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_traffic_data_timestamp ON traffic_data(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_energy_consumption_device_timestamp ON energy_consumption(device_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_energy_consumption_timestamp ON energy_consumption(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_system_events_timestamp ON system_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(event_type, created_at DESC);

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

-- Insert initial data
INSERT INTO devices (device_id, device_type, location, status) VALUES
('TL001', 'TrafficLightController', 'Main St & 1st Ave', 'ONLINE'),
('TL002', 'TrafficLightController', 'Oak St & 2nd Ave', 'ONLINE'),
('TL003', 'TrafficLightController', 'Park Ave & 3rd St', 'ONLINE'),
('SL001', 'SmartStreetLight', 'Park Avenue Block 1', 'ONLINE'),
('SL002', 'SmartStreetLight', 'Downtown Plaza', 'ONLINE'),
('SL003', 'SmartStreetLight', 'Residential Area A', 'ONLINE'),
('WS001', 'WaterQualitySensor', 'Central Reservoir', 'ONLINE'),
('WS002', 'WaterQualitySensor', 'North Treatment Plant', 'ONLINE'),
('WS003', 'WaterQualitySensor', 'South Distribution Center', 'ONLINE')
ON CONFLICT (device_id) DO NOTHING;

-- Insert ML models
INSERT INTO ml_models (model_id, model_name, model_type, accuracy, status) VALUES
('traffic-prediction', 'Traffic Pattern Prediction', 'REGRESSION', 87.5, 'ACTIVE'),
('energy-optimization', 'Energy Usage Optimization', 'OPTIMIZATION', 92.3, 'ACTIVE'),
('anomaly-detection', 'System Anomaly Detection', 'CLASSIFICATION', 94.1, 'ACTIVE')
ON CONFLICT (model_id) DO NOTHING;

-- Insert sample service requests
INSERT INTO service_requests (request_id, citizen_id, description, priority, status) VALUES
('REQ001', 'CIT001', 'Street light not working on Oak Street', 'HIGH', 'IN_PROGRESS'),
('REQ002', 'CIT002', 'Traffic light timing issue at Main & 1st', 'MEDIUM', 'PENDING'),
('REQ003', 'CIT003', 'Water quality concern in North district', 'HIGH', 'COMPLETED'),
('REQ004', 'CIT004', 'Request for new traffic light installation', 'MEDIUM', 'PENDING'),
('REQ005', 'CIT005', 'Energy efficiency improvement suggestion', 'LOW', 'PENDING')
ON CONFLICT (request_id) DO NOTHING;

-- Insert sample system events
INSERT INTO system_events (event_type, device_id, description, severity, event_data) VALUES
('DEVICE_ONLINE', 'TL001', 'Traffic light controller came online', 'INFO', '{"location": "Main St & 1st Ave"}'),
('HIGH_TRAFFIC_DETECTED', 'TL001', 'High traffic density detected', 'WARNING', '{"density": 85, "threshold": 80}'),
('OPTIMIZATION_STARTED', 'SL001', 'Energy optimization initiated', 'INFO', '{"previous_brightness": 100, "new_brightness": 75}'),
('QUALITY_ALERT', 'WS001', 'Water quality reading below threshold', 'WARNING', '{"quality": 88, "threshold": 90}'),
('SYSTEM_STARTED', NULL, 'Big Data processing system started', 'INFO', '{"timestamp": "2024-01-01T00:00:00Z"}');
