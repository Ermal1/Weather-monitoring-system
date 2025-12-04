'use client'

import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'
import RetroGrid from '@/components/magic-ui/retro-grid'
import GradientText from '@/components/magic-ui/gradient-text'

import { HeroSectionProps } from "@/types"

export function HeroSection({ isConnected, connectionError, lastUpdate }: HeroSectionProps) {
  return (
    <div className="text-center mb-8 relative">
      <div className="relative bg-white/80 backdrop-blur-sm px-8 py-12 rounded-2xl shadow-2xl border border-gray-200">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <RetroGrid 
            gridSize={60}
            strokeWidth={1}
            opacity={0.15}
            fade={true}
          />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">
            <GradientText 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
            >
              🌤️ Weather Monitor System
            </GradientText>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Real-Time Weather Intelligence & Environmental Analytics
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-white/60 backdrop-blur-sm border-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Weather API • 30+ Global Cities • AI-Powered Insights
            </Badge>
            {isConnected ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Real-time Active
                {lastUpdate && (
                  <span className="ml-2 text-xs">
                    (Updated)
                  </span>
                )}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                {connectionError || 'Connecting...'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 