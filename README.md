# 🌤️ Weather Monitor System

**Real-Time Weather Intelligence & Environmental Analytics**

A comprehensive weather monitoring system powered by Weather API, Supabase real-time subscriptions, and advanced object-oriented programming architecture.

## 🚀 Features

### Real-Time Weather Monitoring
- **Weather API Integration**: Live weather data from 30+ global cities
- **Supabase Real-time**: Instant updates using official Supabase real-time subscriptions
- **Weather Risk Assessment**: AI-powered analysis of weather conditions and forecasts
- **Interactive Dashboard**: Modern UI with real-time status indicators


### Data Processing
- **Multi-Source Integration**: Weather API + Supabase caching layer
- **Real-time Analytics**: Live data processing and anomaly detection
- **Intelligent Caching**: Dual-layer caching with Supabase and memory
- **Weather Insights**: Temperature, Humidity, Precipitation, Wind Speed, Pressure measurements

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI/UX**: Tailwind CSS, Shadcn/ui, Magic UI components
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Data Source**: OpenWeatherMap API (Real-time weather data)
- **State Management**: TanStack React Query
- **Real-time**: Supabase Realtime with Postgres Changes

## 🔑 API Keys Setup

This project uses external APIs that require API keys:

1. **OpenWeatherMap API** (Required for real weather data):
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Add to your `.env.local` file:
     ```
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     # OR
     OPENWEATHER_API_KEY=your_api_key_here
     ```
   - Free tier includes: 60 calls/minute, 1,000,000 calls/month

2. **DeepSeek API** (Optional, for AI insights):
   - Add your DeepSeek API key to `.env.local`:
     ```
     Deepseek_API_KEY=your_deepseek_key_here
     # OR
     DEEPSEEK_API_KEY=your_deepseek_key_here
     ```

**Note:** If OpenWeatherMap API key is not provided, the system will use fallback generated weather data.

## 🚀 Project Start

```bash
npm install --force
npm run dev
```

The application will be available at `http://localhost:3000`

<img width="1422" height="853" alt="Image" src="https://github.com/user-attachments/assets/3f79483f-ea40-4a99-928b-1760ed39b100" />
