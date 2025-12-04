"use client"

import { cn } from "@/lib/utils"

interface AnimatedBlobProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: "blue" | "purple" | "green" | "pink" | "orange"
  animate?: boolean
  duration?: number
}

export default function AnimatedBlob({
  className,
  size = "md",
  color = "blue",
  animate = true,
  duration = 20,
}: AnimatedBlobProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
  }

  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-400 to-blue-600",
    purple: "bg-gradient-to-r from-purple-400 to-purple-600",
    green: "bg-gradient-to-r from-green-400 to-green-600",
    pink: "bg-gradient-to-r from-pink-400 to-pink-600",
    orange: "bg-gradient-to-r from-orange-400 to-orange-600",
  }

  return (
    <div
      className={cn(
        "absolute opacity-20 blur-xl",
        sizeClasses[size],
        colorClasses[color],
        animate && "animate-blob",
        className
      )}
      style={
        animate
          ? {
              animation: `blob ${duration}s infinite`,
            }
          : undefined
      }
    >
      {animate && (
        <style jsx>{`
          @keyframes blob {
            0% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              transform: translate(-50%, -50%) rotate(0deg) scale(1);
            }
            33% {
              border-radius: 70% 30% 50% 50% / 30% 50% 50% 70%;
              transform: translate(-50%, -50%) rotate(120deg) scale(1.1);
            }
            66% {
              border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
              transform: translate(-50%, -50%) rotate(240deg) scale(0.9);
            }
            100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              transform: translate(-50%, -50%) rotate(360deg) scale(1);
            }
          }
        `}</style>
      )}
    </div>
  )
} 