'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Menu, X, BarChart3, Globe, Brain, Presentation, MessageCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { NavbarProps } from "@/types"

const navItems = [
  {
    id: 'monitoring',
    label: 'Global Monitoring',
    icon: Globe,
    description: 'Real-time weather data',
  },
  {
    id: 'analytics',
    label: 'Real-Time Analytics',
    icon: BarChart3,
    description: 'Live data processing',
  },
  {
    id: 'chat',
    label: 'AI Assistant',
    icon: MessageCircle,
    description: 'Chat with AI about weather',
  },
  {
    id: 'insights',
    label: 'AI Insights',
    icon: Brain,
    description: 'Big data analysis',
  },
  {
    id: 'presentation',
    label: 'Presentation',
    icon: Presentation,
    description: 'Project showcase',
  },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-emerald-500/20 sticky top-0 z-50 shadow-2xl shadow-emerald-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 p-1 shadow-lg">
              <Image
                src="/ubt-logo-1.png"
                alt="UBT Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Weather Monitor System
              </h1>
              <p className="text-sm text-emerald-300/80">Real-Time Weather Intelligence</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50 scale-105 border border-emerald-400/30" 
                      : "hover:bg-emerald-500/10 hover:text-emerald-300 text-slate-300 hover:border-emerald-500/20 border border-transparent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  )}
                </Button>
              )
            })}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 backdrop-blur-sm animate-pulse">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
              Live Data
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-500/20 bg-slate-900/98 backdrop-blur-xl">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => {
                      onTabChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={cn(
                      "w-full justify-start space-x-3 px-4 py-3 rounded-xl transition-all",
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30" 
                        : "hover:bg-emerald-500/10 hover:text-emerald-300 text-slate-300"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                    {isActive && (
                      <Sparkles className="w-4 h-4 ml-auto animate-pulse" />
                    )}
                  </Button>
                )
              })}
              
              {/* Mobile Status */}
              <div className="pt-3 border-t border-emerald-500/20">
                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 w-full justify-center backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
                  Real-time Data Active
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 