"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: number
  borderWidth?: number
  duration?: number
  gradientColors?: string[]
}

export default function AnimatedBorder({
  children,
  className,
  borderRadius = 8,
  borderWidth = 2,
  duration = 4,
  gradientColors = [
    "#3b82f6", // blue-500
    "#8b5cf6", // violet-500
    "#06b6d4", // cyan-500
    "#10b981", // emerald-500
  ],
}: AnimatedBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        className
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `conic-gradient(from 0deg, ${gradientColors.join(", ")}, ${gradientColors[0]})`,
          animation: `spin ${duration}s linear infinite`,
          borderRadius: `${borderRadius}px`,
        }}
      />
      
      {/* Inner content */}
      <div
        className="relative z-10 h-full w-full bg-background"
        style={{
          margin: `${borderWidth}px`,
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
} 