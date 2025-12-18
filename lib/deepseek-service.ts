import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

export interface AIInsight {
  type: string;
  city: string;
  severity: string;
  confidence: number;
  prediction: string;
  dataSource: string;
  timeframe: string;
  impact: string;
  detectedAt: string;
}

export interface WeatherData {
  city: string;
  location: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  pressure: number;
  weatherCondition: string;
  timestamp: string;
  // Backward compatibility
  aqi?: number;
  pm25?: number;
  pm10?: number;
  o3?: number;
  no2?: number;
  so2?: number;
  co?: number;
  dominentPollutant?: string;
}


export class DeepSeekInsightsService {
  private apiKey: string;
  private deepseek: any;

  constructor() {
    this.apiKey = process.env.Deepseek_API_KEY || process.env.DEEPSEEK_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not found in environment variables. Please set either Deepseek_API_KEY or DEEPSEEK_API_KEY');
    }
    
    // Create configured DeepSeek instance
    this.deepseek = createDeepSeek({
      apiKey: this.apiKey,
    });
  }

  async generateInsights(weatherData: WeatherData[]): Promise<AIInsight[]> {
    try {
      const prompt = this.createAnalysisPrompt(weatherData);
      
      const { text } = await generateText({
        model: this.deepseek('deepseek-chat'),
        prompt,
        temperature: 0.3, 
      });

      return this.parseInsights(text, weatherData);
    } catch (error) {
      console.error('Error generating DeepSeek insights:', error);
      throw new Error('Failed to generate AI insights');
    }
  }

  private createAnalysisPrompt(data: WeatherData[]): string {
    const cityData = data.map(city => ({
      name: city.city || city.location,
      temperature: city.temperature,
      humidity: city.humidity,
      precipitation: city.precipitation,
      windSpeed: city.windSpeed,
      pressure: city.pressure,
      weatherCondition: city.weatherCondition,
      // Backward compatibility
      aqi: city.aqi,
      pm25: city.pm25,
      pm10: city.pm10,
      dominentPollutant: city.dominentPollutant,
      timestamp: city.timestamp
    }));

    return `You are an expert meteorological data analyst specializing in weather monitoring and forecast assessment. 
    
Analyze the following real-time weather data from multiple cities and generate 3-4 actionable insights:

CURRENT WEATHER DATA:
${JSON.stringify(cityData, null, 2)}

ANALYSIS REQUIREMENTS:
1. Identify cities with concerning weather conditions (severe storms, extreme temperatures)
2. Detect unusual patterns or anomalies in weather patterns
3. Assess potential weather risks for vulnerable populations
4. Predict short-term weather trends based on current conditions

For each insight, provide:
- Type: (WEATHER_ALERT, STORM_WARNING, TEMPERATURE_EXTREME, ANOMALY_DETECTION, etc.)
- City: The specific city affected
- Severity: LOW, MEDIUM, HIGH, or CRITICAL
- Confidence: (percentage from 70-99)
- Prediction: Clear, actionable statement (max 80 words)
- Impact: LOW, MEDIUM, HIGH, or CRITICAL
- Timeframe: (Current, Next 2 hours, Today, etc.)

Format your response as a JSON array with this structure:
[
  {
    "type": "INSIGHT_TYPE",
    "city": "City Name",
    "severity": "LEVEL",
    "confidence": 85,
    "prediction": "Clear description of the insight and recommended actions",
    "impact": "LEVEL",
    "timeframe": "Time period"
  }
]

Focus on practical, actionable insights that help citizens and authorities make informed decisions about outdoor activities and weather precautions.`;
  }

  private parseInsights(aiResponse: string, originalData: WeatherData[]): AIInsight[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return this.createFallbackInsights(originalData);
      }

      const parsedInsights = JSON.parse(jsonMatch[0]);
      
      return parsedInsights.map((insight: any) => ({
        type: insight.type || 'GENERAL_ANALYSIS',
        city: insight.city || 'Multiple Cities',
        severity: insight.severity || 'MEDIUM',
        confidence: Math.min(Math.max(insight.confidence || 80, 70), 99),
        prediction: insight.prediction || 'Weather analysis completed',
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: insight.timeframe || 'Current',
        impact: insight.impact || 'MEDIUM',
        detectedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error parsing AI insights:', error);
      return this.createFallbackInsights(originalData);
    }
  }


  private createFallbackInsights(data: WeatherData[]): AIInsight[] {
    const insights: AIInsight[] = [];
    
    const criticalCities = data.filter(city => 
      city.temperature > 35 || city.temperature < -10 || 
      city.precipitation > 50 || city.windSpeed > 30 ||
      (city.aqi && city.aqi > 150)
    );
    const unhealthyCities = data.filter(city => 
      (city.temperature > 30 || city.temperature < -5) ||
      (city.precipitation > 30) ||
      (city.aqi && city.aqi > 100 && city.aqi <= 150)
    );
    
    if (criticalCities.length > 0) {
      const city = criticalCities[0];
      insights.push({
        type: 'WEATHER_ALERT',
        city: city.city || city.location,
        severity: 'CRITICAL',
        confidence: 88,
        prediction: `Severe weather conditions in ${city.city || city.location} (Temp: ${city.temperature}°C, ${city.weatherCondition}). Take necessary weather precautions and stay informed.`,
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: 'Current',
        impact: 'CRITICAL',
        detectedAt: new Date().toISOString()
      });
    }
    
    if (unhealthyCities.length > 0) {
      const city = unhealthyCities[0];
      insights.push({
        type: 'WEATHER_WARNING',
        city: city.city || city.location,
        severity: 'HIGH',
        confidence: 82,
        prediction: `Elevated weather risk detected in ${city.city || city.location} (Temp: ${city.temperature}°C, ${city.weatherCondition}). Consider weather-appropriate precautions and stay updated.`,
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: 'Current',
        impact: 'HIGH',
        detectedAt: new Date().toISOString()
      });
    }

    return insights.slice(0, 3);
  }


  async generateCityInsight(cityData: WeatherData): Promise<AIInsight | null> {
    try {
      const prompt = `Analyze this weather data for ${cityData.city || cityData.location} and provide one specific insight:

City: ${cityData.city || cityData.location}
Temperature: ${cityData.temperature}°C
Humidity: ${cityData.humidity}%
Precipitation: ${cityData.precipitation}mm
Wind Speed: ${cityData.windSpeed} km/h
Pressure: ${cityData.pressure} hPa
Weather Condition: ${cityData.weatherCondition}

Provide a JSON response with one actionable insight about the current weather conditions and forecast recommendations.`;

      const { text } = await generateText({
        model: this.deepseek('deepseek-chat'),
        prompt,
        temperature: 0.2,
      });

      const insights = this.parseInsights(text, [cityData]);
      return insights.length > 0 ? insights[0] : null;
    } catch (error) {
      console.error('Error generating city insight:', error);
      return null;
    }
  }
} 