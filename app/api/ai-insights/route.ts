import { NextRequest, NextResponse } from 'next/server';
import { DeepSeekInsightsService, WeatherData } from '@/lib/deepseek-service';
import { getMultipleCitiesWeather } from '@/app/bigdata/WeatherQueries';

export async function GET() {
  try {
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const weatherData = await getMultipleCitiesWeather(10);
    
    if (!weatherData || weatherData.length === 0) {
      return NextResponse.json(
        { error: 'No weather data available' },
        { status: 404 }
      );
    }

    const processedData: WeatherData[] = weatherData.map(city => ({
      city: city.location,
      location: city.location,
      temperature: city.temperature,
      humidity: city.humidity,
      precipitation: city.precipitation,
      windSpeed: city.windSpeed,
      pressure: city.pressure,
      weatherCondition: city.weatherCondition,
      timestamp: city.timestamp,
      weatherIndex: city.weatherIndex
    }));

    const deepSeekService = new DeepSeekInsightsService();
    const insights = await deepSeekService.generateInsights(processedData);

    return NextResponse.json({
      success: true,
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        citiesAnalyzed: processedData.length,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { weatherData } = body;
    const dataToProcess = weatherData;

    if (!dataToProcess || !Array.isArray(dataToProcess)) {
      return NextResponse.json(
        { error: 'Invalid weather data provided' },
        { status: 400 }
      );
    }

    const deepSeekService = new DeepSeekInsightsService();
    const insights = await deepSeekService.generateInsights(dataToProcess);

    return NextResponse.json({
      success: true,
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        citiesAnalyzed: dataToProcess.length,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cityData } = body;

    if (!cityData) {
      return NextResponse.json(
        { error: 'City data is required' },
        { status: 400 }
      );
    }

    const deepSeekService = new DeepSeekInsightsService();
    const insight = await deepSeekService.generateCityInsight(cityData);

    if (!insight) {
      return NextResponse.json(
        { error: 'Failed to generate city insight' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      insight,
      metadata: {
        generatedAt: new Date().toISOString(),
        city: cityData.city,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating city insight:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate city insight',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 