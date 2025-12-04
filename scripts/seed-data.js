// Node.js script to seed additional data
// This demonstrates server-side JavaScript and database operations

import { createConnection } from "mysql2/promise"

const connection = await createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "smart_city_db",
})

async function seedData() {
  try {
    console.log("Starting data seeding...")

    // Seed energy consumption data
    const energyData = [
      { device_id: "SL001", consumption_kwh: 2.5 },
      { device_id: "SL002", consumption_kwh: 3.1 },
      { device_id: "TL001", consumption_kwh: 1.8 },
      { device_id: "TL002", consumption_kwh: 1.9 },
    ]

    for (const data of energyData) {
      await connection.execute("INSERT INTO energy_consumption (device_id, consumption_kwh) VALUES (?, ?)", [
        data.device_id,
        data.consumption_kwh,
      ])
    }

    // Seed additional service requests
    const serviceRequests = [
      {
        id: "REQ004",
        citizen_id: "CIT004",
        description: "Request for new traffic light installation",
        priority: "MEDIUM",
      },
      {
        id: "REQ005",
        citizen_id: "CIT005",
        description: "Noise complaint about traffic optimization",
        priority: "LOW",
      },
    ]

    for (const request of serviceRequests) {
      await connection.execute(
        "INSERT INTO service_requests (id, citizen_id, description, priority) VALUES (?, ?, ?, ?)",
        [request.id, request.citizen_id, request.description, request.priority],
      )
    }

    console.log("Data seeding completed successfully!")

    // Display summary
    const [deviceCount] = await connection.execute("SELECT COUNT(*) as count FROM devices")
    const [requestCount] = await connection.execute("SELECT COUNT(*) as count FROM service_requests")
    const [eventCount] = await connection.execute("SELECT COUNT(*) as count FROM system_events")

    console.log(`Summary:
    - Devices: ${deviceCount[0].count}
    - Service Requests: ${requestCount[0].count}
    - System Events: ${eventCount[0].count}`)
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await connection.end()
  }
}

seedData()
