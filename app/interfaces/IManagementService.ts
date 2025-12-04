import type { ServiceType } from "../enums/SystemEnums"

export interface IManagementService {
  start(): void
  stop(): void
  getServiceType(): ServiceType
  handleEmergency(): void
  optimize(): void
  getStatus(): string
}
