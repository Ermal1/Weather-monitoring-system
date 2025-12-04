"use client"

import { cn } from "@/lib/utils"
import { CSSProperties, ReactNode } from "react"

interface ShimmerProps {
  children?: ReactNode
  className?: string
  shimmerWidth?: number
  shimmerColor?: string
  backgroundColor?: string
  duration?: number
  angle?: number
}

export default function Shimmer({
  children,
  className,
  shimmerWidth = 100,
  shimmerColor = "rgba(255, 255, 255, 0.3)",
  backgroundColor = "transparent",
  duration = 3,
  angle = 45,
}: ShimmerProps) {
  const shimmerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    backgroundColor,
  }

  const shimmerEffectStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: `${shimmerWidth}%`,
    height: "100%",
    background: `linear-gradient(${angle}deg, transparent, ${shimmerColor}, transparent)`,
    animation: `shimmer ${duration}s infinite`,
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={shimmerStyle}
    >
      {children}
      <div
        style={shimmerEffectStyle}
        className="pointer-events-none"
      />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  )
} 