import { SmartCityDataProcessor } from "../core/SmartCityDataProcessor"
import { RealTimeStreamProcessor } from "../core/RealTimeStreamProcessor"

export enum ProcessorType {
  DATA_PROCESSOR = "DATA_PROCESSOR",
  STREAM_PROCESSOR = "STREAM_PROCESSOR"
}

export class ProcessorFactory {
  public static createProcessor(type: ProcessorType): any {
    switch (type) {
      case ProcessorType.DATA_PROCESSOR:
        return new SmartCityDataProcessor()
      case ProcessorType.STREAM_PROCESSOR:
        return new RealTimeStreamProcessor()
      default:
        throw new Error(`Unknown processor type: ${type}`)
    }
  }

  public static getSupportedTypes(): ProcessorType[] {
    return Object.values(ProcessorType)
  }
}
