import { CityData } from "./MultiCityDataConnector";

interface OpenWeatherMapResponse {
  coord: { lat: number; lon: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface OpenWeatherMapForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: { all: number };
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    pop: number; // Probability of precipitation
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    timezone: number;
  };
}

export class WeatherAPIConnector {
  private readonly API_BASE_URL = "https://api.openweathermap.org/data/2.5";
  private readonly API_KEY = "54425027346d37dd9041e9126d864487";
  private readonly GLOBAL_CITIES = [
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
    { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 },
    { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
    { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6176 },
    { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
    { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
    { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
    { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
    { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.396 },
    { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
    { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
    { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  ];

  public async fetchCityWeatherByCoords(
    lat: number,
    lng: number
  ): Promise<CityData | null> {
    try {
      console.log("API KEY:", this.API_KEY);

      if (!this.API_KEY) {
        console.warn(
          "⚠️ OpenWeatherMap API key not found. Using fallback data."
        );
        return null;
      }

      const url = `${this.API_BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${this.API_KEY}&units=metric`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        console.warn(
          `OpenWeatherMap API responded with status: ${response.status}`
        );
        return null;
      }

      const data: OpenWeatherMapResponse = await response.json();

      if (data.cod !== 200) {
        console.warn("Invalid OpenWeatherMap API response:", data);
        return null;
      }

      return this.transformWeatherData(data);
    } catch (error) {
      console.error(
        `Error fetching weather data for coords ${lat}, ${lng}:`,
        error
      );
      return null;
    }
  }

  public async fetchCityWeatherByName(
    cityName: string,
    countryCode?: string
  ): Promise<CityData | null> {
    try {
      debugger;
      if (!this.API_KEY) {
        console.warn(
          "⚠️ OpenWeatherMap API key not found. Using fallback data."
        );
        return null;
      }

      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const url = `${this.API_BASE_URL}/weather?q=${encodeURIComponent(
        query
      )}&appid=${this.API_KEY}&units=metric`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        console.warn(
          `OpenWeatherMap API responded with status: ${response.status}`
        );
        return null;
      }

      const data: OpenWeatherMapResponse = await response.json();

      if (data.cod !== 200) {
        console.warn("Invalid OpenWeatherMap API response:", data);
        return null;
      }

      return this.transformWeatherData(data);
    } catch (error) {
      console.error(`Error fetching weather data for city ${cityName}:`, error);
      return null;
    }
  }

  public async fetchMultipleCitiesWeather(limit?: number): Promise<CityData[]> {
    const citiesToFetch = limit
      ? this.GLOBAL_CITIES.slice(0, limit)
      : this.GLOBAL_CITIES.slice(0, 15);
    const results: CityData[] = [];

    // Batch processing to respect rate limits
    const batchSize = 3;
    for (let i = 0; i < citiesToFetch.length; i += batchSize) {
      const batch = citiesToFetch.slice(i, i + batchSize);

      const batchPromises = batch.map(async (city) => {
        try {
          // Try coordinates first (more reliable)
          let cityData = await this.fetchCityWeatherByCoords(
            city.lat,
            city.lng
          );

          // Fallback to city name if coordinates fail
          if (!cityData) {
            cityData = await this.fetchCityWeatherByName(
              city.name,
              city.country
            );
          }

          return cityData;
        } catch (error) {
          console.error(
            `Failed to fetch weather data for ${city.name}:`,
            error
          );
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(
        ...(batchResults.filter((result) => result !== null) as CityData[])
      );

      // Rate limiting: wait 1 second between batches
      if (i + batchSize < citiesToFetch.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(
      `✅ Successfully fetched OpenWeatherMap data for ${results.length} cities`
    );
    return results;
  }

  private transformWeatherData(weatherData: OpenWeatherMapResponse): CityData {
    const weatherMain = weatherData.weather[0]?.main || "Clear";
    const weatherDescription =
      weatherData.weather[0]?.description || "clear sky";

    // Convert weather condition to health level for compatibility
    const healthLevel = this.getHealthLevelFromWeather(
      weatherMain,
      weatherData.main.temp
    );

    // Calculate precipitation probability (simplified - OpenWeatherMap current weather doesn't include precipitation)
    // We'll estimate based on humidity and cloud cover
    const precipitation = this.estimatePrecipitation(
      weatherData.main.humidity,
      weatherData.clouds?.all || 0
    );

    // Convert wind speed from m/s to km/h
    const windSpeedKmh = (weatherData.wind?.speed || 0) * 3.6;

    return {
      city: weatherData.name,
      country: weatherData.sys.country,
      // Weather index (computed from temperature and conditions)
      aqi: this.calculateWeatherIndex(
        weatherData.main.temp,
        weatherData.main.humidity,
        weatherData.wind?.speed || 0
      ),
      // Keep pollutant fields for backward compatibility (not used for weather)
      pm25: 0,
      pm10: 0,
      no2: 0,
      so2: 0,
      o3: 0,
      co: 0,
      timestamp: new Date(weatherData.dt * 1000).toISOString(),
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      coordinates: {
        lat: weatherData.coord.lat,
        lng: weatherData.coord.lon,
      },
      temperature: Math.round(weatherData.main.temp * 10) / 10,
      humidity: weatherData.main.humidity,
      pressure: Math.round(weatherData.main.pressure),
      windSpeed: Math.round(windSpeedKmh * 10) / 10,
      weatherCondition: weatherMain,
      // Legacy field
      dominantPollutant: weatherMain.toLowerCase(),
      healthLevel: healthLevel,
      apiSource: "OPENWEATHERMAP",
    };
  }

  private getHealthLevelFromWeather(
    weatherMain: string,
    temperature: number
  ): string {
    // Map weather conditions to health levels
    const weatherMap: { [key: string]: string } = {
      Clear: "Good",
      Clouds: "Moderate",
      Rain: "Unhealthy for Sensitive Groups",
      Drizzle: "Moderate",
      Thunderstorm: "Unhealthy",
      Snow: "Unhealthy for Sensitive Groups",
      Mist: "Moderate",
      Fog: "Moderate",
      Haze: "Unhealthy for Sensitive Groups",
    };

    let level = weatherMap[weatherMain] || "Moderate";

    // Adjust based on extreme temperatures
    if (temperature > 35 || temperature < -10) {
      level = "Unhealthy";
    } else if (temperature > 30 || temperature < -5) {
      if (level === "Good") level = "Moderate";
    }

    return level;
  }

  private calculateWeatherIndex(
    temp: number,
    humidity: number,
    windSpeed: number
  ): number {
    // Calculate a weather index (0-500 scale similar to AQI for compatibility)
    // Lower is better (like AQI)
    let index = 50; // Base good weather

    // Temperature factor
    if (temp > 35 || temp < -10) index += 150;
    else if (temp > 30 || temp < -5) index += 75;
    else if (temp > 25 || temp < 0) index += 25;

    // Humidity factor
    if (humidity > 90) index += 50;
    else if (humidity < 20) index += 30;

    // Wind speed factor (high winds = worse conditions)
    if (windSpeed > 20) index += 100;
    else if (windSpeed > 15) index += 50;

    return Math.min(500, Math.max(0, Math.round(index)));
  }

  private estimatePrecipitation(humidity: number, cloudCover: number): number {
    // Estimate precipitation in mm based on humidity and cloud cover
    // This is an approximation since current weather API doesn't provide precipitation
    if (cloudCover > 80 && humidity > 70) {
      return Math.round((humidity - 70) * 0.5 * 10) / 10;
    }
    return 0;
  }

  public async getGlobalInsights(citiesData?: CityData[]): Promise<{
    totalCitiesMonitored: number;
    averageAQI: number;
    citiesWithAlerts: number;
    bestCity: { name: string; aqi: number };
    worstCity: { name: string; aqi: number };
    dataVolume: number;
    countriesRepresented: number;
  } | null> {
    try {
      const data = citiesData || (await this.fetchMultipleCitiesWeather(15));

      if (data.length === 0) {
        console.warn(
          "⚠️ No city weather data available for insights, returning null"
        );
        return null;
      }

      // Calculate average temperature instead of AQI
      const totalTemp = data.reduce(
        (sum, city) => sum + (city.temperature || 20),
        0
      );
      const averageTemp = Math.round(totalTemp / data.length);

      // Convert to weather index for compatibility
      const averageAQI = this.calculateWeatherIndex(averageTemp, 65, 10);

      // Cities with alerts (extreme weather)
      const citiesWithAlerts = data.filter(
        (city) =>
          (city.temperature &&
            (city.temperature > 35 || city.temperature < -10)) ||
          (city.windSpeed && city.windSpeed > 30) ||
          city.aqi > 150
      ).length;

      // Sort by temperature (best = moderate temperature)
      const sortedByTemp = [...data].sort((a, b) => {
        const tempA = Math.abs((a.temperature || 20) - 20); // Distance from ideal 20°C
        const tempB = Math.abs((b.temperature || 20) - 20);
        return tempA - tempB;
      });

      const bestCity = {
        name: sortedByTemp[0].location,
        aqi: sortedByTemp[0].aqi || 50,
      };
      const worstCity = {
        name: sortedByTemp[sortedByTemp.length - 1].location,
        aqi: sortedByTemp[sortedByTemp.length - 1].aqi || 150,
      };

      return {
        totalCitiesMonitored: data.length,
        averageAQI,
        citiesWithAlerts,
        bestCity,
        worstCity,
        dataVolume: data.length * 7,
        countriesRepresented: new Set(data.map((city) => city.country)).size,
      };
    } catch (error) {
      console.error("Error generating global weather insights:", error);
      throw error;
    }
  }
}
