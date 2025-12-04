export interface IClusterManager {
  scaleCluster(nodes: number): void
  distributeLoad(): void
  getClusterHealth(): any
}
