// Data Stream Management for Real-time Big Data Processing
export interface DataStream {
  id: string
  name: string
  type: "SENSOR" | "TRAFFIC" | "ENERGY" | "CITIZEN"
  isActive: boolean
  dataRate: number // records per second
  lastUpdate: Date
}

export interface StreamMetrics {
  totalStreams: number
  activeStreams: number
  totalDataRate: number
  averageLatency: number
}

// Class 21: Data Stream Manager
export class DataStreamManager {
  private streams: Map<string, DataStream> = new Map()
  private isStreaming = false
  private streamInterval?: NodeJS.Timeout

  constructor() {
    this.initializeStreams()
  }

  private initializeStreams(): void {
    // Initialize various data streams
    const streamConfigs = [
      { id: "traffic-stream-1", name: "Traffic Sensors Downtown", type: "TRAFFIC" as const, dataRate: 100 },
      { id: "traffic-stream-2", name: "Traffic Sensors Residential", type: "TRAFFIC" as const, dataRate: 50 },
      { id: "energy-stream-1", name: "Street Light Network", type: "ENERGY" as const, dataRate: 200 },
      { id: "sensor-stream-1", name: "Environmental Sensors", type: "SENSOR" as const, dataRate: 150 },
      { id: "sensor-stream-2", name: "Water Quality Monitors", type: "SENSOR" as const, dataRate: 75 },
      { id: "citizen-stream-1", name: "Service Requests", type: "CITIZEN" as const, dataRate: 25 },
    ]

    streamConfigs.forEach((config) => {
      const stream: DataStream = {
        ...config,
        isActive: false,
        lastUpdate: new Date(),
      }
      this.streams.set(config.id, stream)
    })
  }

  public startStreaming(): void {
    if (this.isStreaming) return

    this.isStreaming = true

    // Activate all streams
    this.streams.forEach((stream) => {
      stream.isActive = true
      stream.lastUpdate = new Date()
    })

    // Start stream monitoring
    this.streamInterval = setInterval(() => {
      this.updateStreamMetrics()
    }, 1000)
  }

  public stopStreaming(): void {
    this.isStreaming = false

    if (this.streamInterval) {
      clearInterval(this.streamInterval)
    }

    // Deactivate all streams
    this.streams.forEach((stream) => {
      stream.isActive = false
    })

  }

  private updateStreamMetrics(): void {
    this.streams.forEach((stream) => {
      if (stream.isActive) {
        // Simulate varying data rates
        stream.dataRate = stream.dataRate + (Math.random() - 0.5) * 20
        stream.dataRate = Math.max(10, Math.min(500, stream.dataRate))
        stream.lastUpdate = new Date()
      }
    })
  }

  public getStreamMetrics(): StreamMetrics {
    const activeStreams = Array.from(this.streams.values()).filter((s) => s.isActive)

    return {
      totalStreams: this.streams.size,
      activeStreams: activeStreams.length,
      totalDataRate: activeStreams.reduce((sum, s) => sum + s.dataRate, 0),
      averageLatency: Math.random() * 50 + 10, // Simulated latency
    }
  }

  public getAllStreams(): DataStream[] {
    return Array.from(this.streams.values())
  }

  public getStreamById(id: string): DataStream | undefined {
    return this.streams.get(id)
  }

  public toggleStream(id: string): boolean {
    const stream = this.streams.get(id)
    if (stream) {
      stream.isActive = !stream.isActive
      stream.lastUpdate = new Date()
      return stream.isActive
    }
    return false
  }
}
