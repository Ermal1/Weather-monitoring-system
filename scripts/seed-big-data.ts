// TypeScript seed script for Supabase
// Run with: npx tsx scripts/seed-big-data.ts

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zhmisoijuhzviasuvkwd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlzb2lqdWh6dmlhc3V2a3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTg2NTUsImV4cCI6MjA2ODI3NDY1NX0.cPKo3nAYNKCiEM3heezDZd92xr-7UWwEccrj9rs3jVQ"

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedBigData() {
  console.log("🌱 Starting big data seeding...")

  try {
    // Seed sensor readings (Big Data - 1000 records)
    console.log("📊 Seeding sensor readings...")
    const sensorReadings = []
    const devices = ["TL001", "TL002", "TL003", "SL001", "SL002", "SL003", "WS001", "WS002", "WS003"]
    const readingTypes = ["temperature", "humidity", "pressure", "quality", "density", "brightness", "motion"]

    for (let i = 0; i < 1000; i++) {
      const deviceId = devices[Math.floor(Math.random() * devices.length)]
      const readingType = readingTypes[Math.floor(Math.random() * readingTypes.length)]
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Last 7 days

      sensorReadings.push({
        device_id: deviceId,
        reading_type: readingType,
        value: Math.round(Math.random() * 100 * 100) / 100,
        unit: "units",
        timestamp: timestamp.toISOString(),
        processed: Math.random() > 0.3,
        ml_score: Math.round(Math.random() * 100 * 100) / 100,
        anomaly_detected: Math.random() > 0.95,
      })
    }

    // Insert in batches of 100
    for (let i = 0; i < sensorReadings.length; i += 100) {
      const batch = sensorReadings.slice(i, i + 100)
      const { error } = await supabase.from("sensor_readings").insert(batch)
      if (error) {
        console.error("Error inserting sensor readings batch:", error)
      } else {
        console.log(
          `✅ Inserted sensor readings batch ${Math.floor(i / 100) + 1}/${Math.ceil(sensorReadings.length / 100)}`,
        )
      }
    }

    const trafficData = []
    const trafficDevices = ["TL001", "TL002", "TL003"]

    for (let i = 0; i < 500; i++) {
      const deviceId = trafficDevices[Math.floor(Math.random() * trafficDevices.length)]
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      const vehicleCount = Math.floor(Math.random() * 200)
      const averageSpeed = Math.round((Math.random() * 40 + 20) * 100) / 100
      const congestionLevel = Math.round(Math.random() * 100 * 100) / 100

      trafficData.push({
        device_id: deviceId,
        vehicle_count: vehicleCount,
        average_speed: averageSpeed,
        congestion_level: congestionLevel,
        efficiency_score: Math.round((averageSpeed / 60) * (1 - congestionLevel / 100) * 100) / 100,
        timestamp: timestamp.toISOString(),
        processed_at: Math.random() > 0.5 ? new Date().toISOString() : null,
        worker_id: Math.random() > 0.5 ? `worker-${Math.floor(Math.random() * 4) + 1}` : null,
      })
    }

    // Insert traffic data in batches
    for (let i = 0; i < trafficData.length; i += 100) {
      const batch = trafficData.slice(i, i + 100)
      const { error } = await supabase.from("traffic_data").insert(batch)
      if (error) {
        console.error("Error inserting traffic data batch:", error)
      } else {
        console.log(`✅ Inserted traffic data batch ${Math.floor(i / 100) + 1}/${Math.ceil(trafficData.length / 100)}`)
      }
    }

    // Seed energy consumption data (Big Data - 800 records)
    console.log("⚡ Seeding energy consumption data...")
    const energyData = []
    const energyDevices = ["SL001", "SL002", "SL003"]

    for (let i = 0; i < 800; i++) {
      const deviceId = energyDevices[Math.floor(Math.random() * energyDevices.length)]
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      const consumption = Math.round(Math.random() * 10 * 1000) / 1000
      const efficiency = Math.round(Math.random() * 100 * 100) / 100

      energyData.push({
        device_id: deviceId,
        consumption_kwh: consumption,
        efficiency_rating: efficiency,
        efficiency_category: efficiency > 80 ? "HIGH" : efficiency > 60 ? "MEDIUM" : "LOW",
        timestamp: timestamp.toISOString(),
        processed_at: Math.random() > 0.5 ? new Date().toISOString() : null,
        worker_id: Math.random() > 0.5 ? `worker-${Math.floor(Math.random() * 4) + 1}` : null,
      })
    }

    // Insert energy data in batches
    for (let i = 0; i < energyData.length; i += 100) {
      const batch = energyData.slice(i, i + 100)
      const { error } = await supabase.from("energy_consumption").insert(batch)
      if (error) {
        console.error("Error inserting energy data batch:", error)
      } else {
        console.log(`✅ Inserted energy data batch ${Math.floor(i / 100) + 1}/${Math.ceil(energyData.length / 100)}`)
      }
    }

    // Seed processing batches
    console.log("📦 Seeding processing batches...")
    const processingBatches = []
    const batchTypes = ["sensor_readings", "traffic_data", "energy_consumption"]

    for (let i = 0; i < 50; i++) {
      const batchType = batchTypes[Math.floor(Math.random() * batchTypes.length)]
      const recordCount = Math.floor(Math.random() * 1000) + 100
      const processingTime = Math.floor(Math.random() * 5000) + 100

      processingBatches.push({
        batch_id: `batch-${Date.now()}-${i}`,
        batch_type: batchType,
        record_count: recordCount,
        processing_time_ms: processingTime,
        status: Math.random() > 0.1 ? "COMPLETED" : "PROCESSING",
        created_at: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: Math.random() > 0.2 ? new Date().toISOString() : null,
      })
    }

    const { error: batchError } = await supabase.from("processing_batches").insert(processingBatches)
    if (batchError) {
      console.error("Error inserting processing batches:", batchError)
    } else {
    }

    // Get final counts
    const { data: sensorCount } = await supabase.from("sensor_readings").select("id", { count: "exact", head: true })
    const { data: trafficCount } = await supabase.from("traffic_data").select("id", { count: "exact", head: true })
    const { data: energyCount } = await supabase.from("energy_consumption").select("id", { count: "exact", head: true })
    const { data: deviceCount } = await supabase.from("devices").select("id", { count: "exact", head: true })


    console.log(`   • Processing Batches: ${processingBatches.length}`)
  } catch (error) {
    console.error("❌ Error seeding big data:", error)
  }
}

// Run the seeding
seedBigData()
