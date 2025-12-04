import type { IManagementService } from "../interfaces/IManagementService"
import type { IReportable } from "../interfaces/IReportable"
import type { ServiceType } from "../enums/SystemEnums"

export abstract class ManagementService implements IManagementService, IReportable {
  protected serviceType: ServiceType
  protected isRunning = false
  protected emergencyMode = false

  constructor(serviceType: ServiceType) {
    this.serviceType = serviceType
  }

  abstract initialize(): void
  abstract processRequest(request: any): void

  public start(): void {
    if (!this.isRunning) {
      this.initialize()
      this.isRunning = true
    }
  }

  public stop(): void {
    this.isRunning = false
  }

  public getServiceType(): ServiceType {
    return this.serviceType
  }

  public handleEmergency(): void {
    this.emergencyMode = true
  }

  public optimize(): void {
  }

  public getStatus(): string {
    return this.isRunning ? "Running" : "Stopped"
  }

  public generateReport(): string {
    return `Report for ${this.serviceType} service`
  }

  public getReportData(): any {
    return {
      serviceType: this.serviceType,
      isRunning: this.isRunning,
      emergencyMode: this.emergencyMode,
    }
  }

  public exportReport(format: string): void {
  }
}
