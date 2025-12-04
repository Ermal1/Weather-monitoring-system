"use client"

import { cn } from "@/lib/utils"

interface RetroGridProps {
  className?: string
  gridSize?: number
  strokeWidth?: number
  fade?: boolean
  opacity?: number
}

export default function RetroGrid({
  className,
  gridSize = 50,
  strokeWidth = 1,
  fade = true,
  opacity = 0.15,
}: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        fade && "[mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_70%)]",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, ${opacity}) ${strokeWidth}px, transparent ${strokeWidth}px),
          linear-gradient(to bottom, rgba(59, 130, 246, ${opacity}) ${strokeWidth}px, transparent ${strokeWidth}px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  )
} 