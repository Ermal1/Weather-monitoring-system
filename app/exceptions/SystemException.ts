
import { AlertSeverity } from "../enums/SystemEnums"

export class SystemException extends Error {
  public readonly timestamp: Date
  public readonly severity: AlertSeverity
  public readonly component: string
  public readonly errorCode: string
  public readonly context?: Record<string, any>

  constructor(
    message: string,
    severity: AlertSeverity = AlertSeverity.MEDIUM,
    component: string = "UNKNOWN",
    errorCode: string = "SYS_ERROR",
    context?: Record<string, any>
  ) {
    super(message)
    this.name = this.constructor.name
    this.timestamp = new Date()
    this.severity = severity
    this.component = component
    this.errorCode = errorCode
    this.context = context

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      severity: this.severity,
      component: this.component,
      errorCode: this.errorCode,
      context: this.context,
      stack: this.stack
    }
  }
}

export class DataProcessingException extends SystemException {
  constructor(message: string, context?: Record<string, any>) {
    super(
      message,
      AlertSeverity.HIGH,
      "DATA_PROCESSOR",
      "DATA_PROC_ERROR",
      context
    )
  }
}

export class APIException extends SystemException {
  public readonly httpStatus?: number
  public readonly apiEndpoint?: string

  constructor(
    message: string,
    httpStatus?: number,
    apiEndpoint?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.HIGH,
      "API_CONNECTOR",
      "API_ERROR",
      context
    )
    this.httpStatus = httpStatus
    this.apiEndpoint = apiEndpoint
  }
}

// Device/IoT related exceptions
export class DeviceException extends SystemException {
  public readonly deviceId?: string
  public readonly deviceType?: string

  constructor(
    message: string,
    deviceId?: string,
    deviceType?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.MEDIUM,
      "DEVICE_MANAGER",
      "DEVICE_ERROR",
      context
    )
    this.deviceId = deviceId
    this.deviceType = deviceType
  }
}

export class AnalyticsException extends SystemException {
  public readonly analyticsType?: string

  constructor(
    message: string,
    analyticsType?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.MEDIUM,
      "ANALYTICS_ENGINE",
      "ANALYTICS_ERROR",
      context
    )
    this.analyticsType = analyticsType
  }
}

export class DatabaseException extends SystemException {
  public readonly query?: string
  public readonly table?: string

  constructor(
    message: string,
    query?: string,
    table?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.CRITICAL,
      "DATABASE",
      "DB_ERROR",
      context
    )
    this.query = query
    this.table = table
  }
}

// Cache related exceptions
export class CacheException extends SystemException {
  public readonly cacheKey?: string
  public readonly cacheOperation?: string

  constructor(
    message: string,
    cacheKey?: string,
    cacheOperation?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.LOW,
      "CACHE_MANAGER",
      "CACHE_ERROR",
      context
    )
    this.cacheKey = cacheKey
    this.cacheOperation = cacheOperation
  }
}

export class ValidationException extends SystemException {
  public readonly field?: string
  public readonly value?: any

  constructor(
    message: string,
    field?: string,
    value?: any,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.MEDIUM,
      "VALIDATOR",
      "VALIDATION_ERROR",
      context
    )
    this.field = field
    this.value = value
  }
}

export class ConfigurationException extends SystemException {
  public readonly configKey?: string

  constructor(
    message: string,
    configKey?: string,
    context?: Record<string, any>
  ) {
    super(
      message,
      AlertSeverity.CRITICAL,
      "CONFIG_MANAGER",
      "CONFIG_ERROR",
      context
    )
    this.configKey = configKey
  }
}

export class ExceptionHandler {
  private static instance: ExceptionHandler
  private errorLog: SystemException[] = []

  private constructor() {}

  public static getInstance(): ExceptionHandler {
    if (!ExceptionHandler.instance) {
      ExceptionHandler.instance = new ExceptionHandler()
    }
    return ExceptionHandler.instance
  }

  public handleException(error: Error, component?: string): void {
    let systemError: SystemException

    if (error instanceof SystemException) {
      systemError = error
    } else {
      systemError = new SystemException(
        error.message,
        AlertSeverity.MEDIUM,
        component || "UNKNOWN",
        "GENERIC_ERROR",
        { originalError: error.name }
      )
    }

    this.errorLog.push(systemError)
    console.error(`[${systemError.component}] ${systemError.message}`, systemError.toJSON())

    this.notifyErrorService(systemError)
  }

  private notifyErrorService(error: SystemException): void {
    if (error.severity === AlertSeverity.CRITICAL) {
      console.error("🚨 CRITICAL ERROR - Immediate attention required!", error.toJSON())
    }
  }

  public getRecentErrors(limit: number = 10): SystemException[] {
    return this.errorLog.slice(-limit)
  }

  public clearErrorLog(): void {
    this.errorLog = []
  }

  public getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {}
    this.errorLog.forEach(error => {
      stats[error.component] = (stats[error.component] || 0) + 1
    })
    return stats
  }
}

export function handleSystemError(error: Error, component?: string): void {
  ExceptionHandler.getInstance().handleException(error, component)
}

export function WithExceptionHandling(component: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        return await method.apply(this, args)
      } catch (error) {
        handleSystemError(error as Error, component)
        throw error 
      }
    }

    return descriptor
  }
}
