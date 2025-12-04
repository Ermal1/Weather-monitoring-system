export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'insight' | 'analysis' | 'question'
}

export interface AIResponse {
  success: boolean
  response?: string
  insights?: any[]
  error?: string
}

export interface NavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export interface HeroSectionProps {
  isConnected: boolean
  connectionError: string | null
  lastUpdate: Date | null
}

export interface PredictionResult {
  predictionType: string
  cityName: string
  timeframe: string
  predictions: any
  deepseekInsights?: any
  confidence: number
  dataPoints: number
  generatedAt: string
  metadata: {
    processingTime: number
    algorithmsUsed: string[]
    enhancedWithDeepSeek?: boolean
  }
}