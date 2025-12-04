-- Row Level Security (RLS) Policies for Supabase
-- This ensures proper security for your tables

-- Enable RLS on all tables
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ml_models ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
-- For development/demo purposes, allowing public read access

-- Devices policies
CREATE POLICY "Public read access for devices" ON devices FOR SELECT USING (true);
CREATE POLICY "Public insert access for devices" ON devices FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for devices" ON devices FOR UPDATE USING (true);

-- Sensor readings policies
CREATE POLICY "Public read access for sensor_readings" ON sensor_readings FOR SELECT USING (true);
CREATE POLICY "Public insert access for sensor_readings" ON sensor_readings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for sensor_readings" ON sensor_readings FOR UPDATE USING (true);

-- Traffic data policies
CREATE POLICY "Public read access for traffic_data" ON traffic_data FOR SELECT USING (true);
CREATE POLICY "Public insert access for traffic_data" ON traffic_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for traffic_data" ON traffic_data FOR UPDATE USING (true);

-- Energy consumption policies
CREATE POLICY "Public read access for energy_consumption" ON energy_consumption FOR SELECT USING (true);
CREATE POLICY "Public insert access for energy_consumption" ON energy_consumption FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for energy_consumption" ON energy_consumption FOR UPDATE USING (true);

-- Service requests policies
CREATE POLICY "Public read access for service_requests" ON service_requests FOR SELECT USING (true);
CREATE POLICY "Public insert access for service_requests" ON service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for service_requests" ON service_requests FOR UPDATE USING (true);

-- System events policies
CREATE POLICY "Public read access for system_events" ON system_events FOR SELECT USING (true);
CREATE POLICY "Public insert access for system_events" ON system_events FOR INSERT WITH CHECK (true);

-- Processing batches policies
CREATE POLICY "Public read access for processing_batches" ON processing_batches FOR SELECT USING (true);
CREATE POLICY "Public insert access for processing_batches" ON processing_batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for processing_batches" ON processing_batches FOR UPDATE USING (true);

-- ML models policies
CREATE POLICY "Public read access for ml_models" ON ml_models FOR SELECT USING (true);
CREATE POLICY "Public insert access for ml_models" ON ml_models FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for ml_models" ON ml_models FOR UPDATE USING (true);
