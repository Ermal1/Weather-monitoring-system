"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface AnimatedGridProps {
  size?: number
  className?: string
  fadeFar?: boolean
  maxOpacity?: number
}

export default function AnimatedGrid({
  size = 50,
  className,
  fadeFar = true,
  maxOpacity = 0.3,
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0
    const points: Array<{ x: number; y: number; opacity: number }> = []

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    const createPoints = () => {
      const rect = canvas.getBoundingClientRect()
      points.length = 0
      
      for (let x = 0; x < rect.width + size; x += size) {
        for (let y = 0; y < rect.height + size; y += size) {
          points.push({
            x,
            y,
            opacity: Math.random() * maxOpacity,
          })
        }
      }
    }

    const animate = () => {
      time += 0.02
      const rect = canvas.getBoundingClientRect()
      
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      points.forEach((point, index) => {
        const distance = fadeFar
          ? Math.sqrt(
              Math.pow(point.x - rect.width / 2, 2) + 
              Math.pow(point.y - rect.height / 2, 2)
            ) / (rect.width / 2)
          : 0

        const opacity = fadeFar
          ? maxOpacity * (1 - distance) * (0.5 + 0.5 * Math.sin(time + index * 0.1))
          : maxOpacity * (0.3 + 0.7 * Math.sin(time + index * 0.1))

        if (opacity > 0.01) {
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})` // Blue color for weather monitoring theme
          ctx.fillRect(point.x - 1, point.y - 1, 2, 2)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createPoints()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createPoints()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [size, fadeFar, maxOpacity])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    />
  )
} 