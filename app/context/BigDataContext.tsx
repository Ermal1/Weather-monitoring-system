"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { BigDataProcessor } from "../bigdata/BigDataProcessor"
import { RealTimeAnalytics } from "../bigdata/RealTimeAnalytics"
import { DataStreamManager } from "../bigdata/DataStreamManager"

interface BigDataContextType {
  processor: BigDataProcessor
  analytics: RealTimeAnalytics
  streamManager: DataStreamManager
  isProcessing: boolean
  dataVolume: number
  processingRate: number
}

const BigDataContext = createContext<BigDataContextType | undefined>(undefined)

export function BigDataProvider({ children }: { children: ReactNode }) {
  const [processor] = useState(() => new BigDataProcessor())
  const [analytics] = useState(() => new RealTimeAnalytics())
  const [streamManager] = useState(() => new DataStreamManager())
  const [isProcessing, setIsProcessing] = useState(false)
  const [dataVolume, setDataVolume] = useState(0)
  const [processingRate, setProcessingRate] = useState(0)

  useEffect(() => {
    // Start big data processing
    processor.startProcessing()
    analytics.startAnalytics()
    streamManager.startStreaming()

    setIsProcessing(true)

    // Simulate data volume and processing rate updates
    const interval = setInterval(() => {
      setDataVolume((prev) => prev + Math.random() * 1000)
      setProcessingRate(Math.random() * 10000)
    }, 2000)

    return () => {
      clearInterval(interval)
      processor.stopProcessing()
      analytics.stopAnalytics()
      streamManager.stopStreaming()
    }
  }, [processor, analytics, streamManager])

  return (
    <BigDataContext.Provider
      value={{
        processor,
        analytics,
        streamManager,
        isProcessing,
        dataVolume,
        processingRate,
      }}
    >
      {children}
    </BigDataContext.Provider>
  )
}

export function useBigDataContext() {
  const context = useContext(BigDataContext)
  if (context === undefined) {
    throw new Error("useBigDataContext must be used within a BigDataProvider")
  }
  return context
}
