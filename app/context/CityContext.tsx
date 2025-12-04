"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { CityManager } from "../core/CityManager"

interface CityContextType {
  cityManager: CityManager
  isEmergencyMode: boolean
  setEmergencyMode: (mode: boolean) => void
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: ReactNode }) {
  const [cityManager] = useState(() => CityManager.getInstance())
  const [isEmergencyMode, setEmergencyMode] = useState(false)

  return (
    <CityContext.Provider value={{ cityManager, isEmergencyMode, setEmergencyMode }}>{children}</CityContext.Provider>
  )
}

export function useCityContext() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCityContext must be used within a CityProvider")
  }
  return context
}
