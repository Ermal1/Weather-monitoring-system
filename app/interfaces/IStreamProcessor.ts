// INTERFACE 4: Stream Processor Interface
export interface IStreamProcessor {
  processStream?(streamId: string): void
  pauseStream?(streamId: string): void
  getStreamMetrics?(): any
}
