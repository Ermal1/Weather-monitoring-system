import type { IBigDataEngine } from "../interfaces/IBigDataEngine"
import type { BigDataOperation } from "../enums/SystemEnums"

export abstract class BigDataEngine implements IBigDataEngine {
  protected isRunning = false
  protected operation: BigDataOperation
  protected metrics: any = {}

  constructor(operation: BigDataOperation) {
    this.operation = operation
  }

  abstract initializeEngine(): void
  abstract processLargeDataset(dataset: any[]): Promise<void>

  public startProcessing(): void {
    if (!this.isRunning) {
      this.initializeEngine()
      this.isRunning = true
    }
  }

  public stopProcessing(): void {
    this.isRunning = false
  }

  public getMetrics(): any {
    return { ...this.metrics, isRunning: this.isRunning }
  }

  public optimizePerformance(): void {
  }
}
