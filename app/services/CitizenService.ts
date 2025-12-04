import { ManagementService } from "../abstracts/ManagementService"
import { ServiceType, ServiceRequestStatus, ServiceRequestPriority } from "../enums/SystemEnums"

export class ServiceRequest {
  private id: string
  private citizenId: string
  private description: string
  private priority: ServiceRequestPriority
  private status: ServiceRequestStatus
  private createdAt: Date

  constructor(id: string, citizenId: string, description: string, priority: ServiceRequestPriority = ServiceRequestPriority.MEDIUM) {
    this.id = id
    this.citizenId = citizenId
    this.description = description
    this.priority = priority
    this.status = ServiceRequestStatus.PENDING
    this.createdAt = new Date()
  }

  public getId(): string {
    return this.id
  }
  public getCitizenId(): string {
    return this.citizenId
  }
  public getDescription(): string {
    return this.description
  }
  public getPriority(): ServiceRequestPriority {
    return this.priority
  }
  public getStatus(): ServiceRequestStatus {
    return this.status
  }
  public getCreatedAt(): Date {
    return this.createdAt
  }

  public updateStatus(status: ServiceRequestStatus): void {
    this.status = status
  }

  public setPriority(priority: ServiceRequestPriority): void {
    this.priority = priority
  }
}

export class CitizenService extends ManagementService {
  private serviceRequests: Map<string, ServiceRequest> = new Map()
  private requestCounter = 0

  constructor() {
    super(ServiceType.WEATHER_MONITORING)
  }

  public initialize(): void {
    console.log("Citizen Service initialized")
  }

  public processRequest(request: any): void {
    console.log(`Processing citizen request: ${request.type}`)

    switch (request.type) {
      case "NEW_REQUEST":
        this.createServiceRequest(request.citizenId, request.description, request.priority)
        break
      case "UPDATE_STATUS":
        this.updateRequestStatus(request.requestId, request.status)
        break
      default:
        console.log("Unknown citizen request type")
    }
  }

  public createServiceRequest(citizenId: string, description: string, priority: ServiceRequestPriority): ServiceRequest {
    const requestId = `REQ${++this.requestCounter}`
    const serviceRequest = new ServiceRequest(requestId, citizenId, description, priority)
    this.serviceRequests.set(requestId, serviceRequest)
    console.log(`Service request ${requestId} created for citizen ${citizenId}`)
    return serviceRequest
  }

  public updateRequestStatus(requestId: string, status: ServiceRequestStatus): void {
    const request = this.serviceRequests.get(requestId)
    if (request) {
      request.updateStatus(status)
      console.log(`Request ${requestId} status updated to ${status}`)
    }
  }

  public getServiceRequests(): ServiceRequest[] {
    return Array.from(this.serviceRequests.values())
  }

  public getRequestsByPriority(priority: ServiceRequestPriority): ServiceRequest[] {
    return this.getServiceRequests().filter((req) => req.getPriority() === priority)
  }
}
