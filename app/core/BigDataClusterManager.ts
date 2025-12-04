// CLASS 2: Big Data Cluster Manager (Singleton Pattern)
import type { IClusterManager } from "../interfaces/IClusterManager"
import { SystemException } from "../exceptions/SystemException"
import { AlertSeverity } from "../enums/SystemEnums"

export class BigDataClusterManager implements IClusterManager {
  private static instance: BigDataClusterManager
  private nodes: ClusterNode[] = []
  private totalCapacity = 0

  private constructor() {
    this.initializeCluster()
  }

  // Singleton Pattern implementation
  public static getInstance(): BigDataClusterManager {
    if (!BigDataClusterManager.instance) {
      BigDataClusterManager.instance = new BigDataClusterManager()
    }
    return BigDataClusterManager.instance
  }

  private initializeCluster(): void {
    for (let i = 1; i <= 4; i++) {
      this.nodes.push(new ClusterNode(`node-${i}`, 1000))
    }
    this.calculateTotalCapacity()
  }

  public scaleCluster(nodeCount: number): void {
    if (nodeCount < 1 || nodeCount > 20) {
      throw new SystemException("Invalid node count for cluster scaling", AlertSeverity.HIGH, "CLUSTER_MANAGER", "SCALE_ERROR")
    }

    const currentCount = this.nodes.length
    if (nodeCount > currentCount) {
      for (let i = currentCount + 1; i <= nodeCount; i++) {
        this.nodes.push(new ClusterNode(`node-${i}`, 1000))
      }
    } else if (nodeCount < currentCount) {
      this.nodes = this.nodes.slice(0, nodeCount)
    }

    this.calculateTotalCapacity()
  }

  public distributeLoad(): void {
    const activeNodes = this.nodes.filter((node) => node.isActive())
    const loadPerNode = this.totalCapacity / activeNodes.length

    activeNodes.forEach((node) => {
      node.setLoad(loadPerNode)
    })
  }

  public getClusterHealth(): any {
    const activeNodes = this.nodes.filter((node) => node.isActive()).length
    const totalNodes = this.nodes.length

    return {
      totalNodes,
      activeNodes,
      healthPercentage: (activeNodes / totalNodes) * 100,
      totalCapacity: this.totalCapacity,
      averageLoad: this.nodes.reduce((sum, node) => sum + node.getCurrentLoad(), 0) / totalNodes,
    }
  }

  private calculateTotalCapacity(): void {
    this.totalCapacity = this.nodes.reduce((sum, node) => sum + node.getCapacity(), 0)
  }

  public getNodes(): ClusterNode[] {
    return [...this.nodes]
  }
}

export class ClusterNode {
  private id: string
  private capacity: number
  private currentLoad = 0
  private active = true

  constructor(id: string, capacity: number) {
    this.id = id
    this.capacity = capacity
  }

  public getId(): string {
    return this.id
  }

  public getCapacity(): number {
    return this.capacity
  }

  public getCurrentLoad(): number {
    return this.currentLoad
  }

  public setLoad(load: number): void {
    this.currentLoad = Math.min(load, this.capacity)
  }

  public isActive(): boolean {
    return this.active
  }

  public setActive(active: boolean): void {
    this.active = active
  }
}
