

export enum DeviceType {
  WEATHER_STATION = "WEATHER_STATION",
  TEMPERATURE_SENSOR = "TEMPERATURE_SENSOR",
  HUMIDITY_SENSOR = "HUMIDITY_SENSOR",
  WIND_SPEED_MONITOR = "WIND_SPEED_MONITOR",
  PRESSURE_SENSOR = "PRESSURE_SENSOR",
  NOISE_MONITOR = "NOISE_MONITOR"
}

export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  MAINTENANCE = "MAINTENANCE",
  ERROR = "ERROR",
  CALIBRATING = "CALIBRATING"
}

export enum DataProcessingStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED"
}

export enum AlertSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum ServiceRequestStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED"
}

export enum ServiceRequestPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY"
}

export enum WeatherConditionLevel {
  GOOD = "GOOD",
  MODERATE = "MODERATE",
  UNHEALTHY_FOR_SENSITIVE = "UNHEALTHY_FOR_SENSITIVE",
  UNHEALTHY = "UNHEALTHY",
  VERY_UNHEALTHY = "VERY_UNHEALTHY",
  HAZARDOUS = "HAZARDOUS"
}


export enum AnalyticsInsightType {
  HEALTH_RECOMMENDATION = "HEALTH_RECOMMENDATION",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  GLOBAL_WEATHER_ALERT = "GLOBAL_WEATHER_ALERT",
  CITY_WEATHER_ALERT = "CITY_WEATHER_ALERT"
}

export enum SystemEventType {
  DEVICE_ONLINE = "DEVICE_ONLINE",
  DEVICE_OFFLINE = "DEVICE_OFFLINE",
  SEVERE_WEATHER = "SEVERE_WEATHER",
  EXTREME_TEMPERATURE = "EXTREME_TEMPERATURE",
  STORM_WARNING = "STORM_WARNING",
  SYSTEM_STARTUP = "SYSTEM_STARTUP",
  SYSTEM_SHUTDOWN = "SYSTEM_SHUTDOWN",
  DATA_ANOMALY = "DATA_ANOMALY",
  API_ERROR = "API_ERROR"
}

export enum DataSourceType {
  OPENWEATHERMAP_API = "OPENWEATHERMAP_API",
  WEATHER_API = "WEATHER_API",
  INTERNAL_SENSOR = "INTERNAL_SENSOR",
  GOVERNMENT_STATION = "GOVERNMENT_STATION",
  METEOROLOGICAL_SERVICE = "METEOROLOGICAL_SERVICE",
  EMBASSY_MONITOR = "INTERNAL_SENSOR",
  WEATHER_SERVICE = "WEATHER_API"
}

export enum ServiceType {
  WEATHER_MONITORING = "WEATHER_MONITORING"
}

export enum ProcessingPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum BigDataOperation {
  PROCESS = "PROCESS",
  ANALYZE = "ANALYZE",
  STREAM = "STREAM",
  CACHE = "CACHE"
}

export class EnumHelper {
  static getDeviceTypeDisplayName(type: DeviceType): string {
    const displayNames: Record<DeviceType, string> = {
      [DeviceType.WEATHER_STATION]: "Weather Station",
      [DeviceType.TEMPERATURE_SENSOR]: "Temperature Sensor",
      [DeviceType.HUMIDITY_SENSOR]: "Humidity Sensor",
      [DeviceType.WIND_SPEED_MONITOR]: "Wind Speed Monitor",
      [DeviceType.PRESSURE_SENSOR]: "Pressure Sensor",
      [DeviceType.NOISE_MONITOR]: "Noise Monitor"
    }
    return displayNames[type]
  }

  static getWeatherConditionColor(level: WeatherConditionLevel): string {
    const colors: Record<WeatherConditionLevel, string> = {
      [WeatherConditionLevel.GOOD]: "green",
      [WeatherConditionLevel.MODERATE]: "yellow",
      [WeatherConditionLevel.UNHEALTHY_FOR_SENSITIVE]: "orange",
      [WeatherConditionLevel.UNHEALTHY]: "red",
      [WeatherConditionLevel.VERY_UNHEALTHY]: "purple",
      [WeatherConditionLevel.HAZARDOUS]: "maroon"
    }
    return colors[level]
  }


  static getAlertSeverityIcon(severity: AlertSeverity): string {
    const icons: Record<AlertSeverity, string> = {
      [AlertSeverity.LOW]: "ℹ️",
      [AlertSeverity.MEDIUM]: "⚠️",
      [AlertSeverity.HIGH]: "🚨",
      [AlertSeverity.CRITICAL]: "🔥"
    }
    return icons[severity]
  }
}
