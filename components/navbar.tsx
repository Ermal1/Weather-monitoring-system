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
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Weather Monitor System
              </h1>
              <p className="text-sm text-gray-600">Real-Time Weather Intelligence</p>
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
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105" 
                      : "hover:bg-blue-50 hover:text-blue-700 text-gray-700"
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
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
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
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg">
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
                      "w-full justify-start space-x-3 px-4 py-3 rounded-lg",
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                        : "hover:bg-blue-50 hover:text-blue-700"
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
              <div className="pt-3 border-t border-gray-200/50">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-full justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
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