export interface IBigDataEngine {
  startProcessing(): void
  stopProcessing(): void
  getMetrics(): any
  optimizePerformance(): void
}
