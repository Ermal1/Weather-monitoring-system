// Interface 5: Reportable Interface
export interface IReportable {
  generateReport(): string
  getReportData(): any
  exportReport(format: string): void
}
