/**
 * @deprecated This file is kept for backward compatibility only.
 * All new code should use WeatherQueries.ts instead.
 * This file redirects all calls to WeatherQueries.
 */

import * as WeatherQueries from './WeatherQueries'

// Redirect all exports to WeatherQueries
export const aqicnQueryKeys = WeatherQueries.weatherQueryKeys

// Re-export types and functions from WeatherQueries for backward compatibility
export type ProcessedWeatherData = WeatherQueries.ProcessedWeatherData

export const getWeatherByCity = WeatherQueries.getWeatherByCity
export const getMultipleCitiesWeather = WeatherQueries.getMultipleCitiesWeather
export const getGlobalWeatherInsights = WeatherQueries.getGlobalWeatherInsights
export const getCityWeatherAlert = WeatherQueries.getCityWeatherAlert
export const getWeatherAPIStats = WeatherQueries.getWeatherAPIStats 