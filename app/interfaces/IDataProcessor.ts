export interface IDataProcessor {
  processData(data: any[]): Promise<any[]>
  getBatchSize(): number
  setBatchSize(size: number): void
  getProcessingRate(): number
}
