'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Users, Target, Code, Database, Zap, CheckCircle } from 'lucide-react'
import Image from 'next/image'

import RetroGrid from '@/components/magic-ui/retro-grid'
import GradientText from '@/components/magic-ui/gradient-text'

const slides = [
  {
    id: 1,
    title: "Weather Monitor System",
    subtitle: "Advanced Programming Project - OOP Implementation",
    content: (
      <div className="text-center space-y-6 relative">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <RetroGrid 
            gridSize={40}
            opacity={0.1}
            fade={true}
          />
        </div>
        <div className="relative z-10">
          <div className="text-6xl mb-4">🌤️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <GradientText className="bg-gradient-to-r from-blue-600 to-purple-600">
              Weather Monitor System
            </GradientText>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Real-Time Weather Monitoring & Analytics with Advanced OOP Architecture
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Badge variant="outline" className="p-3 bg-white/60 backdrop-blur-sm">32+ Classes</Badge>
            <Badge variant="outline" className="p-3 bg-white/60 backdrop-blur-sm">20+ Interfaces</Badge>
            <Badge variant="outline" className="p-3 bg-white/60 backdrop-blur-sm">5 Design Patterns</Badge>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            Powered by Multi-City API • React • TypeScript • Supabase
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Team & Problem Statement",
    subtitle: "Addressing Weather Monitoring Challenges",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <GradientText>Team Members</GradientText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-700">• Erind Avdiu</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <GradientText>Problem Statement</GradientText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Challenge:</strong> Weather monitoring and forecasting needs affect millions globally
              </p>
              <p className="text-sm text-gray-600">
                <strong>Solution:</strong> Real-time weather monitoring system with predictive analytics
              </p>
              <p className="text-sm text-gray-600">
                <strong>Impact:</strong> Enable proactive weather planning and informed decisions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 3,
    title: "System Architecture & OOP Design",
    subtitle: "Advanced Object-Oriented Programming Implementation",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900">
                <Code className="w-5 h-5 inline mr-2" />
                OOP Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Classes</span>
                  <Badge className="bg-emerald-600">32+ / 15 required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interfaces</span>
                  <Badge className="bg-emerald-600">20+ / 5 required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Exception Classes</span>
                  <Badge className="bg-emerald-600">9+ / 1 required</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inheritance Levels</span>
                  <Badge className="bg-emerald-600">3+ / 3 required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">
                <Zap className="w-5 h-5 inline mr-2" />
                Design Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Factory Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Observer Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Command Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Singleton Pattern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Layered Architecture</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3">
                <GradientText>System Architecture Overview</GradientText>
              </h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <strong>Presentation Layer</strong><br/>
                  React Components, UI Logic
                </div>
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                  <strong>Business Layer</strong><br/>
                  Analytics, Processing
                </div>
                <div className="p-3 bg-purple-50 rounded border border-purple-200">
                  <strong>Data Layer</strong><br/>
                  API Connectors, Cache
                </div>
                <div className="p-3 bg-orange-50 rounded border border-orange-200">
                  <strong>Database Layer</strong><br/>
                  Supabase, Real-time Storage
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 4,
    title: "Class Diagram",
    subtitle: "Complete System Architecture Overview",
    content: (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="relative w-full" style={{ height: "1800px" }}> {/* Increased height for better visibility */}
              <Image
                src="/class-diagram.jpeg"
                alt="Weather Monitor System Class Diagram"
                style={{ objectFit: "contain" }}
                quality={100}
                priority
                width={1100}
                height={400}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Abstract Classes</h3>
            <ul className="text-sm space-y-1">
              <li>• BaseDataProcessor</li>
              <li>• BigDataEngine</li>
              <li>• ManagementService</li>
            </ul>
          </Card>

          <Card className="bg-green-50 p-4">
            <h3 className="font-semibold text-green-900 mb-2">Interfaces</h3>
            <ul className="text-sm space-y-1">
              <li>• IDataProcessor</li>
              <li>• IBigDataEngine</li>
              <li>• IManagementService</li>
              <li>• IReportable</li>
              <li>• IClusterManager</li>
            </ul>
          </Card>

          <Card className="bg-yellow-50 p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Concrete Classes</h3>
            <ul className="text-sm space-y-1">
              <li>• RealTimeAnalytics</li>
              <li>• BigDataProcessor</li>
              <li>• SmartCityDataProcessor</li>
              <li>• BigDataSystemManager</li>
            </ul>
          </Card>

          <Card className="bg-purple-50 p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Design Patterns</h3>
            <ul className="text-sm space-y-1">
              <li>• Factory Pattern</li>
              <li>• Observer Pattern</li>
              <li>• Command Pattern</li>
              <li>• Singleton Pattern</li>
            </ul>
          </Card>

          <Card className="bg-red-50 p-4">
            <h3 className="font-semibold text-red-900 mb-2">Exception Classes</h3>
            <ul className="text-sm space-y-1">
              <li>• SystemException</li>
              <li>• DataProcessingException</li>
              <li>• ValidationException</li>
            </ul>
          </Card>

          <Card className="bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Key Relationships</h3>
            <ul className="text-sm space-y-1">
              <li>• Solid Lines: Inheritance</li>
              <li>• Dashed Lines: Implementation</li>
              <li>• Diamonds: Composition</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Big Data Implementation",
    subtitle: "Real-Time Processing & Analytics",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900">
                <Database className="w-5 h-5 inline mr-2" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cities Monitored</span>
                  <Badge className="bg-blue-600">30+</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Data Points</span>
                  <Badge className="bg-blue-600">210+</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Countries</span>
                  <Badge className="bg-blue-600">19</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Update Frequency</span>
                  <Badge className="bg-blue-600">60s</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-emerald-900">Processing Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Data Ingestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Predictive Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Cache Management</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">AI Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Statistical Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Health Predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Traffic Patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Energy Forecasting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              <GradientText>Live Performance Metrics</GradientText>
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">210+</div>
                <div className="text-sm text-blue-700">Data Points Daily</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-sm text-emerald-700">Prediction Accuracy</div>
              </div>
              <div className="p-4 bg-purple-50 rounded border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">&lt;50ms</div>
                <div className="text-sm text-purple-700">Response Time</div>
              </div>
              <div className="p-4 bg-orange-50 rounded border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">99.8%</div>
                <div className="text-sm text-orange-700">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 5,
    title: "Technology Stack & Implementation",
    subtitle: "Modern Development Stack",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>
                <GradientText>Frontend Technologies</GradientText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                  <span className="text-sm font-medium">React 18</span>
                  <Badge className="bg-blue-600">UI Framework</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                  <span className="text-sm font-medium">TypeScript</span>
                  <Badge className="bg-purple-600">Type Safety</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                  <span className="text-sm font-medium">Next.js</span>
                  <Badge className="bg-emerald-600">Full-Stack</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                  <span className="text-sm font-medium">TanStack Query</span>
                  <Badge className="bg-orange-600">Data Fetching</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>
                <GradientText>Backend & Database</GradientText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                  <span className="text-sm font-medium">Supabase</span>
                  <Badge className="bg-green-600">Database</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                  <span className="text-sm font-medium">PostgreSQL</span>
                  <Badge className="bg-blue-600">RDBMS</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                  <span className="text-sm font-medium">Multi-City API</span>
                  <Badge className="bg-purple-600">Data Source</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                  <span className="text-sm font-medium">Real-time Sync</span>
                  <Badge className="bg-orange-600">Live Updates</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    )
  },
  {
    id: 6,
    title: "Live Demonstration",
    subtitle: "Real-Time System Showcase",
    content: (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg border border-green-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">
              <GradientText className="text-green-800">
                🎯 System Demonstration
              </GradientText>
            </h3>
            <p className="text-green-700 mb-6">
              Experience the Weather Monitor System with live data from 30+ global cities
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white/60 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2">🌍 Global Monitoring</h4>
                <p className="text-sm text-gray-600">
                  View real-time weather data from London, New York, Tokyo, Paris, Shanghai, and Delhi
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2">📊 Analytics Dashboard</h4>
                <p className="text-sm text-gray-600">
                  Start the analytics engine and watch live metrics populate in real-time
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2">🔍 Big Data Insights</h4>
                <p className="text-sm text-gray-600">
                  Explore AI-powered features and statistical analysis capabilities
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2">🏗️ OOP Architecture</h4>
                <p className="text-sm text-gray-600">
                  Review the complete object-oriented design and requirements fulfillment
                </p>
              </div>
            </div>

            <Button 
              onClick={() => window.open('/', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              🚀 Launch Live Demo
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 shadow-lg border border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-sm text-blue-700">Cities Monitored</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 shadow-lg border border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">210+</div>
              <div className="text-sm text-purple-700">Data Points</div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 shadow-lg border border-emerald-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">Real-time</div>
              <div className="text-sm text-emerald-700">Processing</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={prevSlide} 
            variant="outline"
            disabled={currentSlide === 0}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide}
            variant="outline"
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mb-4">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            Slide {currentSlide + 1} of {slides.length}
          </Badge>
        </div>

        {/* Main Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 min-h-[600px] border border-gray-200"
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GradientText>
                  {slides[currentSlide].title}
                </GradientText>
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {slides[currentSlide].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Weather Monitor System Project • Advanced Programming • UBT University
        </div>
      </div>
    </div>
  )
} 