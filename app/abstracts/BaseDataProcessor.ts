import type { IDataProcessor } from "../interfaces/IDataProcessor"
import { ProcessingPriority } from "../enums/SystemEnums"

export abstract class BaseDataProcessor implements IDataProcessor {
  protected processingRate = 0
  protected priority: ProcessingPriority

  constructor(priority: ProcessingPriority = ProcessingPriority.MEDIUM) {
    this.priority = priority
  }

  abstract processData(data: any[]): Promise<any[]>
  abstract validateData(data: any): boolean

  protected updateProcessingRate(recordCount: number, timeMs: number): void {
    this.processingRate = recordCount / (timeMs / 1000)
  }

  public getProcessingPriority(): ProcessingPriority {
    return this.priority
  }

  public setProcessingPriority(priority: ProcessingPriority): void {
    this.priority = priority
  }

  public getProcessingRate(): number {
    return this.processingRate
  }

  public getBatchSize(): number {
    return 1000
  }

  public setBatchSize(size: number): void {
  }
}
