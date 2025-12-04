/**
 * @deprecated This file is kept for backward compatibility only.
 * All new code should use WeatherQueries.ts instead.
 * This file redirects all calls to WeatherQueries.
 */

import * as WeatherQueries from './WeatherQueries'

// Redirect all exports to WeatherQueries
export const aqicnQueryKeys = WeatherQueries.weatherQueryKeys

// Re-export types and functions from WeatherQueries for backward compatibility
export type ProcessedAirQualityData = WeatherQueries.ProcessedWeatherData

export const getAirQualityByCity = WeatherQueries.getWeatherByCity
export const getMultipleCitiesAirQuality = WeatherQueries.getMultipleCitiesWeather
export const getGlobalAirQualityInsights = WeatherQueries.getGlobalWeatherInsights
export const getCityAirQualityAlert = WeatherQueries.getCityWeatherAlert
export const getAQICNAPIStats = WeatherQueries.getWeatherAPIStats 