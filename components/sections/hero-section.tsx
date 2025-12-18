'use client'

import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'
import RetroGrid from '@/components/magic-ui/retro-grid'
import GradientText from '@/components/magic-ui/gradient-text'

import { HeroSectionProps } from "@/types"

export function HeroSection({ isConnected, connectionError, lastUpdate }: HeroSectionProps) {
  return (
    <div className="text-center mb-8 relative">
      <div className="relative bg-gradient-to-br from-slate-900/90 via-emerald-900/30 to-teal-900/30 backdrop-blur-xl px-8 py-12 rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-500/30">
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
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            >
              ⛈️ Weather Monitor System
            </GradientText>
          </h1>
          <p className="text-xl text-emerald-200/90 mb-6">
            Real-Time Weather Intelligence & Environmental Analytics
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-emerald-500/10 backdrop-blur-sm border-emerald-400/40 text-emerald-300">
              <Sparkles className="w-3 h-3 mr-1 text-emerald-400" />
              Powered by Weather API • 30+ Global Cities • AI-Powered Insights
            </Badge>
            {isConnected ? (
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                Real-time Active
                {lastUpdate && (
                  <span className="ml-2 text-xs">
                    (Updated)
                  </span>
                )}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-rose-500/20 text-rose-300 border-rose-400/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-rose-400 rounded-full mr-2 animate-pulse"></div>
                {connectionError || 'Connecting...'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 