// Big Data Processing Engine - Core Class for Large-Scale Data Processing
import { BigDataEngine } from "../abstracts/BigDataEngine"
import { BigDataOperation } from "../enums/SystemEnums"
import { supabase } from "../../lib/supabase"

interface ProcessingMetrics {
  totalProcessed: number
  successRate: number
  averageLatency: number
  errorCount: number
  throughputPerSecond: number
}

interface BatchData {
  type: string
  data: any[]
  size: number
  timestamp: Date
}

export class BigDataProcessor extends BigDataEngine {
  private processedCount = 0
  private errorCount = 0
  private startTime = Date.now()
  private lastBatchTime = Date.now()
  private batches: BatchData[] = []

  constructor() {
    super(BigDataOperation.PROCESS)
  }

  public initializeEngine(): void {
    console.log("Big Data Engine initialized for weather monitoring processing")
  }

  public async processLargeDataset(data: any[]): Promise<void> {
    await this.processBigData(data)
  }

  public async processBigData(data: any[]): Promise<any[]> {
    const batchSize = 50
    const results: any[] = []

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      try {
        const processedBatch = await this.processBatch(batch)
        results.push(...processedBatch)
        this.processedCount += batch.length
      } catch (error) {
        this.errorCount += batch.length
        console.error("Batch processing error:", error)
      }
    }

    return results
  }

  private async processBatch(batch: any[]): Promise<any[]> {
    return batch.map(item => ({
      ...item,
      processed: true,
      processingTime: Date.now(),
      batchId: this.generateBatchId()
    }))
  }

  public async generateTestData(): Promise<void> {
    const batchTypes = ["sensor_readings"]
    const batches = 5
    const recordsPerBatch = 100

    for (let b = 0; b < batches; b++) {
      const batchType = batchTypes[Math.floor(Math.random() * batchTypes.length)]
      const data: any[] = []

      for (let i = 0; i < recordsPerBatch; i++) {
        switch (batchType) {
          case "sensor_readings":
            data.push(this.generateSensorData())
            break
        }
      }

      const batch: BatchData = {
        type: batchType,
        data,
        size: data.length,
        timestamp: new Date()
      }

      this.batches.push(batch)
      await this.storeBatch(batch)
    }
  }

  private generateSensorData(): any {
    const cities = ["Beijing", "Delhi", "Los Angeles", "London", "Tokyo"]
    const city = cities[Math.floor(Math.random() * cities.length)]
    
    return {
      device_id: `AQ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      location: city,
      pm25: Math.random() * 200,
      pm10: Math.random() * 300,
      o3: Math.random() * 150,
      no2: Math.random() * 100,
      so2: Math.random() * 80,
      co: Math.random() * 10,
      // Weather index (0-500 scale, similar to AQI for compatibility)
      aqi: Math.floor(Math.random() * 300),
      temperature: Math.floor(Math.random() * 40) - 10,
      humidity: Math.floor(Math.random() * 100),
      precipitation: Math.floor(Math.random() * 50),
      windSpeed: Math.floor(Math.random() * 30),
      pressure: 1000 + Math.floor(Math.random() * 50),
      weatherCondition: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
      timestamp: new Date()
    }
  }
  private async storeBatch(batch: BatchData): Promise<void> {
    try {
      switch (batch.type) {
        case "sensor_readings":
          await supabase.from("sensor_readings").insert(batch.data)
          break
      }
    } catch (error) {
      console.error(`Error storing ${batch.type} batch:`, error)
      this.errorCount += batch.size
    }
  }

  public async startProcessing(): Promise<void> {
    await this.generateTestData()
    
    this.batches.forEach(batch => {
      this.processBatchData(batch)
    })
  }

  public stopProcessing(): void {
    console.log("Big Data processing stopped")
  }

  private processBatchData(batch: BatchData): void {
    batch.data.forEach(record => {
      switch (batch.type) {
        case "sensor_readings":
          this.processSensorData(record)
          break
      }
    })
  }

  private processSensorData(record: any): void {
    const weatherIndex = record.weatherIndex || record.aqi || 50
    if (weatherIndex > 150 || (record.temperature && (record.temperature > 35 || record.temperature < -10))) {
      console.log(`Severe weather conditions detected: Weather Index ${weatherIndex} in ${record.location}`)
    }
  }

  private generateBatchId(): string {
    return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  public getMetrics(): ProcessingMetrics {
    const runtime = Date.now() - this.startTime
    const throughput = this.processedCount / (runtime / 1000)

    return {
      totalProcessed: this.processedCount,
      successRate: this.processedCount / (this.processedCount + this.errorCount) * 100,
      averageLatency: this.calculateAverageLatency(),
      errorCount: this.errorCount,
      throughputPerSecond: throughput
    }
  }

  private calculateAverageLatency(): number {
    if (this.batches.length === 0) return 0
    
    const totalLatency = this.batches.reduce((sum, batch) => {
      return sum + (Date.now() - batch.timestamp.getTime())
    }, 0)
    
    return totalLatency / this.batches.length
  }
}
