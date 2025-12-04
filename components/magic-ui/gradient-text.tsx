"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  animationDuration?: number
}

export default function GradientText({
  children,
  className,
  from = "from-blue-500",
  via = "via-purple-500",
  to = "to-cyan-500",
  animate = false,
  animationDuration = 3,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        animate && "animate-gradient-x",
        className
      )}
      style={
        animate
          ? {
              backgroundSize: "200% 200%",
              animation: `gradient-x ${animationDuration}s ease infinite`,
            }
          : undefined
      }
    >
      {children}
      {animate && (
        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}</style>
      )}
    </span>
  )
} 